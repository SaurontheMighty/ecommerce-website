import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

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


const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="about-user">
                <input type="text" value={name} onChange={(e) => {setName(e.value)}} placeholder="Name" required></input>
                <input type="text" value={email} onChange={(e) => {setEmail(e.value)}} placeholder="Email" required></input>
            </div>
            <div className="card-info">
                <CardElement options={CARD_OPTIONS} />
            </div>
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
}
 
export default PaymentForm;