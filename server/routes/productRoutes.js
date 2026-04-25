const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getFeaturedProducts,
  getProductBySlug,
} = require('../controllers/productController');

router.get('/featured', getFeaturedProducts);
router.get('/', getAllProducts);
router.get('/:slug', getProductBySlug);

module.exports = router;
