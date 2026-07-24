function ProductCard({ product, onAddToCart, onViewDetails }) {
  const productTitle = product.title || product.name;

  return (
    <div className="card">
      {product.thumbnail ? (
        <img className="product-media" src={product.thumbnail} alt={productTitle} />
      ) : (
        <div className="product-media" aria-hidden="true">
          {productTitle.slice(0, 1)}
        </div>
      )}
      <div className="product-copy">
        <h3>{productTitle}</h3>
        <p>${product.price}</p>
      </div>
      <div className="card-actions">
        <button className="btn btn-secondary" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
        <button className="btn btn-outline" onClick={() => onViewDetails(product.id)}>
          View Details
        </button>
      </div>
    </div>
  );
}
export default ProductCard;
