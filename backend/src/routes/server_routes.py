from flask import Blueprint

from src.controllers.server_controller import ServerController

server_routes = Blueprint("server_routes", __name__)

server_routes.route("/server/cpu", methods=["GET"])(ServerController.get_cpu_usage)
server_routes.route("/server/health", methods=["GET"])(ServerController.health_check)
