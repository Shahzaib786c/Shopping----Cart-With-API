import { useState } from "react";
import Modal from "./Modal";
function AddProductModal({ onAddProduct, onClose }) {
  const [form, setForm] = useState({ name: "", price: "" });
  const [error, setError] = useState("");
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (form.name === "" || form.price === "") {
      setError("Please fill in both fields");
      return;
    }
    const newProduct = {
      id: Date.now(),
      title: form.name,
      name: form.name,
      price: Number(form.price),
    };
    onAddProduct(newProduct); // send it up to App
    onClose(); // close the modal
  }
  return (
    <Modal title="Add Product" onClose={onClose}>
      <form className="form-stack" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
    </Modal>
  );
}
export default AddProductModal;
