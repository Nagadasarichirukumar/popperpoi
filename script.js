/**
 * ================================================
 * POPPER POI - STREET FOOD WEBSITE INTERACTIONS
 * ================================================
 * 
 * Author: Product Manager / Senior UI Developer
 * Purpose: All interactive functionality
 * Dependencies: None (pure vanilla JavaScript)
 * Compatibility: ES6+ (modern browsers)
 * 
 * MODULES:
 * 1. Mobile Menu Toggle
 * 2. Navigation Active State
 * 3. Delivery Button Alerts (Demo)
 * 4. Hero Image Shadow Interaction
 * 5. Dynamic Copyright Year
 * 6. Responsive Menu Handling
 * 7. Franchise Button Interaction
 * 
 * All functions are wrapped in IIFE for scope isolation
 * ================================================
 */

(function() {
  'use strict';

  // ==============================================
  // 1. DOM ELEMENT CACHE
  // ==============================================
  // Cache DOM elements for performance and readability
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-menu a');
  const deliveryBtns = document.querySelectorAll('.delivery-btn');
  const heroDiv = document.querySelector('.hero-food-img');
  const footerYearSpan = document.querySelector('footer p');
  const franchiseBtn = document.querySelector('.franchise-btn');

  // ==============================================
  // 2. MOBILE MENU TOGGLE
  // ==============================================
  /**
   * Toggle mobile dropdown menu on hamburger click
   * Adds fadeIn animation when opening
   * Closes when link is clicked (handled separately)
   */
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event bubbling
      
      // Toggle hidden class
      mobileMenu.classList.toggle('hidden');
      
      // Add animation when opening
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.style.animation = 'fadeIn 0.25s ease';
      } else {
        mobileMenu.style.animation = ''; // Reset animation
      }
    });
  }

  // ==============================================
  // 3. NAVIGATION ACTIVE STATE MANAGEMENT
  // ==============================================
  /**
   * Removes active class from all desktop nav links
   * Used before setting new active link
   */
  function removeActiveClass() {
    navLinks.forEach(link => {
      link.classList.remove('active-nav');
    });
  }

  /**
   * Desktop Navigation: Set active state on click
   * Prevents default for demo (no page reload)
   */
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Demo: prevent page scroll/refresh
      removeActiveClass();
      this.classList.add('active-nav');
      
      // Optional: Update URL hash for deep linking
      // window.location.hash = this.textContent.trim().toLowerCase();
    });
  });

  /**
   * Mobile Navigation: Close menu and handle clicks
   * Better UX: Close menu immediately after selection
   */
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Demo: prevent page reload
      
      // Close mobile menu with smooth transition
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        mobileMenu.style.animation = ''; // Reset animation
      }
      
      // Optional: Show which nav item was clicked
      console.log(`Mobile nav clicked: ${this.textContent.trim()}`);
    });
  });

  // ==============================================
  // 4. DELIVERY ORDER BUTTONS - DEMO INTERACTION
  // ==============================================
  /**
   * All buttons related to ordering/delivery show demo alert
   * Selects buttons containing bicycle, bolt, or hand-holding icons
   * This is for prototype demonstration
   */
  deliveryBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('🍕 POPPER POI — order received! (demo) your street feast is on the way.');
    });
  });

  // ==============================================
  // 5. HERO IMAGE MICRO-INTERACTION
  // ==============================================
  /**
   * Dynamic shadow movement based on mouse position
   * Creates 3D depth effect on hero image
   * Only enabled on non-touch devices (hover capability)
   */
  if (heroDiv) {
    // Check if device supports hover (not touch)
    if (window.matchMedia('(hover: hover)').matches) {
      heroDiv.addEventListener('mousemove', function(e) {
        // Calculate offset based on mouse position relative to window
        const xOffset = (e.clientX / window.innerWidth) * 10;
        const yOffset = (e.clientY / window.innerHeight) * 10;
        
        // Apply dynamic shadow
        this.style.boxShadow = `${8 + xOffset}px ${8 + yOffset}px 0 #2c2c2c, 16px 16px 20px rgba(0,0,0,0.3)`;
      });
      
      // Reset shadow on mouse leave
      heroDiv.addEventListener('mouseleave', function() {
        this.style.boxShadow = '12px 12px 0 #2c2c2c, 16px 16px 20px rgba(0,0,0,0.3)';
      });
    }
  }

  // ==============================================
  // 6. DYNAMIC COPYRIGHT YEAR
  // ==============================================
  /**
   * Automatically updates copyright year
   * Replace static "2024" with current year
   * Regex ensures we don't replace other numbers
   */
  if (footerYearSpan) {
    const currentYear = new Date().getFullYear();
    footerYearSpan.innerHTML = footerYearSpan.innerHTML.replace('2024', currentYear);
  }

  // ==============================================
  // 7. RESPONSIVE MENU HANDLING
  // ==============================================
  /**
   * Ensure mobile menu is hidden when resizing to desktop
   * Prevents menu staying open on desktop view
   */
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) { // md breakpoint
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenu.style.animation = ''; // Reset animation
      }
    }
  });

  // ==============================================
  // 8. FRANCHISE BUTTON INTERACTION
  // ==============================================
  /**
   * Demo interaction for franchise inquiry
   * Shows email client simulation
   */
  if (franchiseBtn) {
    franchiseBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('📧 Franchise inquiry: franchise@popperpoi.com\nWe will send you the deck within 24 hrs!');
    });
  }

  // ==============================================
  // 9. TOUCH DEVICE OPTIMIZATION
  // ==============================================
  /**
   * Disable hover-based interactions on touch devices
   * Improves UX on mobile/tablet
   */
  if ('ontouchstart' in window) {
    // Remove mousemove listener if it was added
    if (heroDiv) {
      heroDiv.removeEventListener('mousemove', function() {});
    }
    
    // Simplify shadows for touch devices
    if (heroDiv) {
      heroDiv.style.boxShadow = '8px 8px 0 #2c2c2c, 12px 12px 20px rgba(0,0,0,0.2)';
    }
  }

  // ==============================================
  // 10. INITIALIZATION ON PAGE LOAD
  // ==============================================
  /**
   * Set initial state
   * Ensure mobile menu is hidden on page load (redundant but safe)
   * Log successful initialization
   */
  window.addEventListener('DOMContentLoaded', function() {
    // Ensure mobile menu is hidden initially
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
    
    // Set home as active nav (already has class in HTML, but ensures)
    const homeLink = document.querySelector('.nav-link[href="#"]');
    if (homeLink) {
      removeActiveClass();
      homeLink.classList.add('active-nav');
    }
    
    console.log('🍽️ Popper Poi website initialized - ready to serve!');
  });

  /**
   * ================================================
   * FUTURE ENHANCEMENTS (Commented for developer)
   * ================================================
   * 
   * 1. Shopping Cart: Add to cart functionality
   * 2. Menu Filter: Filter by category (veg/non-veg)
   * 3. Location Detector: Auto-detect nearest outlet
   * 4. Dark Mode: Toggle street night theme
   * 5. Lazy Loading: For menu images
   * 6. Form Validation: For franchise/contact forms
   * 
   * To implement: Uncomment and modify as needed
   * ================================================
   */

})();

/**
 * ================================================
 * END OF SCRIPT
 * ================================================
 */