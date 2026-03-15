// Mobile Menu Logic
function initMobileMenu() {
  const mobileMenuOpen = document.getElementById('mobile-menu-open');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.querySelector('.mobile-menu-overlay');

  if (mobileMenuOpen && mobileMenuClose && mobileMenu) {
    mobileMenuOpen.addEventListener('click', () => {
      mobileMenu.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
      document.body.style.overflow = '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (mobileMenu.style.display === 'flex' &&
          !mobileMenu.contains(event.target) &&
          mobileMenuOpen && !mobileMenuOpen.contains(event.target)) {
        mobileMenu.style.display = 'none';
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
        document.body.style.overflow = '';
      });
    });
  }
}

// Navbar Scroll Effect
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
}

// Auto-playing Testimonials Slider for Mobile
function initTestimonialsSlider() {
  const testimonialsGrid = document.querySelector('.testimonials-grid');
  if (!testimonialsGrid) return;

  let isMobile = window.innerWidth <= 768;
  let isPaused = false;
  let scrollPosition = 0;
  let animationFrame = null;

  const autoScroll = () => {
    if (!isMobile || isPaused) return;

    // Get the first card width
    const firstCard = testimonialsGrid.querySelector('.testimonial-card');
    if (!firstCard) return;
    
    const cardWidth = firstCard.offsetWidth + 32; // card width + gap (2rem = 32px)
    const maxScroll = testimonialsGrid.scrollWidth - testimonialsGrid.clientWidth;

    // Continuous scrolling
    scrollPosition += 1; // Scroll 1px per frame for smooth movement

    // Reset to start when reaching the end
    if (scrollPosition >= maxScroll) {
      scrollPosition = 0;
    }

    testimonialsGrid.scrollLeft = scrollPosition;
    animationFrame = requestAnimationFrame(autoScroll);
  };

  // Start auto-scroll
  const startAutoScroll = () => {
    if (isMobile && !isPaused) {
      animationFrame = requestAnimationFrame(autoScroll);
    }
  };

  // Stop auto-scroll
  const stopAutoScroll = () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  };

  // Handle window resize
  const handleResize = () => {
    isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      stopAutoScroll();
      testimonialsGrid.scrollLeft = 0;
      scrollPosition = 0;
      isPaused = false;
    } else {
      startAutoScroll();
    }
  };

  // Handle touch events - pause on touch
  const handleTouchStart = () => {
    if (isMobile) {
      isPaused = true;
      stopAutoScroll();
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      // Resume immediately after touch ends
      isPaused = false;
      startAutoScroll();
    }
  };

  // Handle mouse events for desktop testing
  const handleMouseEnter = () => {
    if (isMobile) {
      isPaused = true;
      stopAutoScroll();
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) {
      isPaused = false;
      startAutoScroll();
    }
  };

  // Add event listeners
  window.addEventListener('resize', handleResize);
  testimonialsGrid.addEventListener('touchstart', handleTouchStart);
  testimonialsGrid.addEventListener('touchend', handleTouchEnd);
  testimonialsGrid.addEventListener('mouseenter', handleMouseEnter);
  testimonialsGrid.addEventListener('mouseleave', handleMouseLeave);

  // Initialize
  handleResize();
  
  // Force start auto-scroll if mobile
  if (isMobile) {
    startAutoScroll();
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initTestimonialsSlider();
});
