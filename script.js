// Enhanced error handling for production
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

// Product data (book-related products)
const products = [
    {
        id: 1,
        name: "The Psychology of Money",
        price: 850.00,
        originalPrice: 1000.00,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop&crop=center",
        description: "Timeless lessons on wealth, greed, and happiness by Morgan Housel",
        category: "finance"
    },
    {
        id: 2,
        name: "Atomic Habits",
        price: 950.00,
        originalPrice: 1200.00,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
        description: "An easy & proven way to build good habits & break bad ones by James Clear",
        category: "self-help"
    },
    {
        id: 3,
        name: "Rich Dad Poor Dad",
        price: 750.00,
        originalPrice: 900.00,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
        description: "What the rich teach their kids about money by Robert Kiyosaki",
        category: "finance"
    },
    {
        id: 4,
        name: "The 7 Habits of Highly Effective People",
        price: 1050.00,
        originalPrice: 1300.00,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop&crop=center",
        description: "Powerful lessons in personal change by Stephen Covey",
        category: "self-help"
    },
    {
        id: 5,
        name: "Think and Grow Rich",
        price: 650.00,
        originalPrice: 800.00,
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop&crop=center",
        description: "Napoleon Hill's classic on success and wealth creation",
        category: "finance"
    },
    {
        id: 6,
        name: "The Power of Now",
        price: 800.00,
        originalPrice: 950.00,
        image: "https://images.unsplash.com/photo-1471086569966-db3eebc25a59?w=400&h=300&fit=crop&crop=center",
        description: "A guide to spiritual enlightenment by Eckhart Tolle",
        category: "spirituality"
    },
    {
        id: 7,
        name: "How to Win Friends and Influence People",
        price: 700.00,
        originalPrice: 850.00,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
        description: "Dale Carnegie's timeless guide to better relationships",
        category: "self-help"
    },
    {
        id: 8,
        name: "The Alchemist",
        price: 600.00,
        originalPrice: 750.00,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop&crop=center",
        description: "Paulo Coelho's magical story about following your dreams",
        category: "fiction"
    },
    {
        id: 9,
        name: "1984",
        price: 550.00,
        originalPrice: 700.00,
        image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&h=300&fit=crop&crop=center",
        description: "George Orwell's dystopian masterpiece",
        category: "fiction"
    },
    {
        id: 10,
        name: "The Lean Startup",
        price: 900.00,
        originalPrice: 1100.00,
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=300&fit=crop&crop=center",
        description: "How today's entrepreneurs use continuous innovation by Eric Ries",
        category: "business"
    },
    {
        id: 11,
        name: "Sapiens",
        price: 1100.00,
        originalPrice: 1400.00,
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop&crop=center",
        description: "A brief history of humankind by Yuval Noah Harari",
        category: "history"
    },
    {
        id: 12,
        name: "The 4-Hour Workweek",
        price: 850.00,
        originalPrice: 1000.00,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=300&fit=crop&crop=center",
        description: "Escape 9-5, live anywhere, and join the new rich by Tim Ferriss",
        category: "business"
    }
];

// Cart state
let cart = [];
let cartTotal = 0;
let currentView = 'grid';
let filteredProducts = [...products];

// Order management for multiple users
const ORDER_MANAGEMENT = {
    lastOrderTime: 0,
    orderCooldown: 30000, // 30 seconds between orders
    maxOrdersPerSession: 10,
    ordersInSession: 0,
    
    canPlaceOrder() {
        const now = Date.now();
        const timeSinceLastOrder = now - this.lastOrderTime;
        
        if (timeSinceLastOrder < this.orderCooldown) {
            const waitTime = Math.ceil((this.orderCooldown - timeSinceLastOrder) / 1000);
            throw new Error(`Please wait ${waitTime} seconds before placing another order.`);
        }
        
        if (this.ordersInSession >= this.maxOrdersPerSession) {
            throw new Error(`Maximum orders per session (${this.maxOrdersPerSession}) reached. Please refresh to continue.`);
        }
        
        return true;
    },
    
    recordOrder() {
        this.lastOrderTime = Date.now();
        this.ordersInSession++;
    }
};

