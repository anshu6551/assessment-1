const Product = require('../models/product');

//
exports.renderDashboard = async (req, res) => {
    try {
        const products = await Product.find({ isDeleted: false }).sort('-createdAt');
        res.render('index', { products }); 
    } catch (err) {
        res.status(500).send("Error loading the dashboard UI");
    }
};

//
exports.createProduct = async (req, res) => {
    try {
        await Product.create(req.body); 
        res.redirect('/'); 
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

//
exports.getProducts = async (req, res) => {
    try {
        let query;
        const reqQuery = { ...req.query };
        const removeFields = ['search', 'sort', 'page', 'limit'];
        removeFields.forEach(param => delete reqQuery[param]);
        query = Product.find({ ...reqQuery, isDeleted: false });

        if (req.query.search) {
            query = query.find({ $text: { $search: req.query.search } });
        }

        if (req.query.sort === 'price_asc') {
            query = query.sort('price');
        } else if (req.query.sort === 'price_desc') {
            query = query.sort('-price');
        } else {
            query = query.sort('-createdAt');
        }

        const products = await query;
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

//
exports.softDeleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, { isDeleted: true });
        res.redirect('/');
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

//
exports.getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); 
        if (!product) return res.status(404).send("Product not found");
        res.json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}; 


exports.updateProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/'); 
    } catch (err) {
        res.status(400).send("Update fail ho gaya bhai");
    }
};