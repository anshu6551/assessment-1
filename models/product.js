const mongoose = require('mongoose');
const slugify = require('slugify'); // To make SEO-friendly slugs 

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true }, // [cite: 17, 49]
  description: { type: String, required: true },
  brand: String,
  category: { type: String, required: true, index: true }, // [cite: 14, 51]
  price: { type: Number, required: true },
  discountPrice: Number,
  // Multi-variant support for size, color, and stock [cite: 12, 15]
  variants: [{
    size: String,
    color: String,
    stock: { type: Number, default: 0 },
    price: Number
  }],
  images: [{ url: String }], // Support for multiple images [cite: 13]
  status: { 
    type: String, 
    enum: ['draft', 'active', 'archived'], 
    default: 'draft' 
  }, // [cite: 18, 21]
  isDeleted: { type: Boolean, default: false } // For Soft Delete logic 
}, { timestamps: true }); // Automatically adds createdAt and updatedAt [cite: 22]

// Pre-save hook to automatically create a slug from the name
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);