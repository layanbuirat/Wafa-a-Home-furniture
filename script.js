document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    
    mobileNavToggle.addEventListener('click', function() {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileCloseBtn.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Mobile Dropdown Toggle
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    
    mobileDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            mobileDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        });
    });
    
    // Property Slider Navigation
    const propertiesContainer = document.querySelector('.properties-container');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    if (propertiesContainer && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', function() {
            propertiesContainer.scrollBy({
                left: -propertiesContainer.offsetWidth / 2,
                behavior: 'smooth'
            });
        });
        
        rightArrow.addEventListener('click', function() {
            propertiesContainer.scrollBy({
                left: propertiesContainer.offsetWidth / 2,
                behavior: 'smooth'
            });
        });
    }
    
    // Testimonial Slider Navigation
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialLeftArrow = document.createElement('button');
    const testimonialRightArrow = document.createElement('button');
    
    if (testimonialSlider) {
        testimonialLeftArrow.className = 'slider-arrow left-arrow';
        testimonialLeftArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
        testimonialRightArrow.className = 'slider-arrow right-arrow';
        testimonialRightArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        testimonialSlider.parentElement.insertBefore(testimonialLeftArrow, testimonialSlider);
        testimonialSlider.parentElement.insertBefore(testimonialRightArrow, testimonialSlider.nextSibling);
        
        testimonialLeftArrow.addEventListener('click', function() {
            testimonialSlider.scrollBy({
                left: -testimonialSlider.offsetWidth / 2,
                behavior: 'smooth'
            });
        });
        
        testimonialRightArrow.addEventListener('click', function() {
            testimonialSlider.scrollBy({
                left: testimonialSlider.offsetWidth / 2,
                behavior: 'smooth'
            });
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Wishlist and Cart Counters (Demo)
    const wishlistBtns = document.querySelectorAll('.btn-wishlist');
    const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
    const wishlistCount = document.querySelector('.wishlist-count');
    const cartCount = document.querySelector('.cart-count');
    
    let wishlistItems = 0;
    let cartItems = 0;
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                btn.innerHTML = '<i class="far fa-heart"></i>';
                wishlistItems--;
            } else {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-heart"></i>';
                wishlistItems++;
            }
            wishlistCount.textContent = wishlistItems;
        });
    });
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Add animation
            btn.textContent = 'Added!';
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
            }, 1000);
        });
    });
    
    // Quick View Modal (Demo)
    const quickViewBtns = document.querySelectorAll('.btn-quick-view');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Quick view feature would show product details here!');
        });
    });
    
    // Coupon Code Copy (Demo)
    const couponCode = document.querySelector('.coupon-section span');
    
    if (couponCode) {
        couponCode.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            alert(`Thank you for subscribing with ${emailInput.value}!`);
            emailInput.value = '';
        });
    }
    
    // Mobile Nav Close When Clicking Outside
    document.addEventListener('click', function(e) {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            e.target !== mobileNavToggle) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Prevent Default for Dropdown Links
    const dropdownLinks = document.querySelectorAll('.dropdown > a');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});
// Categories Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoriesTrack = document.querySelector('.categories-track');
    const prevBtn = document.querySelector('.prev-cat');
    const nextBtn = document.querySelector('.next-cat');
    const categoryCards = document.querySelectorAll('.category-card');
    const searchInput = document.querySelector('.category-search');
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    // Navigation controls
    prevBtn.addEventListener('click', () => {
        categoriesTrack.scrollBy({ left: -250, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        categoriesTrack.scrollBy({ left: 250, behavior: 'smooth' });
    });
    
    // Wishlist functionality
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            this.querySelector('i').classList.toggle('fas');
            this.querySelector('i').classList.toggle('far');
            
            // Animate heart
            if (this.classList.contains('active')) {
                this.querySelector('i').classList.add('animate__animated', 'animate__heartBeat');
                setTimeout(() => {
                    this.querySelector('i').classList.remove('animate__animated', 'animate__heartBeat');
                }, 1000);
            }
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        categoryCards.forEach(card => {
            const categoryName = card.querySelector('h3').textContent.toLowerCase();
            
            if (categoryName.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.add('animate__animated', 'animate__fadeIn');
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Hover animations for icons
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.category-icon');
            icon.classList.add('animate__animated', 'animate__pulse');
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.category-icon');
            icon.classList.remove('animate__animated', 'animate__pulse');
        });
    });
});