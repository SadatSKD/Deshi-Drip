import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

// Gradient palettes used as fallback when no image is set
const GRADIENTS = [
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #2d2d0f 100%)',
  'linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #3d2020 100%)',
  'linear-gradient(135deg, #0a1a0a 0%, #0f2d0f 50%, #1a3d1a 100%)',
  'linear-gradient(135deg, #1a1a0a 0%, #2d2d15 50%, #3d3d20 100%)',
  'linear-gradient(135deg, #0a0a1a 0%, #15152d 50%, #20203d 100%)',
];

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const isNewDrop = product.badge === 'New Drop';
  const hasImage = product.imageUrl && product.imageUrl.trim() !== '';

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.slug}`} className="card-img-link">
        <div
          className="card-img"
          style={hasImage ? {} : { background: gradient }}
        >
          {/* Real product image */}
          {hasImage && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="card-product-img"
              loading="lazy"
            />
          )}

          <div className="card-img-overlay">
            <span className="view-label">VIEW PRODUCT →</span>
          </div>

          {product.badge && (
            <div className={`card-badge ${isNewDrop ? 'badge-new' : 'badge-hot'}`}>
              {isNewDrop && <span className="pulse-dot" />}
              {product.badge}
            </div>
          )}

          {/* Simulated editorial fashion visual (only when no image) */}
          {!hasImage && (
            <div className="card-fashion-lines">
              <div className="fl fl-1" />
              <div className="fl fl-2" />
              <div className="fl fl-3" />
            </div>
          )}
        </div>
      </Link>

      <div className="card-body">
        <div className="card-meta">
          <span className="card-cat">{product.category?.name || product.gender}</span>
          {product.gender && <span className="card-gender">{product.gender}</span>}
        </div>
        <Link to={`/product/${product.slug}`}>
          <h3 className="card-name">{product.name}</h3>
        </Link>
        <div className="card-pricing">
          <span className="card-price">Tk {product.price.toLocaleString()}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="card-original">Tk {product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <button
          className={`btn-add-cart ${added ? 'added' : ''}`}
          onClick={handleAddToCart}
        >
          {added ? '✓ ADDED TO CART' : '+ ADD TO CART'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
