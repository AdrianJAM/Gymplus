class Membership:
    def __init__(self, id, type, duration, price):
        self.id = (id,)
        self.type = (type,)
        self.duration = (duration,)
        self.price = price

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "duration": self.duration,
            "price": self.price,
        }