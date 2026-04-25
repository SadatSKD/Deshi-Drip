const Product = require('../models/Product');

// GET /api/products — support ?gender=, ?category=, ?badge=
const getAllProducts = async (req, res, next) => {
  try {
    const filter = { isAvailable: true };
    if (req.query.gender) filter.gender = req.query.gender;
    if (req.query.badge) filter.badge = new RegExp(req.query.badge, 'i');

    if (req.query.category) {
      const Category = require('../models/Category');
      const cat = await Category.findOne({ slug: req.query.category });
      if (cat) filter.category = cat._id;
    }

    const products = await Product.find(filter)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    next(err);
  }
};

// GET /api/products/featured
const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true, isAvailable: true })
      .populate('category', 'name slug')
      .limit(6)
      .sort({ createdAt: -1 });

    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:slug
const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      'category',
      'name slug'
    );
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllProducts, getFeaturedProducts, getProductBySlug };
