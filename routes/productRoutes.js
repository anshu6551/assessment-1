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
    .get(getProducts) 
    .post(createProduct); 

// Routes for /api/v1/products/:id
router.route('/:id')
    .get(getSingleProduct) 
    .delete(softDeleteProduct);

    // Route for Edit/Update
router.post('/update/:id', updateProduct);
router.post('/:id', softDeleteProduct);
module.exports = router;