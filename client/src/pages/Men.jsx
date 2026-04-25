import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import useFetch from '../hooks/useFetch';
import './GenderPage.css';

const Men = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { data: products, loading } = useFetch('/api/products?gender=men');
  const { data: categories } = useFetch('/api/categories');

  const menCats = (categories || []).filter((c) => c.gender === 'men' || c.gender === 'all');

  const filtered = activeCategory === 'all'
    ? (products || [])
    : (products || []).filter((p) => p.category?.slug === activeCategory);

  return (
    <main className="gender-page">
      <div className="gender-hero" style={{ background: 'linear-gradient(160deg, #0a0f1a 0%, #111820 100%)' }}>
        <div className="container">
          <p className="gender-eyebrow">Deshi Drip</p>
          <h1 className="gender-title">MEN'S <span>COLLECTION</span></h1>
          <p className="gender-sub">{(products || []).length} styles available</p>
        </div>
      </div>

      <div className="container">
        {/* Filter bar */}
        <div className="filter-bar">
          <button
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            ALL
          </button>
          {menCats.map((cat) => (
            <button
              key={cat._id}
              className={`filter-btn ${activeCategory === cat.slug ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.slug)}
            >
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-screen"><span className="loading-dots">Loading</span></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">No products found in this category.</div>
        ) : (
          <div className="products-grid-page">
            {filtered.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Men;
