const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoriesByGender } = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.get('/:gender', getCategoriesByGender);

module.exports = router;
