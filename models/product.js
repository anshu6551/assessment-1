const mongoose = require('mongoose');
const slugify = require('slugify'); 

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true }, 
  description: { type: String, required: true },
  brand: String,
  category: { type: String, required: true, index: true }, 
  price: { type: Number, required: true },
  discountPrice: Number,
  
  variants: [{
    size: String,
    color: String,
    stock: { type: Number, default: 0 },
    price: Number
  }],
  images: [{ url: String }], 
  status: { 
    type: String, 
    enum: ['draft', 'active', 'archived'], 
    default: 'draft' 
  }, 
  isDeleted: { type: Boolean, default: false } 
}, { timestamps: true }); 


productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);