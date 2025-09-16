import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const CubeTimer = ({ targetDate, screenSize }) => {
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

  // Optimized auto-rotation and floating motion
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Reduced rotation speed to lower GPU load
      meshRef.current.rotation.y += 0.005
      
      // Reduced floating motion amplitude
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.1
    }
  })

  // Responsive cube size
  const cubeSize = screenSize?.width < 768 ? 4 : 6
  const fontSize = screenSize?.width < 768 ? 1.2 : 1.8
  const labelSize = screenSize?.width < 768 ? 0.5 : 0.7

  return (
    <group ref={meshRef}>
      {/* Main cube with website theme colors */}
      <mesh>
        <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
        <meshBasicMaterial 
          color="#09543D" 
          transparent={true}
          opacity={0.8}
        />
      </mesh>

      {/* Cube edges with glowing effect */}
      <mesh>
        <boxGeometry args={[cubeSize + 0.1, cubeSize + 0.1, cubeSize + 0.1]} />
        <meshBasicMaterial 
          color="#00ff88" 
          transparent={true}
          opacity={0.3}
          wireframe={true}
        />
      </mesh>

      {/* Days Face */}
      <Text
        position={[0, 0, cubeSize / 2 + 0.001]}
        fontSize={fontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0]}
        font="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
        fontWeight={500}
      >
        {timeLeft.days.toString().padStart(2, '0')}
      </Text>
      <Text
        position={[0, -0.8, cubeSize / 2 + 0.001]}
        fontSize={labelSize}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0]}
        font="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
        fontWeight={500}
      >
        DAYS
      </Text>

      {/* Hours Face */}
      <Text
        position={[-(cubeSize / 2 + 0.001), 0, 0]}
        fontSize={fontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
        font="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
        fontWeight={500}
      >
        {timeLeft.hours.toString().padStart(2, '0')}
      </Text>
      <Text
        position={[-(cubeSize / 2 + 0.001), -0.8, 0]}
        fontSize={labelSize}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
        font="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
        fontWeight={500}
      >
        HOURS
      </Text>

      {/* Minutes Face */}
      <Text
        position={[0, 0, -(cubeSize / 2 + 0.001)]}
        fontSize={fontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        font="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
        fontWeight={500}
      >
        {timeLeft.minutes.toString().padStart(2, '0')}
      </Text>
      <Text
        position={[0, -0.8, -(cubeSize / 2 + 0.001)]}
        fontSize={labelSize}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        font="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
        fontWeight={500}
      >
        MINUTES
      </Text>

      {/* Seconds Face */}
      <Text
        position={[cubeSize / 2 + 0.001, 0, 0]}
        fontSize={fontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, -Math.PI / 2, 0]}
        font="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
        fontWeight={500}
      >
        {timeLeft.seconds.toString().padStart(2, '0')}
      </Text>
      <Text
        position={[cubeSize / 2 + 0.001, -0.8, 0]}
        fontSize={labelSize}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
        rotation={[0, -Math.PI / 2, 0]}
        font="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
        fontWeight={500}
      >
        SECONDS
      </Text>
    </group>
  )
}

export default CubeTimer
