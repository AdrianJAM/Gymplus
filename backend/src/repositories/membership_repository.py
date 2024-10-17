from decimal import Decimal
import boto3
from botocore.exceptions import ClientError
import uuid
from src.config import config
from src.models.membership import Membership


class MembershipRepository:
    def __init__(self):
        self.dynamodb = boto3.resource(
            "dynamodb",
            aws_access_key_id=config.Config.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=config.Config.AWS_SECRET_ACCESS_KEY,
            region_name=config.Config.AWS_REGION,
        )
        self.create_table()
        self.table = self.dynamodb.Table("memberships")

    def get_all(self):
        try:
            response = self.table.scan()
            return response.get("Items")
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return None

    def save(self, membership: Membership):
        """
        Save a new membership to the DynamoDB table.

        Args:
            membership (dict): The membership data to save.

        Returns:
            dict: The saved membership data with the generated ID, or None if there was an error.
        """
        self.validate_membership(membership)
        try:
            membership["price"] = Decimal(str(membership["price"]))
            membership_id = str(uuid.uuid4())
            membership["id"] = membership_id
            self.table.put_item(Item=membership)
            return membership
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return None

    def get_by_id(self, membership_id) -> Membership:
        try:
            response = self.table.get_item(Key={"id": membership_id})
            return response.get("Item")
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return None

    def update_price(self, membership_id, price):
        try:
            response = self.get_by_id(membership_id)
            if response:
                response["price"] = price
                self.table.put_item(Item=response)
                return response
            return None
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return None

    def delete(self, membership_id):
        try:
            response = self.table.delete_item(Key={"id": membership_id})
            return response
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return None

    def validate_membership(self, membership):
        """Validate membership data before saving."""
        required_fields = [
            "price",
            "type",
            "duration",
            "description",
        ]
        for field in required_fields:
            if field not in membership:
                raise ValueError(f"{field} is a required field.")

    def create_table(self):
        """Create the memberships table if it does not exist."""
        try:
            # Definir la estructura de la tabla
            table = self.dynamodb.create_table(
                TableName="memberships",
                KeySchema=[
                    {
                        "AttributeName": "id",  # La clave primaria
                        "KeyType": "HASH",  # Clave de partición
                    },
                ],
                AttributeDefinitions=[
                    {
                        "AttributeName": "id",
                        "AttributeType": "S",
                    },  # Tipo de dato: cadena
                ],
                ProvisionedThroughput={"ReadCapacityUnits": 5, "WriteCapacityUnits": 5},
            )
            # Esperar a que la tabla esté activa
            table.meta.client.get_waiter("table_exists").wait(TableName="memberships")
            print("Tabla 'memberships' creada exitosamente.")
        except ClientError as e:
            # Si la tabla ya existe, manejar la excepción
            if e.response["Error"]["Code"] == "ResourceInUseException":
                print("La tabla 'memberships' ya existe.")
            else:
                print(e.response["Error"]["Message"])
