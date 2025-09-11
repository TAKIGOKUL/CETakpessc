import React, { memo } from 'react';
import { motion } from 'framer-motion';

const Gallery = memo(() => {
  const galleryImages = [
    {
      id: 1,
      src: "/assets/images/group akpessc.png",
      alt: "Group Photo"
    },
    {
      id: 2,
      src: "/assets/images/team akpessc.png",
      alt: "Team Photo"
    },
    {
      id: 3,
      src: "/assets/images/field visit akpessc.png",
      alt: "Field Visit"
    },
    {
      id: 4,
      src: "/assets/images/dance akpessc.png",
      alt: "Cultural Event"
    },
    {
      id: 5,
      src: "/assets/images/rooming akpessc.png",
      alt: "Accommodation"
    },
    {
      id: 6,
      src: "/assets/images/party akpessc.png",
      alt: "Social Event"
    },
    {
      id: 7,
      src: "/assets/images/song akpessc.png",
      alt: "Musical Performance"
    },
    {
      id: 8,
      src: "/assets/images/lab akpessc.png",
      alt: "Technical Session"
    }
  ];

  return (
    <section id="gallery" className="section_gallery">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="gallery_component"
          >
            <div className="content-wrapper">
              <div className="section-header">
                <h2 className="heading-style-h1">GALLERY</h2>
                <p className="gallery-subtitle">Capturing moments from AKPESSC events</p>
              </div>
              
              <div className="gallery-grid">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="gallery-item"
                  >
                    <div className="gallery-image-container">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="gallery-image"
                        loading="lazy"
                      />
                      <div className="gallery-overlay">
                        <div className="gallery-overlay-content">
                          <h4>{image.alt}</h4>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Gallery.displayName = 'Gallery';
export default Gallery;
