import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import styles from "../styles/Cart.module.css";

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.cart}>
      <h2 className={styles.title}>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <span>{item.title}</span>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
              />
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
