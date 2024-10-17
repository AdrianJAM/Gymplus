from flask import jsonify, request
from src.services.usermembership_service import UserMembershipService


class UserMembershipController:
    usermembership_service = UserMembershipService()

    @classmethod
    def buy_membership(cls, user_id, membership_id):
        usermembership = cls.usermembership_service.add_user_membership(
            user_id, membership_id
        )
        if usermembership:
            return jsonify(usermembership), 200
        else:
            return jsonify({"error": "Membership not found or purchase failed"}), 404

    @classmethod
    def get_all(cls):
        usermemberships = cls.usermembership_service.get_all_usermemberships()
        return (
            jsonify([usermembership.to_dict() for usermembership in usermemberships]),
            200,
        )

    @classmethod
    def get_user_memberships(cls, user_id: str):
        usermembership = cls.usermembership_service.get_user_memberships(user_id)
        if usermembership:
            return jsonify(usermembership), 200
        else:
            return jsonify({"error": "Membership not found"}), 404

    @classmethod
    def delete_user_membership(cls, user_membership_id):
        deleted_usermembership = cls.usermembership_service.delete_user_membership(
            user_membership_id
        )
        return jsonify(deleted_usermembership), 200 if deleted_usermembership else 404
