document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        filterButtons: document.querySelectorAll('.filter-btn'),
        addToCartButtons: document.querySelectorAll('.add-to-cart-btn'),
        productCards: document.querySelectorAll('.product-card'),
        cartCount: document.querySelector('.cart-count'),
        backToTopBtn: document.querySelector('.back-to-top'),
        mobileMenuToggle: document.querySelector('.mobile-nav-toggle'),
        mobileMenu: document.querySelector('.mobile-nav')
    };

    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Event Listeners
    function initEventListeners() {
        // Filter buttons
        elements.filterButtons.forEach(button => {
            button.addEventListener('click', filterProducts);
        });

        // Add to cart buttons
        elements.addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });

        // Back to top button
        elements.backToTopBtn?.addEventListener('click', scrollToTop);
        window.addEventListener('scroll', toggleBackToTop);

        // Mobile menu
        elements.mobileMenuToggle?.addEventListener('click', toggleMobileMenu);
    }

    // Core Functions
    function filterProducts(e) {
        const category = e.target.dataset.filter;
        elements.productCards.forEach(card => {
            card.style.display = card.dataset.category === category || category === 'all' 
                ? 'block' 
                : 'none';
        });
    }

    function addToCart(e) {
        const productCard = e.target.closest('.product-card');
        const productId = productCard.dataset.id;
        
        // Find existing product or add new
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: productId,
                name: productCard.querySelector('.product-title').textContent,
                price: productCard.querySelector('.current-price').textContent,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showToast('Item added to cart');
    }

    // Helper Functions
    function updateCartCount() {
        if (elements.cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            elements.cartCount.textContent = totalItems;
            elements.cartCount.classList.add('animate');
            setTimeout(() => elements.cartCount.classList.remove('animate'), 500);
        }
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            toast.addEventListener('transitionend', () => toast.remove());
        }, 3000);
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function toggleBackToTop() {
        elements.backToTopBtn.style.display = 
            window.scrollY > 300 ? 'block' : 'none';
    }

    function toggleMobileMenu() {
        elements.mobileMenu.classList.toggle('active');
    }

    // Initialize
    initEventListeners();
});