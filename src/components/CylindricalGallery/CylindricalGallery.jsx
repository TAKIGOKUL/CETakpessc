import React, { useEffect, useRef, useState } from 'react';
import './CylindricalGallery.css';

const CylindricalGallery = () => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [showMobileHint, setShowMobileHint] = useState(false);

  // Detect if device is mobile
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);
    
    if (isMobile) {
      setShowMobileHint(true);
      // Hide hint after 3 seconds
      setTimeout(() => setShowMobileHint(false), 3000);
    }
  }, []);

  useEffect(() => {
    // Intersection Observer to detect when gallery enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
          } else {
            setIsInViewport(false);
            setRotation(0); // Reset rotation when leaving viewport
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    let accumulatedRotation = 0;

    // Mouse wheel support for direct rotation with limits
    const handleWheel = (e) => {
      if (!isInViewport) return;

      const deltaY = e.deltaY;
      const rotationSpeed = 2; // Direct wheel rotation speed
      
      // Wheel up (negative deltaY) = clockwise rotation (towards 0°)
      // Wheel down (positive deltaY) = counterclockwise rotation (towards -360°)
      
      const newRotation = accumulatedRotation - deltaY * rotationSpeed;
      
      // Check rotation limits
      if (newRotation > 0) {
        // At 0° limit - allow normal scroll up
        if (deltaY < 0) { // Wheel up - allow normal page scroll
          return; // Don't prevent default, allow normal scroll
        } else {
          // Wheel down - continue rotation but clamp to 0
          accumulatedRotation = 0;
          setRotation(accumulatedRotation);
          e.preventDefault();
        }
      } else if (newRotation < -360) {
        // At -360° limit - allow normal scroll down
        if (deltaY > 0) { // Wheel down - allow normal page scroll
          return; // Don't prevent default, allow normal scroll
        } else {
          // Wheel up - continue rotation but clamp to -360
          accumulatedRotation = -360;
          setRotation(accumulatedRotation);
          e.preventDefault();
        }
      } else {
        // Within rotation limits - prevent default and rotate
        accumulatedRotation = newRotation;
        setRotation(accumulatedRotation);
        e.preventDefault();
      }
    };

    // Touch support for mobile devices
    let touchStartY = 0;
    let touchStartX = 0;
    let isTouching = false;

    const handleTouchStart = (e) => {
      if (!isInViewport) return;
      
      isTouching = true;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      if (!isInViewport || !isTouching) return;

      const touchCurrentY = e.touches[0].clientY;
      const touchCurrentX = e.touches[0].clientX;
      
      const deltaY = touchStartY - touchCurrentY; // Inverted for natural feel
      const deltaX = touchCurrentX - touchStartX;
      
      // Use vertical swipe for rotation (more natural on mobile)
      const rotationSpeed = 1.5; // Slower for touch
      const newRotation = accumulatedRotation + deltaY * rotationSpeed;
      
      // Check rotation limits
      if (newRotation > 0) {
        accumulatedRotation = 0;
        setRotation(accumulatedRotation);
        e.preventDefault();
      } else if (newRotation < -360) {
        accumulatedRotation = -360;
        setRotation(accumulatedRotation);
        e.preventDefault();
      } else {
        accumulatedRotation = newRotation;
        setRotation(accumulatedRotation);
        e.preventDefault();
      }
      
      // Update touch start position for continuous movement
      touchStartY = touchCurrentY;
      touchStartX = touchCurrentX;
    };

    const handleTouchEnd = (e) => {
      isTouching = false;
    };

    // Keyboard support for arrow keys with rotation limits
    const handleKeyDown = (e) => {
      if (!isInViewport) return;

      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const scrollAmount = window.innerHeight * 0.1;
        const currentScroll = window.scrollY;
        
        if (e.key === 'ArrowUp') {
          // Check if we're at rotation limit (0°)
          if (accumulatedRotation >= 0) {
            // Allow normal page scroll up
            const newScroll = Math.max(0, currentScroll - scrollAmount);
            window.scrollTo({
              top: newScroll,
              behavior: 'smooth'
            });
          } else {
            // Continue rotation
            e.preventDefault();
            accumulatedRotation += scrollAmount * 0.5; // Slower rotation for keys
            if (accumulatedRotation > 0) accumulatedRotation = 0; // Clamp to limit
            setRotation(accumulatedRotation);
          }
        } else if (e.key === 'ArrowDown') {
          // Check if we're at rotation limit (-360°)
          if (accumulatedRotation <= -360) {
            // Allow normal page scroll down
            const newScroll = currentScroll + scrollAmount;
            window.scrollTo({
              top: newScroll,
              behavior: 'smooth'
            });
          } else {
            // Continue rotation
            e.preventDefault();
            accumulatedRotation -= scrollAmount * 0.5; // Slower rotation for keys
            if (accumulatedRotation < -360) accumulatedRotation = -360; // Clamp to limit
            setRotation(accumulatedRotation);
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    // Add touch event listeners to the container
    if (containerRef.current) {
      containerRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
      containerRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
      containerRef.current.addEventListener('touchend', handleTouchEnd, { passive: false });
    }
    
    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      
      // Remove touch event listeners
      if (containerRef.current) {
        containerRef.current.removeEventListener('touchstart', handleTouchStart);
        containerRef.current.removeEventListener('touchmove', handleTouchMove);
        containerRef.current.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isInViewport]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('gallery-scroll-locked');
    };
  }, []);

  // Gallery data with AKPESSC event images
  const galleryData = [
    {
      id: 1,
      title: "AKPESSC Dance",
      subtitle: "Cultural Performance",
      image: "./assets/gallery/dance akpessc.png",
      description: "Traditional dance performance at AKPESSC event",
      pos: "center",
      by: "Dance"
    },
    {
      id: 2,
      title: "Field Visit",
      subtitle: "Technical Tour",
      image: "./assets/gallery/field visit akpessc.png",
      description: "Students on technical field visit during AKPESSC",
      pos: "center",
      by: "Field Visit"
    },
    {
      id: 3,
      title: "Group Photo",
      subtitle: "AKPESSC Participants",
      image: "./assets/gallery/group akpessc.png",
      description: "Group photo of AKPESSC participants and organizers",
      pos: "center",
      by: "Workshop"
    },
    {
      id: 4,
      title: "Panel Discussion",
      subtitle: "Expert Panel",
      image: "/assets/gallery/panel.jpg",
      description: "Expert panel discussion during AKPESSC conference",
      pos: "center",
      by: "Podium"
    },
    {
      id: 5,
      title: "Talk Session",
      subtitle: "Technical Presentation",
      image: "/assets/gallery/talksession.jpg",
      description: "Technical talk session at AKPESSC conference",
      pos: "center",
      by: "Talksession"
    },
    {
      id: 6,
      title: "Team Photo",
      subtitle: "Organizing Team",
      image: "/assets/gallery/team.jpg",
      description: "AKPESSC organizing team group photo",
      pos: "center",
      by: "Team"
    },
    {
      id: 7,
      title: "Musical Performance",
      subtitle: "Cultural Event",
      image: "/assets/gallery/musical.jpg",
      description: "Musical performance at AKPESSC cultural event",
      pos: "center",
      by: "Culture"
    },
    {
      id: 8,
      title: "Lab Session",
      subtitle: "Practical Workshop",
      image: "/assets/gallery/Lab1.jpg",
      description: "Laboratory session during AKPESSC workshop",
      pos: "center",
      by: "Workshop"
    },
    {
      id: 9,
      title: "Seminar Session",
      subtitle: "Academic Seminar",
      image: "/assets/gallery/seminar1.jpg",
      description: "Academic seminar session at AKPESSC",
      pos: "center",
      by: "Talksession"
    },
    {
      id: 10,
      title: "Cultural Event",
      subtitle: "Traditional Culture",
      image: "/assets/gallery/culture1.jpg",
      description: "Traditional cultural event at AKPESSC",
      pos: "center",
      by: "Culture"
    },
    {
      id: 11,
      title: "Music Performance",
      subtitle: "Live Music",
      image: "/assets/gallery/music1.jpg",
      description: "Live music performance at AKPESSC",
      pos: "center",
      by: "Culture"
    },
    {
      id: 12,
      title: "Prize Distribution",
      subtitle: "Awards Ceremony",
      image: "/assets/gallery/prize.jpg",
      description: "Prize distribution ceremony at AKPESSC",
      pos: "center",
      by: "Prize Distribution"
    },
    {
      id: 13,
      title: "Technical Talk",
      subtitle: "Expert Presentation",
      image: "/assets/gallery/talkag_1.jpg",
      description: "Technical talk by industry expert",
      pos: "center",
      by: "Talksession"
    },
    {
      id: 14,
      title: "Lab Workshop",
      subtitle: "Hands-on Session",
      image: "./assets/gallery/lab2.png",
      description: "Hands-on laboratory workshop session",
      pos: "center",
      by: "Workshop"
    },
    {
      id: 15,
      title: "Seminar Discussion",
      subtitle: "Academic Discussion",
      image: "/assets/gallery/seminar2.jpg",
      description: "Academic seminar discussion session",
      pos: "center",
      by: "Talksession"
    },
    {
      id: 16,
      title: "Cultural Performance",
      subtitle: "Traditional Arts",
      image: "/assets/gallery/culture2.jpg",
      description: "Traditional cultural performance",
      pos: "center",
      by:"Culture"
    },
    {
      id: 17,
      title: "Music Session",
      subtitle: "Live Performance",
      image: "/assets/gallery/music3.jpg",
      description: "Live music session at AKPESSC",
      pos: "center",
      by: "Culture"
    },
    {
      id: 18,
      title: "Team Building",
      subtitle: "Group Activity",
      image: "/assets/gallery/team1.jpg",
      description: "Team building activity during AKPESSC",
      pos: "center",
      by: "Team"
    }
  ];

  return (
    <section 
      id="cylindrical-gallery" 
      className="cylindrical-gallery-section" 
      ref={containerRef}
    >
      {/* Mobile hint */}
      {showMobileHint && (
        <div className="mobile-hint">
          <div className="mobile-hint-content">
            <span>👆 Swipe up/down to rotate gallery</span>
          </div>
        </div>
      )}
      
      <div 
        className="cylindrical-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '40vh',
          display: 'grid',
          gridTemplateRows: '1fr',
          margin: 0,
          padding: 0
        }}
      >
        
         <main className="cylindrical-scene">
           <section 
             className="cylindrical-assembly"
             style={{ 
               transform: `translateZ(var(--z)) rotateY(${rotation}deg) translateY(0px)`
             }}
           >
            {galleryData.map((item, index) => (
              <article 
                key={item.id}
                className="cylindrical-item"
                style={{
                  '--i': index,
                  '--url': `url(${item.image})`,
                  '--pos': item.pos || 'center',
                  width: '450px',
                  height: '200px',
                  aspectRatio: '2.25/1'
                }}
              >
                <header 
                  className="cylindrical-item-header"
                  style={{
                    width: '300px',
                    height: '200px',
                    aspectRatio: '3/2'
                  }}
                >
                </header>
                <figure 
                  className="cylindrical-figure"
                  style={{
                    width: '300px',
                    height: '200px',
                    aspectRatio: '3/2'
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.description}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: item.pos || 'center',
                      aspectRatio: '3/2'
                    }}
                  />
                  <figcaption>
                    by <a href="#" target="_blank" className="hover:underline">{item.by}</a>
                  </figcaption>
                </figure>
              </article>
            ))}
          </section>
        </main>
        
      </div>
    </section>
  );
};

export default CylindricalGallery;
