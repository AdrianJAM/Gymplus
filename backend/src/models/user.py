import random
import string
from typing import Optional


class User:
    def __init__(
        self,
        id,
        name,
        email,
        ci: Optional[str] = None,
        phone: Optional[str] = None,
        img_url: Optional[str] = None,
    ):
        self.id = id or "".join(
            random.choices(string.ascii_letters + string.digits, k=16)
        )
        self.name = name
        self.email = email
        self.ci = ci
        self.phone = phone
        self.img_url = img_url

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "ci": self.ci,
            "phone": self.phone,
            "img_url": self.img_url,
        }
