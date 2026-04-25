import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          DESHI DRIP <span>⚡</span>
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {[
            { to: '/#new-drop', label: 'New Drop' },
            { to: '/men', label: 'Men' },
            { to: '/women', label: 'Women' },
            { to: '/lookbook', label: 'Lookbook' },
            { to: '/about', label: 'About' },
          ].map(({ to, label }) => (
            <li key={label}>
              <NavLink
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          {user ? (
            <div className="nav-user">
              <span className="user-name">{user.name.split(' ')[0]}</span>
              <button onClick={logout} className="btn-logout" title="Logout">🚪</button>
            </div>
          ) : (
            <Link to="/auth" className="login-link">Login</Link>
          )}
          <Link to="/cart" className="cart-icon" aria-label="Cart">
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <Link to="/#new-drop" className="btn-shop-now">Shop Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
