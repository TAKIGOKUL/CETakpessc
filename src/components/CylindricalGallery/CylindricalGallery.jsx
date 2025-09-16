import React, { useEffect, useRef, useState } from 'react';
import './CylindricalGallery.css';

const CylindricalGallery = () => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);

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
    
    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isInViewport]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('gallery-scroll-locked');
    };
  }, []);

  // Gallery data with 18 animal images (can be replaced with our own images later)
  const galleryData = [
    {
      id: 1,
      title: "Lion",
      subtitle: "Panthera leo",
      image: "https://images.unsplash.com/photo-1583499871880-de841d1ace2a?h=900",
      description: "lion couple kissing on a brown rock",
      pos: "47% 35%",
      by: "Clément Roy"
    },
    {
      id: 2,
      title: "Asiatic elephant",
      subtitle: "Elephas maximus",
      image: "https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?h=900",
      description: "herd of Sri Lankan elephants walking away from a river",
      pos: "75% 65%",
      by: "Alex Azabache"
    },
    {
      id: 3,
      title: "Red-tailed black cockatoo",
      subtitle: "Calyptorhynchus banksii",
      image: "https://images.unsplash.com/photo-1619664208054-41eefeab29e9?h=900",
      description: "close-up of a black cockatoo",
      pos: "53% 43%",
      by: "David Clode"
    },
    {
      id: 4,
      title: "Dromedary",
      subtitle: "Camelus dromedarius",
      image: "https://images.unsplash.com/photo-1662841238473-f4b137e123cb?h=900",
      description: "camel and her new born calf walking in the Sahara desert",
      pos: "65% 65%",
      by: "Moaz Tobok"
    },
    {
      id: 5,
      title: "Polar bear",
      subtitle: "Ursus maritimus",
      image: "https://images.unsplash.com/photo-1589648751789-c8ecb7a88bd5?h=900",
      description: "polar bear on the snow, by the water, raised on the hind legs, front paws together",
      pos: "50% 25%",
      by: "Hans-Jurgen Mager"
    },
    {
      id: 6,
      title: "Waterbuck",
      subtitle: "Kobus ellipsiprymnus",
      image: "https://images.unsplash.com/photo-1662187554571-f54ea9657d88?h=900",
      description: "waterbuck in a field, looking at the camera",
      pos: "47%",
      by: "Jonathan Gensicke"
    },
    {
      id: 7,
      title: "Giant panda",
      subtitle: "Ailuropoda melanoleuca",
      image: "https://images.unsplash.com/photo-1659540181281-1d89d6112832?h=900",
      description: "giant panda hanging from a tree branch",
      pos: "47%",
      by: "Jiachen Lin"
    },
    {
      id: 8,
      title: "Grévy's zebra",
      subtitle: "Equus grevyi",
      image: "https://images.unsplash.com/photo-1526095179574-86e545346ae6?h=900",
      description: "zebra standing on wheat field, looking back towards the camera",
      pos: "65% 35%",
      by: "Jeff Griffith"
    },
    {
      id: 9,
      title: "Cheetah",
      subtitle: "Acinonyx jubatus",
      image: "https://images.unsplash.com/photo-1541707519942-08fd2f6480ba?h=900",
      description: "cheetah sitting in the grass under a blue sky",
      pos: "center",
      by: "Mike Bird"
    },
    {
      id: 10,
      title: "King penguin",
      subtitle: "Aptenodytes patagonicus",
      image: "https://images.unsplash.com/photo-1595792419466-23cec2476fa6?h=900",
      description: "king penguin with a fluffy brown chick on grey rocks",
      pos: "35%",
      by: "Martin Wettstein"
    },
    {
      id: 11,
      title: "Red panda",
      subtitle: "Ailurus fulgens",
      image: "https://images.unsplash.com/photo-1689799513565-44d2bc09d75b?h=900",
      description: "a red panda in a tree",
      pos: "center",
      by: "Niels Baars"
    },
    {
      id: 12,
      title: "Leopard",
      subtitle: "Panthera pardus",
      image: "https://images.unsplash.com/photo-1651611136918-a8a2f8bba419?h=900",
      description: "pensive young leopard on a rock",
      pos: "43% 47%",
      by: "Andy Silby"
    },
    {
      id: 13,
      title: "Hyacinth macaw",
      subtitle: "Anodorhynchus hyacinthinus",
      image: "https://images.unsplash.com/photo-1624210146024-1046a266038e?h=900",
      description: "two hyacinth macaws on a tree branch",
      pos: "65% 35%",
      by: "Juliana e Mariana Amorim"
    },
    {
      id: 14,
      title: "Red kangaroo",
      subtitle: "Osphranter rufus",
      image: "https://images.unsplash.com/photo-1567600868213-60eb570ae39f?h=900",
      description: "kangaroo in the grass",
      pos: "center",
      by: "Jordyn Montague"
    },
    {
      id: 15,
      title: "Snow leopard",
      subtitle: "Panthera uncia",
      image: "https://images.unsplash.com/photo-1639231554431-ebce02bdeacc?h=900",
      description: "snow leopard sitting on top of a rock, its big fluffy tail hanging down",
      pos: "50% 25%",
      by: "Simon Schwyter"
    },
    {
      id: 16,
      title: "Sumatran orangutan",
      subtitle: "Pongo abelii",
      image: "https://images.unsplash.com/photo-1723979757235-73c4767ced1d?h=900",
      description: "close-up of a pensive male orangutan",
      pos: "center",
      by: "Fahrul Razi"
    },
    {
      id: 17,
      title: "Tiger",
      subtitle: "Panthera tigris",
      image: "https://images.unsplash.com/photo-1500467525088-aafe28c0a95e?h=900",
      description: "close-up of a pensive tiger lying on the ground",
      pos: "57%",
      by: "Frida Lannerström"
    },
    {
      id: 18,
      title: "Brown bear",
      subtitle: "Ursus arctos",
      image: "https://images.unsplash.com/photo-1692373202439-4b13694c8a68?h=900",
      description: "brown bear in the forest, sticking tongue out",
      pos: "43% 35%",
      by: "Alexandru-Bogdan Ghita"
    }
  ];

  return (
    <section 
      id="cylindrical-gallery" 
      className="cylindrical-gallery-section" 
      ref={containerRef}
    >
      <div 
        className="cylindrical-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          display: 'grid',
          gridTemplateRows: '1fr'
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
