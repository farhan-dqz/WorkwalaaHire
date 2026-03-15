# Contact Section

This folder contains the modularized contact section for Workwalaa website.

## Files

- **contact.html** - Main contact page with full HTML structure
- **contact.css** - Contact-specific styles and animations
- **contact.js** - Contact form functionality and mobile menu logic

## Usage

The contact section can be used as a standalone page or imported into the main website. All functionality is self-contained and includes:

- Contact form with validation
- Network animation effects
- Mobile responsive design
- Form submission handling
- Success/error states

## Features

- **Responsive Design**: Works on all screen sizes
- **Network Animation**: Loading animation when submitting form
- **Form Validation**: HTML5 form validation
- **Success States**: Visual feedback for form submission
- **Mobile Menu**: Responsive navigation for mobile devices
- **Accessibility**: Semantic HTML structure with proper ARIA labels

## Integration

To integrate with the main website:

1. Link the CSS file: `<link rel="stylesheet" href="contact/contact.css">`
2. Link the JavaScript file: `<script src="contact/contact.js"></script>`
3. Include the HTML structure in the desired location

## Dependencies

- Modern web browser with CSS3 support
- JavaScript ES6 support
- Boxicons for icons
- Google Fonts (Outfit, Inter)

## Notes

- All paths are relative to the contact folder
- Assets are referenced from parent directory (`../assets/`)
- Form submits to Google Apps Script endpoint
- No external dependencies required for basic functionality
