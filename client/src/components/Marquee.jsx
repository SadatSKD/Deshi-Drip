import './Marquee.css';

const TICKER_ITEMS = [
  'NEW DROP', '✦', 'URBAN WEAR', '✦', 'DESHI DRIP', '✦',
  'STREETWEAR', '✦', 'DHAKA MADE', '✦', 'FREE DELIVERY', '✦',
];

const MarqueeStrip = () => (
  <div className="marquee-strip" aria-hidden="true">
    <div className="marquee-track">
      {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
        <span key={i} className="marquee-item">{item}</span>
      ))}
    </div>
  </div>
);

export default MarqueeStrip;