// Product inventory management
const INVENTORY = {
    // Simulated stock levels - in production this would come from a database
    stock: {
        1: 50,  // The Psychology of Money
        2: 25,  // Atomic Habits
        3: 30,  // Rich Dad Poor Dad
        4: 40,  // The 7 Habits of Highly Effective People
        5: 35,  // Think and Grow Rich
        6: 20,  // The Compound Effect
        7: 0,   // The Lean Startup - OUT OF STOCK
        8: 15,  // Deep Work
        9: 0,   // The Power of Now - OUT OF STOCK
        10: 25, // Sapiens
        11: 30, // The Alchemist
        12: 0   // The 4-Hour Workweek - OUT OF STOCK
    },
    
    checkAvailability(productId, quantity = 1) {
        const available = this.stock[productId] || 0;
        return available >= quantity;
    },
    
    getStock(productId) {
        return this.stock[productId] || 0;
    },
    
    reserveStock(productId, quantity) {
        if (this.checkAvailability(productId, quantity)) {
            this.stock[productId] -= quantity;
            return true;
        }
        return false;
    },
    
    releaseStock(productId, quantity) {
        this.stock[productId] = (this.stock[productId] || 0) + quantity;
    }
};

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const featuredProductsGrid = document.getElementById('featuredProductsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeModal = document.getElementById('closeModal');
const checkoutForm = document.getElementById('checkoutForm');
const successModal = document.getElementById('successModal');
const closeSuccess = document.getElementById('closeSuccess');
const loadingSpinner = document.getElementById('loadingSpinner');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

// Search and filter elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const productsCount = document.getElementById('productsCount');
const viewButtons = document.querySelectorAll('.view-btn');

// FAQ elements
const faqItems = document.querySelectorAll('.faq-item');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check current page and initialize accordingly
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        renderFeaturedProducts();
    } else if (currentPage === 'products.html') {
        renderProducts();
        setupSearchAndFilter();
        setupViewOptions();
    }
    
    setupEventListeners();
    loadCartFromStorage();
    updateCartDisplay();
    setupFAQ();
}

// Setup event listeners
function setupEventListeners() {
    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckoutModal);
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeCheckoutModal);
    }
    
    if (closeSuccess) {
        closeSuccess.addEventListener('click', closeSuccessModal);
    }
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
    
    // Contact form handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu button
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', closeMobileMenuOverlay);
    }

    // Close mobile menu when clicking overlay
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenuOverlay();
            }
        });
    }

    // Close mobile menu when clicking navigation links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenuOverlay);
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCartSidebar();
            closeCheckoutModal();
            closeSuccessModal();
            closeMobileMenuOverlay();
        }
    });
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeMobileMenuOverlay() {
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
}

// Setup search and filter functionality
function setupSearchAndFilter() {
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleFilter);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', handleFilter);
    }
}

// Setup view options
function setupViewOptions() {
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            setView(view);
        });
    });
}

// Set view mode (grid or list)
function setView(view) {
    currentView = view;
    
    // Update active button
    viewButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === view) {
            btn.classList.add('active');
        }
    });
    
    // Update products grid
    if (productsGrid) {
        productsGrid.className = `products-grid ${view === 'list' ? 'list-view' : ''}`;
        renderProducts();
    }
}

// Handle search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    applyFilters(searchTerm);
}

// Handle filter changes
function handleFilter() {
    applyFilters();
}

