function CartItem({ item, onChangeQty, onRemove }) {
  const itemName = item.title || item.name;

  return (
    <div className="cart-row">
      <span className="ci-name">{itemName}</span>
      <div className="ci-qty">
        <button onClick={() => onChangeQty(item.id, -1)}>-</button>
        <span>{item.qty}</span>
        <button onClick={() => onChangeQty(item.id, 1)}>+</button>
      </div>
      <span className="ci-price">${item.price * item.qty}</span>
      <button className="btn btn-danger" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  );
}
export default CartItem;
