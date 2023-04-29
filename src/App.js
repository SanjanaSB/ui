import './App.css';

const App = () => {
  return (
    <>

  <body>
      <header>
          <h1>Welcome to our Computer Shop</h1>
      </header>
      <nav>
          <ul>
              <li><a href="/products">Products</a></li>
              <li><a href="/cart">Cart</a></li>
          </ul>
      </nav>
      <section id="hero-section">
          <h2>Explore Our Wide Range of Products</h2>
          <p>Shop for laptops, desktops, monitors, and computer accessories.</p>
          <a href="/addProducts" type="btn">Browse and Add Products</a>
      </section>
      <footer>
          <p>&copy; 2023 Computer Shop. All rights reserved.</p>
      </footer>
  </body>
    </>
  )
}

export default App;
