import React, { useState, useCallback, memo } from 'react';

const Navbar = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  }, []);

  return (
    <div data-animation="default" className="navbar_component" role="banner">
      <div className="navbar_container">
        <a href="#" className="navbar_logo-link" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
          <img 
            src="./assets/images/akpessc.png" 
            alt="AKPESSC 2025"
            className="navbar-logo-img"
            loading="eager"
            width="300"
            height="72"
          />
        </a>
        
        {isMenuOpen && (
          <div className="navbar_overlay" onClick={toggleMenu}></div>
        )}
        
        <nav role="navigation" className={`navbar_menu ${isMenuOpen ? 'is-page-height-tablet' : ''}`}>
          <button className="navbar_close-button" onClick={toggleMenu} aria-label="Close menu">
            <span>×</span>
          </button>
          <div className="navbar_menu-links">
            <a href="#hero" className="navbar_link" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>Home</a>
            <a href="#about" className="navbar_link" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
            {/* <a href="#events" className="navbar_link" onClick={(e) => { e.preventDefault(); scrollToSection('events'); }}>Events</a> */}
            <a href="#gallery" className="navbar_link" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>Gallery</a>
            {/* <a href="#speakers" className="navbar_link" onClick={(e) => { e.preventDefault(); scrollToSection('speakers'); }}>Speakers</a> */}
            <a href="#venue" className="navbar_link" onClick={(e) => { e.preventDefault(); scrollToSection('venue'); }}>Venue</a>
            <a href="#contact" className="navbar_link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
            <a href="https://forms.gle/ztqP8uJvhvCrBSwo8" className="navbar_link navbar_register-link shimmer-button" target="_blank" rel="noopener noreferrer">
              <span>Register</span>
            </a>
          </div>
        </nav>
        
        
        <div className={`navbar_menu-button ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <div className="menu-icon">
            <div className="menu-icon_line-top"></div>
            <div className="menu-icon_line-middle">
              <div className="menu-icon_line-middle-inner"></div>
            </div>
            <div className="menu-icon_line-bottom"></div>
          </div>
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;