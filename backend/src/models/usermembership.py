import boto3
from botocore.exceptions import ClientError
from datetime import datetime
import uuid
from src.config import config


class UserMembership:
    def __init__(
        self,
        id: str,
        user_id: str,
        membership_id: str,
        start_date: datetime,
        end_date: datetime,
        status: bool,
    ):
        self.id = id
        self.user_id = user_id
        self.membership_id = membership_id
        self.start_date = start_date
        self.end_date = end_date
        self.status = status

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "membership_id": self.membership_id,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "status": self.status,
        }
