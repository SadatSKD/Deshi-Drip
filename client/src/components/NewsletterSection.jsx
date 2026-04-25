import { useState } from 'react';
import { subscribeEmail } from '../services/newsletterService';
import './NewsletterSection.css';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // null | 'success' | 'error' | 'loading'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await subscribeEmail(email);
      setStatus('success');
      setMessage(res.data.message);
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Something went wrong. Try again!');
    }
  };

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="container">
        <div className="newsletter-inner">
          <div className="newsletter-text">
            <p className="nl-eyebrow">Join the movement</p>
            <h2 className="nl-heading">GET FIRST ACCESS TO EVERY DROP</h2>
            <p className="nl-sub">No spam. Just fire drops. 🔥</p>
          </div>

          <form className="nl-form" onSubmit={handleSubmit}>
            <div className="nl-input-group">
              <input
                id="newsletter-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                className="nl-input"
              />
              <button
                type="submit"
                className="nl-btn"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? '...' : 'JOIN THE DRIP'}
              </button>
            </div>

            {message && (
              <p className={`nl-feedback ${status}`}>{message}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
