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

// Bidirectional Infinite Carousel for Mobile
function initTestimonialsSlider() {
  const testimonialsGrid = document.querySelector('.testimonials-grid');
  if (!testimonialsGrid) return;

  let isMobile = window.innerWidth <= 768;
  let isPaused = false;
  let direction = 1; // 1 for right, -1 for left
  let animationFrame = null;
  let scrollPosition = 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Duplicate cards for infinite effect (only once)
  if (!testimonialsGrid.dataset.duplicated) {
    testimonialsGrid.insertAdjacentHTML('beforeend', testimonialsGrid.innerHTML);
    testimonialsGrid.dataset.duplicated = 'true';
  }

  function autoScroll() {
    if (!isMobile || isPaused || prefersReducedMotion.matches) {
      animationFrame = requestAnimationFrame(autoScroll);
      return;
    }

    // Continuous movement
    scrollPosition += direction * 0.4;
    testimonialsGrid.scrollLeft = scrollPosition;

    const maxScroll = testimonialsGrid.scrollWidth - testimonialsGrid.clientWidth;
    if (scrollPosition >= maxScroll) {
      scrollPosition = maxScroll;
      direction = -1;
    } else if (scrollPosition <= 0) {
      scrollPosition = 0;
      direction = 1;
    }

    animationFrame = requestAnimationFrame(autoScroll);
  }

  function startAutoScroll() {
    if (isMobile && !isPaused && !prefersReducedMotion.matches && !animationFrame) {
      animationFrame = requestAnimationFrame(autoScroll);
    }
  }

  function stopAutoScroll() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }

  function handleResize() {
    isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      stopAutoScroll();
      testimonialsGrid.scrollLeft = 0;
      scrollPosition = 0;
      direction = 1;
      isPaused = false;
    } else {
      startAutoScroll();
    }
  }

  function handleReducedMotionChange() {
    if (prefersReducedMotion.matches) {
      stopAutoScroll();
      testimonialsGrid.scrollLeft = 0;
      scrollPosition = 0;
    } else {
      handleResize();
    }
  }

  function handleTouchStart() {
    if (isMobile) {
      isPaused = true;
    }
  }

  function handleTouchEnd() {
    if (isMobile) {
      isPaused = false;
    }
  }

  function handleMouseEnter() {
    if (isMobile) {
      isPaused = true;
    }
  }

  function handleMouseLeave() {
    if (isMobile) {
      isPaused = false;
    }
  }

  window.addEventListener('resize', handleResize);
  prefersReducedMotion.addEventListener?.('change', handleReducedMotionChange);
  testimonialsGrid.addEventListener('touchstart', handleTouchStart);
  testimonialsGrid.addEventListener('touchend', handleTouchEnd);
  testimonialsGrid.addEventListener('mouseenter', handleMouseEnter);
  testimonialsGrid.addEventListener('mouseleave', handleMouseLeave);

  handleResize();
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initTestimonialsSlider();
});
