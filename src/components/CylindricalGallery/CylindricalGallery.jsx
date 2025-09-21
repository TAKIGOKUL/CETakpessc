import React, { useEffect, useRef, useState } from 'react';
import './CylindricalGallery.css';

const CylindricalGallery = () => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    let autoRotationInterval = null;

    // Auto-rotation when in viewport - stops on hover or focus
    const startAutoRotation = () => {
      if (autoRotationInterval) return; // Prevent multiple intervals
      
      autoRotationInterval = setInterval(() => {
        if (isInViewport && !isFocused && !isHovered) {
          accumulatedRotation += 0.1; // Continuous rotation speed
          setRotation(accumulatedRotation);
        }
      }, 16); // Update every 16ms (60fps) for smooth rotation
    };

    const stopAutoRotation = () => {
      if (autoRotationInterval) {
        clearInterval(autoRotationInterval);
        autoRotationInterval = null;
      }
    };

    // Start auto-rotation when component mounts and in viewport
    if (isInViewport) {
      startAutoRotation();
    }

    // Wheel support - only horizontal wheel affects gallery, vertical wheel scrolls page
    const handleWheel = (e) => {
      if (!isInViewport) return;

      const deltaY = e.deltaY;
      const deltaX = e.deltaX;
      
      // Only handle horizontal wheel (deltaX) for gallery rotation
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal wheel detected - control gallery rotation
        e.preventDefault();
        const rotationSpeed = 0.3; // Reduced speed for slower transitions
        accumulatedRotation -= deltaX * rotationSpeed;
        setRotation(accumulatedRotation);
      }
      // For vertical wheel (deltaY), don't prevent default - allow normal page scrolling
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
      
      const deltaY = touchStartY - touchCurrentY; // Vertical swipe
      const deltaX = touchCurrentX - touchStartX; // Horizontal swipe
      
      // Only handle horizontal swipes for gallery rotation
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe detected - control gallery rotation
        const rotationSpeed = 0.25; // Reduced speed for slower touch transitions
        accumulatedRotation += deltaX * rotationSpeed;
        setRotation(accumulatedRotation);
        e.preventDefault();
        
        // Update touch start position for continuous movement
        touchStartY = touchCurrentY;
        touchStartX = touchCurrentX;
      }
      // For vertical swipes, don't prevent default - allow normal page scrolling
    };

    const handleTouchEnd = (e) => {
      isTouching = false;
    };

    // Keyboard support for arrow keys - horizontal rotation only
    const handleKeyDown = (e) => {
      if (!isInViewport) return;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault(); // Prevent default arrow key behavior
        
        const rotationAmount = 8; // Reduced degrees per key press for slower transitions
        
        if (e.key === 'ArrowLeft') {
          // Left arrow = clockwise rotation
          accumulatedRotation += rotationAmount;
        } else if (e.key === 'ArrowRight') {
          // Right arrow = counterclockwise rotation
          accumulatedRotation -= rotationAmount;
        }
        
        // Continuous rotation (no limits) - marquee-like behavior
        setRotation(accumulatedRotation);
      }
    };

    // Focus handlers for stopping auto-rotation
    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    // Hover handlers for stopping auto-rotation
    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    // Add touch event listeners to the container
    if (containerRef.current) {
      containerRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
      containerRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
      containerRef.current.addEventListener('touchend', handleTouchEnd, { passive: false });
      containerRef.current.addEventListener('focus', handleFocus);
      containerRef.current.addEventListener('blur', handleBlur);
      containerRef.current.addEventListener('mouseenter', handleMouseEnter);
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      stopAutoRotation(); // Clean up auto-rotation interval
      
      // Remove touch event listeners
      if (containerRef.current) {
        containerRef.current.removeEventListener('touchstart', handleTouchStart);
        containerRef.current.removeEventListener('touchmove', handleTouchMove);
        containerRef.current.removeEventListener('touchend', handleTouchEnd);
        containerRef.current.removeEventListener('focus', handleFocus);
        containerRef.current.removeEventListener('blur', handleBlur);
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isInViewport, isFocused, isHovered]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('gallery-scroll-locked');
    };
  }, []);

  // Gallery data with all AKPESSC event images from public/assets/gallery folder
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
      title: "Group Photo",
      subtitle: "AKPESSC Participants",
      image: "./assets/gallery/group akpessc.png",
      description: "Group photo of AKPESSC participants and organizers",
      pos: "center",
      by: "Workshop"
    },
    {
      id: 3,
      title: "Panel Discussion",
      subtitle: "Expert Panel",
      image: "./assets/gallery/panel.JPG",
      description: "Expert panel discussion during AKPESSC conference",
      pos: "center",
      by: "Podium"
    },
    {
      id: 4,
      title: "Talk Session",
      subtitle: "Technical Presentation",
      image: "./assets/gallery/talksession.JPG",
      description: "Technical talk session at AKPESSC conference",
      pos: "center",
      by: "Talksession"
    },
    {
      id: 5,
      title: "Team Photo",
      subtitle: "Organizing Team",
      image: "./assets/gallery/team.JPG",
      description: "AKPESSC organizing team group photo",
      pos: "center",
      by: "Team"
    },
    {
      id: 6,
      title: "Musical Performance",
      subtitle: "Cultural Event",
      image: "./assets/gallery/musical.JPG",
      description: "Musical performance at AKPESSC cultural event",
      pos: "center",
      by: "Culture"
    },
    {
      id: 7,
      title: "Lab Session",
      subtitle: "Practical Workshop",
      image: "./assets/gallery/Lab1.JPG",
      description: "Laboratory session during AKPESSC workshop",
      pos: "center",
      by: "Workshop"
    },
    {
      id: 8,
      title: "Seminar Session",
      subtitle: "Academic Seminar",
      image: "./assets/gallery/seminar1.JPG",
      description: "Academic seminar session at AKPESSC",
      pos: "center",
      by: "Talksession"
    },
    {
      id: 9,
      title: "Cultural Event",
      subtitle: "Traditional Culture",
      image: "./assets/gallery/culture1.JPG",
      description: "Traditional cultural event at AKPESSC",
      pos: "center",
      by: "Culture"
    },
    {
      id: 10,
      title: "Music Performance",
      subtitle: "Live Music",
      image: "./assets/gallery/music1.JPG",
      description: "Live music performance at AKPESSC",
      pos: "center",
      by: "Culture"
    },
    {
      id: 11,
      title: "Prize Distribution",
      subtitle: "Awards Ceremony",
      image: "./assets/gallery/prize.JPG",
      description: "Prize distribution ceremony at AKPESSC",
      pos: "center",
      by: "Prize Distribution"
    },
    {
      id: 12,
      title: "Technical Talk",
      subtitle: "Expert Presentation",
      image: "./assets/gallery/talkag_1.JPG",
      description: "Technical talk by industry expert",
      pos: "center",
      by: "Talksession"
    },
    {
      id: 13,
      title: "Lab Workshop",
      subtitle: "Hands-on Session",
      image: "./assets/gallery/lab2.png",
      description: "Hands-on laboratory workshop session",
      pos: "center",
      by: "Workshop"
    },
    {
      id: 14,
      title: "Seminar Discussion",
      subtitle: "Academic Discussion",
      image: "./assets/gallery/seminar2.JPG",
      description: "Academic seminar discussion session",
      pos: "center",
      by: "Talksession"
    },
    {
      id: 15,
      title: "Cultural Performance",
      subtitle: "Traditional Arts",
      image: "./assets/gallery/culture2.JPG",
      description: "Traditional cultural performance",
      pos: "center",
      by: "Culture"
    },
    {
      id: 16,
      title: "Music Session",
      subtitle: "Live Performance",
      image: "./assets/gallery/music3.JPG",
      description: "Live music session at AKPESSC",
      pos: "center",
      by: "Culture"
    },
    {
      id: 17,
      title: "Team Building",
      subtitle: "Group Activity",
      image: "./assets/gallery/team1.JPG",
      description: "Team building activity during AKPESSC",
      pos: "center",
      by: "Team"
    },
    {
      id: 18,
      title: "Cultural Show",
      subtitle: "Traditional Arts",
      image: "./assets/gallery/culture3.JPG",
      description: "Traditional cultural show at AKPESSC",
      pos: "center",
      by: "Culture"
    },
    {
      id: 19,
      title: "Guest Discussion",
      subtitle: "Expert Panel",
      image: "./assets/gallery/gd.JPG",
      description: "Guest discussion session with industry experts",
      pos: "center",
      by: "Talksession"
    },
    {
      id: 20,
      title: "Lighting",
      subtitle: "Event Setup",
      image: "./assets/gallery/Lamp.JPG",
      description: "Event lighting and setup preparation",
      pos: "center",
      by: "Lighting Ceremony"
    },
    {
      id: 21,
      title: "Rooming Activity",
      subtitle: "Team Building",
      image: "./assets/gallery/rooming_6.png",
      description: "Rooming and accommodation activity",
      pos: "center",
      by: "Team"
    }
  ];

  return (
    <section 
      id="cylindrical-gallery" 
      className="cylindrical-gallery-section" 
      ref={containerRef}
      tabIndex={0}
    >
      <div 
        className="cylindrical-container"
        style={{
          position: 'relative',
          width: '100%',
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
                  width: '350px', // Reduced width to eliminate right margin
                  height: '200px', // Standard height
                  aspectRatio: '1.75/1'
                }}
              >
                <header 
                  className="cylindrical-item-header"
                  style={{
                    width: '350px', // Reduced width to eliminate right margin
                    height: '200px', // Standard height
                    aspectRatio: '1.75/1'
                  }}
                >
                </header>
                <figure 
                  className="cylindrical-figure"
                  style={{
                    width: '350px', // Reduced width to eliminate right margin
                    height: '200px', // Standard height
                    aspectRatio: '1.75/1'
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
                      aspectRatio: '1.75/1'
                    }}
                  />
                  <figcaption>
                   <a href="#" target="_blank">{item.by}</a>
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
