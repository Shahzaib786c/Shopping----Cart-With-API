import { Outlet, useOutletContext } from "react-router";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import CartModal from "../Components/CartModal";

function Layout() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  function addToCart(product) {
    const found = cart.find((item) => item.id === product.id);
    if (found) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  }

  function changeQty(id, delta) {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  let cartCount = 0;
  cart.forEach((item) => {
    cartCount += item.qty;
  });

  return (
    <div className="app-shell">
      <Navbar cartCount={cartCount} onCartClick={() => setShowCart(true)} />
      <Outlet context={{ addToCart }} />
      {showCart && (
        <CartModal
          cart={cart}
          onChangeQty={changeQty}
          onRemove={removeFromCart}
          onClose={() => setShowCart(false)}
        />
      )}
    </div>
  );
}

export function useCart() {
  return useOutletContext();
}

export default Layout;
