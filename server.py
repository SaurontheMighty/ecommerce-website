from backend import create_app, db
from backend.models import Product
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
import stripe
import json

stripe.api_key = "sk_test_51Iy1ncEpPL3hqdw2V541avnfAfbPEM63aBYM1YRSmeVuGeRFd8gkdIsdv3Jr6FzWLlFzxH5qZf3ZGgOrlOddL9Wx00SfHEABNG"
app = create_app()
api = Api(app)
cors = CORS(app)

product_args = reqparse.RequestParser()
product_args.add_argument(
    "name", type=str, help="Please supply a Name", required=True)
product_args.add_argument(
    "description", type=str, help="Please supply a Description", required=True)
product_args.add_argument(
    "rating", type=int, help="Please supply a Rating", required=True)
product_args.add_argument(
    "price", type=int, help="Please supply a Price", required=True)


product_resource_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'rating': fields.Integer,
    'price': fields.Integer
}


def calculate_order_amount(items):
    sum = 0
    print(items)
    for item in items:
        sum += Product.query.get(item).price

    print(sum)
    return sum


@ app.route('/payment', methods=['POST'])
@ cross_origin()
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
    @ marshal_with(product_resource_fields)
    def get(self):

        result = Product.query.all()
        return result, 200

    @ marshal_with(product_resource_fields)
    def post(self):
        args = product_args.parse_args()
        print(args)
        product = Product(
            name=args['name'], description=args['description'], rating=args['rating'], price=args['price'])
        db.session.add(product)
        db.session.commit()
        return product, 201


api.add_resource(Products, '/api/products/')


if __name__ == '__main__':
    app.run()
