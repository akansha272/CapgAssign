const express = require('express');
const router = express.Router();

// Render Admin Login Page
router.get('/admin-login', (req, res) => {
  res.render('admin-login'); // Ensure you have the admin-login.ejs file
});

// Render User Login Page
router.get('/user-login', (req, res) => {
  res.render('user-login'); // Ensure you have the user-login.ejs file
});

// Handle Admin Login POST request (this is just a basic example, you might add real authentication logic)
router.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  // For simplicity, this is just a mock login. Replace with real authentication logic.
  if (username === 'admin' && password === 'adminpassword') {
    req.session.user = { role: 'admin' }; // Setting session for admin user
    res.redirect('/admin'); // Redirect to admin dashboard
  } else {
    res.send('Invalid admin credentials');
  }
});

// Handle User Login POST request (this is just a basic example)
router.post('/user-login', (req, res) => {
  const { username, password } = req.body;
  // Mock user authentication
  if (username === 'user' && password === 'userpassword') {
    req.session.user = { role: 'user' }; // Setting session for user
    res.redirect('/user'); // Redirect to user dashboard
  } else {
    res.send('Invalid user credentials');
  }
});

module.exports = router;
