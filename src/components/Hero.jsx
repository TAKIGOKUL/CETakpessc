import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import GridDistortion from './GridDistortion';

const Hero = memo(() => {
  const [activeButton, setActiveButton] = useState('register');

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  return (
    <section className="o-hero t-home">
      <div className="o-hero__container">

        {/* Main Content - Phamily Structure */}
        <div className="m-title is-inview -isReady">
          {/* AKPESSC Logo */}
          <motion.div
            className="hero-logo"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ width: '800px', height: '250px', position: 'relative' }}>
              <GridDistortion
                imageSrc="./assets/images/akpessc.png"
                grid={10}
                mouse={0.1}
                strength={0.15}
                relaxation={0.9}
                className="hero-logo-img"
              />
            </div>

          </motion.div>

          <motion.div
            className="a-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="line" style={{ '--delay': '0.1s' }}>
              <span className="tx-xxl">All Kerala Power & Energy Society</span>
            </div>
            <div className="line" style={{ '--delay': '0.2s' }}>
              <span className="tx-xxl">Student Congress</span>
            </div>
          </motion.div>

          <motion.div
            className="m-textContent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            data-reveal
          >
            <div className="tx-s" style={{ marginTop: '2rem', opacity: 0.8 }}>
              <strong>October 10-11, 2025</strong> • College of Engineering Trivandrum, Kerala
            </div>
          </motion.div>

          <motion.div
            className={`o-hero__toggle ${activeButton === 'learn' ? 'learn-active' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <a 
              href="#register" 
              className={`a-button -tertiary ${activeButton === 'register' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveButton('register');
                scrollToSection('register');
              }}
            >
              <span>Register Now</span>
            </a>
            <a 
              href="#about" 
              className={`a-button -tertiary ${activeButton === 'learn' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveButton('learn');
                scrollToSection('about');
              }}
            >
              <span>Learn More</span>
            </a>
          </motion.div>
        </div>

        {/* Additional Text Content */}
        <motion.div
          className="o-hero__text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          data-text
        >
          <p className="tx-xs">
            Empowering the next generation of power & energy professionals through innovation, 
            collaboration, and cutting-edge technology.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;