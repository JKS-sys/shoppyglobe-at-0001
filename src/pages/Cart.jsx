import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
} from "../store/cartSlice";

const CartItem = React.lazy(() => import("../components/CartItem"));

/**
 * Cart page component - displays all cart items with summary
 */
const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartItemsCount = useSelector(selectCartItemsCount);
  const shippingFee = cartTotal > 0 ? 5.99 : 0;
  const tax = cartTotal * 0.1; // 10% tax
  const finalTotal = cartTotal + shippingFee + tax;

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="cart empty-cart">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p className="cart-items-count">{cartItemsCount} items in cart</p>
      </div>

      <div className="cart-content">
        <div className="cart-items-section">
          <Suspense
            fallback={<div className="loading">Loading cart items...</div>}
          >
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Suspense>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-details">
            <div className="summary-item">
              <span>Subtotal ({cartItemsCount} items):</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-item">
              <span>Shipping:</span>
              <span>
                {shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : "Free"}
              </span>
            </div>

            <div className="summary-item">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-item total">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>

          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
