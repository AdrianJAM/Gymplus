from flask import Blueprint
from src.controllers.user_controller import UserController

user_routes = Blueprint("user_routes", __name__)

user_routes.route("/user/<string:user_id>", methods=["GET"])(UserController.get_user)
user_routes.route("/user", methods=["POST"])(UserController.create_user)
user_routes.route("/user/<string:user_id>", methods=["PUT"])(UserController.update_user)
user_routes.route("/user/<string:user_id>", methods=["DELETE"])(
    UserController.delete_user
)
user_routes.route("/health", methods=["GET"])(UserController.health_check)
user_routes.route("/users", methods=["GET"])(UserController.get_all_users)
user_routes.route("/user/email/<string:email>", methods=["GET"])(
    UserController.get_by_email
)
user_routes.route("/user/ci/<string:ci>", methods=["GET"])(UserController.get_by_ci)
