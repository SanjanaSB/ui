import React, { useEffect, useState } from "react";
import axios from "axios";
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [productNum, setProductNum] = useState(0);

    //The products are fetched through the GET Service Call
    const fetchProducts = async () => {
        try {
            let response = await axios.get('http://localhost:8080/api/products')
            console.log('Success response---------->', response)
            let { data } = response
            setProducts(data)
            // populateTodos();
        } catch(e) {
            console.log('Error------------->',e) 
        }
    }

    const renderProductNum = async () => {
        try {
            let { data } = await axios.get('http://localhost:8080/numProducts')
            console.log(data)
            if(data) setProductNum(data[0].count)
        } catch(e) {
            console.log("There was an exception", e);
        }
    }

    const deleteProducts = async (e) => {
        console.log(e.target.getAttribute("data-value"));
        if (e.target.getAttribute("data-value")) {
          // Perform delete service call
          let productId = e.target.getAttribute("data-value");
          try {
            await axios.delete(`http://localhost:8080/api/products/${productId}`);
            //Re-render the component
            fetchProducts();
          } catch (e) {
            console.log("There was an exception", e);
          }
        }
      };

    useEffect(() => {
        fetchProducts();
        renderProductNum();
    }, []);

    const renderProducts = () => {
        if (products && products.length > 0) {
            return (
                <>
                <h2>There are {productNum} number of Products</h2>
                <table>
                    <tr>
                    <th>S.no</th>
                    <th>Product name</th>
                    <th>Price</th>
                    <th>Remove Product</th>
                    </tr>
                    {products.map((data, index) => (
                    <>
                        <tr key={index}>
                        <td>{index}</td>
                        <td>{data.product_name}</td>
                        <td>{data.price}</td>
                        <td>
                            <button
                            onClick={(e) => deleteProducts(e)}
                            data-value={data._id}
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
        <h1>Products</h1>
    </header>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/AddProducts">Add Products</a></li>
            <li><a href="/cart">Cart</a></li>
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

export default Products;