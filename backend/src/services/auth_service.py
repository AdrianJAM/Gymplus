import jwt
import bcrypt
from datetime import datetime, timedelta
from src.repositories.user_repository import UserRepository
from src.models.user import hash_password_sha256_bcrypt, verify_password_sha256_bcrypt

import os

SECRET_KEY = os.getenv("SECRET")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1 * 60 * 24 * 7 * 4  # 4 weeks
current_time = datetime.utcnow()


class UserAlreadyExists(Exception):
    pass


class AuthService:
    @staticmethod
    def login(email: str, password: str) -> str:
        user = UserRepository().get_by_email(email)
        if user:
            print("user exists", user[0])
            user = user[0]
            if verify_password_sha256_bcrypt(password, user["password"]):
                return AuthService.generate_jwt_token(user)
        return None

    @staticmethod
    def register(
        name: str, email: str, password: str, ci: str, phone: str, img_url: str
    ) -> str:
        user = UserRepository().get_by_email(email)
        if user:
            raise UserAlreadyExists("email already in use")
        user_data = {
            "name": name,
            "email": email,
            "password": hash_password_sha256_bcrypt(password),
            "ci": ci,
            "phone": phone,
            "img_url": img_url,
        }
        return UserRepository().create_user(user_data)

    @staticmethod
    def verify_password(password: str, hashed_password: str) -> bool:
        return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))

    @staticmethod
    def generate_jwt_token(user) -> str:
        payload = {
            "sub": user["email"],
            "iat": datetime.utcnow(),
            "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        return token
