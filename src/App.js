import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import styles from "./App.css";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <header className={styles.navbar}>
          <h1 className={styles.title}>E-Commerce App</h1>
          <nav>
            <ul className={styles.navLinks}>
              <li>
                <Link to="/" className={styles.link}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className={styles.link}>
                  Cart
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
};

export default App;
