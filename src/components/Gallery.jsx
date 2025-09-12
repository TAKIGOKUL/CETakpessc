import React, { memo } from 'react';
import { motion } from 'framer-motion';
import akpessc_group from '../assets/images/group akpessc.png'
import akpessc_team from '../assets/images/team akpessc.png'
import akpessc_field_visit from '../assets/images/field visit akpessc.png'
import akpessc_dance from '../assets/images/dance akpessc.png'
import akpessc_rooming from '../assets/images/rooming akpessc.png'
// import akpessc_party from '../assets/images/party akpessc.png'
// import akpessc_song from '../assets/images/song akpessc.png' not available
import akpessc_lab from '../assets/images/lab akpessc.png'
const Gallery = memo(() => {
  const galleryImages = [
    {
      id: 1,
      src: akpessc_group,
      alt: "Group Photo"
    },
    {
      id: 2,
      src: akpessc_team,
      alt: "Team Photo"
    },
    {
      id: 3,
      src: akpessc_field_visit,
      alt: "Field Visit"
    },
    {
      id: 4,
      src: akpessc_dance,
      alt: "Cultural Event"
    },
    {
      id: 5,
      src: akpessc_rooming,
      alt: "Accommodation"
    },
    {
      id: 6,
      src: "https://placehold.in/800x400@1x.png/dark",
      
      alt: "Social Event"
    },
    {
      id: 7,
      src: "https://placehold.in/800x400@1x.png/dark",
      alt: "Musical Performance"
    },
    {
      id: 8,
      src: akpessc_lab,
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
