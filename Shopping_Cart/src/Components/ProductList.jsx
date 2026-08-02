import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import AddProductModal from "./AddProductModal";
import ProductDetailsModal from "./ProductDetailsModal";

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    description:
      "A popular mascara known for its volumizing and lengthening effects.",
    category: "beauty",
    price: 9.99,
    rating: 2.56,
    stock: 99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  },
  {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    description: "A versatile eyeshadow palette with a built-in mirror.",
    category: "beauty",
    price: 19.99,
    rating: 2.86,
    stock: 34,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
  },
  {
    id: 3,
    title: "Powder Canister",
    description: "A lightweight setting powder that controls shine.",
    category: "beauty",
    price: 14.99,
    rating: 4.64,
    stock: 89,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
  },
];

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
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
            ? "https://dummyjson.com/products"
            : `https://dummyjson.com/products/search?q=${encodeURIComponent(
                searchTerm,
              )}`;
        const response = await axios.get(url);
        setProducts(response?.data?.products || FALLBACK_PRODUCTS);
      } catch {
        setProducts(FALLBACK_PRODUCTS);
        setError("Could not load products. Showing fallback items.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [searchTerm]);

  function addProduct(product) {
    setProducts((currentProducts) => [product, ...currentProducts]);
  }

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") return true;
    return (product.category || "").toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">Fresh picks</span>
          <h2>Products</h2>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            + Add Product
          </button>
        </div>
      </div>

      <div className="product-toolbar">
        <input
          className="search-input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
          <option value="home-decoration">Home Decoration</option>
          <option value="kitchen-accessories">Kitchen Accessories</option>
          <option value="laptops">Laptops</option>
          <option value="mens-shirts">Men's Shirts</option>
          <option value="mens-shoes">Men's Shoes</option>
          <option value="mobile-accessories">Mobile Accessories</option>
          <option value="smartphones">Smartphones</option>
          <option value="sports-accessories">Sports Accessories</option>
          <option value="sunglasses">Sunglasses</option>
          <option value="tablets">Tablets</option>
          <option value="tops">Tops</option>
          <option value="womens-bags">Women's Bags</option>
          <option value="womens-dresses">Women's Dresses</option>
          <option value="womens-shoes">Women's Shoes</option>
        </select>
      </div>

      {loading ? (
        <p className="status-text">Loading products...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="empty-state">No products found for this category.</p>
      ) : (
        <div className="grid">
          {filteredProducts.map((product) => (
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
