import './About.css';
const ABOUT_IMAGE = '/images/about/about-origin.png';

const About = () => (
  <main className="about-page">
    {/* Hero */}
    <div className="about-hero">
      <div className="container">
        <p className="about-eyebrow">Our Story</p>
        <h1 className="about-title">BORN IN DHAKA.<br /><span>BUILT FOR THE BOLD.</span></h1>
      </div>
    </div>

    <div className="container">
      {/* Story */}
      <section className="about-story section">
        <div className="story-text">
          <h2 className="story-heading">HOW DESHI DRIP STARTED</h2>
          <p>
            It started with a simple frustration — why did Bangladeshi youth have to look
            abroad for streetwear that actually resonated? In 2023, a small crew from Dhaka's
            Mirpur neighborhood decided to change that.
          </p>
          <p>
            Deshi Drip was born in a 200 sqft workspace with a single screen-printing machine
            and a lot of conviction. The name says it all — <em>Deshi</em> (local, ours, belonging
            to this land) and <em>Drip</em> (the kind of style that turns heads on any street in the world).
          </p>
          <p>
            We design for the streets of Dhaka. For the rickshaw-pullers who wear our caps, the
            university kids who flex our hoodies, and the young women who make our mesh tops
            completely their own. We make clothing that belongs here — without apologizing for it.
          </p>
        </div>

        <div className="story-visual" style={ABOUT_IMAGE ? {} : { background: 'linear-gradient(135deg, #0f1923 0%, #1a3a2a 100%)' }}>
          {ABOUT_IMAGE && <img src={ABOUT_IMAGE} alt="Deshi Drip Origin" className="story-bg-img" />}
          <div className="story-visual-text">EST. 2023 — DHAKA</div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section section">
        <h2 className="section-title">OUR <span>VALUES</span></h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🇧🇩</div>
            <h3>Made Local</h3>
            <p>Every stitch, every screen print, every hem — done right here in Bangladesh by skilled local hands.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">♻️</div>
            <h3>Sustainable Fabrics</h3>
            <p>We source organic cotton and recycled polyester. Streetwear shouldn't cost the earth — literally.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">💥</div>
            <h3>Drop Culture</h3>
            <p>Limited runs. Surprise drops. Each collection is an event. If you miss it, you miss it.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Community First</h3>
            <p>From pop-ups in Banani to collabs with local artists — Deshi Drip grows with its people.</p>
          </div>
        </div>
      </section>

      {/* Brand Pills */}
      <div className="about-pills">
        <span className="pill">🇧🇩 Made Local</span>
        <span className="pill">♻️ Sustainable Fabrics</span>
        <span className="pill">💥 Drop Culture</span>
      </div>
    </div>
  </main>
);

export default About;
