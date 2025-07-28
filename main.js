/* ================================================
Tab Holidays - Travel Company Website JavaScript - FIXED VERSION
================================================ */

// ================================================
// Smooth Scrolling for Navigation Links
// ================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================================
// Navbar Scroll Effect and Scroll to Top Button
// ================================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = document.getElementById('scrollTop');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        scrollTop.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        scrollTop.classList.remove('visible');
    }
});

// ================================================
// Scroll to Top Functionality
// ================================================
document.getElementById('scrollTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================================================
// Animate Elements on Scroll
// ================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ================================================
// Counter Animation for Statistics
// ================================================
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 20);
}

// Animate counters when they come into view
const statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseFloat(text.replace(/\D/g, ''));
            
            if (text.includes('24/7')) {
                statNumber.textContent = '24/7';
            } else if (text.includes('4.8')) {
                // Animate the rating from 0 to 4.8
                let current = 0;
                const increment = 4.8 / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= 4.8) {
                        statNumber.textContent = '4.8';
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = current.toFixed(1);
                    }
                }, 20);
            } else {
                animateCounter(statNumber, number);
            }
            statObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stats').forEach(stat => {
    statObserver.observe(stat);
});

// ================================================
// Enhanced Testimonial Cards Equal Height Management - FIXED VERSION
// ================================================
function equalizeTestimonialHeights() {
    // Get all currently visible testimonial cards
    const visibleCards = document.querySelectorAll('.carousel-item.active .testimonial-card');
    
    if (visibleCards.length === 0) return;
    
    let maxHeight = 0;
    
    // Reset heights first to get natural heights
    visibleCards.forEach(card => {
        card.style.minHeight = 'auto';
        card.style.height = 'auto';
    });
    
    // Small delay to ensure layout is calculated
    setTimeout(() => {
        // Find maximum natural height
        visibleCards.forEach(card => {
            const height = card.offsetHeight;
            if (height > maxHeight) {
                maxHeight = height;
            }
        });
        
        // Set all visible cards to maximum height
        visibleCards.forEach(card => {
            card.style.minHeight = maxHeight + 'px';
        });
    }, 50);
}

// ================================================
// Testimonials Carousel Enhancement - FIXED VERSION
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    
    if (testimonialCarousel) {
        // Initialize Bootstrap carousel with auto-switching DISABLED
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: false, // DISABLED auto-switching by setting interval to false
            wrap: true,
            touch: true
        });
        
        // Equalize heights on carousel slide events
        testimonialCarousel.addEventListener('slid.bs.carousel', function(e) {
            setTimeout(equalizeTestimonialHeights, 100);
        });
        
        // Initial height equalization
        setTimeout(equalizeTestimonialHeights, 200);
        
        // Keep keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                carousel.prev();
            } else if (e.key === 'ArrowRight') {
                carousel.next();
            }
        });
        
        // Animate testimonial cards when they come into view
        const testimonialObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        document.querySelectorAll('.testimonial-card').forEach(card => {
            testimonialObserver.observe(card);
        });
    }
});

// ================================================
// Testimonial Card Hover Effects
// ================================================
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) rotateY(5deg)';
        this.style.boxShadow = '0 30px 60px rgba(32, 178, 170, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateY(0deg)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

// ================================================
// Web3Forms Contact Form Submission
// ================================================
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="bi bi-arrow-clockwise spin me-2"></i>Sending...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(this);
        
        // Submit to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Success state
            submitBtn.innerHTML = '<i class="bi bi-check me-2"></i>Message Sent!';
            submitBtn.style.background = '#28a745';
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.innerHTML = '<i class="bi bi-check-circle me-2"></i>Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
            this.appendChild(successMessage);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                successMessage.remove();
            }, 3000);
        } else {
            throw new Error(result.message || 'Something went wrong');
        }
    } catch (error) {
        console.error('Error:', error);
        
        // Error state
        submitBtn.innerHTML = '<i class="bi bi-exclamation-triangle me-2"></i>Error - Try Again';
        submitBtn.style.background = '#dc3545';
        
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger mt-3';
        errorMessage.innerHTML = '<i class="bi bi-exclamation-triangle me-2"></i>Sorry, there was an error sending your message. Please try again or contact us directly.';
        this.appendChild(errorMessage);
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            errorMessage.remove();
        }, 3000);
    }
});

// ================================================
// Destination Cards Hover Effects
// ================================================
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotateY(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotateY(0deg)';
    });
});

