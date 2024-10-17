from flask import Blueprint
from src.controllers.membership_controller import MembershipController

membership_routes = Blueprint("membership_routes", __name__)
membership_routes.route("/membership", methods=["GET"])(MembershipController.get_all)
membership_routes.route("/membership", methods=["POST"])(MembershipController.save)
membership_routes.route("/membership/<string:membership_id>", methods=["GET"])(
    MembershipController.get_by_id
)
membership_routes.route("/membership/<string:membership_id>", methods=["DELETE"])(
    MembershipController.delete
)

membership_routes.route(
    "/membership/buy/<string:user_id>/<string:membership_id>", methods=["POST"]
)(MembershipController.buy_membership)
