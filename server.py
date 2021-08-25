from backend import create_app, db
from backend.models import Product
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
import stripe
import json

stripe.api_key = "sk_test_51Iy1ncEpPL3hqdw2V541avnfAfbPEM63aBYM1YRSmeVuGeRFd8gkdIsdv3Jr6FzWLlFzxH5qZf3ZGgOrlOddL9Wx00SfHEABNG"
app = create_app()
api = Api(app)
cors = CORS(app)

product_put_args = reqparse.RequestParser()
product_put_args.add_argument(
    "name", type=str, help="Please supply a Name", required=True)
product_put_args.add_argument(
    "rating", type=int, help="Please supply a Rating", required=True)
product_put_args.add_argument(
    "price", type=int, help="Please supply a Price", required=True)


product_resource_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'rating': fields.Integer,
    'price': fields.Integer
}


def calculate_order_amount(items):
    print(items)
    return 100


@app.route('/payment', methods=['POST'])
@cross_origin()
def create_payment():
    try:
        data = json.loads(request.data)
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['items']),
            currency='usd'
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403


class Products(Resource):
    @marshal_with(product_resource_fields)
    def get(self):

        result = Product.query.all()
        print(result)
        return result, 200

    # @marshal_with(product_resource_fields)
    # def post(self, id):
    #     args = product_put_args.parse_args()
    #     product = Product(
    #         id=id, name=args['name'], description=args['description'], rating=args['rating'], price=args['price'])
    #     db.session.add(product)
    #     return product, 201


api.add_resource(Products, '/api/products/')


if __name__ == '__main__':
    app.run()
