import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#fff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#ffff" },
			"::placeholder": { color: "#ffff" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}


const PaymentForm = (productId) => {

    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    let history = useHistory();

    useEffect(() => {
        window
          .fetch("http://localhost:4242/payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({items: [{ id: productId.item }]})
          })
          .then(res => {
            return res.json();
          })
          .then(data => {
            setClientSecret(data.clientSecret);
          });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        if (error) {
            setError(true);
        } else {
            const payload = await stripe.confirmCardPayment(clientSecret, {
                receipt_email: email,
                payment_method: {
                  card: elements.getElement(CardElement)
                }
            });

            if (payload.error) {
                setError(true)
            } else {
                history.push("/thankyou");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="about-user">
                <input type="text" value={email} onChange={(e) => {setEmail(e.value)}} placeholder="Email" required></input>
            </div>
            <div className="card-info">
                <CardElement options={CARD_OPTIONS} />
            </div>
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
            {error? <div><p>Sorry, something broke! </p><br></br><p> (╯°□°）╯︵ ┻━┻ </p></div>: <p></p>}
        </form>
    );
}
 
export default PaymentForm;