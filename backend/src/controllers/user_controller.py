from flask import jsonify, request
from services.user_service import UserService


class UserController:
    user_service = UserService()

    @classmethod
    def get_by_email(cls):
        email = request.args.get("email")
        user = cls.user_service.get_by_email(email)
        return jsonify(user.to_dict()), 200 if user else 404

    @classmethod
    def get_by_ci(cls):
        ci = request.args.get("ci")
        user = cls.user_service.get_by_ci(ci)
        return jsonify(user.to_dict()), 200 if user else 404

    @classmethod
    def get_all_users(cls):
        users = cls.user_service.get_all_users()
        return jsonify([user.to_dict() for user in users]), 200

    @classmethod
    def get_user(cls, user_id):
        user = cls.user_service.get_user(user_id)
        return jsonify(user), 200 if user else 404

    @classmethod
    def create_user(cls):
        data = request.get_json()
        user = cls.user_service.create_user(data)
        if user is None:
            return jsonify({"error": "User creation failed"}), 400

        return jsonify(user), 201

    @classmethod
    def update_user(cls):
        user_id = request.args.get("user_id")
        data = request.get_json()
        updated_user = cls.user_service.update_user(user_id, data)
        return jsonify(updated_user.to_dict()), 200 if updated_user else 404

    @classmethod
    def delete_user(cls, user_id):
        deleted_user = cls.user_service.delete_user(user_id)
        return jsonify(deleted_user), 200 if deleted_user else 404

    @classmethod
    def health_check(cls):
        return jsonify({"status": "healthy"}), 200
