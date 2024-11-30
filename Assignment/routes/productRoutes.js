const express = require('express');
const router = express.Router();
const { registerProduct, listProducts, showProductDetails, searchProducts } = require('../controllers/productController');

// User route to search for products
router.get('/search', searchProducts);

// User route to view product details
router.get('/product/:id', (req, res) => {
  showProductDetails(req, res);
});

// Admin route to register a new product
router.get('/register-product', (req, res) => {
  if (req.session.role !== 'admin') {
    return res.redirect('/admin/login');
  }
  res.sendFile(path.join(__dirname, '../views', 'dashboard.html'));
});

// Admin route to list all products
router.get('/product-list', (req, res) => {
  if (req.session.role !== 'admin') {
    return res.redirect('/admin/login');
  }
  listProducts(req, res);
});

// User route to search for products
router.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'search-products.html'));
});

// User route to view product details
router.get('/product/:id', (req, res) => {
  showProductDetails(req, res);
});

module.exports = router;
