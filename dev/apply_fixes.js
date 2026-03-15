const fs = require('fs');

const files = [
    'index.html',
    'careers.html',
    'blogs.html',
    'aboutus.html',
    'privacy-policy.html',
    'terms-of-service.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Light Theme Post Vacancy Link
    // In light theme, the post-vacancy link needs to be visible.
    if (!content.includes('body.light-theme .mobile-nav-links a.post-vacancy-link') && !content.includes('.light-theme .mobile-nav-links a.post-vacancy-link')) {
        content = content.replace('</style>', `
    .light-theme .mobile-nav-links a.post-vacancy-link { color: #1a1a1a !important; }
    body.light-theme .mobile-nav-links a.post-vacancy-link { color: #1a1a1a !important; }
    .light-theme .mobile-menu-overlay a[href*="post-vacancy"] { color: #1a1a1a !important; }
    body.light-theme .mobile-menu-overlay a[href*="post-vacancy"] { color: #1a1a1a !important; }
  </style>`);
    }

    // 2. Black Theme (Dark Theme) theme change button visibility
    // The toggle button's icon uses color: #000 in some places or defaults to inheriting.
    // We'll give it a solid color logic: Yellow/white in dark mode, dark in light mode.
    if (!content.includes('.mobile-theme-toggle i.bx')) {
        content = content.replace('</style>', `
    .mobile-theme-toggle i { color: var(--brand-yellow) !important; text-shadow: 0 0 5px rgba(0,0,0,0.5); }
    .light-theme .mobile-theme-toggle i { color: #000 !important; text-shadow: none; }
    .mobile-theme-toggle { z-index: 2005; }
  </style>`);
    }

    // 3. Close menu when clicking outside
    const jsToAdd = `
      // Close menu when clicking outside
      document.addEventListener('click', (event) => {
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            mobileMenuOpen && !mobileMenuOpen.contains(event.target)) {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
`;
    if (!content.includes('// Close menu when clicking outside')) {
        content = content.replace(/(mobileMenuClose\.addEventListener\('click', \(\) => {[\s\S]*?}\);)/, `$1${jsToAdd}`);
    }

    // 4. In index.html, fix contact icon alignment
    if (file === 'index.html') {
        content = content.replace('</style>', `
    .contact-detail-item i { margin-top: 3px; align-self: flex-start; }
    .contact-detail-item { align-items: flex-start !important; }
  </style>`);
    }

    /* 
       5. blogs.html theme toggle functionality for desktop 
    */
    if (file === 'blogs.html') {
        // blogs.html desktop theme toggle has an issue
        // Ensure theme toggle script binds properly
        content = content.replace("const themeToggleBtn = document.getElementById('theme-toggle');", "const themeToggleBtn = document.getElementById('theme-toggle');\n      const desktopThemeToggleBtn = document.querySelector('.navbar .theme-toggle');");
        // Add a fallback event listener in case ID is missing or class is used
        const blogsJs = `
      if (desktopThemeToggleBtn && !themeToggleBtn) {
          desktopThemeToggleBtn.addEventListener('click', toggleTheme);
      }
      `;
        if (!content.includes('desktopThemeToggleBtn.addEventListener')) {
            content = content.replace('themeToggleBtn.addEventListener(\'click\', toggleTheme);', `if(themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);\n${blogsJs}`);
        }
    }

    fs.writeFileSync(file, content, 'utf8');
});
