const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Import your controller logic
// Note: We added renderDashboard here because it was missing in your last version
const { 
    renderDashboard, 
    createProduct, 
    getProducts, 
    getSingleProduct, 
    softDeleteProduct 
} = require('./controllers/productController');

// Load config
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log(' MongoDB Connected...'))
    .catch(err => console.error(' Database connection error:', err));

// Body parser
app.use(express.json());

// Set View Engine
app.set('view engine', 'ejs');
// __dirname is essential to find the views folder correctly
app.set('views', path.join(__dirname, 'views'));

// --- ROUTES ---

// UI Routes
app.get('/', renderDashboard); 
app.get('/dashboard', renderDashboard);

// API Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/v1/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));