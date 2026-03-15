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
  let scrollInterval;
  let isPaused = false;

  const autoScroll = () => {
    if (!isMobile || isPaused) return;

    const cardWidth = testimonialsGrid.querySelector('.testimonial-card').offsetWidth + 16; // 1rem gap = 16px
    const maxScroll = testimonialsGrid.scrollWidth - testimonialsGrid.clientWidth;

    // Smooth continuous scrolling from right to left
    if (testimonialsGrid.scrollLeft >= maxScroll - 10) { // -10 for pixel rounding buffer
      testimonialsGrid.scrollTo({ left: 0, behavior: 'smooth' }); // Loop back to start
    } else {
      testimonialsGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  // Start auto-scroll with smooth continuous movement
  const startAutoScroll = () => {
    if (isMobile && !isPaused) {
      scrollInterval = setInterval(autoScroll, 4000); // Scroll every 4 seconds for smooth movement
    }
  };

  // Stop auto-scroll
  const stopAutoScroll = () => {
    clearInterval(scrollInterval);
  };

  // Handle window resize
  const handleResize = () => {
    isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      stopAutoScroll();
      testimonialsGrid.scrollTo({ left: 0, behavior: 'smooth' }); // Reset position on desktop
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
      // Resume after 2 seconds of no touch
      setTimeout(() => {
        isPaused = false;
        startAutoScroll();
      }, 2000);
    }
  };

  // Handle mouse events for desktop testing (optional)
  const handleMouseEnter = () => {
    if (isMobile) {
      isPaused = true;
      stopAutoScroll();
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) {
      setTimeout(() => {
        isPaused = false;
        startAutoScroll();
      }, 2000);
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
  startAutoScroll();
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initTestimonialsSlider();
});
