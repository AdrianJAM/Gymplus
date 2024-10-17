from flask import jsonify, request
from src.services.auth_service import AuthService


class AuthController:
    auth_service = AuthService()

    @classmethod
    def login(cls):
        data = request.get_json()
        token = cls.auth_service.login(email=data["email"], password=data["password"])
        return (
            jsonify({token: token}),
            200 if token else jsonify({"error": "Invalid credentials"}),
            401,
        )

    @classmethod
    def register(cls):
        data = request.get_json()
        try:
            new_user = cls.auth_service.register(
                name=data["name"],
                email=data["email"],
                password=data["password"],
                ci=data["ci"] or None,
                phone=data["phone"] or None,
                img_url="/assets/employee1.png",
            )
            return jsonify({"message": "Succesfully"}), (
                201 if new_user else jsonify({"error": str(e)}),
                400,
            )
        except Exception as e:
            return jsonify({"error": str(e)}), 400
