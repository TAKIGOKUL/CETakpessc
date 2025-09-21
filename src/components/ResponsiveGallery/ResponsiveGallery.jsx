import React, { useEffect, useRef, useState } from 'react';
import CylindricalGallery from '../CylindricalGallery/CylindricalGallery';
import GridGallery from './GridGallery';
import './ResponsiveGallery.css';

const ResponsiveGallery = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use cylindrical gallery for medium and large devices (768px and above)
  // Use grid gallery for small devices (below 768px)
  const isSmallDevice = screenSize.width < 768;

  return (
    <div className="responsive-gallery-container">
      {isSmallDevice ? (
        <GridGallery />
      ) : (
        <CylindricalGallery />
      )}
    </div>
  );
};

export default ResponsiveGallery;
