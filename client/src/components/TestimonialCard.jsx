import './TestimonialCard.css';

const TestimonialCard = ({ testimonial }) => (
  <div className="testimonial-card">
    <div className="stars">{'⭐'.repeat(testimonial.rating)}</div>
    <blockquote className="testi-quote">"{testimonial.quote}"</blockquote>
    <div className="testi-author">
      <span className="testi-name">— {testimonial.customerName}</span>
      <span className="testi-loc">{testimonial.location}</span>
    </div>
  </div>
);

export default TestimonialCard;
