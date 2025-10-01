import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AnimatedEnergyIcon from './AnimatedEnergyIcon';
import HyperjumpPage from './HyperjumpPage';

const Navbar = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHyperjump, setShowHyperjump] = useState(false);

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

  const handleEnergyIconClick = useCallback(() => {
    setShowHyperjump(true);
  }, []);

  const handleHyperjumpComplete = useCallback(() => {
    setShowHyperjump(false);
  }, []);

  return (
    <div data-animation="default" className="navbar_component" role="banner">
      <div className="navbar_container">
        <div className="navbar_logo-section">
          <Link to="/" className="navbar_logo-link">
            <img 
              src="/assets/images/akpessc.png" 
              alt="AKPESSC 2025"
              className="navbar-logo-img"
              loading="eager"
              width="300"
              height="72"
            />
          </Link>
        </div>
        
                <div className="navbar_right-section">
                  {/* Hyperjump icon commented out */}
                  {/* <div onClick={handleEnergyIconClick} style={{ cursor: 'pointer' }}>
                    <AnimatedEnergyIcon size={32} autoStart={true} delay={500} />
                  </div> */}
                </div>
        
        {isMenuOpen && (
          <div className="navbar_overlay" onClick={toggleMenu}></div>
        )}
        
        <nav role="navigation" className={`navbar_menu ${isMenuOpen ? 'is-page-height-tablet' : ''}`}>
          <div className="navbar_menu-links">
            <a href="#hero" className="navbar_link" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>Home</a>
            <a href="#about" className="navbar_link" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
            {/* <a href="#events" className="navbar_link" onClick={(e) => { e.preventDefault(); scrollToSection('events'); }}>Events</a> */}
            <a href="#gallery" className="navbar_link" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>Gallery</a>
            {/* <a href="#speakers" className="navbar_link" onClick={(e) => { e.preventDefault(); scrollToSection('speakers'); }}>Speakers</a> */}
            <a href="#venue" className="navbar_link" onClick={(e) => { e.preventDefault(); scrollToSection('venue'); }}>Venue</a>
            <a href="#contact" className="navbar_link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
            <a href="#register" className="navbar_link navbar_register-link shimmer-button" onClick={(e) => { e.preventDefault(); scrollToSection('register'); }}>
              <span>Register</span>
            </a>
          </div>
        </nav>
        
        
        <div className={`navbar_menu-button ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          {isMenuOpen ? (
            <div className="close-icon">
              <span>×</span>
            </div>
          ) : (
            <div className="menu-icon">
              <div className="menu-icon_line-top"></div>
              <div className="menu-icon_line-middle">
                <div className="menu-icon_line-middle-inner"></div>
              </div>
              <div className="menu-icon_line-bottom"></div>
            </div>
          )}
        </div>
      </div>

      {/* Hyperjump Page */}
      <AnimatePresence>
        {showHyperjump && (
          <HyperjumpPage onComplete={handleHyperjumpComplete} />
        )}
      </AnimatePresence>
    </div>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;