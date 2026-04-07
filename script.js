// ===========================
// OPTIMIZED PORTFOLIO SCRIPT
// Performance: Native APIs only, no heavy libraries
// ===========================

// Set current year in footer
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Wait for DOM to be fully loaded before running animations
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== SMOOTH SCROLL NAVIGATION =====
  // Replace GSAP scroll with native smooth scroll
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      
      if (target && href !== '#') {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== FADE-IN ANIMATIONS =====
  // Replace GSAP ScrollTrigger with Intersection Observer (much faster!)
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Element is in viewport - fade it in
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Stop observing to improve performance
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,  // Trigger when 10% of element is visible
    rootMargin: '0px 0px -100px 0px'  // Start animation 100px before entering viewport
  });

  // Apply observer to all sections
  const sections = document.querySelectorAll('section, .skill-card, .project-card, .timeline-item, .cert-card');
  sections.forEach((section, index) => {
    // Set initial state
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    section.style.transitionDelay = (index % 5 * 100) + 'ms';
    
    // Observe this section
    fadeInObserver.observe(section);
  });

  // ===== ACTIVE NAV LINK HIGHLIGHTING =====
  // Highlight nav link based on current scroll position
  const navLinks = document.querySelectorAll('.nav-links a');
  
  const activateLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to corresponding nav link
        if (id) {
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (activeLink) {
              activeLink.classList.add('active');
            }
        }
      }
    });
  }, {
    threshold: 0.5
  });

  // Observe all sections for nav highlighting
  const mainSections = document.querySelectorAll('section');
  mainSections.forEach(section => {
    activateLinkObserver.observe(section);
  });

  // ===== PREVENT LAYOUT SHIFT =====
  // Ensure hero image/content doesn't cause layout shift
  window.addEventListener('load', function() {
    // All resources loaded, layout is stable
    console.log('Portfolio loaded successfully - Performance Optimized natively.');
  });
});

// ===== ERROR HANDLING =====
// Log any errors for debugging
window.addEventListener('error', function(event) {
  console.error('Error:', event.error);
});

// ===== PERFORMANCE MONITORING =====
// Log performance metrics
window.addEventListener('load', function() {
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log('Page load time: ' + loadTime + 'ms');
  }
});
