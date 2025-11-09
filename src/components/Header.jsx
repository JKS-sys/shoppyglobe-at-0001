import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, selectCartItemsCount } from "../store/cartSlice";

const Header = () => {
  const cartItemsCount = useSelector(selectCartItemsCount);
  const searchTerm = useSelector((state) => state.cart.searchTerm);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          <h1>🌐 ShoppyGlobe</h1>
        </Link>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/cart" className="cart-link">
            🛒 Cart ({cartItemsCount})
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
