import { LOOKBOOK_EDITORIAL } from '../data/lookbookData';
import HeroSection from '../components/HeroSection';
import MarqueeStrip from '../components/Marquee';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import NewsletterSection from '../components/NewsletterSection';
import useFetch from '../hooks/useFetch';
import './Home.css';

const Home = () => {
  const { data: categories, loading: catLoading } = useFetch('/api/categories');
  const { data: featured, loading: featLoading } = useFetch('/api/products/featured');
  const { data: testimonials, loading: testiLoading } = useFetch('/api/testimonials');

  return (
    <main>
      <HeroSection />
      <MarqueeStrip />

      {/* Categories */}
      <section className="section" id="categories">
        <div className="container">
          <h2 className="section-title">SHOP BY <span>CATEGORY</span></h2>
          {catLoading ? (
            <div className="loading-screen"><span className="loading-dots">Loading</span></div>
          ) : (
            <div className="categories-grid">
              {(categories || []).map((cat, i) => (
                <CategoryCard key={cat._id} category={cat} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section section-dark" id="new-drop">
        <div className="container">
          <h2 className="section-title">FRESH DROP <span>🔥</span></h2>
          {featLoading ? (
            <div className="loading-screen"><span className="loading-dots">Loading</span></div>
          ) : (
            <div className="products-grid">
              {(featured || []).map((product, i) => (
                <ProductCard key={product._id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brand Story */}
      <section className="brand-story">
        <div className="container">
          <blockquote className="brand-quote">
            "From the alleys of Dhaka to the streets of the world —<br />
            <em>Deshi Drip</em> is for those who move different."
          </blockquote>
          <div className="brand-pills">
            <span className="pill">🇧🇩 Made Local</span>
            <span className="pill">♻️ Sustainable Fabrics</span>
            <span className="pill">💥 Drop Culture</span>
          </div>
        </div>
      </section>

      {/* Lookbook */}
      <section className="section" id="lookbook-preview">
        <div className="container">
          <h2 className="section-title">LOOKBOOK — <span>SS25</span></h2>
          <div className="lookbook-grid">
            {LOOKBOOK_EDITORIAL.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className={`lookbook-block ${item.wide ? 'wide' : ''}`}
                style={item.image ? {} : { background: item.gradient }}
              >
                {item.image && <img src={item.image} alt={item.label} className="lb-bg-img" />}
                <div className="lookbook-label">{item.label}</div>
                <div className="lookbook-hover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-dark" id="testimonials">
        <div className="container">
          <h2 className="section-title">THE DRIP <span>SPEAKS</span></h2>
          {testiLoading ? (
            <div className="loading-screen"><span className="loading-dots">Loading</span></div>
          ) : (
            <div className="testi-grid">
              {(testimonials || []).slice(0, 3).map((t) => (
                <TestimonialCard key={t._id} testimonial={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
};

export default Home;
