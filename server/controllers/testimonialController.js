const Testimonial = require('../models/Testimonial');

// GET /api/testimonials
const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTestimonials };
