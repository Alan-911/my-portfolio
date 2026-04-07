// Set dynamic year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Wait for all assets, fonts, and DOM to cleanly load before calculating scroll positions
window.addEventListener('load', () => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    gsap.from('.status-badge', {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
    });

    gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out"
    });

    gsap.from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "power3.out"
    });

    gsap.from('.cta-group', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
    });

    // Animate Section Headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Animate Bio Section
    gsap.from('.bio-content', {
        scrollTrigger: {
            trigger: '.bio-section',
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // Animate Cards (Skills/Capabilities)
    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
    });

    // Animate Experience Timeline
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.timeline',
            start: "top 85%",
        },
        x: -50,
        opacity: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: "power3.out"
    });

    // Animate Education Card
    gsap.from('.education-card', {
        scrollTrigger: {
            trigger: '.education-section',
            start: "top 85%",
        },
        y: 50,
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });

    // Animate Certificates
    gsap.from('.cert-card', {
        scrollTrigger: {
            trigger: '.certificates-grid',
            start: "top 85%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
    });

    // Animate Project Cards
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
    });
    
    // Refresh ScrollTrigger to ensure highly accurate layout calculation
    ScrollTrigger.refresh();
});

// Particles.js Configuration for "Agentic/Network" background vibe
particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 60,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": ["#4deeea", "#74ee15"]
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.3,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.1,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 0.5
          }
        },
        "push": {
          "particles_nb": 3
        }
      }
    },
    "retina_detect": true
});
