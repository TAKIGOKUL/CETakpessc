# Cylindrical Gallery Component

## Overview
This is an interactive cylindrical gallery component inspired by modern scroll-driven animations. It creates a 3D cylindrical layout where items rotate around a central axis as the user scrolls.

## Features
- **3D Cylindrical Layout**: Items are arranged in a circular pattern around a central axis
- **Scroll-Locked Interaction**: When gallery enters viewport, normal scroll is locked and wheel events control rotation
- **Rotation Limits**: Scroll up rotates from 0° to -360°, scroll down rotates from -360° to 0°
- **Smart Scroll Reinitiation**: After reaching rotation limits, normal scroll behavior resumes
- **Interactive Hover Effects**: Items flip to show front/back content on hover
- **Responsive Design**: Adapts to different screen sizes
- **Visual Indicators**: Shows rotation angle and scroll lock status
- **Isolated Scroll Behavior**: Prevents conflicts with other components

## Files Structure
```
src/components/CylindricalGallery/
├── CylindricalGallery.jsx    # Main React component
├── CylindricalGallery.css    # Isolated stylesheet
└── README.md                 # This documentation
```

## Key Features

### Scroll Isolation
- Uses custom CSS properties (`--cylindrical-k`) to avoid conflicts
- Implements isolated scroll event handling
- Prevents interference with main app scroll behavior

### 3D Transformations
- CSS `transform-style: preserve-3d` for 3D effects
- `perspective` for depth perception
- `rotateY` and `translateZ` for cylindrical positioning

### Interactive Elements
- Hover effects that flip items to show different content
- Smooth transitions and animations
- Backface visibility control

## Usage
The component is automatically imported and rendered in the main App.jsx file. It appears between the regular Gallery and Registration sections.

## Browser Support
- Requires modern browsers with CSS scroll-driven animations support
- Fallback styles provided for unsupported browsers
- Progressive enhancement approach

## Customization
- Modify `galleryData` array in CylindricalGallery.jsx to change content
- Adjust CSS custom properties for different layouts
- Update colors and styling in CylindricalGallery.css

## Performance
- Lazy loaded for optimal performance
- Uses CSS animations instead of JavaScript where possible
- Minimal JavaScript footprint
