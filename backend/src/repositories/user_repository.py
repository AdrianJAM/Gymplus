import boto3
from botocore.exceptions import ClientError
import uuid

from src.config import config


class UserRepository:
    def __init__(self):
        self.dynamodb = boto3.resource(
            "dynamodb",
            aws_access_key_id=config.Config.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=config.Config.AWS_SECRET_ACCESS_KEY,
            region_name=config.Config.AWS_REGION,
        )
        self.table = self.dynamodb.Table("users")

    def get_all_users(self):
        try:
            response = self.table.scan()
            return response.get("Items")
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return None

    def get_by_email(self, email):
        try:
            response = self.table.scan(
                FilterExpression="email = :email",
                ExpressionAttributeValues={":email": email},
            )
            return response.get("Items")
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return None

    def get_by_ci(self, ci):
        try:
            response = self.table.scan(
                FilterExpression="ci = :ci",
                ExpressionAttributeValues={":ci": ci},
            )
            return response.get("Items")
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return None

    def get_user(self, user_id):
        try:
            response = self.table.get_item(Key={"id": user_id})
            return response.get("Item")
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return None

    def create_user(self, user_data):
        try:
            user_id = str(uuid.uuid4())
            user_data["id"] = user_id
            self.table.put_item(Item=user_data)
            return user_data
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return None

    def update_user(self, user_id, user_data):
        try:
            self.table.update_item(
                Key={"id": user_id},
                UpdateExpression="SET #name = :name, #email = :email",
                ExpressionAttributeNames={"#name": "name", "#email": "email"},
                ExpressionAttributeValues={
                    ":name": user_data["name"],
                    ":email": user_data["email"],
                },
            )
            return self.get_user(user_id)
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return None

    def delete_user(self, user_id):
        try:
            self.table.delete_item(Key={"id": user_id})
            return True
        except ClientError as e:
            print(e.response["Error"]["Message"])
            return False
