import { useState } from "react";
function CheckoutForm({ cart, total }) {
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [error, setError] = useState("");
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleCheckout(e) {
    e.preventDefault();
    if (form.name === "" || form.email === "" || form.address === "") {
      setError("Please fill in all fields");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    // ... place the order (next topic)
    const order = {
      customer: form,
      items: cart,
      total: total,
    };
    console.log("ORDER PLACED:", order);
    setError("");
  }
  return (
    <form className="form-stack checkout-form" onSubmit={handleCheckout}>
      <h3>Checkout</h3>
      <input
        name="name"
        placeholder="Full name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />
      {error && <p className="error">{error}</p>}
      <button className="btn btn-primary" type="submit">
        Place Order
      </button>
    </form>
  );
}
export default CheckoutForm;
