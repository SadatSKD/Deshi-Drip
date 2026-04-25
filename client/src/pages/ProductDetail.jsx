import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import './ProductDetail.css';

const GRADIENTS = [
  'linear-gradient(135deg, #0f1923 0%, #1a3a2a 100%)',
  'linear-gradient(135deg, #1a0f0f 0%, #3a1a0a 100%)',
  'linear-gradient(135deg, #0a0f1a 0%, #1a2a3a 100%)',
];

const ProductDetail = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { data: product, loading, error } = useFetch(`/api/products/${slug}`);

  if (loading) return <div className="loading-screen" style={{minHeight:'100vh'}}><span className="loading-dots">Loading</span></div>;
  if (error || !product) return (
    <div className="pd-error">
      <h2>Product not found</h2>
      <Link to="/" className="pd-back">← Back to Home</Link>
    </div>
  );

  const gradient = GRADIENTS[0];
  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <main className="pd-page">
      <div className="container">
        <Link to={`/${product.gender}`} className="pd-breadcrumb">
          ← Back to {product.gender === 'women' ? "Women's" : product.gender === 'men' ? "Men's" : 'All'} Products
        </Link>

        <div className="pd-layout">
          {/* Image */}
          <div className="pd-img" style={product.imageUrl ? {} : { background: gradient }}>
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="pd-product-img" />
            ) : (
              <div className="pd-img-lines">
                <div style={{ position:'absolute', bottom:'35%', left:0, right:0, height:'1px', background:'rgba(255,255,255,0.04)' }} />
                <div style={{ position:'absolute', top:0, bottom:0, left:'30%', width:'1px', background:'rgba(255,255,255,0.04)' }} />
              </div>
            )}
            {product.badge && (
              <div className={`card-badge ${product.badge === 'New Drop' ? 'badge-new' : 'badge-hot'}`}>
                {product.badge === 'New Drop' && <span className="pulse-dot" />}
                {product.badge}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="pd-info">
            <div className="pd-cat-row">
              <span className="pd-cat">{product.category?.name}</span>
              <span className="pd-gender">{product.gender}</span>
            </div>

            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-price-row">
              <span className="pd-price">Tk {product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="pd-original">Tk {product.originalPrice.toLocaleString()}</span>
                  <span className="pd-discount">-{discount}%</span>
                </>
              )}
            </div>

            <p className="pd-desc">{product.description}</p>

            {product.tags?.length > 0 && (
              <div className="pd-tags">
                {product.tags.map((tag) => (
                  <span key={tag} className="pd-tag">{tag}</span>
                ))}
              </div>
            )}

            <div className="pd-actions">
              <button
                className="btn-pd-cart"
                onClick={() => addToCart(product)}
              >
                + ADD TO CART
              </button>
              <Link to={`/${product.gender}`} className="btn-pd-back">
                CONTINUE SHOPPING
              </Link>
            </div>

            <div className="pd-perks">
              <span>🚚 Free Delivery nationwide</span>
              <span>↩️ Easy 7-day exchange</span>
              <span>🇧🇩 Made in Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
