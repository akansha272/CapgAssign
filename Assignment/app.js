const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); // Ensure this file exists

const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Serve static files (CSS, images, and HTML)
app.use(express.static(path.join(__dirname, 'public'))); // For serving static assets

// Routes
app.use('/', authRoutes);  // Serve authentication routes
app.use('/admin', productRoutes);  // Admin routes for product management
app.use('/user', productRoutes);   // User routes for product viewing/search

// Default route (could be an admin login or home page)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-login.html')); // Serve admin login HTML
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
