from flask import Blueprint
from src.controllers.auth_controller import AuthController

auth_routes = Blueprint("auth_routes", __name__)

auth_routes.route("/auth/login", methods=["POST"])(AuthController.login)
auth_routes.route("/auth/register", methods=["POST"])(AuthController.register)
