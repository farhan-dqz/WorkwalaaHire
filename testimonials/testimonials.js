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

// Auto-scroll logic for mobile testimonials
function initTestimonialsSlider() {
  const testimonialsGrid = document.querySelector('.testimonials-grid');
  if (!testimonialsGrid) return;

  let isHovered = false;
  let isTouching = false;
  let animationId;
  let isInitialized = false;

  function checkMobile() {
    if (window.innerWidth <= 768) {
      if (!isInitialized) {
        // Clone items for infinite scroll
        const items = Array.from(testimonialsGrid.children);
        if (!testimonialsGrid.dataset.originalCount) {
             testimonialsGrid.dataset.originalCount = items.length;
             items.forEach(item => {
               const clone = item.cloneNode(true);
               clone.classList.add('clone');
               testimonialsGrid.appendChild(clone);
             });
        }
        
        testimonialsGrid.scrollLeft = 0; // Start at beginning

        const scrollStep = () => {
          if (!isHovered && !isTouching) {
            testimonialsGrid.scrollLeft += 1; // Adjust speed here
            // If scrolled halfway (the original content length), reset to 0 for infinite loop
            if (testimonialsGrid.scrollLeft >= testimonialsGrid.scrollWidth / 2) {
              testimonialsGrid.scrollLeft -= testimonialsGrid.scrollWidth / 2;
            }
          }
          animationId = window.requestAnimationFrame(scrollStep);
        };
        animationId = window.requestAnimationFrame(scrollStep);
        isInitialized = true;
      }
    } else {
      if (isInitialized) {
        window.cancelAnimationFrame(animationId);
        // Remove clones to return to standard desktop grid
        const clones = testimonialsGrid.querySelectorAll('.clone');
        clones.forEach(c => c.remove());
        testimonialsGrid.dataset.originalCount = "";
        testimonialsGrid.scrollLeft = 0;
        isInitialized = false;
      }
    }
  }

  // Handle interaction pauses
  testimonialsGrid.addEventListener('mouseenter', () => isHovered = true);
  testimonialsGrid.addEventListener('mouseleave', () => isHovered = false);
  testimonialsGrid.addEventListener('touchstart', () => isTouching = true, {passive: true});
  testimonialsGrid.addEventListener('touchend', () => setTimeout(() => isTouching = false, 1500));

  checkMobile();
  window.addEventListener('resize', checkMobile);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initTestimonialsSlider();
});
