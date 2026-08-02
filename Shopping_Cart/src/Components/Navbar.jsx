import { Link, NavLink } from "react-router";
import CartIcon from "./CartIcon";
function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="navbar">
      <div>
        <Link className="logo-link" to="/">
          <h1 className="logo">Quick Shop</h1>
        </Link>
        <p className="nav-subtitle">Curated everyday essentials</p>
      </div>
      <div className="nav-actions">
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        {onCartClick && (
          <button className="cart-btn" onClick={onCartClick}>
            <CartIcon />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
