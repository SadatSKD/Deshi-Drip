import { Link } from 'react-router-dom';
import './HeroSection.css';

/*
 * ─── HOW TO ADD YOUR OWN HERO IMAGES ───────────────────
 *
 * 1. Put your images in:  client/public/images/hero/
 *
 * 2. Update the paths below:
 *    - HERO_MAIN  → the big left image (model shot / editorial)
 *    - HERO_TOP   → top-right "New Drop" block
 *    - HERO_BOTTOM → bottom-right "Lookbook" block
 *
 * 3. Set to '' (empty string) to keep the gradient placeholder.
 * ────────────────────────────────────────────────────────
 */
const HERO_MAIN   = '/images/hero/hero-main.jpg';
const HERO_TOP    = '/images/hero/hero-new-drop.jpg';
const HERO_BOTTOM = '/images/hero/hero-lookbook.jpg';

const HeroSection = () => (
  <section className="hero" id="hero">
    <div className="grain" />

    <div className="hero-layout">
      {/* Left — Main editorial block */}
      <div className="hero-main">
        <div className="hero-img-block hero-img-left">
          {HERO_MAIN && <img src={HERO_MAIN} alt="Deshi Drip SS25 Collection" className="hero-bg-img" />}
          <div className="hero-img-inner" />
          <div className="hero-content">
            <p className="hero-eyebrow">SS25 Collection</p>
            <h1 className="hero-headline">
              WEAR THE<br />
              <span>STREETS.</span>
            </h1>
            <p className="hero-sub">
              Deshi Drip — Born in Bangladesh.<br />Built for the Bold.
            </p>
            <div className="hero-ctas">
              <Link to="/men" className="btn-hero-primary">Shop Men</Link>
              <Link to="/women" className="btn-hero-secondary">Shop Women</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Secondary editorial blocks */}
      <div className="hero-side">
        <div className="hero-img-block hero-img-top">
          {HERO_TOP && <img src={HERO_TOP} alt="New Drop" className="hero-bg-img" />}
          <div className="hero-side-label">NEW DROP ⚡</div>
        </div>
        <div className="hero-img-block hero-img-bottom">
          {HERO_BOTTOM && <img src={HERO_BOTTOM} alt="Lookbook SS25" className="hero-bg-img" />}
          <div className="hero-side-label">LOOKBOOK SS25</div>
        </div>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="hero-scroll">
      <span>SCROLL</span>
      <div className="scroll-line" />
    </div>
  </section>
);

export default HeroSection;
