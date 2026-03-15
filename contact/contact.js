// Contact Form Submission Handler (Connected to Google Apps Script)
function handleContactSubmit(event) {
  event.preventDefault(); // Prevent default form submission

  const form = document.getElementById('mainContactForm');
  const btn = document.getElementById('contactSubmitBtn');
  const overlay = document.getElementById('contactSuccessOverlay');
  const networkConnecting = document.getElementById('networkConnectingContent');
  const contactSuccess = document.getElementById('contactSuccessContent');

  // The Google Apps Script Web App URL
  const scriptURL = 'https://script.google.com/macros/s/AKfycbza0FOVEnp3O5RwBJpsCqOfLEWlIVUkpaqLONbjh11H44p09270g4AcnqEuTeqzACYwCQ/exec';

  // 1. Loading State for button & UI
  btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Sending...";
  btn.style.opacity = '0.8';
  btn.style.pointerEvents = 'none';

  // Reset overlay to show loading animation
  networkConnecting.style.display = 'block';
  contactSuccess.style.display = 'none';
  overlay.classList.add('active');

  // 2. Prepare FormData from the form inputs
  const formData = new FormData(form);

  // 3. Send data to Google Apps Script
  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
    .then(response => {
      // Assume success if the fetch promise resolves
      networkConnecting.style.display = 'none';
      contactSuccess.style.display = 'block';

      // Reset the form in the background
      form.reset();

      // Stage 2: Auto-close overlay after 3 seconds of success
      setTimeout(() => {
        overlay.classList.remove('active');

        // Reset button back to normal state
        btn.innerHTML = "Send Message";
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
      }, 3000);
    })
    .catch(error => {
      console.error('Error!', error.message);

      // Very basic error handling if fetch completely fails
      overlay.classList.remove('active');
      btn.innerHTML = "Send Failed - Try Again";
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
      alert("Sorry, there was an error sending your message. Please try again or contact us directly on WhatsApp.");
    });
}

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

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
});
