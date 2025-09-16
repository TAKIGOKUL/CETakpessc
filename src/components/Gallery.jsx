import React, { memo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

const CylindricalGallery = lazy(() => import('./CylindricalGallery/CylindricalGallery'));
const Gallery = memo(() => {
  return (
    
    <section id="gallery" className="section_gallery">
      <div className='padding-global padding-section-large'>
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
      </div>
    </section>
  );
});

Gallery.displayName = 'Gallery';
export default Gallery;
