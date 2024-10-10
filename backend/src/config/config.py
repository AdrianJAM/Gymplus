import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()


class Config:
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
    AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
    FLASK_ENV = os.getenv("FLASK_ENV")
    FLASK_DEBUG = os.getenv("FLASK_DEBUG", default=0)  # 0 si no está definido
