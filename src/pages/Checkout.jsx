import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../store/cartSlice";

const Checkout = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Shipping Address
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Payment Information
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate order totals
  const shippingFee = cartTotal > 0 ? 5.99 : 0;
  const tax = cartTotal * 0.1; // 10% tax
  const finalTotal = cartTotal + shippingFee + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const missing = [];

    // Personal Information Validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      missing.push("First Name");
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      missing.push("Last Name");
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      missing.push("Email Address");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      missing.push("Phone Number");
    }

    // Shipping Address Validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      missing.push("Street Address");
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      missing.push("City");
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
      missing.push("State");
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
      missing.push("ZIP Code");
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
      missing.push("Country");
    }

    // Payment Information Validation
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
      missing.push("Card Number");
    } else if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
      missing.push("Expiry Date");
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
      missing.push("CVV");
    } else if (formData.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    if (!formData.nameOnCard.trim()) {
      newErrors.nameOnCard = "Name on card is required";
      missing.push("Name on Card");
    }

    setErrors(newErrors);
    setMissingFields(missing);

    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Show popup with missing fields
      setShowValidationPopup(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Set order placed success state
      setOrderPlaced(true);

      // Clear the cart
      dispatch(clearCart());

      // Redirect to home page after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Order placement error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowValidationPopup(false);
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .substring(0, 5);
  };

  // Order placed success state
  if (orderPlaced) {
    return (
      <div className="checkout order-placed">
        <div className="order-placed-content">
          <div className="success-icon">✅</div>
          <h2>Order Placed Successfully! 🎉</h2>
          <p>
            Thank you for your order, <strong>{formData.firstName}</strong>!
          </p>
          <p>
            Your order number is{" "}
            <strong>#SG{Date.now().toString().slice(-6)}</strong>
          </p>
          <p>
            A confirmation email has been sent to{" "}
            <strong>{formData.email}</strong>
          </p>
          <p className="redirect-message">
            You will be redirected to the home page in 3 seconds...
          </p>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="checkout empty-cart">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Please add some products to your cart before checkout.</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      {/* Validation Popup */}
      {showValidationPopup && (
        <div className="popup-overlay">
          <div className="validation-popup">
            <div className="popup-header">
              <h3>⚠️ Form Incomplete</h3>
              <button className="close-popup" onClick={closePopup}>
                ×
              </button>
            </div>
            <div className="popup-content">
              <p>Please fill in the following required fields:</p>
              <ul className="missing-fields-list">
                {missingFields.map((field, index) => (
                  <li key={index}>• {field}</li>
                ))}
              </ul>
              <p className="popup-note">
                All fields marked with * are required to complete your order.
              </p>
            </div>
            <div className="popup-actions">
              <button className="popup-ok-btn" onClick={closePopup}>
                OK, I'll fix them
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <span className="step active">Cart</span>
          <span className="step active">Information</span>
          <span className="step active">Payment</span>
          <span className="step">Review</span>
        </div>
      </div>

      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          {/* Personal Information */}
          <section className="form-section">
            <h3>👤 Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? "error" : ""}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <span className="error-text">{errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? "error" : ""}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <span className="error-text">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "error" : ""}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? "error" : ""}
                  placeholder="(123) 456-7890"
                />
                {errors.phone && (
                  <span className="error-text">{errors.phone}</span>
                )}
              </div>
            </div>
          </section>

          {/* Shipping Address */}
          <section className="form-section">
            <h3>🏠 Shipping Address</h3>
            <div className="form-group">
              <label htmlFor="address">Street Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? "error" : ""}
                placeholder="123 Main Street"
              />
              {errors.address && (
                <span className="error-text">{errors.address}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="apartment">
                Apartment, Suite, etc. (Optional)
              </label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                placeholder="Apt 4B"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? "error" : ""}
                  placeholder="New York"
                />
                {errors.city && (
                  <span className="error-text">{errors.city}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={errors.state ? "error" : ""}
                  placeholder="NY"
                />
                {errors.state && (
                  <span className="error-text">{errors.state}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={errors.zipCode ? "error" : ""}
                  placeholder="10001"
                />
                {errors.zipCode && (
                  <span className="error-text">{errors.zipCode}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={errors.country ? "error" : ""}
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="IN">India</option>
                </select>
                {errors.country && (
                  <span className="error-text">{errors.country}</span>
                )}
              </div>
            </div>
          </section>

          {/* Payment Information */}
          <section className="form-section">
            <h3>💳 Payment Information</h3>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number *</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value);
                  setFormData((prev) => ({ ...prev, cardNumber: formatted }));
                }}
                className={errors.cardNumber ? "error" : ""}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
              {errors.cardNumber && (
                <span className="error-text">{errors.cardNumber}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date *</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={(e) => {
                    const formatted = formatExpiryDate(e.target.value);
                    setFormData((prev) => ({ ...prev, expiryDate: formatted }));
                  }}
                  className={errors.expiryDate ? "error" : ""}
                  placeholder="MM/YY"
                  maxLength="5"
                />
                {errors.expiryDate && (
                  <span className="error-text">{errors.expiryDate}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="cvv">CVV *</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className={errors.cvv ? "error" : ""}
                  placeholder="123"
                  maxLength="3"
                />
                {errors.cvv && <span className="error-text">{errors.cvv}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="nameOnCard">Name on Card *</label>
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleInputChange}
                className={errors.nameOnCard ? "error" : ""}
                placeholder="John Doe"
              />
              {errors.nameOnCard && (
                <span className="error-text">{errors.nameOnCard}</span>
              )}
            </div>

            <div className="payment-security">
              <div className="security-badge">
                🔒 Your payment information is secure and encrypted
              </div>
              <div className="accepted-cards">
                <span>Accepted Cards:</span>
                <div className="card-icons">
                  <span>💳</span>
                  <span>👛</span>
                  <span>🪙</span>
                </div>
              </div>
            </div>
          </section>

          <button
            type="submit"
            className="place-order-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="loading-spinner-small"></div>
                Processing...
              </>
            ) : (
              `Place Order - $${finalTotal.toFixed(2)}`
            )}
          </button>

          <div className="checkout-footer">
            <Link to="/cart" className="back-to-cart">
              ← Back to Cart
            </Link>
            <p className="secure-checkout-note">
              🔒 Secure checkout powered by ShoppyGlobe
            </p>
          </div>
        </form>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img src={item.thumbnail} alt={item.title} loading="lazy" />
                  <span className="item-quantity">{item.quantity}</span>
                </div>
                <div className="item-details">
                  <span className="item-name">{item.title}</span>
                  <span className="item-brand">{item.brand}</span>
                </div>
                <span className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>
                Subtotal (
                {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
                items):
              </span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>
                {shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : "Free"}
              </span>
            </div>
            <div className="total-row">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="total-row final-total">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="order-guarantee">
            <div className="guarantee-item">
              <span>🚚</span>
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="guarantee-item">
              <span>↩️</span>
              <span>30-day return policy</span>
            </div>
            <div className="guarantee-item">
              <span>🔒</span>
              <span>Secure payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
