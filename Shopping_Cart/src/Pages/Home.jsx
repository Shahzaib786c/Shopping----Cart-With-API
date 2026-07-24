import ProductList from "../Components/ProductList";
import { useCart } from "../Layouts/Layout";

function Home() {
  const { addToCart } = useCart();
  return (
    <>
      <ProductList onAddToCart={addToCart} />
    </>
  );
}

export default Home;
