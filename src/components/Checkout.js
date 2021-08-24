import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import PaymentForm from './checkout/PaymentForm';

const Checkout = () => {

    const stripePromise = loadStripe('pk_test_51Iy1ncEpPL3hqdw2aSV9bWv8eMTqi1JicT6B6BPdeMGscvCeXhRnEL2531TTHgwmqdhNPdQlx8zRIseFCQvndDcf00d6j4RJGU');
    const { state } = useLocation();

    return (
        <Elements stripe={stripePromise}>
            <h1>Checkout</h1>
            <p>Item Purchased: {state.name}</p>
            <PaymentForm item = {state.id}></PaymentForm>
            <p style={{fontStyle:"italic"}}>Payment facilitated by Stripe</p>
        </Elements>
    );
}
 
export default Checkout;