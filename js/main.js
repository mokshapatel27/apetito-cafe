document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.showcase-wrapper');
  const cards = document.querySelectorAll('.showcase-img-wrapper');
  
  if (!wrapper || cards.length === 0) return;
  
  const isMobile = window.innerWidth <= 480;
  
  if (isMobile) {
    // MOBILE: Tap slideshow mode
    let currentIndex = 0;
    
    // Hide all cards except first
    cards.forEach((card, index) => {
      if (index !== 0) {
        card.style.opacity = '0';
        card.style.zIndex = '0';
      }
    });
    
    // Tap to cycle through
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
  // DESKTOP: Original hover/click behavior
  const firstCard = cards[0];
  
  firstCard.addEventListener('mouseenter', () => {
    wrapper.classList.add('spread');
    // Staggered animation
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.transform = getComputedStyle(card).transform;
      }, index * 30);
    });
  });
  
  wrapper.addEventListener('mouseleave', () => {
    wrapper.classList.remove('spread');
    cards.forEach(c => c.classList.remove('active'));
  });
  
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
  
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove('spread');
      cards.forEach(c => c.classList.remove('active'));
    }
  });
}

// Scroll reveal
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

const revealElements = () => {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
};

document.addEventListener('DOMContentLoaded', revealElements);
window.addEventListener('scroll', throttle(revealElements, 100));
