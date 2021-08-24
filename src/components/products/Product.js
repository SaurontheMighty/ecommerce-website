import { Link } from "react-router-dom";

const ProductPage = () => {

    const products = [
        {
            id: 256543,
            name: "Introspekt App",
            description: "A new way to journal.",
            price: 100,
            rating: 5
        },
        {
            id: 255678,
            name: "DuctivityPro Extension",
            description: "Escape the blackholes of the internet.",
            price: 25,
            rating: 4.7
        },
        {
            id: 567843,
            name: "Adventures of Fireball",
            description: "Not an infinite runner.",
            price: 25,
            rating: 4.9
        }
    ]

    return (
        <div className="product-array">
            {products.map((product) => (
                <div className='card'>
                    <h3>{product.name}</h3>
                    <p className="price">{product.price}</p>
                    <p>{product.description}</p>
                    <p>{product.rating}/5</p>
                    <Link to={{
                        pathname: '/checkout',
                        state: { 
                            id: product.id ,
                            name: product.name
                        }
                        }}><button>Buy Now</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default ProductPage;