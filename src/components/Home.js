import ProductPage from "./products/Product";

const Home = () => {

    return (
        <div>
            { /* Image from https://lukaszadam.com/illustrations */ }
            <img className="main-image" src="storefront_illustration.svg" alt="Storefront Image"></img>
            <ProductPage></ProductPage>
        </div>
    );
}
 
export default Home;