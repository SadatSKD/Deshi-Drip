const Category = require('../models/Category');

// GET /api/categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ displayOrder: 1 });
    res.json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    next(err);
  }
};

// GET /api/categories/:gender
const getCategoriesByGender = async (req, res, next) => {
  try {
    const { gender } = req.params;
    const validGenders = ['men', 'women', 'all'];
    if (!validGenders.includes(gender)) {
      res.status(400);
      throw new Error('Invalid gender parameter. Use: men, women, or all');
    }
    const categories = await Category.find({
      $or: [{ gender }, { gender: 'all' }],
    }).sort({ displayOrder: 1 });
    res.json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCategories, getCategoriesByGender };
