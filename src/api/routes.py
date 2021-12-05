"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity
import bcrypt


api = Blueprint('api', __name__)


@api.route("/create-user", methods=["POST"])
def create_user():
    name = request.json.get("name")
    email =request.json.get("email")
    password = request.json.get("password").encode('utf8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
    decoded_password = hashed_password.decode('utf8')
    user = User(name=name, email=email, password=decoded_password)

    User.save(user)

    return jsonify(user.id), 200

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None).encode('utf8')
    
    user= User.get_user_by_email(email)

    if user is None or email != user.email or email is None or not bcrypt.checkpw(password, user.password.encode('utf8')):
        return jsonify({"msg": "Bad username or password"}), 401
        
    access_token = create_access_token(identity=user.id)
    return jsonify({"user_id": user.id, "name": user.name, "token": access_token}), 200