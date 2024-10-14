from flask import jsonify, request

from services.server_service import ServerService


class ServerController:
    server_service = ServerService()

    @classmethod
    def get_cpu_usage(cls):
        cpu_usage = cls.server_service.get_cpu_usage()
        return jsonify(cpu_usage), 200

    # @classmethod
    # def get_memory_usage(cls):
    #     memory_usage = cls.server_service.get_memory_usage()
    #     return jsonify(memory_usage), 200

    # @classmethod
    # def get_disk_usage(cls):
    #     disk_usage = cls.server_service.get_disk_usage()
    #     return jsonify(disk_usage), 200

    # @classmethod
    def health_check(cls):
        return jsonify({"status": "healthy"}), 200
