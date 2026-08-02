import { Link } from "react-router";

function Home() {
  return (
    <main className="page home-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <div className="hero-pills">
            <span className="pill">New Season Picks</span>
            <span className="pill">Free delivery over $50</span>
          </div>
          <span className="eyebrow">Welcome to Quick Shop</span>
          <h1>Shop smarter with a polished experience built for modern buyers.</h1>
          <p>
            Explore curated essentials, enjoy a faster checkout flow, and keep your
            cart ready across sessions with reliable Local Storage support.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/products">
              Explore Products
            </Link>
            <Link className="btn btn-outline" to="/about">
              Learn More
            </Link>
          </div>
          <div className="hero-highlights">
            <div>
              <strong>24/7</strong>
              <span>Support</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Secure</span>
            </div>
            <div>
              <strong>Fast</strong>
              <span>Checkout</span>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-banner">
            <p className="banner-label">Featured selection</p>
            <h2>Curated products for everyday comfort.</h2>
            <p>
              Discover trending items, manage your cart effortlessly, and enjoy a
              calm, customer-friendly shopping experience from start to finish.
            </p>
            <div className="banner-stats">
              <div>
                <strong>3k+</strong>
                <span>Happy shoppers</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Average rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <div className="feature-card">
          <h3>Live product feed</h3>
          <p>Products are fetched from a remote API and rendered dynamically.</p>
        </div>
        <div className="feature-card">
          <h3>Persistent cart</h3>
          <p>Your cart stays intact after browser refresh, thanks to Local Storage.</p>
        </div>
        <div className="feature-card">
          <h3>Shared layout</h3>
          <p>The Navbar appears on every page and updates cart count globally.</p>
        </div>
      </section>

      <section className="offer-strip">
        <div>
          <span className="eyebrow">Limited time offer</span>
          <h3>Buy two favorites and enjoy an exclusive 10% savings.</h3>
        </div>
        <Link className="btn btn-primary" to="/products">
          Shop now
        </Link>
      </section>
    </main>
  );
}

export default Home;
