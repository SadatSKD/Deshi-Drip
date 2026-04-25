const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    gender: { type: String, enum: ['men', 'women', 'unisex'], required: true },
    description: { type: String, default: '' },
    tags: [{ type: String }],
    imageUrl: { type: String, default: '' },
    badge: { type: String, default: '' }, // e.g. "New Drop", "Hot"
    isFeatured: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
