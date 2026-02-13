document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.showcase-wrapper');
  const cards = document.querySelectorAll('.showcase-img-wrapper');
  
  if (!wrapper || cards.length === 0) return;
  
  const isMobile = window.innerWidth <= 480;
  
  if (isMobile) {
    // ==================== MOBILE: Tap slideshow mode ====================
    let currentIndex = 0;
    
    // Hide all cards except first
    cards.forEach((card, index) => {
      if (index !== 0) {
        card.style.opacity = '0';
        card.style.zIndex = '0';
      } else {
        card.style.opacity = '1';
        card.style.zIndex = '10';
      }
    });
    
    // Tap to cycle through photos
    wrapper.addEventListener('click', () => {
      // Fade out current
      cards[currentIndex].classList.add('fade-out');
      
      setTimeout(() => {
        cards[currentIndex].style.opacity = '0';
        cards[currentIndex].style.zIndex = '0';
        cards[currentIndex].classList.remove('fade-out');
        
        // Move to next
        currentIndex = (currentIndex + 1) % cards.length;
        
        // Fade in next
        cards[currentIndex].style.zIndex = '10';
        cards[currentIndex].classList.add('fade-in');
        cards[currentIndex].style.opacity = '1';
        
        setTimeout(() => {
          cards[currentIndex].classList.remove('fade-in');
        }, 500);
      }, 500);
    });
    
  } else {
    // ==================== DESKTOP: Smooth spread with hover/click ====================
    const firstCard = cards[0];
    
    // Hover on first card → smooth cascading spread
    firstCard.addEventListener('mouseenter', () => {
      wrapper.classList.add('spread');
      
      // Staggered delays for smooth cascade effect
      cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
      });
    });
    
    // Mouse leave wrapper → reset with smooth collapse
    wrapper.addEventListener('mouseleave', () => {
      // Remove spread
      wrapper.classList.remove('spread');
      cards.forEach(c => c.classList.remove('active'));
      
      // Reset delays for collapse
      cards.forEach((card, index) => {
        card.style.transitionDelay = `${(cards.length - index) * 0.03}s`;
      });
      
      // Clear delays after animation
      setTimeout(() => {
        cards.forEach(card => {
          card.style.transitionDelay = '0s';
        });
      }, cards.length * 30);
    });
    
    // Click on any card → pop up effect
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (card.classList.contains('active')) {
          card.classList.remove('active');
        } else {
          cards.forEach(c => c.classList.remove('active'));
          card.classList.add('active');
        }
      });
    });
    
    // Click outside → reset everything
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('spread');
        cards.forEach(c => c.classList.remove('active'));
      }
    });
  }
});

// ==================== SCROLL REVEAL ANIMATIONS ====================

// Throttle function for performance
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
  const revealPoint = 100;

  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
};

// Initial check on page load
document.addEventListener('DOMContentLoaded', revealElements);

// Throttled scroll event
window.addEventListener('scroll', throttle(revealElements, 100));

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
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

// ==================== FLOATING WHATSAPP BUTTON ====================

const floatingBtn = document.querySelector('.floating-whatsapp');
if (floatingBtn) {
  window.addEventListener('scroll', throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const clientHeight = window.innerHeight;
    
    // Hide button when near footer
    if (scrollHeight - scrollTop - clientHeight < 200) {
      floatingBtn.style.transform = 'scale(0)';
      floatingBtn.style.opacity = '0';
    } else {
      floatingBtn.style.transform = 'scale(1)';
      floatingBtn.style.opacity = '1';
    }
  }, 100));
}

// ==================== PAGE LOAD OPTIMIZATION ====================

window.addEventListener('load', () => {
  document.body.classList.remove('preload');
});

// ==================== CONSOLE MESSAGE ====================

console.log('%c🍕 Apetito Cafe', 'color: #f2c6cc; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with ❤️', 'color: #4a4a4a; font-size: 14px;');
