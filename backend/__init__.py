from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from os import path

db = SQLAlchemy()


def create_app():
    # create and configure the app
    app = Flask(__name__, static_folder="public", template_folder="public")

    app.config["SECRET_KEY"] = 'dev'
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

    db.init_app(app)

    create_database(app)

    return app


def create_database(app):
    if not path.exists('backend/database.db'):
        db.create_all(app=app)
        print("Database Created!")
