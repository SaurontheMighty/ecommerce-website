import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductPage = ({addToCart}) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/products/")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setProducts(data)
        })
    }, []);

    return (
        <div className="product-array">
            {products.map((product) => (
                <div className='card' key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.rating}/5</p>
                    <p>{product.description}</p>
                    <p className="price">${product.price}</p>
                    <button onClick={() => addToCart(product.id)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
}
 
export default ProductPage;