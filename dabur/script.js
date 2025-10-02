// Main JavaScript for Dabur Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    let cart = [];
    let cartCount = 0;
    let cartTotal = 0;

    // Elements
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const loginBtn = document.getElementById('loginBtn');
    const cartBtn = document.getElementById('cartBtn');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const notification = document.getElementById('notification');
    const cartCountElement = document.querySelector('.cart-count');
    const exploreBtn = document.getElementById('exploreBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const loginModal = document.getElementById('loginModal');
    const cartModal = document.getElementById('cartModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const closeCartModal = document.getElementById('closeCartModal');
    const loginForm = document.getElementById('loginForm');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const cartItems = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    // Product data
    const products = {
        honey: { name: 'Dabur Honey', price: 220 },
        paste: { name: 'Dabur Red Paste', price: 85 },
        oil: { name: 'Dabur Amla Hair Oil', price: 180 },
        chyawanprash: { name: 'Dabur Chyawanprash', price: 320 }
    };

    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            showNotification(`Searching for: "${searchTerm}"`);
            // In real application, you would filter products or redirect
            console.log(`Search term: ${searchTerm}`);
        } else {
            showNotification('Please enter a search term', 'error');
        }
    }

    // Login functionality
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'flex';
    });

    closeLoginModal.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simulate login process
        showNotification('Login successful! Welcome back.');
        loginModal.style.display = 'none';
        loginBtn.innerHTML = '<i class="fas fa-user"></i> My Account';
        console.log('User logged in:', email);
    });

    // Cart functionality
    cartBtn.addEventListener('click', function() {
        updateCartModal();
        cartModal.style.display = 'flex';
    });

    closeCartModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    // Add to cart buttons
    document.querySelectorAll('.product-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            addToCart(productId);
        });
    });

    function addToCart(productId) {
        const product = products[productId];
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
        
        updateCartCount();
        updateCartTotal();
        showNotification(`${product.name} added to cart!`);
    }

    function updateCartCount() {
        cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = cartCount;
    }

    function updateCartTotal() {
        cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        cartTotalElement.textContent = cartTotal;
    }

    function updateCartModal() {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong>
                        <br>₹${item.price} x ${item.quantity}
                    </div>
                    <button class="remove-item" data-id="${item.id}">&times;</button>
                </div>
            `).join('');
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = this.getAttribute('data-id');
                    removeFromCart(itemId);
                });
            });
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartCount();
        updateCartTotal();
        updateCartModal();
        showNotification('Item removed from cart');
    }

    // Checkout functionality
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty', 'error');
            return;
        }
        
        showNotification('Proceeding to checkout...');
        // In real application, redirect to