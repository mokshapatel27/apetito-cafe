/* =========================================
   APETITO CAFE - MAIN JAVASCRIPT
   =========================================
   Table of Contents:
   1. Page Load Optimization
   2. Image Showcase (Card Stack)
   3. Scroll Reveal Animations
   4. Smooth Scroll
   5. Performance Optimizations
========================================= */

// =========================
// 1. PAGE LOAD OPTIMIZATION
// =========================

// Remove preload class after page loads (prevents flash of animations)
window.addEventListener('load', () => {
  document.body.classList.remove('preload');
});

// =========================
// 2. IMAGE SHOWCASE (CARD STACK)
// =========================

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.showcase-wrapper');
  const cards = document.querySelectorAll('.showcase-img-wrapper');
  
  if (!wrapper || cards.length === 0) return; // Safety check
  
  const firstCard = cards[0];

  // Hover on FIRST card → Spread all cards
  firstCard.addEventListener('mouseenter', () => {
    wrapper.classList.add('spread');
  });

  // Click on any card → Pop it up
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent document click
      
      // Toggle active state
      if (card.classList.contains('active')) {
        card.classList.remove('active');
      } else {
        // Remove active from all cards
        cards.forEach(c => c.classList.remove('active'));
        // Add active to clicked card
        card.classList.add('active');
      }
    });
  });

  // Click outside showcase → Reset everything
  document.addEventListener('click', (e) => {
    // Check if click is outside the showcase wrapper
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove('spread');
      cards.forEach(c => c.classList.remove('active'));
    }
  });

  // Optional: Reset on mouse leave (uncomment if you want this behavior)
  /*
  wrapper.addEventListener('mouseleave', () => {
    wrapper.classList.remove('spread');
    cards.forEach(c => c.classList.remove('active'));
  });
  */
});

// =========================
// 3. SCROLL REVEAL ANIMATIONS
// =========================

// Throttle function for better performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Reveal elements on scroll
const revealElements = () => {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  const revealPoint = 100; // Pixels from bottom before reveal

  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    } else {
      // Optional: Remove active class when scrolling back up
      // element.classList.remove('active');
    }
  });
};

// Initial check on page load
document.addEventListener('DOMContentLoaded', revealElements);

// Throttled scroll event
window.addEventListener('scroll', throttle(revealElements, 100));

// =========================
// 4. SMOOTH SCROLL
// =========================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Ignore empty anchors
    if (href === '#' || href === '#!') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// =========================
// 5. PERFORMANCE OPTIMIZATIONS
// =========================

// Lazy load images (if you have many images)
// if ('loading' in HTMLImageElement.prototype) {
//   const images = document.querySelectorAll('img[loading="lazy"]');
//   images.forEach(img => {
//     img.src = img.dataset.src;
//   });
// } else {
//   // Fallback for browsers that don't support lazy loading
//   const script = document.createElement('script');
//   script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
//   document.body.appendChild(script);
// }

// Prefetch important resources on hover
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('mouseenter', function() {
    const href = this.getAttribute('href');
    if (href && !href.startsWith('#')) {
      const linkTag = document.createElement('link');
      linkTag.rel = 'prefetch';
      linkTag.href = href;
      document.head.appendChild(linkTag);
    }
  });
});

// =========================
// 6. ADDITIONAL ENHANCEMENTS
// =========================

// Add active class to navbar on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', throttle(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, 100));
}

// Menu scroll snap (optional - makes horizontal scroll feel better)
const menuContainer = document.querySelector('.menu-scroll-container');
if (menuContainer) {
  // Add smooth snap scrolling
  menuContainer.style.scrollSnapType = 'x mandatory';
  
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.style.scrollSnapAlign = 'start';
  });
}

// Floating WhatsApp button - hide when scrolled to bottom
const floatingBtn = document.querySelector('.floating-whatsapp');
if (floatingBtn) {
  window.addEventListener('scroll', throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const clientHeight = window.innerHeight;
    
    // Hide button when near footer (last 200px)
    if (scrollHeight - scrollTop - clientHeight < 200) {
      floatingBtn.style.transform = 'scale(0)';
      floatingBtn.style.opacity = '0';
    } else {
      floatingBtn.style.transform = 'scale(1)';
      floatingBtn.style.opacity = '1';
    }
  }, 100));
}

// Console message (optional - for fun!)
console.log('%c🍕 Apetito Cafe', 'color: #f2c6cc; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with ❤️ for the best cafe in Surat!', 'color: #4a4a4a; font-size: 14px;');

// =========================
// 7. ERROR HANDLING
// =========================

// Global error handler
window.addEventListener('error', (e) => {
  console.error('An error occurred:', e.error);
  // You can send this to an analytics service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

/* ================= MOBILE SLIDER FIXED ================= */

function initMobileSlider() {

  if (window.innerWidth > 768) return;

  const cards = document.querySelectorAll('.showcase-img-wrapper');
  const wrapper = document.querySelector('.showcase-wrapper');

  if (!cards.length) return;

  let currentIndex = 0;

  // Remove all active classes first
  cards.forEach(card => {
    card.classList.remove('active-mobile');
  });

  // Activate first image
  cards[currentIndex].classList.add('active-mobile');

  wrapper.addEventListener('click', function () {

    // Remove current
    cards[currentIndex].classList.remove('active-mobile');

    // Move to next
    currentIndex = (currentIndex + 1) % cards.length;

    // Add new
    cards[currentIndex].classList.add('active-mobile');

  });

}

// Run after page loads
document.addEventListener('DOMContentLoaded', initMobileSlider);

