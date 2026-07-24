import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";

function ProductDetailsModal({ productId, onClose }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOne() {
      try {
        setProduct(null);
        setError("");
        const response = await axios.get(
          `https://dummyjson.com/products/${productId}`,
        );
        setProduct(response.data);
      } catch {
        setError("Could not load product details.");
      }
    }
    fetchOne();
  }, [productId]);

  return (
    <Modal title="Product Details" onClose={onClose}>
      {error ? (
        <p className="error">{error}</p>
      ) : !product ? (
        <p className="status-text">Loading...</p>
      ) : (
        <div className="details-panel">
          <img src={product.thumbnail} alt={product.title} />
          <div className="details-copy">
            <span className="details-category">{product.category}</span>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <div className="details-meta">
              <span>Price: ${product.price}</span>
              <span>Rating: {product.rating}</span>
              <span>Stock: {product.stock}</span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ProductDetailsModal;
