import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { Link, useLocation } from 'react-router-dom';
import PaymentForm from './checkout/PaymentForm';

const Checkout = () => {

    const stripePromise = loadStripe('pk_test_51Iy1ncEpPL3hqdw2aSV9bWv8eMTqi1JicT6B6BPdeMGscvCeXhRnEL2531TTHgwmqdhNPdQlx8zRIseFCQvndDcf00d6j4RJGU');
    const { state } = useLocation();

    return (
        <Elements stripe={stripePromise}>
            {state? 
            <div>
                <br></br>
                <h1>Checkout</h1>
                <p>Item Purchased: {state? state.name: "No items"}</p>
                <PaymentForm item = {state? state.id: "None"}></PaymentForm>
                <p style={{fontStyle:"italic"}}>Payment facilitated by Stripe</p>
            </div>
            :
            <div>
                <h1>Checkout</h1>
                <p>No Items in Cart</p>
                <Link style={{
                    cursor:"pointer",
                    color:"Black",
                    textDecoration:"underline"
                }} to='/'>Go Home</Link>
            </div>
            }
        </Elements>
    );
}
 
export default Checkout;