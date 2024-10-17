from src.repositories.usermembership_repository import UserMembershipRepository
from src.repositories.membership_repository import MembershipRepository


class UserMembershipService:
    def __init__(self):
        self.membership_repository = MembershipRepository()
        self.user_membership_repository = UserMembershipRepository()

    def add_user_membership(self, user_id: str, membership_id: str):
        membership = self.membership_repository.get_by_id(membership_id)
        if membership:
            duration = membership["duration"]
            success = self.user_membership_repository.add_user_membership(
                user_id, membership_id, duration
            )
            if success:
                return membership
        return None

    def get_user_memberships(self, user_id: str):
        return self.user_membership_repository.get_user_memberships(user_id)

    def get_all_usermemberships(self):
        return self.user_membership_repository.get_all_usermemberships()

    def delete_user_membership(self, user_membership_id: str):
        return self.user_membership_repository.delete_user_membership(
            user_membership_id
        )
