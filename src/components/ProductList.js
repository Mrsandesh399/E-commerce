import React, { useContext, useEffect, useState, useCallback } from "react";
import { CartContext } from "../context/CartContext";
import styles from "../styles/ProductList.module.css";

const ProductList = () => {
  const { dispatch } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  // Debounced search functionality
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = (term) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), [products]);

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    alert(`${product.title} added to cart`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={onSearchChange}
        className={styles.searchBar}
      />
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <div className={styles.card} key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
            />
            <h3 className={styles.title}>{product.title}</h3>
            <p className={styles.price}>${product.price}</p>
            <button
              className={styles.button}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
