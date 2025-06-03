// Smooth scrolling for navigation links
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

// Navbar scroll effect
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

// Scroll to top functionality
document.getElementById('scrollTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate elements on scroll
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

// Counter animation for stats
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

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple form validation and submission simulation
    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="bi bi-arrow-clockwise spin me-2"></i>Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="bi bi-check me-2"></i>Message Sent!';
        submitBtn.style.background = '#28a745';
        
        // Reset form after 2 seconds
        setTimeout(() => {
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 2000);
    }, 1500);
});

// Add hover effects to destination cards
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotateY(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotateY(0deg)';
    });
});

// Add click effect to service cards
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

// Add CSS for ripple animation and spin
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
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Newsletter subscription
document.querySelector('.input-group button').addEventListener('click', function() {
    const emailInput = this.previousElementSibling;
    const email = emailInput.value;
    
    if (email && email.includes('@')) {
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="bi bi-check"></i>';
        this.style.background = '#28a745';
        
        setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.background = '';
            emailInput.value = '';
        }, 2000);
    } else {
        emailInput.style.borderColor = '#dc3545';
        setTimeout(() => {
            emailInput.style.borderColor = '';
        }, 2000);
    }
});

// Mobile menu enhancement
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

// Image loading error handling for destination cards
document.addEventListener('DOMContentLoaded', function() {
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        const backgroundImage = window.getComputedStyle(card).backgroundImage;
        if (backgroundImage && backgroundImage !== 'none') {
            const imageUrl = backgroundImage.slice(4, -1).replace(/["']/g, "");
            
            // Create a new image element to test if the image loads
            const img = new Image();
            img.onload = function() {
                // Image loaded successfully
                card.style.backgroundImage = `url('${imageUrl}')`;
            };
            img.onerror = function() {
                // Image failed to load, keep the gradient fallback
                console.warn(`Failed to load image: ${imageUrl}`);
                card.style.backgroundImage = 'linear-gradient(135deg, var(--primary-teal), var(--dark-teal))';
            };
            img.src = imageUrl;
        }
    });
});