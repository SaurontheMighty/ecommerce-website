import { NavLink } from "react-router-dom";

const Header = ({cart}) => {

    return (
        <nav>
            <NavLink to="/"><h1>Ashish's Software Store</h1></NavLink>
            <NavLink to={{
                pathname: '/checkout',
                state: { 
                    cart: cart
                }
                }}>
                <div className={cart.length >= 1? "checkout-button-updated":"checkout-button"}>
                    <img src="shopping_cart.svg"></img>
                    <p className="checkout-text">({cart.length})</p>
                </div>
            </NavLink> {/* Material Design Icon */}
        </nav>
    );
}
export default Header;