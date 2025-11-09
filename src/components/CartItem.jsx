import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/cartSlice";

/**
 * CartItem component displays individual cart item with quantity controls
 */
const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.thumbnail} alt={item.title} loading="lazy" />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-brand">{item.brand}</p>
        <p className="cart-item-price">${item.price} each</p>
      </div>

      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="quantity-btn"
          >
            −
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="quantity-btn"
          >
            +
          </button>
        </div>

        <div className="cart-item-total">${itemTotal.toFixed(2)}</div>

        <button
          className="remove-btn"
          onClick={handleRemove}
          aria-label={`Remove ${item.title} from cart`}
        >
          🗑️ Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
