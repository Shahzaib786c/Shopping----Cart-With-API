import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import AddProductModal from "./AddProductModal";
import ProductDetailsModal from "./ProductDetailsModal";

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");
        const url =
          searchTerm === ""
            ? "https://dummyjson.com/products?limit=10"
            : `https://dummyjson.com/products/search?q=${encodeURIComponent(
                searchTerm,
              )}`;
        const response = await axios.get(url);
        setProducts(response.data.products);
      } catch {
        setError("Could not load products.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [searchTerm]);

  function addProduct(product) {
    setProducts([product, ...products]);
  }

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">Fresh picks</span>
          <h2>Products</h2>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          + Add Product
        </button>
      </div>

      <div className="product-toolbar">
        <input
          className="search-input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="status-text">Loading products...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : products.length === 0 ? (
        <p className="empty-state">No products found.</p>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={setSelectedProductId}
            />
          ))}
        </div>
      )}

      {showAdd && (
        <AddProductModal
          onAddProduct={addProduct}
          onClose={() => setShowAdd(false)}
        />
      )}
      {selectedProductId && (
        <ProductDetailsModal
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </main>
  );
}
export default ProductList;
