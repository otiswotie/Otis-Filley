// Otis Filley Portfolio - JavaScript
// Menu functionality and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Menu elements
    const menuButton = document.getElementById('site_menu_button');
    const menu = document.getElementById('site_menu');
    const closeButton = document.querySelector('#site_menu .close');
    
    // Menu functionality
    if (menuButton && menu) {
        // Open menu
        menuButton.addEventListener('click', function() {
            menu.classList.add('active');
            menuButton.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    if (closeButton && menu) {
        // Close menu
        closeButton.addEventListener('click', function() {
            menu.classList.remove('active');
            menuButton.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuButton.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (menu && menuButton && 
            !menu.contains(e.target) && 
            !menuButton.contains(e.target) && 
            menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuButton.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close menu after navigation
                if (menu && menuButton) {
                    menu.classList.remove('active');
                    menuButton.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // Image loading optimization
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Add loading states for images
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // You could add a placeholder image here
        });
    });
    
    // Enhanced image hover effects
    const projectImages = document.querySelectorAll('.project-section img');
    
    projectImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Scroll-based animations (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe project sections for scroll animations
    document.querySelectorAll('.project-section').forEach(section => {
        observer.observe(section);
    });
    
    // Performance: Preload critical images
    const criticalImages = [
        'https://freight.cargo.site/t/original/i/6243155c5c8e402e19828854978b2e65d1a36cc76e4465987a6e92d4f0f75066/Otis-Filley_Photos_website-Format-2118.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Console message for developers
    console.log('Otis Filley Portfolio loaded successfully');
    console.log('Site: https://github.com/your-username/your-repo');
});
