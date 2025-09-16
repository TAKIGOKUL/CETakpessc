import React, { memo, lazy, Suspense, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CylindricalGallery = lazy(() => import('./CylindricalGallery/CylindricalGallery'));

const Gallery = memo(() => {
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [hasScrolledGallery, setHasScrolledGallery] = useState(false);
  const galleryRef = useRef(null);
  const hintRef = useRef(null);

  // Show hint on every page load
  useEffect(() => {
    setShowScrollHint(true);
  }, []);

  // Intersection Observer to detect when gallery enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && showScrollHint) {
            setIsHintVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, [showScrollHint]);

  // Handle scroll through hint div
  const handleHintScroll = (e) => {
    e.preventDefault();
    setIsHintVisible(false);
    
    // Delay hiding to allow fade-out animation
    setTimeout(() => {
      setShowScrollHint(false);
      setHasScrolledGallery(true);
    }, 300);
  };

  return (
    <section id="gallery" className="section_gallery" ref={galleryRef}>
      {/* Scroll Hint Overlay */}
      {showScrollHint && (
        <div 
          ref={hintRef}
          className={`gallery-scroll-hint ${isHintVisible ? 'visible' : 'hidden'}`}
          onWheel={handleHintScroll}
          onTouchMove={handleHintScroll}
        >
          <div className="scroll-hint-content">
            <div className="scroll-hint-icon">
              <i className="fa fa-hand-pointer-o"></i>
            </div>
            <div className="scroll-hint-text">
              <span>Scroll to rotate gallery</span>
            </div>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="gallery_component"
      >
        <div className="content-wrapper">
          <div className="section-header">
            <h2 className="heading-style-h1">GALLERY</h2>
          </div>
        </div>
      </motion.div>
      
      {/* Cylindrical Gallery Section */}
      <Suspense fallback={<div>Loading...</div>}>
        <CylindricalGallery />
      </Suspense>
    </section>
  );
});

Gallery.displayName = 'Gallery';
export default Gallery;
