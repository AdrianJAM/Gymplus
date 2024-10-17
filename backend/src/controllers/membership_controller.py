"""
This module contains the controller for the membership model.
"""

from flask import jsonify, request
from src.services.membership_service import MembershipService


class MembershipController:
    membership_service = MembershipService()

    @classmethod
    def buy_membership(cls, user_id, membership_id):
        """
        Handles the purchase of a membership for a user.

        :param user_id: ID of the user buying the membership.
        :param membership_id: ID of the membership being purchased.
        :return: JSON response indicating the result of the purchase.
        """
        membership = cls.membership_service.buy_membership(user_id, membership_id)
        if membership:
            return jsonify(membership), 200
        else:
            return jsonify({"error": "Membership not found or purchase failed"}), 404

    @classmethod
    def get_all(cls):
        """
        Retrieves all memberships.

        :return: JSON response containing a list of all memberships.
        """
        memberships = cls.membership_service.get_all_memberships()
        return jsonify([membership.to_dict() for membership in memberships]), 200

    @classmethod
    def save(cls):
        """
        Creates a new membership.

        :return: JSON response indicating the result of the creation.
        """
        data = request.get_json()
        membership = cls.membership_service.save(data)
        if membership is None:
            return jsonify({"error": "Membership creation failed"}), 400

        return jsonify(membership.to_dict()), 201  # Convierte el objeto a dict

    @classmethod
    def get_by_id(cls, membership_id):
        """
        Retrieves a membership by its ID.

        :param membership_id: ID of the membership to retrieve.
        :return: JSON response containing the membership.
        """
        membership = cls.membership_service.get_by_id(membership_id)
        if membership:
            return jsonify(membership.to_dict()), 200
        else:
            return jsonify({"error": "Membership not found"}), 404

    @classmethod
    def delete(cls, membership_id):
        """
        Deletes a membership by its ID.

        :param membership_id: ID of the membership to delete.
        :return: JSON response indicating the result of the deletion.
        """
        deleted_membership = cls.membership_service.delete(membership_id)
        if deleted_membership:
            return jsonify({"message": "Membership deleted successfully"}), 200
        else:
            return jsonify({"error": "Membership not found"}), 404
