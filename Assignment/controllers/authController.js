const users = require('../models/users');
const products = require('../models/products');

const adminLogin = (req, res) => {
  const { username, password } = req.body;
  const admin = users.find(user => user.username === username && user.password === password && user.role === 'admin');

  if (admin) {
    req.session.role = 'admin';
    res.redirect('/admin/product-list');
  } else {
    res.send('Invalid credentials for admin');
  }
};

const userLogin = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password && user.role === 'user');

  if (user) {
    req.session.role = 'user';
    res.redirect('/user/search');
  } else {
    res.send('Invalid credentials for user');
  }
};

module.exports = { adminLogin, userLogin };
