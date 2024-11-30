const express = require('express');
const router = express.Router();
const { adminLogin, userLogin } = require('../controllers/authController');

// Admin login route
router.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'admin-login.html'));
});

// User login route
router.get('/user/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'user-login.html'));
});

// Handle admin login POST request
router.post('/admin/login', adminLogin);

// Handle user login POST request
router.post('/user/login', userLogin);

module.exports = router;
