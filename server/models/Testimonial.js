const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    location: { type: String, default: 'Bangladesh' },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    quote: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
