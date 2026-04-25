import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">DESHI DRIP ⚡</div>
          <p className="footer-tagline">Born Bold. Stay Drip.</p>
          <div className="social-icons">
            <a href="#" aria-label="Instagram" className="social-icon">📸 Instagram</a>
            <a href="#" aria-label="Facebook" className="social-icon">👥 Facebook</a>
            <a href="#" aria-label="TikTok" className="social-icon">🎵 TikTok</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/lookbook">Lookbook</Link></li>
            <li><Link to="#">Size Guide</Link></li>
            <li><Link to="#">Exchange Policy</Link></li>
            <li><Link to="#">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">Contact</h4>
          <ul>
            <li>📞 +880 1700-000000</li>
            <li>✉️ hello@deshidrip.com</li>
            <li>📍 Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 Deshi Drip. All rights reserved.</span>
        <span className="footer-loc">Dhaka, Bangladesh 🇧🇩</span>
      </div>
    </div>
  </footer>
);

export default Footer;