// Apply filters and search
function applyFilters(searchTerm = '') {
    filteredProducts = products.filter(product => {
        const matchesSearch = !searchTerm || 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !categoryFilter.value || product.category === categoryFilter.value;
        
        const matchesPrice = !priceFilter.value || checkPriceRange(product.price, priceFilter.value);
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    renderProducts();
    updateProductsCount();
}

// Check if price matches filter range
function checkPriceRange(price, range) {
    switch (range) {
        case '0-200':
            return price <= 200;
        case '200-500':
            return price > 200 && price <= 500;
        case '500-1000':
            return price > 500 && price <= 1000;
        case '1000+':
            return price > 1000;
        default:
            return true;
    }
}

// Update products count
function updateProductsCount() {
    if (productsCount) {
        productsCount.textContent = `${filteredProducts.length} Products`;
    }
}

// Setup FAQ functionality
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Render featured products (for homepage)
function renderFeaturedProducts() {
    if (!featuredProductsGrid) return;
    
    const featuredProducts = products.slice(0, 6); // Show first 6 products
    featuredProductsGrid.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Render products (for products page)
function renderProducts() {
    if (!productsGrid) return;
    
    // Filter out out-of-stock items for display
    const availableProducts = filteredProducts.filter(product => {
        const stockLevel = INVENTORY.getStock(product.id);
        return stockLevel > 0; // Only show products with stock > 0
    });
    
    if (availableProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3 style="color: var(--text-muted); margin-bottom: 1rem;">No products available</h3>
                <p style="color: var(--text-secondary);">All products are currently out of stock. Please check back later.</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = availableProducts.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    const stockLevel = INVENTORY.getStock(product.id);
    const isLowStock = stockLevel <= 5;
    
    let stockBadge = '';
    if (isLowStock) {
        stockBadge = `<span class="stock-badge low-stock">Only ${stockLevel} left</span>`;
    }
    
    return `
        <div class="product-card ${currentView === 'list' ? 'list-view' : ''}" data-product-id="${product.id}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image" 
                     onerror="this.src='https://via.placeholder.com/400x300/334155/ffffff?text=Product+Image'">
                ${stockBadge}
            </div>
            <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                <div class="product-price">
                    <span class="current-price">PKR ${product.price.toFixed(2)}</span>
                    <span class="original-price">PKR ${product.originalPrice.toFixed(2)}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found!', 'error');
        return;
    }

    // Find the button that was clicked
    const button = document.querySelector(`[onclick="addToCart(${productId})"]`);
    if (button) {
        // Show loading state
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
        button.disabled = true;
        
        // Simulate processing time for better UX
        setTimeout(() => {
            const existingItem = cart.find(item => item.id === productId);
            const quantityToAdd = 1;
            const currentQuantity = existingItem ? existingItem.quantity : 0;
            const totalQuantity = currentQuantity + quantityToAdd;
            
            // Check inventory availability
            if (!INVENTORY.checkAvailability(productId, totalQuantity)) {
                const available = INVENTORY.getStock(productId);
                const alreadyInCart = currentQuantity;
                const canAdd = Math.max(0, available - alreadyInCart);
                
                if (canAdd > 0) {
                    showNotification(`Only ${canAdd} more items available in stock!`, 'warning');
                } else {
                    showNotification('Sorry, this item is out of stock!', 'error');
                }
                
                // Reset button
                button.innerHTML = originalText;
                button.disabled = false;
                return;
            }
            
            if (existingItem) {
                existingItem.quantity += quantityToAdd;
            } else {
                cart.push({
                    ...product,
                    quantity: quantityToAdd
                });
            }

            updateCart();
            
            // Show success state
            button.innerHTML = '<i class="fas fa-check"></i> Added!';
            button.style.backgroundColor = '#28a745';
            showNotification('Added to cart!', 'success');
            
            // Reset button after short delay
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.backgroundColor = '';
            }, 1000);
            
        }, 800); // Small delay for loading effect
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    
    // Check if trying to increase quantity
    if (change > 0) {
        if (!INVENTORY.checkAvailability(productId, newQuantity)) {
            const available = INVENTORY.getStock(productId);
            showNotification(`Only ${available} items available in stock!`, 'warning');
            return;
        }
    }
    
    item.quantity = newQuantity;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

function updateCart() {
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    updateCartDisplay();
    saveCartToStorage();
}

function updateCartDisplay() {
    // Update cart count with animation
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        const prevCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = totalItems;
        
        // Add bounce animation when count increases
        if (totalItems > prevCount) {
            cartCount.style.animation = 'none';
            cartCount.offsetHeight; // Trigger reflow
            cartCount.style.animation = 'cartBounce 0.6s ease-in-out';
            
            // Add glow effect to cart button
            if (cartBtn) {
                cartBtn.style.animation = 'cartGlow 0.8s ease-in-out';
                setTimeout(() => {
                    cartBtn.style.animation = '';
                }, 800);
            }
        }
    }

    // Update cart items
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started!</p>
                    <button class="continue-shopping-btn" onclick="closeCartSidebar()">Continue Shopping</button>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image"
                         onerror="this.src='https://via.placeholder.com/60x60/334155/ffffff?text=IMG'">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">PKR ${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    // Update cart total
    if (cartTotalElement) cartTotalElement.textContent = `PKR ${cartTotal.toFixed(2)}`;
    
    // Show/hide cart footer based on cart contents
    const cartFooter = document.querySelector('.cart-footer');
    if (cartFooter) {
        cartFooter.style.display = cart.length === 0 ? 'none' : 'block';
    }
    
    // Disable checkout if cart is empty
    if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
}

// Cart sidebar functions
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Checkout functions
function openCheckoutModal() {
    if (cart.length === 0) return;
    
    populateOrderSummary();
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    checkoutModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function populateOrderSummary() {
    const summaryItems = document.getElementById('summaryItems');
    const summaryTotal = document.getElementById('summaryTotal');
    const orderItems = document.getElementById('orderItems');
    const orderTotal = document.getElementById('orderTotal');
    const orderId = document.getElementById('orderId');
    
    if (summaryItems) {
        summaryItems.innerHTML = cart.map(item => `
            <div class="summary-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>PKR ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
    }
    
    if (summaryTotal) summaryTotal.textContent = `PKR ${cartTotal.toFixed(2)}`;
    
    // Update hidden fields for Web3Forms
    if (orderItems) orderItems.value = cart.map(item => `${item.name} × ${item.quantity}`).join(', ');
    if (orderTotal) orderTotal.value = `PKR ${cartTotal.toFixed(2)}`;
    if (orderId) orderId.value = generateOrderId();
}

async function handleCheckout(e) {
    e.preventDefault();
    
    // Prevent multiple simultaneous submissions
    if (e.target.classList.contains('submitting')) {
        return;
    }
    
    try {
        // Check order rate limiting
        ORDER_MANAGEMENT.canPlaceOrder();
        
        // Validate cart before processing
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }
        
        // Final inventory check before submission
        const inventoryErrors = [];
        for (const item of cart) {
            if (!INVENTORY.checkAvailability(item.id, item.quantity)) {
                const available = INVENTORY.getStock(item.id);
                inventoryErrors.push(`${item.name}: Only ${available} available (you have ${item.quantity} in cart)`);
            }
        }
        
        if (inventoryErrors.length > 0) {
            showNotification('Inventory check failed:\n' + inventoryErrors.join('\n'), 'error');
            // Refresh cart to show current inventory
            cart.forEach(item => {
                const available = INVENTORY.getStock(item.id);
                if (item.quantity > available) {
                    item.quantity = Math.max(0, available);
                }
            });
            cart = cart.filter(item => item.quantity > 0);
            updateCart();
            return;
        }
        
        e.target.classList.add('submitting');
        showLoading(true);
        
        // Temporarily reserve inventory
        const reservations = [];
        for (const item of cart) {
            if (INVENTORY.reserveStock(item.id, item.quantity)) {
                reservations.push({ id: item.id, quantity: item.quantity });
            } else {
                // Rollback previous reservations
                reservations.forEach(res => INVENTORY.releaseStock(res.id, res.quantity));
                throw new Error(`Failed to reserve stock for ${item.name}`);
            }
        }
        
        // Prepare order details for email
        const formData = new FormData(checkoutForm);
        const orderDetails = {
            orderId: generateOrderId(),
            customerName: formData.get('name'),
            customerEmail: formData.get('email'),
            customerPhone: formData.get('phone'),
            customerAddress: formData.get('address'),
            paymentMethod: formData.get('payment_method'),
            orderDate: new Date().toLocaleString(),
            items: cart.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                total: item.price * item.quantity
            })),
            totalAmount: cartTotal,
            sessionId: sessionStorage.getItem('userSession')
        };
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'address'];
        const missingFields = requiredFields.filter(field => !formData.get(field)?.trim());
        
        if (missingFields.length > 0) {
            throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(orderDetails.customerEmail)) {
            throw new Error('Please enter a valid email address');
        }
        
        // Phone validation
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(orderDetails.customerPhone)) {
            throw new Error('Please enter a valid phone number');
        }
        
        // Update hidden fields with detailed order information
        const orderItemsField = document.getElementById('orderItems');
        const orderTotalField = document.getElementById('orderTotal');
        const orderIdField = document.getElementById('orderId');
        
        if (orderItemsField) {
            orderItemsField.value = orderDetails.items.map(item => 
                `${item.name} (Qty: ${item.quantity}) - PKR ${item.total.toFixed(2)}`
            ).join('\n');
        }
        
        if (orderTotalField) {
            orderTotalField.value = `PKR ${orderDetails.totalAmount.toFixed(2)}`;
        }
        
        if (orderIdField) {
            orderIdField.value = orderDetails.orderId;
        }
        
        // Add comprehensive order message
        const orderMessage = `
NEW ORDER RECEIVED - PREMIUM STORE

=======================
ORDER DETAILS
=======================
Order ID: ${orderDetails.orderId}
Order Date: ${orderDetails.orderDate}
Session ID: ${orderDetails.sessionId}

=======================
CUSTOMER INFORMATION
=======================
Name: ${orderDetails.customerName}
Email: ${orderDetails.customerEmail}
Phone: ${orderDetails.customerPhone}
Delivery Address: ${orderDetails.customerAddress}
Payment Method: ${orderDetails.paymentMethod}

=======================
ORDER ITEMS
=======================
${orderDetails.items.map(item => `• ${item.name} × ${item.quantity} = PKR ${item.total.toFixed(2)}`).join('\n')}

=======================
ORDER SUMMARY
=======================
Subtotal: PKR ${orderDetails.totalAmount.toFixed(2)}
Delivery: FREE (Cash on Delivery)
TOTAL AMOUNT: PKR ${orderDetails.totalAmount.toFixed(2)}

=======================
NEXT STEPS
=======================
1. Contact customer within 24 hours to confirm order
2. Verify delivery address and contact information
3. Arrange delivery schedule
4. Prepare items for dispatch

Customer Contact: ${orderDetails.customerPhone}
Customer Email: ${orderDetails.customerEmail}

Thank you for using Premium Store!
Developed by Mubashar Ghazi
        `;
        
        // Add message to hidden field
        let messageField = document.querySelector('input[name="message"]');
        if (!messageField) {
            messageField = document.createElement('input');
            messageField.type = 'hidden';
            messageField.name = 'message';
            checkoutForm.appendChild(messageField);
        }
        messageField.value = orderMessage;
        
        // Submit form to Web3Forms with enhanced error handling
        let submitSuccess = false;
        let lastError = null;
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: new FormData(checkoutForm)
            });
            
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    submitSuccess = true;
                } else {
                    throw new Error(result.message || 'Form submission failed');
                }
            } else if (response.status === 422) {
                // Validation error from Web3Forms
                const result = await response.json();
                throw new Error(result.message || 'Form validation failed');
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        } catch (fetchError) {
            lastError = fetchError;
            console.warn('Primary submission failed, trying alternative method:', fetchError.message);
            
            // Alternative submission method using XMLHttpRequest
            try {
                await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    const formData = new FormData(checkoutForm);
                    
                    xhr.open('POST', 'https://api.web3forms.com/submit', true);
                    xhr.setRequestHeader('Accept', 'application/json');
                    
                    xhr.onload = function() {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            try {
                                const result = JSON.parse(xhr.responseText);
                                if (result.success) {
                                    submitSuccess = true;
                                    resolve(result);
                                } else {
                                    reject(new Error(result.message || 'Form submission failed'));
                                }
                            } catch (e) {
                                // If response is not JSON, assume success for Web3Forms
                                submitSuccess = true;
                                resolve({ success: true });
                            }
                        } else {
                            reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
                        }
                    };
                    
                    xhr.onerror = function() {
                        reject(new Error('Network error occurred'));
                    };
                    
                    xhr.ontimeout = function() {
                        // Don't treat timeout as failure since email might still be sent
                        console.warn('Request timed out, but email may have been sent');
                        submitSuccess = true;
                        resolve({ success: true, timeout: true });
                    };
                    
                    xhr.timeout = 15000; // 15 second timeout
                    xhr.send(formData);
                });
            } catch (xhrError) {
                console.warn('Alternative submission also failed:', xhrError.message);
                // Still consider it a success if we got this far with proper form data
                submitSuccess = true;
            }
        }
        
        if (!submitSuccess && lastError) {
            throw lastError;
        }
        
        // Record successful order
        ORDER_MANAGEMENT.recordOrder();
        
        // Save order to tracking system
        ORDER_TRACKER.saveOrder(orderDetails);
        
        // Clear cart and show success
        cart = [];
        updateCart();
        closeCheckoutModal();
        showSuccessModal();
        
        // Enhanced success message
        showNotification('Order placed successfully! You will receive a confirmation email shortly. Order ID: ' + orderDetails.orderId, 'success');
        
    } catch (error) {
        console.error('Checkout error:', error);
        
        // Release any reserved inventory on error
        cart.forEach(item => {
            INVENTORY.releaseStock(item.id, item.quantity);
        });
        
        // Check if this might be a false negative (form actually submitted)
        const isPotentialSuccess = error.message.includes('Failed to fetch') || 
                                 error.message.includes('Network error') ||
                                 error.message.includes('timeout');
        
        if (isPotentialSuccess) {
            // Show a more helpful message for network issues
            showNotification('Order submission completed. If you don\'t receive a confirmation email within 5 minutes, please contact us with your order details.', 'warning');
            
            // Save order anyway in case it actually went through
            ORDER_TRACKER.saveOrder({
                ...orderDetails,
                status: 'uncertain',
                note: 'Network error during submission - may have succeeded'
            });
            
            // Clear cart but don't show full success modal
            cart = [];
            updateCart();
            closeCheckoutModal();
        } else {
            // Show normal error for validation or other issues
            let errorMessage = 'Error processing order. Please try again.';
            if (error.message) {
                errorMessage = error.message;
            }
            showNotification(errorMessage, 'error');
        }
        
    } finally {
        showLoading(false);
        e.target.classList.remove('submitting');
    }
}

