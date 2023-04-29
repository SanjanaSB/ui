import React, { useEffect, useState } from "react";
import axios from "axios";
import './Products.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    //The cart details are fetched through the GET Service Call
    const fetchCartData = async () => {
        try {
            let response = await axios.get('http://localhost:8080/api/cart')
            console.log('Success response---------->', response)
            let { data } = response
            setCart(data)
            // populateTodos();
        } catch(e) {
            console.log('Error------------->',e) 
        }
    }

    const renderCartCount = async () => {
        try {
            let { data } = await axios.get('http://localhost:8080/numCart')
            console.log(data)
            if(data) setCartCount(data[0].count)
        } catch(e) {
            console.log("There was an exception", e);
        }
    }

    const deleteCartProducts = async (e) => {
        console.log(e.target.getAttribute("data-value"));
        if (e.target.getAttribute("data-value")) {
          // Perform delete service call
          let productId = e.target.getAttribute("data-value");
          try {
            await axios.delete(`http://localhost:8080/api/cart/${productId}`);
            //Re-render the component
            fetchCartData();
          } catch (e) {
            console.log("There was an exception", e);
          }
        }
      };

    useEffect(() => {
        fetchCartData();
        renderCartCount();
    }, []);

    const renderProducts = () => {
        if (cart && cart.length > 0) {
            return (
                <>
                <h2>There are {cartCount} number of items in the Cart</h2>
                <table>
                    <tr>
                    <th>S.no</th>
                    <th>Product name</th>
                    <th>Price</th>
                    <th>Remove Product</th>
                    </tr>
                    {cart.map((data, index) => (
                    <>
                        <tr key={index}>
                        <td>{index}</td>
                        <td>{data.product_name}</td>
                        <td>{data.price}</td>
                        <td>
                            <button
                            onClick={(e) => deleteCartProducts(e)}
                            data-value={data.product_id}
                            >
                            Delete
                            </button>
                        </td>
                        </tr>
              </>
            ))}
          </table>
                </>
            )
        } else {
            return (
                <>
                <div style={{ marginTop: "20px" }}>
                  <strong>No Products present...</strong>
                </div>
              </>
            )
        }
    }

    return (
        <>
        <header>
        <h1>Cart</h1>
    </header>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/AddProducts">Add Cart Items</a></li>
        </ul>
    </nav>
    {renderProducts()}
    <section id="product-list-section">
        {/* <div class="product-card">
            <img src="laptop.jpg" alt="Laptop" />
            <h3>Laptop</h3>
            <p class="product-price">$999</p>
            <a href="product-details.html?id=1" class="btn">View Details</a>
        </div> */}

    </section>
    <footer>
        <p>&copy; 2023 Computer Shop. All rights reserved.</p>
    </footer>
        </>
    )
}

export default Cart;