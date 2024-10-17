from flask import Flask, jsonify
from flask_cors import CORS
from src.routes.server_routes import server_routes
from src.routes.user_routes import user_routes
from src.routes.auth_routes import auth_routes
from src.routes.membership_routes import membership_routes
from src.routes.usermembership_routes import usermembership_routes

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})
app.register_blueprint(user_routes)
app.register_blueprint(server_routes)
app.register_blueprint(auth_routes)
app.register_blueprint(membership_routes)
app.register_blueprint(usermembership_routes)


@app.errorhandler(400)
def bad_request(e):
    return jsonify({"error": "Bad request", "message": str(e)}), 400


if __name__ == "__main__":
    app.run()
