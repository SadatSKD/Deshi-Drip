import { LOOKBOOK_EDITORIAL } from '../data/lookbookData';
import './Lookbook.css';

const Lookbook = () => (
  <main className="lookbook-page">
    <div className="lb-hero">
      <div className="container">
        <p className="lb-eyebrow">Deshi Drip — SS25</p>
        <h1 className="lb-title">LOOKBOOK</h1>
        <p className="lb-sub">Dhaka streets. Global energy. Every season a new story.</p>
      </div>
    </div>

    <div className="container">
      <div className="lb-masonry">
        {LOOKBOOK_EDITORIAL.map((item) => (
          <div
            key={item.id}
            className={`lb-item ${item.tall ? 'tall' : ''}`}
            style={item.image ? {} : { background: item.gradient }}
          >
            {item.image && <img src={item.image} alt={item.label} className="lb-bg-img" />}
            <div className="lb-hover" />
            <div className="lb-info">
              <span className="lb-sub-label">{item.sub}</span>
              <h3 className="lb-label">{item.label}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default Lookbook;
