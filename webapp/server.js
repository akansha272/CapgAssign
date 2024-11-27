const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Sample hardcoded credentials (for simplicity)
const validCredentials = {
    username: 'user123',
    password: 'password123'
};

const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url, true).pathname;

    // Serve static files (CSS, JS, etc.) from the "public" folder
    if (pathname.startsWith('/public/')) {
        const filePath = path.join(__dirname, pathname);
        const extname = path.extname(filePath);

        let contentType = 'text/plain';
        if (extname === '.html') contentType = 'text/html';
        else if (extname === '.css') contentType = 'text/css';
        else if (extname === '.js') contentType = 'application/javascript';

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
        return;
    }

    // Handle login requests
    if (pathname === '/login') {
        if (req.method === 'GET') {
            fs.readFile('login.html', 'utf-8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error loading the login page');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            });
        } else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
            });

            req.on('end', () => {
                const postData = new URLSearchParams(body);
                const username = postData.get('username');
                const password = postData.get('password');

                // Check credentials
                if (username === validCredentials.username && password === validCredentials.password) {
                    res.writeHead(302, {
                        'Location': '/welcome'
                    });
                    res.end();
                } else {
                    res.writeHead(401, { 'Content-Type': 'text/html' });
                    res.end('<h1 style="color: #e74c3c;">Invalid Credentials! <a href="/login" style="color: #2980b9;">Try again</a></h1>');
                }
            });
        }
    } else if (pathname === '/welcome') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to the Dashboard!</h1>');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Page Not Found!</h1>');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
