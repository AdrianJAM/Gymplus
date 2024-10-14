from repositories.server_repository import ServerRepository


class ServerService:
    def __init__(self):
        self.server_repository = ServerRepository()

    def get_cpu_usage(self):
        return self.server_repository.get_cpu_usage()
