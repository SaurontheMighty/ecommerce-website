import ProductPage from "./products/Product";

const Home = ({addToCart}) => {

    return (
        <div>
            { /* Image from https://lukaszadam.com/illustrations */ }
            <img className="main-image" src="storefront_illustration.svg" alt="Storefront Image"></img>
            <ProductPage addToCart={addToCart}></ProductPage>
        </div>
    );
}
 
export default Home;