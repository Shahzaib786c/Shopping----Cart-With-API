import Modal from "./Modal";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
function CartModal({ cart, onChangeQty, onRemove, onClose }) {
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
  });
  return (
    <Modal title="Your Cart" onClose={onClose}>
      {cart.length === 0 ? (
        <p className="empty-state">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onChangeQty={onChangeQty}
                onRemove={onRemove}
              />
            ))}
          </div>
          <h3 className="cart-total">Total: ${total}</h3>
          <CheckoutForm cart={cart} total={total} />
        </>
      )}
    </Modal>
  );
}
export default CartModal;
