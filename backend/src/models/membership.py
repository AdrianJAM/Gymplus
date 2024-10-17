"""
Este módulo contiene la definición de la clase Membership, que representa
una membresía de gimnasio con atributos como tipo, duración, precio,
y fechas de emisión y expiración.
"""

from datetime import datetime, timedelta
from decimal import Decimal


class Membership:
    """
    Clase que representa una membresía de gimnasio.

    Atributos:
    - id: ID único de la membresía.
    - type: Tipo de membresía (por ejemplo, estándar, premium).
    - duration: Duración en días de la membresía.
    - price: Precio de la membresía.
    - description: Descripción opcional de la membresía.
    - cat: Fecha de creacoin de la membresía (por defecto, el momento actual).
    """

    def __init__(self, **kwargs):
        self.id = kwargs.get("id", "")
        self.type = kwargs.get("type", "")
        self.duration = int(kwargs.get("duration", 0))
        self.price = Decimal(kwargs.get("price", 0.0))
        self.description = kwargs.get("description", "No description provided")
        self.cat = datetime.utcnow()

    def to_dict(self):
        """
        Convierte los datos de la membresía a un diccionario.

        Retorna:
            dict: Representación en forma de diccionario de la membresía.
        """
        return {
            "id": self.id,
            "type": self.type,
            "duration": self.duration,
            "price": Decimal(self.price),
            "description": self.description,
            "cat": self.cat.isoformat(),
        }

    def __str__(self):
        """
        Retorna una representación legible de la membresía.

        Retorna:
            str: Representación en forma de cadena de la membresía.
        """
        return (
            f"Membership({self.id}, {self.type}, {self.duration} días, "
            f"{Decimal(self.price)} $)"
        )
