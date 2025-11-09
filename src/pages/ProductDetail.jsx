import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

/**
 * ProductDetail component - displays detailed product information
 * Fetches product data based on route parameter
 */
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found");
          }
          throw new Error(`Failed to fetch product: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const handleBuyNow = () => {
    if (product) {
      dispatch(addToCart(product));
      navigate("/cart");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <p>{error}</p>
        <Link to="/" className="back-link">
          ← Back to Products
        </Link>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/" className="back-link">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <div className="product-detail-content">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.images?.[selectedImage] || product.thumbnail}
              alt={product.title}
              loading="lazy"
            />
            {product.discountPercentage && (
              <span className="discount-badge large">
                -{Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-brand">by {product.brand}</p>

          <div className="product-rating">
            <span className="rating-stars">
              {"⭐".repeat(Math.floor(product.rating))}
            </span>
            <span className="rating-value">{product.rating}/5</span>
            <span className="rating-count">
              ({product.reviews ? product.reviews.length : 0} reviews)
            </span>
          </div>

          <div className="product-pricing">
            <span className="current-price">${product.price}</span>
            {product.discountPercentage && (
              <span className="original-price">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            )}
          </div>

          <div className="product-stock">
            {product.stock > 0 ? (
              <span className="in-stock">
                ✅ In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="out-of-stock">❌ Out of Stock</span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-meta">
            <div className="meta-item">
              <strong>Category:</strong> {product.category}
            </div>
            <div className="meta-item">
              <strong>SKU:</strong> {product.id}
            </div>
          </div>

          {/* Customer Reviews Section - FIXED */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="product-reviews">
              <h3>Customer Reviews</h3>
              <div className="reviews-list">
                {product.reviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <div className="review-header">
                      <strong className="reviewer-name">
                        {review.reviewerName}
                      </strong>
                      <span className="review-rating">
                        ⭐ {review.rating}/5
                      </span>
                    </div>
                    <p className="review-comment">"{review.comment}"</p>
                    <div className="review-meta">
                      <span className="review-date">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                      {review.reviewerEmail && (
                        <span className="review-email">
                          {review.reviewerEmail}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="product-actions">
            <button
              className={`add-to-cart-btn large ${
                product.stock === 0 ? "disabled" : ""
              }`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            <button
              className={`buy-now-btn ${product.stock === 0 ? "disabled" : ""}`}
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
