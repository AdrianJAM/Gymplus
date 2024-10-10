from models.user import User
from repositories.user_repository import UserRepository


class UserService:
    def __init__(self):
        self.user_repository = UserRepository()

    def get_by_email(self, email):
        return self.user_repository.get_by_email(email)

    def get_by_ci(self, ci):
        return self.user_repository.get_by_ci(ci)

    def get_all_users(self):
        user_data = self.user_repository.get_all_users()
        return [User(**user) for user in user_data]

    def get_user(self, user_id):
        return self.user_repository.get_user(user_id)

    def create_user(self, user_data):
        return self.user_repository.create_user(user_data)

    def update_user(self, user_id, user_data):
        return self.user_repository.update_user(user_id, user_data)

    def delete_user(self, user_id):
        return self.user_repository.delete_user(user_id)
