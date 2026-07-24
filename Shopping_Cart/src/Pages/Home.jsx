import { useOutletContext } from "react-router";
import ProductList from "../components/ProductList";

function Home() {
  const { addToCart } = useOutletContext();

  return <ProductList onAddToCart={addToCart} />;
}

export default Home;
