import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import './App.css';

const AddProducts = () => {
    const navigate = useNavigate();
    const [prodName, setProdName] = useState('');
    const [prodType, setProdType] = useState('');
    const [prodPrice, setProdPrice] = useState('');
    const AddToProduct = async () => {
        try {
            if (!prodName && !prodType && !prodPrice) {
                console.log(`Invalid Request for ${prodName}`)
                return;
            }
            // "product_name": "Dell Laptop",
            // "price":"650",
            // "product_type":"Electronics",
            await axios.post('http://localhost:8080/api/products', {product_name: prodName, product_type: prodType,price: prodPrice})
            // return <Navigate to="/products" replace={true} />;
            navigate("/products");
        } catch(e) {
            console.log('Error------------->',e) 
        }
    }
    const AddToCart = async () => {
        try {
            if (!prodName && !prodType && !prodPrice) {
                return;
            }
            await axios.post('http://localhost:8080/api/cart', {product_name: prodName, product_type: prodType,price: prodPrice})
            navigate("/cart");
        } catch(e) {
            console.log('Error------------->',e) 
        }
    }
    return (
        <>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/cart">Cart</a></li>
                </ul>
            </nav>
            <center>
            <h2 style={{ marginTop: "20px"}}>Add Products to Cart or to Product list</h2>
            <div style={{ marginTop: "40px" , display: "inline-grid" }}>
            <label htmlFor="prod_name">Product Name:</label>
            <input type="text" id="prod_name" value={prodName} onChange={(e) => setProdName(e.target.value)} />
            <label htmlFor="prod_type">Product Type:</label>
            <input type="text" id="prod_type" value={prodType} onChange={(e) => setProdType(e.target.value)} />
            <label htmlFor="prod_price">Product Price:</label>
            <input type="text" id="prod_price" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} />
            </div>
            <br />
            <div style={{ marginTop: "30px" , display: "inline-grid"  }}>
                <button onClick={AddToProduct}> Add to Products </button>
                <button style={{ marginTop: "20px" }} onClick={AddToCart}> Add to Cart </button>
            </div>
            </center>
        </>
    )
}

export default AddProducts