import { useLocation, Link, useParams } from 'react-router-dom';
import './OrderSuccess.css';

const PAYMENT_LABELS = {
  cod: { label: 'Cash on Delivery', icon: '💵' },
  bkash: { label: 'bKash', icon: '📱' },
  nagad: { label: 'Nagad', icon: '📲' },
};

const OrderSuccess = () => {
  const { orderNumber } = useParams();
  const location = useLocation();
  const state = location.state || {};

  const pm = PAYMENT_LABELS[state.paymentMethod] || PAYMENT_LABELS.cod;

  return (
    <main className="success-page">
      <div className="container">
        <div className="success-card">
          <div className="success-check">✓</div>
          <h1 className="success-title">ORDER <span>CONFIRMED</span> ⚡</h1>
          <p className="success-sub">Thank you{state.customerName ? `, ${state.customerName}` : ''}! Your drip is on the way.</p>

          <div className="success-details">
            <div className="sd-row">
              <span className="sd-label">Order Number</span>
              <span className="sd-value sd-order-num">{orderNumber || 'N/A'}</span>
            </div>
            {state.total && (
              <div className="sd-row">
                <span className="sd-label">Total</span>
                <span className="sd-value">Tk {state.total.toLocaleString()}</span>
              </div>
            )}
            <div className="sd-row">
              <span className="sd-label">Payment</span>
              <span className="sd-value">{pm.icon} {pm.label}</span>
            </div>
            <div className="sd-row">
              <span className="sd-label">Delivery</span>
              <span className="sd-value free-delivery">FREE 🚚</span>
            </div>
            <div className="sd-row">
              <span className="sd-label">Status</span>
              <span className="sd-value sd-status">Pending Confirmation</span>
            </div>
          </div>

          {state.paymentMethod === 'bkash' && (
            <div className="payment-instruction">
              <p><strong>bKash Payment:</strong> Send <strong>Tk {state.total?.toLocaleString()}</strong> to <strong>01700-000000</strong> (Merchant). Use your Order Number <strong>{orderNumber}</strong> as reference.</p>
            </div>
          )}

          {state.paymentMethod === 'nagad' && (
            <div className="payment-instruction">
              <p><strong>Nagad Payment:</strong> Send <strong>Tk {state.total?.toLocaleString()}</strong> to <strong>01700-000000</strong> (Merchant). Use your Order Number <strong>{orderNumber}</strong> as reference.</p>
            </div>
          )}

          <div className="success-timeline">
            <div className="tl-step active">
              <div className="tl-dot" />
              <span>Order Placed</span>
            </div>
            <div className="tl-line" />
            <div className="tl-step">
              <div className="tl-dot" />
              <span>Confirmed</span>
            </div>
            <div className="tl-line" />
            <div className="tl-step">
              <div className="tl-dot" />
              <span>Shipped</span>
            </div>
            <div className="tl-line" />
            <div className="tl-step">
              <div className="tl-dot" />
              <span>Delivered</span>
            </div>
          </div>

          <div className="success-actions">
            <Link to="/" className="btn-success-home">CONTINUE SHOPPING</Link>
            <Link to="/men" className="btn-success-alt">BROWSE MORE DRIP</Link>
          </div>

          <p className="success-note">📧 A confirmation will be sent to your phone number shortly.</p>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccess;
