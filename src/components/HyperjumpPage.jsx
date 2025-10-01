import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

// Animation phases with better timing and flow
const ANIMATION_PHASES = {
  INTRO: 'intro',
  LOGO_REVEAL: 'logo_reveal', 
  LOGO_ZOOM: 'logo_zoom',
  TUNNEL_ENTRY: 'tunnel_entry',
  TUNNEL_EXPANSION: 'tunnel_expansion',
  VIDEO_REVEAL: 'video_reveal',
  VIDEO_PLAY: 'video_play',
  COMPLETE: 'complete'
};

// Responsive configuration
const RESPONSIVE_CONFIG = {
  mobile: { particles: 25, sparks: 15, stars: 2, shooting: 1 },
  tablet: { particles: 40, sparks: 25, stars: 4, shooting: 2 },
  desktop: { particles: 60, sparks: 40, stars: 6, shooting: 3 }
};

// Custom hooks for better organization
const useResponsive = () => {
  const [screenSize, setScreenSize] = useState('desktop');
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('mobile');
      else if (width < 768) setScreenSize('tablet');
      else setScreenSize('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

const useAnimationSequence = (onComplete) => {
  const [currentPhase, setCurrentPhase] = useState(ANIMATION_PHASES.INTRO);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const sequence = [
      { phase: ANIMATION_PHASES.LOGO_REVEAL, delay: 1000 },
      { phase: ANIMATION_PHASES.LOGO_ZOOM, delay: 3000 },
      { phase: ANIMATION_PHASES.TUNNEL_ENTRY, delay: 2000 },
      { phase: ANIMATION_PHASES.TUNNEL_EXPANSION, delay: 2000 },
      { phase: ANIMATION_PHASES.VIDEO_REVEAL, delay: 2000 },
      { phase: ANIMATION_PHASES.VIDEO_PLAY, delay: 1500 },
      { phase: ANIMATION_PHASES.COMPLETE, delay: 3000 }
    ];

    let timeoutId;
    let currentIndex = 0;

    const runSequence = () => {
      if (currentIndex < sequence.length) {
        const { phase, delay } = sequence[currentIndex];
        timeoutId = setTimeout(() => {
          setCurrentPhase(phase);
          if (phase === ANIMATION_PHASES.VIDEO_PLAY) {
            setVideoPlaying(true);
          }
          if (phase === ANIMATION_PHASES.COMPLETE && onComplete) {
            onComplete();
          }
          currentIndex++;
          runSequence();
        }, delay);
      }
    };

    runSequence();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [onComplete]);

  return { currentPhase, videoPlaying };
};

// Particle system components
const ParticleSystem = ({ type, count, screenSize }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: `${type}-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 4,
      size: type === 'spark' ? 1 + Math.random() * 2 : 2 + Math.random() * 3
    })), [count, type]
  );

  return (
    <div className={`${type}-particles`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`${type}-particle`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 300],
            y: [0, (Math.random() - 0.5) * 300],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotate: type === 'spark' ? [0, 360] : [0, 180],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Star burst component with enhanced design
const StarBurst = ({ index, screenSize }) => {
  const rays = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i * 45),
      length: 20 + Math.random() * 15,
      delay: i * 0.1
    })), []
  );

  return (
    <motion.div
      className="star-burst"
      style={{
        left: `${20 + Math.random() * 60}%`,
        top: `${20 + Math.random() * 60}%`,
      }}
      animate={{
        scale: [0, 1.3, 0],
        opacity: [0, 1, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 4,
        ease: "easeInOut"
      }}
    >
      <div className="star-inner">
        {rays.map((ray) => (
          <motion.div
            key={ray.id}
            className="star-ray"
            style={{
              transform: `rotate(${ray.angle}deg)`,
              width: `${ray.length}px`,
              transformOrigin: 'left center'
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: ray.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Enhanced logo component with better animations
const LogoPhase = ({ phase }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (phase === ANIMATION_PHASES.LOGO_REVEAL) {
      controls.start({
        scale: 1,
        opacity: 1,
        rotate: 0,
        transition: { duration: 1, ease: "easeOut" }
      });
    } else if (phase === ANIMATION_PHASES.LOGO_ZOOM) {
      controls.start({
        scale: 15,
        opacity: 0,
        rotate: 180,
        transition: { duration: 2, ease: "easeIn" }
      });
    }
  }, [phase, controls]);

  return (
    <AnimatePresence>
      {(phase === ANIMATION_PHASES.LOGO_REVEAL || phase === ANIMATION_PHASES.LOGO_ZOOM) && (
        <motion.div
          className="logo-container"
          initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
          animate={controls}
          exit={{ scale: 25, opacity: 0, rotate: 360 }}
        >
          <motion.img 
            src="/assets/images/akpessc.png" 
            alt="AKPESSC 2025"
            className="hyperjump-logo"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.div
            className="logo-glow"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Device-aware tunnel effect
const TunnelPhase = ({ phase }) => {
  const rings = useMemo(() => {
    const screenSize = Math.min(window.innerWidth, window.innerHeight);
    const baseSize = Math.min(screenSize * 0.1, 60); // 10% of smallest dimension, max 60px
    const ringCount = Math.min(8, Math.floor(screenSize / 100)); // Adaptive ring count
    
    return Array.from({ length: ringCount }, (_, i) => ({
      id: i,
      size: baseSize + i * (baseSize * 0.3),
      opacity: 0.9 - i * 0.1,
      delay: i * 0.2,
      thickness: Math.max(1, baseSize * 0.05)
    }));
  }, []);

  return (
    <AnimatePresence>
      {(phase === ANIMATION_PHASES.TUNNEL_ENTRY || phase === ANIMATION_PHASES.TUNNEL_EXPANSION) && (
        <motion.div
          className="tunnel-container"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <div className="tunnel-grid">
            {rings.map((ring) => (
              <motion.div
                key={ring.id}
                className="tunnel-ring"
                style={{ 
                  width: `${ring.size}px`, 
                  height: `${ring.size}px`,
                  borderWidth: `${ring.thickness}px`,
                  opacity: ring.opacity
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: phase === ANIMATION_PHASES.TUNNEL_EXPANSION ? 1.1 : 1,
                  opacity: ring.opacity,
                  rotate: [0, 180]
                }}
                transition={{ 
                  duration: 2, 
                  delay: ring.delay,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Enhanced video component with better transitions
const VideoPhase = ({ phase, videoPlaying }) => {
  return (
    <AnimatePresence>
      {(phase === ANIMATION_PHASES.VIDEO_REVEAL || phase === ANIMATION_PHASES.VIDEO_PLAY) && (
        <motion.div
          className="video-card-container"
          initial={{ scale: 0, opacity: 0, rotateY: 90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0, opacity: 0, rotateY: -90 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <motion.div
            className="video-card"
            initial={{ scale: 0, rotateX: 45 }}
            animate={{ scale: 1, rotateX: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="video-wrapper">
              <video
                className="hyperjump-video"
                autoPlay={videoPlaying}
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src="/assets/videos/energy-demo.mp4" type="video/mp4" />
                <source src="/assets/videos/energy-demo.webm" type="video/webm" />
                <div className="video-fallback">
                  <div className="energy-preview">
                    <motion.div 
                      className="energy-bolt-large"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      ⚡
                    </motion.div>
                    <h2>Energy Unleashed</h2>
                    <p>AKPESSC 2025 - Powering the Future</p>
                  </div>
                </div>
              </video>
            </div>
            
            <motion.div 
              className="video-overlay"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <h3>AKPESSC 2025</h3>
              <p>Energy & Power Systems</p>
              <motion.div 
                className="progress-bar"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main HyperjumpPage component
const HyperjumpPage = ({ onComplete }) => {
  const screenSize = useResponsive();
  const { currentPhase, videoPlaying } = useAnimationSequence(onComplete);
  const config = RESPONSIVE_CONFIG[screenSize];

  return (
    <motion.div
      className="hyperjump-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient animation */}
      <motion.div
        className="background-gradient"
        animate={{
          background: [
            "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
            "linear-gradient(135deg, #1a0a0a 0%, #2a1a1a 50%, #1a0a0a 100%)",
            "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo Phase */}
      <LogoPhase phase={currentPhase} />

      {/* Tunnel Phase */}
      <TunnelPhase phase={currentPhase} />

      {/* Video Phase */}
      <VideoPhase phase={currentPhase} videoPlaying={videoPlaying} />

      {/* Particle Systems */}
      <ParticleSystem type="energy" count={config.particles} screenSize={screenSize} />
      <ParticleSystem type="spark" count={config.sparks} screenSize={screenSize} />

      {/* Star Bursts */}
      <div className="star-bursts">
        {Array.from({ length: config.stars }).map((_, i) => (
          <StarBurst key={i} index={i} screenSize={screenSize} />
        ))}
      </div>

      {/* Shooting Stars */}
      <div className="shooting-stars">
        {Array.from({ length: config.shooting }).map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="shooting-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 400],
              y: [0, 400],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Loading indicator */}
      <motion.div
        className="loading-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentPhase === ANIMATION_PHASES.COMPLETE ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loading-spinner" />
        <p>Preparing Experience...</p>
      </motion.div>
    </motion.div>
  );
};

export default HyperjumpPage;