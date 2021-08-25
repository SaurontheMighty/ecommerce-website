import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <nav>
            <NavLink to="/"><h1>Ashish's Software Store</h1></NavLink>
            <NavLink to="/checkout"><img src="shopping_cart.svg"></img></NavLink> {/* Material Design Icon */}
        </nav>
    );
}
 
export default Header;