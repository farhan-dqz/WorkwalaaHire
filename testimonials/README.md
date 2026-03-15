# Testimonials Section

This folder contains the modularized testimonials section for the Workwalaa website.

## Files

- **testimonials.html** - Standalone testimonials page
- **testimonials.css** - Testimonials-specific styles
- **testimonials.js** - Testimonials functionality and mobile slider

## Usage

The testimonials section can be used as a standalone page or integrated into the main website. All functionality is self-contained and includes:

- Success stories from job seekers and employers
- Mobile responsive grid layout
- Auto-scrolling slider for mobile devices
- Hover effects and animations
- Professional card-based design

## Features

- **Responsive Design**: Works on all screen sizes
- **Mobile Slider**: Auto-scrolling testimonials on mobile
- **Touch Controls**: Pause scrolling on touch interaction
- **Hover Effects**: Interactive card animations
- **Professional Layout**: Clean, modern design
- **Accessibility**: Semantic HTML structure

## Key Components

### Testimonial Cards
- Real success stories from users
- Author information with avatars
- Professional role and company details
- Glassmorphic card design

### Mobile Experience
- Auto-scrolling carousel
- Touch-friendly controls
- Smooth transitions
- Optimized for small screens

### Visual Effects
- Hover animations on cards
- Gradient text effects
- Glassmorphism styling
- Smooth transitions

## Integration

To integrate with the main website:

1. Link the CSS file: `<link rel="stylesheet" href="testimonials/testimonials.css">`
2. Link the JavaScript file: `<script src="testimonials/testimonials.js"></script>`
3. Include the HTML structure in the desired location

## Dependencies

- Modern web browser with CSS3 support
- JavaScript ES6 support
- Boxicons for icons
- Google Fonts (Outfit, Inter)

## Notes

- All paths are relative to the testimonials folder
- Assets are referenced from parent directory (`../assets/`)
- No external dependencies required for basic functionality
- Auto-scrolling only works on mobile devices

## Mobile Slider Features

- **Auto-scroll**: Automatically advances through testimonials
- **Touch Pause**: Pauses scrolling when user interacts
- **Smooth Transitions**: Uses smooth scrolling behavior
- **Loop**: Returns to first testimonial after last
- **Responsive**: Only active on mobile devices (≤768px)

## Customization

The section can be easily customized by modifying:
- CSS variables for colors and spacing
- Testimonial content and author information
- Animation timings and effects
- Grid layout and breakpoints

## Testimonial Content

Currently includes 6 testimonials from:
- Joseph Mathew (Software Developer)
- Shalini (HR Manager)
- Reshma.k (Digital Marketing Agency)
- Muhammed Riyas (Accountant Executive)
- Isham (Founder)
- Minnath (Marketing Manager)

Each testimonial includes:
- Quote text
- Author initials avatar
- Author name and role
- Professional styling