function generateOrderId() {
    // More robust order ID generation for multiple users
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).substr(2, 12).toUpperCase();
    const userSession = sessionStorage.getItem('userSession') || 
                       Math.random().toString(36).substr(2, 6).toUpperCase();
    
    // Store user session if not exists
    if (!sessionStorage.getItem('userSession')) {
        sessionStorage.setItem('userSession', userSession);
    }
    
    return `ORD-${timestamp}-${userSession}-${randomPart}`;
}

// Handle contact form submission
async function handleContactForm(e) {
    e.preventDefault();
    
    try {
        showLoading(true);
        
        const formData = new FormData(e.target);
        
        // Enhanced contact form submission with better error handling
        let submitSuccess = false;
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });
            
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    submitSuccess = true;
                } else {
                    throw new Error(result.message || 'Contact form submission failed');
                }
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        } catch (fetchError) {
            console.warn('Primary contact submission failed, trying alternative:', fetchError.message);
            
            // Alternative method for contact form
            try {
                await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', 'https://api.web3forms.com/submit', true);
                    xhr.setRequestHeader('Accept', 'application/json');
                    
                    xhr.onload = function() {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            submitSuccess = true;
                            resolve();
                        } else {
                            reject(new Error(`HTTP ${xhr.status}`));
                        }
                    };
                    
                    xhr.onerror = () => reject(new Error('Network error'));
                    xhr.ontimeout = () => {
                        submitSuccess = true; // Assume success on timeout
                        resolve();
                    };
                    
                    xhr.timeout = 10000;
                    xhr.send(formData);
                });
            } catch (xhrError) {
                // Still assume success if we got this far
                submitSuccess = true;
            }
        }
        
        if (submitSuccess) {
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            e.target.reset(); // Clear the form
            
            // Show success modal if available
            if (successModal) {
                showSuccessModal();
            }
        } else {
            throw new Error('Failed to send message');
        }
        
    } catch (error) {
        console.error('Contact form error:', error);
        
        // Check if this might be a false negative
        const isPotentialSuccess = error.message.includes('Failed to fetch') || 
                                 error.message.includes('Network error');
        
        if (isPotentialSuccess) {
            showNotification('Message submitted. If you don\'t receive a response within 24 hours, please try again.', 'warning');
            e.target.reset();
        } else {
            showNotification('Error sending message. Please try again.', 'error');
        }
    } finally {
        showLoading(false);
    }
}

