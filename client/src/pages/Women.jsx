import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import useFetch from '../hooks/useFetch';
import './GenderPage.css';

const Women = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { data: products, loading } = useFetch('/api/products?gender=women');
  const { data: categories } = useFetch('/api/categories');

  const womenCats = (categories || []).filter((c) => c.gender === 'women' || c.gender === 'all');

  const filtered = activeCategory === 'all'
    ? (products || [])
    : (products || []).filter((p) => p.category?.slug === activeCategory);

  return (
    <main className="gender-page">
      <div className="gender-hero" style={{ background: 'linear-gradient(160deg, #1a0a0a 0%, #2d1010 100%)' }}>
        <div className="container">
          <p className="gender-eyebrow">Deshi Drip</p>
          <h1 className="gender-title">WOMEN'S <span>COLLECTION</span></h1>
          <p className="gender-sub">{(products || []).length} styles available</p>
        </div>
      </div>

      <div className="container">
        <div className="filter-bar">
          <button
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            ALL
          </button>
          {womenCats.map((cat) => (
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

export default Women;
