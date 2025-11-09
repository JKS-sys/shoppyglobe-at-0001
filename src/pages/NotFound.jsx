import React from "react";
import { Link } from "react-router-dom";

/**
 * 404 Not Found page component
 * Displays proper error details and navigation
 */
const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <div className="error-details">
          <p>The page you are looking for doesn't exist or has been moved.</p>
          <p>Here are some helpful links instead:</p>
        </div>

        <div className="suggested-actions">
          <Link to="/" className="action-link primary">
            🏠 Go Home
          </Link>
          <Link to="/cart" className="action-link secondary">
            🛒 View Cart
          </Link>
          <button
            onClick={() => window.history.back()}
            className="action-link secondary"
          >
            ↩️ Go Back
          </button>
        </div>

        <div className="error-help">
          <h3>Need Help?</h3>
          <p>
            If you believe this is an error, please contact our support team.
          </p>
          <p>
            Error Code: <code>404_NOT_FOUND</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