// ================================================
// Service Cards Click Effect with Ripple Animation
// ================================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(32, 178, 170, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ================================================
// Dynamic CSS for Animations
// ================================================
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes testimonialSlideIn {
        from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .testimonial-card.animated {
        animation: testimonialSlideIn 0.8s ease-out forwards;
    }
`;
document.head.appendChild(style);

// ================================================
// Page Loading Animation
// ================================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Multiple delays to ensure testimonial heights are calculated properly
    setTimeout(equalizeTestimonialHeights, 100);
    setTimeout(equalizeTestimonialHeights, 500);
    setTimeout(equalizeTestimonialHeights, 1000);
});

// ================================================
// Mobile Menu Enhancement
// ================================================
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
        this.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth < 992) {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

// ================================================
// Enhanced Testimonial Carousel Indicators
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('testimonialCarousel');
    const indicators = document.querySelectorAll('.carousel-indicators-custom button');
    
    if (carousel && indicators.length > 0) {
        // Update active indicator when carousel slides
        carousel.addEventListener('slid.bs.carousel', function(e) {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === e.to);
            });
            
            // Equalize heights after slide
            setTimeout(equalizeTestimonialHeights, 50);
        });
        
        // Add click functionality to custom indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                const bsCarousel = bootstrap.Carousel.getInstance(carousel);
                bsCarousel.to(index);
            });
        });
    }
});

// ================================================
// Touch/Swipe Support for Testimonials on Mobile - SINGLE DECLARATION
// ================================================
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

const testimonialCarouselElement = document.getElementById('testimonialCarousel');

if (testimonialCarouselElement) {
    testimonialCarouselElement.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    
    testimonialCarouselElement.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
}

function handleSwipe() {
    const carousel = bootstrap.Carousel.getInstance(testimonialCarouselElement);
    if (!carousel) return;
    
    const horizontalDiff = touchEndX - touchStartX;
    const verticalDiff = Math.abs(touchEndY - touchStartY);
    
    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(horizontalDiff) > verticalDiff) {
        if (horizontalDiff < -50) {
            // Swipe left - next slide
            carousel.next();
        } else if (horizontalDiff > 50) {
            // Swipe right - previous slide
            carousel.prev();
        }
    }
}

// ================================================
// Testimonial Rating Stars Animation
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    const ratingObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stars = entry.target.querySelectorAll('.bi-star-fill');
                stars.forEach((star, index) => {
                    setTimeout(() => {
                        star.style.transform = 'scale(1.2)';
                        star.style.color = '#ffc107';
                        setTimeout(() => {
                            star.style.transform = 'scale(1)';
                        }, 200);
                    }, index * 100);
                });
                ratingObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    document.querySelectorAll('.rating').forEach(rating => {
        ratingObserver.observe(rating);
    });
});

// ================================================
// Enhanced Parallax Effect for Floating Elements
// ================================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-icon');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ================================================
// Window Event Listeners - Enhanced
// ================================================
window.addEventListener('resize', function() {
    // Debounce resize events for testimonials
    clearTimeout(window.testimonialResizeTimeout);
    window.testimonialResizeTimeout = setTimeout(function() {
        equalizeTestimonialHeights();
        // Run again after a short delay for better consistency
        setTimeout(equalizeTestimonialHeights, 100);
    }, 250);
});

// ================================================
// Form Validation Enhancement
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }
        }
        
        // Update field styling
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            removeErrorMessage(field);
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
            showErrorMessage(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showErrorMessage(field, message) {
        removeErrorMessage(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function removeErrorMessage(field) {
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    }
});

// ================================================
// Performance Optimization - Debounced Scroll
// ================================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Any heavy scroll operations can be placed here
    // Currently handled by individual scroll listeners above
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ================================================
// Accessibility Enhancements
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    // Add skip link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link visually-hidden-focusable';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 9999;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if it doesn't exist
    const mainContent = document.querySelector('main, #home, .hero');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
    
    // Improve carousel accessibility
    const carouselControls = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');
    carouselControls.forEach(control => {
        control.setAttribute('role', 'button');
        if (!control.getAttribute('aria-label')) {
            const isNext = control.classList.contains('carousel-control-next');
            control.setAttribute('aria-label', isNext ? 'Next slide' : 'Previous slide');
        }
    });
});

// ================================================
// Error Handling and Logging
// ================================================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to a logging service
});

// ================================================
// Client Gallery Image Loading and Optimization
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    const clientImages = document.querySelectorAll('.client-image');
    
    // Lazy loading for client images
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading animation
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                // Simulate loading completion
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 200);
                
                imageObserver.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    clientImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// ================================================
// Client Gallery Hover Effects Enhancement
// ================================================
document.querySelectorAll('.client-image-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add subtle rotation effect
        this.style.transform = 'translateY(-10px) rotateY(2deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateY(0deg)';
    });
    
    // Add click effect for mobile users
    card.addEventListener('click', function() {
        // Toggle overlay visibility on mobile
        if (window.innerWidth <= 768) {
            const overlay = this.querySelector('.client-image-overlay');
            overlay.style.transform = overlay.style.transform === 'translateY(0%)' ? 'translateY(100%)' : 'translateY(0%)';
            
            // Auto-hide after 3 seconds on mobile
            setTimeout(() => {
                overlay.style.transform = 'translateY(100%)';
            }, 3000);
        }
    });
});

// ================================================
// Font Loading Handler for Better Height Calculation
// ================================================
if ('fonts' in document) {
    document.fonts.ready.then(function() {
        // Fonts are loaded, recalculate heights
        setTimeout(equalizeTestimonialHeights, 100);
    });
}

// ================================================
// Mutation Observer for Dynamic Content Changes
// ================================================
if (typeof MutationObserver !== 'undefined') {
    const testimonialSection = document.getElementById('testimonials');
    
    if (testimonialSection) {
        const observer = new MutationObserver(function(mutations) {
            let shouldRecalculate = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    shouldRecalculate = true;
                }
            });
            
            if (shouldRecalculate) {
                setTimeout(equalizeTestimonialHeights, 100);
            }
        });
        
        observer.observe(testimonialSection, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }
}

// ================================================
// Console Welcome Message
// ================================================
console.log('%c🌟 Tab Holidays Website', 'color: #20B2AA; font-size: 20px; font-weight: bold;');
console.log('%cWebsite loaded successfully! Ready for your next adventure.', 'color: #9ACD32; font-size: 14px;');

// ================================================
// End of JavaScript File
// ================================================
