import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { useProducts } from "../hooks/useProducts";

const ProductItem = React.lazy(() => import("./ProductItem"));

/**
 * ProductList component displays all products with search functionality
 * Uses lazy loading for ProductItem components
 */
const ProductList = () => {
  const { products, loading, error } = useProducts();
  const searchTerm = useSelector((state) => state.cart.searchTerm);

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Products</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2>Our Products</h2>
        <p className="product-count">
          Showing {filteredProducts.length} of {products.length} products
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      <div className="products-grid">
        <Suspense fallback={<div className="loading">Loading products...</div>}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          ) : (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your search terms</p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default ProductList;
