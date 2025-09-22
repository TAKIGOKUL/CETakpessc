import React, { useState, useEffect } from 'react';
import './GridGallery.css';

const GridGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collageImages, setCollageImages] = useState([]);

  // Gallery data - all images from public./assets/gallery folder (excluding field visit akpessc.png)
  const galleryData = [
    { id: 1, src: './assets/gallery/culture1.JPG', alt: 'Cultural Event 1', title: 'Cultural Event 1' },
    { id: 2, src: './assets/gallery/culture2.JPG', alt: 'Cultural Event 2', title: 'Cultural Event 2' },
    { id: 3, src: './assets/gallery/culture3.JPG', alt: 'Cultural Event 3', title: 'Cultural Event 3' },
    { id: 4, src: './assets/gallery/dance akpessc.png', alt: 'Dance Performance', title: 'Dance Performance' },
    { id: 5, src: './assets/gallery/gd.JPG', alt: 'Group Discussion', title: 'Group Discussion' },
    { id: 6, src: './assets/gallery/group akpessc.png', alt: 'Group Photo', title: 'Group Photo' },
    { id: 7, src: './assets/gallery/Lab1.JPG', alt: 'Laboratory Session 1', title: 'Laboratory Session 1' },
    { id: 8, src: './assets/gallery/lab2.png', alt: 'Laboratory Session 2', title: 'Laboratory Session 2' },
    { id: 9, src: './assets/gallery/Lamp.JPG', alt: 'Lamp Display', title: 'Lamp Display' },
    { id: 10, src: './assets/gallery/music1.JPG', alt: 'Music Performance 1', title: 'Music Performance 1' },
    { id: 11, src: './assets/gallery/music3.JPG', alt: 'Music Performance 3', title: 'Music Performance 3' },
    { id: 12, src: './assets/gallery/musical.JPG', alt: 'Musical Event', title: 'Musical Event' },
    { id: 13, src: './assets/gallery/panel.JPG', alt: 'Panel Discussion', title: 'Panel Discussion' },
    { id: 14, src: './assets/gallery/prize.JPG', alt: 'Prize Distribution', title: 'Prize Distribution' },
    { id: 15, src: './assets/gallery/rooming_6.png', alt: 'Room Setup', title: 'Room Setup' },
    { id: 16, src: './assets/gallery/seminar1.JPG', alt: 'Seminar 1', title: 'Seminar 1' },
    { id: 17, src: './assets/gallery/seminar2.JPG', alt: 'Seminar 2', title: 'Seminar 2' },
    { id: 18, src: './assets/gallery/talkag_1.JPG', alt: 'Talk Session 1', title: 'Talk Session 1' },
    { id: 19, src: './assets/gallery/talksession.JPG', alt: 'Talk Session', title: 'Talk Session' },
    { id: 20, src: './assets/gallery/team.JPG', alt: 'Team Photo', title: 'Team Photo' },
    { id: 21, src: './assets/gallery/team1.JPG', alt: 'Team Photo 1', title: 'Team Photo 1' }
  ];

  // Define collage layout filling all 32 grid cells (8 rows x 4 columns)
  const collageLayout = [
    // Row 1-2: Large 2x2 slot + 2 small slots
    { id: 1, size: 'large', gridArea: '1 / 1 / 3 / 3' },      // Large 2x2 slot
    { id: 2, size: 'small', gridArea: '1 / 3 / 2 / 4' },     // Small 1x1 slot
    { id: 3, size: 'small', gridArea: '2 / 3 / 3 / 4' },     // Small 1x1 slot
    
    // Row 3: 4 small slots
    { id: 4, size: 'small', gridArea: '3 / 1 / 4 / 2' },     // Small 1x1 slot
    { id: 5, size: 'small', gridArea: '3 / 2 / 4 / 3' },     // Small 1x1 slot
    { id: 6, size: 'small', gridArea: '3 / 3 / 4 / 4' },     // Small 1x1 slot
    
    // Row 4: 4 small slots
    { id: 7, size: 'small', gridArea: '4 / 1 / 5 / 2' },     // Small 1x1 slot
    { id: 8, size: 'small', gridArea: '4 / 2 / 5 / 3' },     // Small 1x1 slot
    { id: 9, size: 'small', gridArea: '4 / 3 / 5 / 4' },     // Small 1x1 slot
    
    // Row 5-6: Large 2x2 slot + 2 small slots
    { id: 10, size: 'large', gridArea: '5 / 1 / 7 / 3' },    // Large 2x2 slot
    { id: 11, size: 'small', gridArea: '5 / 3 / 6 / 4' },    // Small 1x1 slot
    { id: 12, size: 'small', gridArea: '6 / 3 / 7 / 4' },    // Small 1x1 slot
    
    // Row 7: 4 small slots
    { id: 13, size: 'small', gridArea: '7 / 1 / 8 / 2' },    // Small 1x1 slot
    { id: 14, size: 'small', gridArea: '7 / 2 / 8 / 3' },    // Small 1x1 slot
    { id: 15, size: 'small', gridArea: '7 / 3 / 8 / 4' },    // Small 1x1 slot
    
    // Row 8: 4 small slots
    { id: 16, size: 'small', gridArea: '8 / 1 / 9 / 2' },    // Small 1x1 slot
    { id: 17, size: 'small', gridArea: '8 / 2 / 9 / 3' },    // Small 1x1 slot
    { id: 18, size: 'small', gridArea: '8 / 3 / 9 / 4' },    // Small 1x1 slot
    
    // Fill the 4th column with additional slots where there's space
    { id: 19, size: 'small', gridArea: '1 / 4 / 2 / 5' },    // Small 1x1 slot (row 1, column 4)
    { id: 20, size: 'small', gridArea: '2 / 4 / 3 / 5' },    // Small 1x1 slot (row 2, column 4)
    { id: 21, size: 'small', gridArea: '3 / 4 / 4 / 5' },    // Small 1x1 slot (row 3, column 4)
    { id: 22, size: 'small', gridArea: '4 / 4 / 5 / 5' },    // Small 1x1 slot (row 4, column 4)
    { id: 23, size: 'small', gridArea: '5 / 4 / 6 / 5' },    // Small 1x1 slot (row 5, column 4)
    { id: 24, size: 'small', gridArea: '6 / 4 / 7 / 5' },    // Small 1x1 slot (row 6, column 4)
    { id: 25, size: 'small', gridArea: '7 / 4 / 8 / 5' },    // Small 1x1 slot (row 7, column 4)
    { id: 26, size: 'small', gridArea: '8 / 4 / 9 / 5' },    // Small 1x1 slot (row 8, column 4)
    
  ];

  // Initialize collage with random images
  const initializeCollage = () => {
    const shuffledImages = [...galleryData].sort(() => Math.random() - 0.5);
    const initialImages = collageLayout.map((slot, index) => ({
      ...slot,
      image: shuffledImages[index % shuffledImages.length]
    }));
    setCollageImages(initialImages);
  };

  // Initialize collage on mount
  useEffect(() => {
    initializeCollage();
  }, []);

  // Randomly change individual images at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setCollageImages(prevImages => {
        const newImages = [...prevImages];
        
        // Randomly select 1-3 slots to change
        const numToChange = Math.floor(Math.random() * 3) + 1;
        const indicesToChange = [];
        
        // Get random indices
        while (indicesToChange.length < numToChange) {
          const randomIndex = Math.floor(Math.random() * collageLayout.length);
          if (!indicesToChange.includes(randomIndex)) {
            indicesToChange.push(randomIndex);
          }
        }
        
        // Replace selected images with random new ones
        indicesToChange.forEach(index => {
          const availableImages = galleryData.filter(img => 
            !newImages.some(existing => existing.image.id === img.id)
          );
          
          if (availableImages.length > 0) {
            const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
            newImages[index] = {
              ...newImages[index],
              image: randomImage
            };
          } else {
            // If all images are used, pick any random image
            const randomImage = galleryData[Math.floor(Math.random() * galleryData.length)];
            newImages[index] = {
              ...newImages[index],
              image: randomImage
            };
          }
        });
        
        return newImages;
      });
    }, 2000); // Change images every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="collage-frame">
        <div className="collage-grid">
          {collageImages.map((slot) => (
            <div
              key={slot.id}
              className={`collage-item ${slot.size}`}
              style={{ gridArea: slot.gridArea }}
              onClick={() => handleImageClick(slot.image)}
            >
              <img
                src={slot.image.src}
                alt={slot.image.alt}
                loading="lazy"
              />
              <div className="collage-item-overlay">
                <div className="collage-item-title">{slot.image.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="modal-image"
            />
            <div className="modal-title">{selectedImage.title}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default GridGallery;
