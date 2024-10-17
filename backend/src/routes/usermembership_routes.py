from flask import Blueprint
from src.controllers.usermembership_controller import UserMembershipController

usermembership_routes = Blueprint("usermembership_routes", __name__)

usermembership_routes.route(
    "/membership/buy/<string:user_id>/<string:membership_id>", methods=["POST"]
)(UserMembershipController.buy_membership)


usermembership_routes.route("/user/<string:user_id>/memberships", methods=["GET"])(
    UserMembershipController.get_user_memberships
)

usermembership_routes.route("/users/memberships/", methods=["GET"])(
    UserMembershipController.get_all
)

usermembership_routes.route(
    "/membership/<string:user_membership_id>", methods=["DELETE"]
)(UserMembershipController.delete_user_membership)
