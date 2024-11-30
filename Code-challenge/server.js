const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// File path to the products JSON file
const productsFile = './data/products.json';

// Middleware for parsing POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to read products from the JSON file
const readProductsFromFile = () => {
    try {
        const data = fs.readFileSync(productsFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading products file:', err);
        return [];
    }
};

// Helper function to write products to the JSON file
const writeProductsToFile = (products) => {
    try {
        fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing products file:', err);
    }
};

// Route for index page (login selection)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Admin login route
app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin-login.html'));
});

// User login route
app.get('/user/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user-login.html'));
});

// Admin login route (POST request)
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    // Simple check for admin credentials
    if (username === 'admin' && password === 'admin123') {
        // Redirect to the add product page after successful admin login
        res.redirect('/admin/add-product');
    } else {
        // If login fails
        res.send('<h2>Invalid username or password for Admin!</h2>');
    }
});

// User login route (POST request)
app.post('/user/login', (req, res) => {
    const { username, password } = req.body;

    // Simple check for user credentials
    if (username === 'user' && password === 'password') {
        // Redirect to the user search page after successful login
        res.redirect('/user/search');
    } else {
        // If login fails
        res.send('<h2>Invalid username or password for User!</h2>');
    }
});

// Admin Product List Route
app.get('/admin/products', (req, res) => {
    const products = readProductsFromFile(); // Read the product list from the JSON file
    res.json(products); // Send the product list as a JSON response
});

// Admin Add Product Route (GET)
app.get('/admin/add-product', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'add-product.html'));
});

// Handle product registration (POST)
app.post('/admin/add-product', (req, res) => {
    const { name, productId, price, category, manufacturingDate, expirationDate } = req.body;

    // Read existing products from file
    const products = readProductsFromFile();

    // Check if product already exists
    const existingProduct = products.find(product => product.productId === productId);
    if (existingProduct) {
        return res.send('Product ID already exists.');
    }

    // Create new product object
    const newProduct = { name, productId, price, category, manufacturingDate, expirationDate };

    // Add new product to the list
    products.push(newProduct);

    // Save the updated product list back to the file
    writeProductsToFile(products);

    // Redirect to the product list page (HTML) after adding the product
    res.redirect('/admin/product-list'); // Redirect to the HTML page, not API
});

// Route to serve the product list HTML page
app.get('/admin/product-list', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'product-list.html')); // Serve the actual HTML file
});

// User Product Search Route (GET) to serve the HTML page
app.get('/user/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user-search.html'));
});


// User Product Search Route (GET)
app.get('/user/search', (req, res) => {
    const { query, category } = req.query;

    // Read existing products from file
    let products = readProductsFromFile();

    // Filter products by query (name)
    if (query) {
        products = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Filter products by category
    if (category) {
        products = products.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Return filtered products as JSON
    res.json(products);
});



// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
