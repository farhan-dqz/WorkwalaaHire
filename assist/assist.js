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

// Wishlist Toggle & Satisfying Success Animation
function initWishlist() {
  const btnWishlist = document.getElementById('btnWishlist');
  const wishlistContainer = document.getElementById('wishlistContainer');
  const wishlistEmail = document.getElementById('wishlistEmail');
  const wishlistForm = document.getElementById('wishlistForm');
  const successOverlay = document.getElementById('successOverlay');

  // The Google Apps Script Web App URL for Wishlist
  const wishlistScriptURL = 'https://script.google.com/macros/s/AKfycbza0FOVEnp3O5RwBJpsCqOfLEWlIVUkpaqLONbjh11H44p09270g4AcnqEuTeqzACYwCQ/exec';

  if (btnWishlist && wishlistContainer) {
    btnWishlist.addEventListener('click', () => {
      // Reset state if opened again
      if (successOverlay) successOverlay.classList.remove('active');
      if (wishlistForm) wishlistForm.style.opacity = '1';
      if (wishlistEmail) wishlistEmail.value = '';

      wishlistContainer.classList.toggle('active');
      if (wishlistContainer.classList.contains('active')) {
        setTimeout(() => wishlistEmail.focus(), 300);
      }
    });
  }

  if (wishlistForm) {
    wishlistForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent page reload

      // Get form data
      const formData = new FormData(wishlistForm);
      
      // Update button state to loading
      const submitBtn = wishlistForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Joining...';
      submitBtn.disabled = true;

      try {
        // Send data to Google Apps Script
        const response = await fetch(wishlistScriptURL, {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          // Hide form inputs and trigger satisfying success UI
          wishlistForm.style.opacity = '0';
          wishlistForm.style.pointerEvents = 'none';

          if (successOverlay) {
            successOverlay.classList.add('active');

            setTimeout(() => {
              successOverlay.classList.remove('active');
              wishlistContainer.classList.remove('active');
              wishlistForm.style.pointerEvents = 'auto'; // allow resubmit later
              wishlistEmail.value = '';
              
              // Reset button state
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
              wishlistForm.style.opacity = '1';
            }, 3000);
          }
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        console.error('Wishlist submission error:', error);
        
        // Reset button state on error
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show error message
        alert('Sorry, there was an error joining the waitlist. Please try again.');
      }
    });
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initWishlist();
});
