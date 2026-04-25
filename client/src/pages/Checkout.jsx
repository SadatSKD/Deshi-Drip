import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' },
  { id: 'bkash', label: 'bKash', icon: '📱', desc: 'Mobile payment via bKash' },
  { id: 'nagad', label: 'Nagad', icon: '📲', desc: 'Mobile payment via Nagad' },
];

const BD_CITIES = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna',
  'Barishal', 'Rangpur', 'Mymensingh', 'Comilla', 'Gazipur',
  'Narayanganj', "Cox's Bazar", 'Jessore', 'Bogra',
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart, cartCount } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Dhaka',
    notes: '',
    paymentMethod: 'cod',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.phone || !form.address || !form.city) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!/^01[3-9]\d{8}$/.test(form.phone)) {
      setError('Please enter a valid Bangladeshi phone number (e.g. 01712345678).');
      return;
    }

    setSubmitting(true);

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          slug: item.slug,
          price: item.price,
          qty: item.qty,
        })),
        customer: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          city: form.city,
          notes: form.notes,
        },
        paymentMethod: form.paymentMethod,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Order failed');

      clearCart();
      navigate(`/order-success/${data.data.orderNumber}`, {
        state: {
          orderNumber: data.data.orderNumber,
          total: data.data.total,
          paymentMethod: data.data.paymentMethod,
          customerName: form.name,
        },
      });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="container">
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <h2>Nothing to checkout</h2>
            <p>Add some items to your cart first.</p>
            <Link to="/men" className="btn-continue">SHOP NOW</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <Link to="/cart" className="checkout-back">← Back to Cart</Link>
          <h1 className="checkout-title">CHECK<span>OUT</span></h1>
          <p className="checkout-sub">{cartCount} {cartCount === 1 ? 'item' : 'items'} · Tk {cartTotal.toLocaleString()}</p>
        </div>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          {/* Left — Form */}
          <div className="checkout-form">
            <section className="co-section">
              <h3 className="co-section-title">📦 Delivery Information</h3>

              <div className="field-group">
                <div className="field">
                  <label htmlFor="name">Full Name *</label>
                  <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Farhan Rahman" required />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone Number *</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="01712345678" required />
                </div>
              </div>

              <div className="field">
                <label htmlFor="email">Email (optional)</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
              </div>

              <div className="field">
                <label htmlFor="address">Delivery Address *</label>
                <textarea id="address" name="address" rows="3" value={form.address} onChange={handleChange} placeholder="House 12, Road 5, Dhanmondi, Dhaka" required />
              </div>

              <div className="field">
                <label htmlFor="city">City *</label>
                <select id="city" name="city" value={form.city} onChange={handleChange} required>
                  {BD_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="field">
                <label htmlFor="notes">Order Notes (optional)</label>
                <textarea id="notes" name="notes" rows="2" value={form.notes} onChange={handleChange} placeholder="Special delivery instructions..." />
              </div>
            </section>

            <section className="co-section">
              <h3 className="co-section-title">💳 Payment Method</h3>
              <div className="payment-options">
                {PAYMENT_METHODS.map((pm) => (
                  <label
                    key={pm.id}
                    className={`payment-option ${form.paymentMethod === pm.id ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={pm.id}
                      checked={form.paymentMethod === pm.id}
                      onChange={handleChange}
                    />
                    <span className="pm-icon">{pm.icon}</span>
                    <div className="pm-text">
                      <span className="pm-label">{pm.label}</span>
                      <span className="pm-desc">{pm.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right — Summary */}
          <div className="checkout-summary">
            <h3 className="summary-title">ORDER SUMMARY</h3>

            <div className="co-items">
              {cartItems.map((item) => (
                <div key={item._id} className="co-item">
                  <span className="co-item-name">{item.name} × {item.qty}</span>
                  <span className="co-item-price">Tk {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>Tk {cartTotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="free-delivery">FREE 🚚</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>Tk {cartTotal.toLocaleString()}</span>
            </div>

            {error && <div className="co-error">{error}</div>}

            <button type="submit" className="btn-place-order" disabled={submitting}>
              {submitting ? 'PLACING ORDER...' : 'PLACE ORDER →'}
            </button>

            <p className="co-secure">🔒 Your information is secure and encrypted</p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
