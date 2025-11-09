import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cartSlice";

/**
 * ProductItem component displays individual product card
 * Includes add to cart functionality
 */
const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <div className="product-item">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.thumbnail} alt={product.title} loading="lazy" />
          {product.discountPercentage && (
            <span className="discount-badge">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-brand">{product.brand}</p>
          <p className="product-description">
            {product.description.length > 80
              ? `${product.description.substring(0, 80)}...`
              : product.description}
          </p>
          <div className="product-meta">
            <p className="product-price">${product.price}</p>
            <p className="product-category">{product.category}</p>
          </div>
          <div className="product-rating">
            ⭐ {product.rating}
            <span className="rating-count">({product.reviewCount || 0})</span>
          </div>
          <div className="product-stock">
            {product.stock > 0 ? (
              <span className="in-stock">{product.stock} in stock</span>
            ) : (
              <span className="out-of-stock">Out of stock</span>
            )}
          </div>
        </div>
      </Link>
      <button
        className={`add-to-cart-btn ${product.stock === 0 ? "disabled" : ""}`}
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductItem;
