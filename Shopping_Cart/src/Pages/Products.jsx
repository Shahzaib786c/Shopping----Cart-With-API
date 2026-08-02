import ProductList from "../Components/ProductList";
import { useCart } from "../context/useCart";

function Products() {
  const { addToCart } = useCart();

  return (
    <main className="page">
      <ProductList onAddToCart={addToCart} />
    </main>
  );
}

export default Products;