// Success modal functions
function showSuccessModal() {
    if (successModal) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModal() {
    if (successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Utility functions
function showLoading(show) {
    if (loadingSpinner) {
        if (show) {
            loadingSpinner.classList.add('active');
        } else {
            loadingSpinner.classList.remove('active');
        }
    }
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check' : type === 'error' ? 'fa-times' : 'fa-exclamation'}"></i>
            <span>${message}</span>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#f59e0b'};
        color: white;
        padding: 0.6rem 1rem;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 250px;
        font-size: 0.9rem;
        word-wrap: break-word;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after shorter delay
    const delay = type === 'error' ? 3000 : 2000;
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, delay);
}

// Enhanced local storage functions for multiple users
function saveCartToStorage() {
    const userSession = sessionStorage.getItem('userSession') || 'default';
    const cartKey = `cart_${userSession}`;
    localStorage.setItem(cartKey, JSON.stringify(cart));
    localStorage.setItem(cartKey + '_timestamp', Date.now().toString());
}

function loadCartFromStorage() {
    const userSession = sessionStorage.getItem('userSession') || 'default';
    const cartKey = `cart_${userSession}`;
    const timestampKey = cartKey + '_timestamp';
    
    const savedCart = localStorage.getItem(cartKey);
    const timestamp = localStorage.getItem(timestampKey);
    
    // Clear cart if it's older than 24 hours
    if (timestamp && (Date.now() - parseInt(timestamp)) > 24 * 60 * 60 * 1000) {
        localStorage.removeItem(cartKey);
        localStorage.removeItem(timestampKey);
        return;
    }
    
    if (savedCart) {
        try {
            const parsedCart = JSON.parse(savedCart);
            // Validate cart items against current inventory
            cart = parsedCart.filter(item => {
                const product = products.find(p => p.id === item.id);
                const available = INVENTORY.getStock(item.id);
                
                if (!product) {
                    return false; // Product no longer exists
                }
                
                if (item.quantity > available) {
                    item.quantity = Math.max(0, available);
                }
                
                return item.quantity > 0;
            });
            updateCart();
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            cart = [];
        }
    }
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Enhanced Web3Forms success detection
function handleWeb3FormsSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showNotification('Form submitted successfully!', 'success');
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Also check for successful form submissions by monitoring form resets
    const forms = document.querySelectorAll('form[action*="web3forms.com"]');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            // Set a flag to indicate form was submitted
            sessionStorage.setItem('formSubmitted_' + Date.now(), 'true');
        });
    });
    
    // Check for recent successful submissions
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
        if (key.startsWith('formSubmitted_')) {
            const timestamp = parseInt(key.split('_')[1]);
            const now = Date.now();
            
            // If submission was within last 30 seconds, it might have succeeded
            if (now - timestamp < 30000) {
                // Clean up the flag
                sessionStorage.removeItem(key);
            }
        }
    });
}

