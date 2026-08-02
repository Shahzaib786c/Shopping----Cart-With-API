import { Link, Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import CartModal from "../Components/CartModal";
import { useCart } from "../context/useCart";

function Layout() {
  const { cart, cartCount, changeQty, removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="app-shell">
      <Navbar cartCount={cartCount} onCartClick={() => setShowCart(true)} />
      <Outlet />
      <footer className="site-footer">
        <div className="footer-copy">
          <span className="eyebrow">Quick Shop</span>
          <p>Reliable shopping with smart cart persistence, clean navigation, and API-powered products.</p>
        </div>
        <div className="footer-links">
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <p className="footer-note">© {new Date().getFullYear()} Quick Shop. Designed for seamless commerce.</p>
      </footer>
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

export default Layout;
