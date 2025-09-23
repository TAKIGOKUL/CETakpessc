import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

const SimpleCubeTimer = ({ targetDate }) => {
  const meshRef = useRef()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Calculate time remaining
  const calculateTimeLeft = (target) => {
    const now = new Date().getTime()
    const targetTime = new Date(target).getTime()
    const difference = targetTime - now

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      return { days, hours, minutes, seconds }
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    // Initial calculation
    setTimeLeft(calculateTimeLeft(targetDate))

    return () => clearInterval(timer)
  }, [targetDate])

  // Responsive cube size based on screen size
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const checkScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Responsive cube size
  const isMobile = screenSize.width < 768;
  const isMedium = screenSize.width >= 769 && screenSize.width <= 1024;
  const cubeSize = isMobile ? 2.5 : (isMedium ? 3.2 : 4);
  const textDistance = cubeSize / 2 + 0.1;
  const fontSize = isMobile ? 0.8 : (isMedium ? 1.0 : 1.2);
  const labelSize = isMobile ? 0.3 : (isMedium ? 0.4 : 0.5);

  // Auto-rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={meshRef}>
      {/* Simple cube */}
      <mesh>
        <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
        <meshBasicMaterial color="#09543D" />
      </mesh>

      {/* Days */}
      <Text
        position={[0, 0, textDistance]}
        fontSize={fontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight={600}
      >
        {timeLeft.days.toString().padStart(2, '0')}
      </Text>
      <Text
        position={[0, -0.8, textDistance]}
        fontSize={labelSize}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
        fontWeight={500}
      >
        DAYS
      </Text>

      {/* Hours */}
      <Text
        position={[-textDistance, 0, 0]}
        fontSize={fontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, -Math.PI / 2, 0]}
        fontWeight={600}
      >
        {timeLeft.hours.toString().padStart(2, '0')}
      </Text>
      <Text
        position={[-textDistance, -0.8, 0]}
        fontSize={labelSize}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
        rotation={[0, -Math.PI / 2, 0]}
        fontWeight={500}
      >
        HOURS
      </Text>

      {/* Minutes */}
      <Text
        position={[0, 0, -textDistance]}
        fontSize={fontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        fontWeight={600}
      >
        {timeLeft.minutes.toString().padStart(2, '0')}
      </Text>
      <Text
        position={[0, -0.8, -textDistance]}
        fontSize={labelSize}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        fontWeight={500}
      >
        MINUTES
      </Text>

      {/* Seconds */}
      <Text
        position={[textDistance, 0, 0]}
        fontSize={fontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
        fontWeight={600}
      >
        {timeLeft.seconds.toString().padStart(2, '0')}
      </Text>
      <Text
        position={[textDistance, -0.8, 0]}
        fontSize={labelSize}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
        fontWeight={500}
      >
        SECONDS
      </Text>
    </group>
  )
}

export default SimpleCubeTimer
