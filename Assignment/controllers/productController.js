const products = require('../models/products');

const registerProduct = (req, res) => {
  const { name, category, price, manufactureDate, expiryDate } = req.body;
  const product = {
    id: products.length + 1,
    name,
    category,
    price,
    manufactureDate,
    expiryDate,
  };
  products.push(product);
  res.redirect('/admin/product-list');
};

const listProducts = (req, res) => {
  res.render('product-list', { products });
};

const showProductDetails = (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id == id);
  if (product) {
    res.render('product-details', { product });
  } else {
    res.send('Product not found');
  }
};

const searchProducts = (req, res) => {
  const query = req.query.query.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) || 
    product.category.toLowerCase().includes(query)
  );

  // Render search results page with filtered products
  res.render('search-products', { products: filteredProducts });
};

module.exports = { registerProduct, listProducts, showProductDetails, searchProducts };
