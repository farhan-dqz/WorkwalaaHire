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

  let isPausedUser = false;
  let pauseTimeout;
  let animationId;
  let isInitialized = false;

  function pauseScroll() {
    isPausedUser = true;
    clearTimeout(pauseTimeout);
  }

  function resumeScrollAfterDelay() {
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      isPausedUser = false;
    }, 6000); // 6 seconds pause
  }

  function checkMobile() {
    if (window.innerWidth <= 768) {
      if (!isInitialized) {
        // Clone items for infinite scroll
        const items = Array.from(testimonialsGrid.children);
        
        // Save original count so we know what essentially constitutes "one loop"
        if (!testimonialsGrid.dataset.originalCount) {
             testimonialsGrid.dataset.originalCount = items.length;
             
             // Append clones (Double cloning is safer if content isn't extremely wide)
             items.forEach(item => {
               const clone = item.cloneNode(true);
               clone.classList.add('clone');
               testimonialsGrid.appendChild(clone);
             });
             items.forEach(item => {
               const clone = item.cloneNode(true);
               clone.classList.add('clone');
               testimonialsGrid.appendChild(clone);
             });
        }
        
        // Try to start at zero
        testimonialsGrid.scrollLeft = 0; 

        const scrollStep = () => {
          if (!isPausedUser) {
            testimonialsGrid.scrollLeft += 1; // Speed of auto-scroll
            
            // Calculate exact width of one original set dynamically
            // because images or fonts might shift layout after load
            const currentItems = Array.from(testimonialsGrid.children);
            const originalCount = parseInt(testimonialsGrid.dataset.originalCount);
            if(currentItems.length >= originalCount) {
                const firstItem = currentItems[0];
                const lastOriginalItem = currentItems[originalCount - 1];
                
                // distance from left edge of first item to right edge of last original item
                // plus the gap after it.
                // It's safer to just accumulate widths + gap.
                const gap = parseFloat(window.getComputedStyle(testimonialsGrid).gap) || 0;
                let oneSetWidth = 0;
                for (let i = 0; i < originalCount; i++) {
                    oneSetWidth += currentItems[i].offsetWidth + gap;
                }

                // If scrolled past the first set perfectly, seamless warp back
                if (testimonialsGrid.scrollLeft >= oneSetWidth) {
                  testimonialsGrid.scrollLeft -= oneSetWidth;
                }
            }
          }
          animationId = window.requestAnimationFrame(scrollStep);
        };
        animationId = window.requestAnimationFrame(scrollStep);
        isInitialized = true;
      }
    } else {
      // Desktop / Tablet mode cleaning
      if (isInitialized) {
        window.cancelAnimationFrame(animationId);
        // Remove clones to return to standard desktop grid
        const clones = testimonialsGrid.querySelectorAll('.clone');
        clones.forEach(c => c.remove());
        testimonialsGrid.dataset.originalCount = "";
        testimonialsGrid.scrollLeft = 0;
        isInitialized = false;
        clearTimeout(pauseTimeout);
      }
    }
  }

  // Handle interaction pauses explicitly
  testimonialsGrid.addEventListener('mouseenter', pauseScroll);
  testimonialsGrid.addEventListener('mouseleave', resumeScrollAfterDelay);
  testimonialsGrid.addEventListener('touchstart', pauseScroll, {passive: true});
  testimonialsGrid.addEventListener('touchend', resumeScrollAfterDelay);
  testimonialsGrid.addEventListener('scroll', () => {
    // If the user manually scrolls, pause the auto-scrolling
    // and resume after 6 seconds of no scrolling
    if(!isPausedUser) { // Prevent trigger loop from auto-scroll own JS
       // We can't strictly distinguish JS scroll from user scroll easily,
       // but touching/mouse events already handle most intents.
    }
  }, {passive: true});

  checkMobile();
  window.addEventListener('resize', checkMobile);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initTestimonialsSlider();
});
