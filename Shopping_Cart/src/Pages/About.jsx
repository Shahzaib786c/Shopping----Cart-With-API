function About() {
  return (
    <main className="page info-page">
      <span className="eyebrow">About us</span>
      <h2>Quick shopping, simple checkout.</h2>
      <p>
        Quick Shop is a clean React shopping cart project that loads real
        product data from an API, lets users search products, view details, and
        manage cart quantities.
      </p>
      <div className="info-grid">
        <div>
          <h3>Live Products</h3>
          <p>Products are fetched with axios and useEffect from DummyJSON.</p>
        </div>
        <div>
          <h3>Smart Cart</h3>
          <p>The cart keeps quantity controls, totals, and checkout fields.</p>
        </div>
      </div>
    </main>
  );
}

export default About;
