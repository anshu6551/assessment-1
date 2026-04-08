const express = require('express');
const router = express.Router();
const { 
    createProduct, 
    getProducts, 
    getSingleProduct, 
    softDeleteProduct ,
    updateProduct
} = require('../controllers/productController');

// Routes for /api/v1/products
router.route('/')
    .get(getProducts) // [cite: 29]
    .post(createProduct); // [cite: 25]

// Routes for /api/v1/products/:id
router.route('/:id')
    .get(getSingleProduct) // [cite: 31]
    .delete(softDeleteProduct); // [cite: 35]

    // Route for Edit/Update
router.post('/update/:id', updateProduct);
router.post('/:id', softDeleteProduct);
module.exports = router;