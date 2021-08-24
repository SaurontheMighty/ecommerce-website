import json
import os
from flask import Flask, jsonify, request
import stripe
from flask_cors import CORS, cross_origin

stripe.api_key = "sk_test_51Iy1ncEpPL3hqdw2V541avnfAfbPEM63aBYM1YRSmeVuGeRFd8gkdIsdv3Jr6FzWLlFzxH5qZf3ZGgOrlOddL9Wx00SfHEABNG"
app = Flask(__name__, static_folder="public", template_folder="public")

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


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


if __name__ == '__main__':
    app.run()
