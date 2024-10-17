import services.auth_service


class AuthRepository:
    def __init__(self):
        self.auth_service = services.auth_service.AuthService()

    def login(self, email, password):
        return self.auth_service.login(email, password)

    def register(self, user_data):
        return self.auth_service.register(user_data)
