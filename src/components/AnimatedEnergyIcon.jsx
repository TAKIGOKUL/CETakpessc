import React from 'react';

const AnimatedEnergyIcon = ({ size = 32 }) => {
  return (
    <div 
      className="animated-energy-icon"
      style={{ width: size, height: size }}
    >
      {/* Pulse ring effect */}
      <div className="pulse-ring pulse-ring-1"></div>
      <div className="pulse-ring pulse-ring-2"></div>
      
      {/* Main energy icon */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="energy-svg"
      >
        <path 
          d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" 
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default AnimatedEnergyIcon;