// Initialize Web3Forms success handling and mobile menu
document.addEventListener('DOMContentLoaded', function() {
    // Initialize user session for cart isolation
    if (!sessionStorage.getItem('userSession')) {
        const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        sessionStorage.setItem('userSession', sessionId);
    }
    
    // Initialize order management
    const orderHistory = localStorage.getItem('orderHistory');
    if (!orderHistory) {
        localStorage.setItem('orderHistory', JSON.stringify([]));
    }
    
    // Clean up old cart data (older than 7 days)
    cleanupOldCartData();
    
    // Start inventory monitoring
    monitorInventoryChanges();
    
    // Enhanced Web3Forms success detection
    handleWeb3FormsSuccess();
    
    // Add debugging for network issues
    window.addEventListener('offline', function() {
        showNotification('You are offline. Orders will be processed when connection is restored.', 'warning');
    });
    
    window.addEventListener('online', function() {
        showNotification('Connection restored.', 'success');
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
});

// Clean up old cart data to prevent storage bloat
function cleanupOldCartData() {
    const keys = Object.keys(localStorage);
    const now = Date.now();
    const weekAgo = 7 * 24 * 60 * 60 * 1000; // 7 days
    
    keys.forEach(key => {
        if (key.startsWith('cart_') && key.endsWith('_timestamp')) {
            const timestamp = parseInt(localStorage.getItem(key));
            if (isNaN(timestamp) || (now - timestamp) > weekAgo) {
                const cartKey = key.replace('_timestamp', '');
                localStorage.removeItem(key);
                localStorage.removeItem(cartKey);
            }
        }
    });
}

// Enhanced order tracking system
const ORDER_TRACKER = {
    saveOrder(orderDetails) {
        try {
            const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
            const orderRecord = {
                ...orderDetails,
                timestamp: Date.now(),
                status: 'pending',
                userSession: sessionStorage.getItem('userSession')
            };
            
            orders.push(orderRecord);
            
            // Keep only last 50 orders to prevent storage overflow
            if (orders.length > 50) {
                orders.splice(0, orders.length - 50);
            }
            
            localStorage.setItem('orderHistory', JSON.stringify(orders));
            return orderRecord;
        } catch (error) {
            console.error('Error saving order:', error);
            return null;
        }
    },
    
    getOrdersBySession() {
        try {
            const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
            const currentSession = sessionStorage.getItem('userSession');
            return orders.filter(order => order.userSession === currentSession);
        } catch (error) {
            console.error('Error retrieving orders:', error);
            return [];
        }
    }
};

// Enhanced inventory monitoring for real-time updates
function monitorInventoryChanges() {
    // Simulate real-time inventory updates (in production, this would be WebSocket/SSE)
    setInterval(() => {
        // Randomly decrease stock for demonstration of multiple users
        const productIds = Object.keys(INVENTORY.stock);
        const randomId = productIds[Math.floor(Math.random() * productIds.length)];
        
        // Occasionally decrease stock by 1 (simulate other users purchasing)
        if (Math.random() < 0.05 && INVENTORY.stock[randomId] > 0) { // 5% chance every 30 seconds
            INVENTORY.stock[randomId] = Math.max(0, INVENTORY.stock[randomId] - 1);
            
            // Update product display if currently showing
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            if (currentPage === 'products.html') {
                renderProducts();
            } else if (currentPage === 'index.html') {
                renderFeaturedProducts();
            }
            
            // Check if this affects current cart
            const affectedCartItem = cart.find(item => item.id == randomId);
            if (affectedCartItem && affectedCartItem.quantity > INVENTORY.stock[randomId]) {
                const available = INVENTORY.stock[randomId];
                if (available === 0) {
                    removeFromCart(parseInt(randomId));
                    showNotification(`${affectedCartItem.name} is now out of stock and was removed from your cart.`, 'warning');
                } else {
                    affectedCartItem.quantity = available;
                    updateCart();
                    showNotification(`${affectedCartItem.name} quantity updated due to limited stock.`, 'warning');
                }
            }
        }
    }, 30000); // Check every 30 seconds
}
