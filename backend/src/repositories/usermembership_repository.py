from datetime import datetime, timedelta
import uuid
import boto3
from botocore.exceptions import ClientError
from src.config import config


class UserMembershipRepository:
    def __init__(self):
        self.dynamodb = boto3.resource(
            "dynamodb",
            aws_access_key_id=config.Config.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=config.Config.AWS_SECRET_ACCESS_KEY,
            region_name=config.Config.AWS_REGION,
        )
        self.create_table()
        self.table = self.dynamodb.Table("user_memberships")

    def add_user_membership(self, user_id, membership_id, duration):
        """
        Add a user membership to the database.

        :param user_id: ID of the user.
        :param membership_id: ID of the membership being added.
        :param duration: Duration of the membership in days.
        :return: True if membership was added successfully, False otherwise.
        """
        try:
            duration = int(duration)
            membership_data = {
                "id": str(uuid.uuid4()),
                "user_id": user_id,
                "membership_id": membership_id,
                "start_date": datetime.now().isoformat(),
                "end_date": (
                    datetime.now() + timedelta(days=int(duration))
                ).isoformat(),
                "status": True,
            }
            self.table.put_item(Item=membership_data)
            return True

        except ClientError as e:
            print(e.response["Error"]["Message"])
            return False

    def get_user_memberships(self, user_id):
        """
        Retrieve all memberships for a specific user.

        :param user_id: ID of the user whose memberships are to be retrieved.
        :return: List of memberships or an empty list if none found.
        """
        try:
            response = self.table.scan(
                FilterExpression="user_id = :user_id",
                ExpressionAttributeValues={":user_id": user_id},
            )
            return response.get("Items", [])
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return []

    def get_all_usermemberships(self):
        """
        Retrieve all memberships from the database.

        :return: List of memberships or an empty list if none found.
        """
        try:
            response = self.table.scan()
            return response.get("Items", [])
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return []

    def delete_user_membership(self, user_id, membership_id):
        """
        Deletes a specific membership for a user.

        :param user_id: ID of the user.
        :param membership_id: ID of the membership to be deleted.
        :return: True if the deletion was successful, False otherwise.
        """
        try:
            self.table.delete_item(
                Key={"user_id": user_id, "membership_id": membership_id}
            )
            return True
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return False

    def create_table(self):
        """Create the user membership table if it does not exist."""
        try:
            # Definir la estructura de la tabla
            table = self.dynamodb.create_table(
                TableName="user_memberships",
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
            if e.response["Error"]["Code"] == "ResourceInUseException":
                print("La tabla 'user_memberships' ya existe.")
            else:
                print(e.response["Error"]["Message"])
