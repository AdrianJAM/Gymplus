from flask import Blueprint, Flask, jsonify
from routes.user_routes import user_routes
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})
app.register_blueprint(user_routes)


if __name__ == "__main__":
    app.run(debug=True)
