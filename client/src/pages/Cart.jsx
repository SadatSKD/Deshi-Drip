import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const GRADIENTS = [
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #2d2d0f 100%)',
  'linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #3d2020 100%)',
  'linear-gradient(135deg, #0a1a0a 0%, #0f2d0f 50%, #1a3d1a 100%)',
];

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, clearCart, cartCount, cartTotal } = useCart();

  const savings = cartItems.reduce((sum, item) => {
    const orig = item.originalPrice || item.price;
    return sum + (orig - item.price) * item.qty;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any drip yet.</p>
            <Link to="/men" className="btn-continue">SHOP MEN'S</Link>
            <Link to="/women" className="btn-continue btn-continue-alt">SHOP WOMEN'S</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">YOUR <span>CART</span></h1>
          <p className="cart-subtitle">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="cart-layout">
          {/* Items list */}
          <div className="cart-items">
            {cartItems.map((item, i) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-img" style={{ background: GRADIENTS[i % GRADIENTS.length] }}>
                  {item.badge && (
                    <span className={`ci-badge ${item.badge === 'New Drop' ? 'badge-new' : 'badge-hot'}`}>
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="cart-item-info">
                  <Link to={`/product/${item.slug}`} className="ci-name">{item.name}</Link>
                  <span className="ci-cat">{item.category?.name || item.gender}</span>
                  <div className="ci-price-row">
                    <span className="ci-price">Tk {item.price.toLocaleString()}</span>
                    {item.originalPrice > item.price && (
                      <span className="ci-original">Tk {item.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                <div className="cart-item-controls">
                  <div className="qty-control">
                    <button onClick={() => updateQty(item._id, item.qty - 1)} disabled={item.qty <= 1}>−</button>
                    <span className="qty-value">{item.qty}</span>
                    <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                  </div>
                  <span className="ci-line-total">Tk {(item.price * item.qty).toLocaleString()}</span>
                  <button className="ci-remove" onClick={() => removeFromCart(item._id)} aria-label="Remove item">✕</button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary sidebar */}
          <div className="cart-summary">
            <h3 className="summary-title">ORDER SUMMARY</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>Tk {cartTotal.toLocaleString()}</span>
            </div>
            {savings > 0 && (
              <div className="summary-row summary-savings">
                <span>You save</span>
                <span>− Tk {savings.toLocaleString()}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Delivery</span>
              <span className="free-delivery">FREE 🚚</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>Tk {cartTotal.toLocaleString()}</span>
            </div>

            <Link to="/checkout" className="btn-checkout">CHECKOUT →</Link>
            <Link to="/#new-drop" className="btn-keep-shopping">← CONTINUE SHOPPING</Link>

            <button className="btn-clear-cart" onClick={clearCart}>Clear Cart</button>

            <div className="summary-perks">
              <span>🚚 Free delivery nationwide</span>
              <span>↩️ 7-day easy exchange</span>
              <span>🇧🇩 Made in Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
