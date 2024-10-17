import random
import string
from typing import Optional
import hashlib
import bcrypt


def generate_random_id(length: int = 16) -> str:
    """Genera una ID aleatoria compuesta de letras y dígitos."""
    return "".join(random.choices(string.ascii_letters + string.digits, k=length))


class User:

    def __init__(
        self,
        name: str,
        email: str,
        password: str = "None",
        id: Optional[str] = None,
        ci: Optional[str] = None,
        phone: Optional[str] = None,
        img_url: Optional[str] = None,
    ):

        self.id = id or generate_random_id()
        self.name = name
        self.email = self.validate_email(email)
        self.password = self.hash_password(password) if password != "None" else password
        self.ci = ci
        self.phone = phone
        self.img_url = img_url

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "ci": self.ci,
            "phone": self.phone,
            "img_url": self.img_url,
        }

    @staticmethod
    def hash_password(password: str) -> str:

        if not password:
            raise ValueError("Password is required")
        return hash_password_sha256_bcrypt(password)

    @staticmethod
    def validate_email(email: str) -> str:
        """Valida el formato del correo electrónico."""
        if "@" not in email or "." not in email:
            raise ValueError("email adress is not valid")
        return email


def hash_password_sha256_bcrypt(password: str) -> str:
    sha256_hashed = hashlib.sha256(password.encode("utf-8")).hexdigest()
    bcrypt_hashed = bcrypt.hashpw(sha256_hashed.encode("utf-8"), bcrypt.gensalt())
    return bcrypt_hashed.decode("utf-8")


def verify_password_sha256_bcrypt(password: str, hashed_password: str) -> bool:
    sha256_hashed = hashlib.sha256(password.encode("utf-8")).hexdigest()
    return bcrypt.checkpw(
        sha256_hashed.encode("utf-8"), hashed_password.encode("utf-8")
    )
