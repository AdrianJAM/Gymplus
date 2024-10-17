"""
Servicio para gestionar memberias del gimnasio en la base de datos dynnamodb
"""

from typing import List, Union
from src.models.membership import Membership
from src.repositories.membership_repository import MembershipRepository


class MembershipService:
    """Clase que representa un servicio para gestionar membresías de gimnasio."""

    def __init__(self):
        """Inicializa el servicio de usuario con un repositorio de membresías."""
        self.membership_repository = MembershipRepository()

    def get_all_memberships(self) -> List[Membership]:
        """Obtiene todas las membresías.

        Retorna:
            list: Una lista de objetos Membership.
        """
        membership_data = self.membership_repository.get_all()
        return [Membership(**membership) for membership in membership_data]

    def save(self, membership: Membership) -> Membership:
        """Guarda una nueva membresía.

        Args:
            membership (Membership): La membresía a guardar.

        Retorna:
            Membership: La membresía guardada.
        """
        return self.membership_repository.save(membership)

    def get_by_id(self, membership_id: str) -> Union[Membership, None]:
        """Obtiene una membresía por su ID.

        Args:
            membership_id (str): El ID de la membresía.

        Retorna:
            Membership: La membresía correspondiente al ID.
        """
        return self.membership_repository.get_by_id(membership_id)

    def update_price(self, membership_id: str, price: int) -> Union[Membership, None]:
        """Actualiza el precio de una membresía.

        Args:
            membership_id (str): El ID de la membresía.
            price (float): El nuevo precio de la membresía.

        Retorna:
            bool: True si la actualización fue exitosa, False en caso contrario.
        """
        return self.membership_repository.update_price(membership_id, price)

    def delete(self, membership_id: str) -> bool:
        """Elimina una membresía por su ID.

        Args:
            membership_id (str): El ID de la membresía a eliminar.

        Retorna:
            bool: True si la eliminación fue exitosa, False en caso contrario.
        """
        return self.membership_repository.delete(membership_id)
