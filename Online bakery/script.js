// Define the Product Constructor
function Product(name, price, weight, imageUrl) {
    this.name = name;
    this.price = price;
    this.weight = weight;
    this.imageUrl = imageUrl;
    this.addToCart = function() {
        cart.addItem(this);
    };
}

// Cart Object using Prototype
function Cart() {
    this.items = [];
    this.totalPrice = 0;
}

Cart.prototype.addItem = function(product) {
    this.items.push(product);
    this.totalPrice += product.price;
    updateCartCount();
    updateCartView();
};

Cart.prototype.removeItem = function(index) {
    this.totalPrice -= this.items[index].price;
    this.items.splice(index, 1);
    updateCartCount();
    updateCartView();
};

// Create cart instance
const cart = new Cart();

// Sample products
const products = [
    new Product('Chocolate Cake', 20.00, '1kg', 'images/cake.jpg'),
    new Product('Blueberry Muffin', 3.50, '200g', 'images/muffin.jpg'),
    new Product('Croissant', 2.00, '150g', 'images/croissant.jpg'),
    new Product('Lemon Cake', 25.00, '1.5kg', 'images/lemon_cake.jpg'),
    new Product('Apple Pie', 18.00, '1kg', 'images/apple_pie.jpg'),
    new Product('Cinnamon Roll', 3.00, '180g', 'images/cinnamon_roll.jpg')
];

// Render products dynamically
function renderProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        
        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Weight: ${product.weight}</p>
            <button onclick="addToCart('${product.name}')">Add to Cart</button>
        `;
        
        productsContainer.appendChild(productElement);
    });
}

// Add product to cart
function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    cart.addItem(product);
}

// Update the cart count in the header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.items.length;
}

// Update the cart view
function updateCartView() {
    const cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = ''; // Clear the cart

    cart.items.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} - $${item.price}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsList.appendChild(listItem);
    });

    // Update the total price
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.innerText = `Total: $${cart.totalPrice.toFixed(2)}`;
}

// Remove item from the cart
function removeFromCart(index) {
    cart.removeItem(index);
}

// Show and hide cart modal
// Show and hide cart modal
const cartModal = document.getElementById('cart-modal');
const viewCartBtn = document.getElementById('view-cart-btn');
const closeModal = document.getElementById('close-modal');

// Open cart modal
viewCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex'; // Show the modal
});

// Close cart modal when clicking the close button (×)
closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none'; // Hide the modal
});

// Hide the cart modal when clicking outside of the modal content area
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) { // If the background is clicked (not the modal content)
        cartModal.style.display = 'none'; // Hide the modal
    }
});


// Render products when page loads
renderProducts();
