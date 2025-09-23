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
        <boxGeometry args={[4, 4, 4]} />
        <meshBasicMaterial color="#09543D" />
      </mesh>

      {/* Days */}
      <Text
        position={[0, 0, 2.1]}
        fontSize={1.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight={600}
      >
        {timeLeft.days.toString().padStart(2, '0')}
      </Text>
      <Text
        position={[0, -0.8, 2.1]}
        fontSize={0.5}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
        fontWeight={500}
      >
        DAYS
      </Text>

      {/* Hours */}
      <Text
        position={[-2.1, 0, 0]}
        fontSize={1.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, -Math.PI / 2, 0]}
        fontWeight={600}
      >
        {timeLeft.hours.toString().padStart(2, '0')}
      </Text>
      <Text
        position={[-2.1, -0.8, 0]}
        fontSize={0.5}
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
        position={[0, 0, -2.1]}
        fontSize={1.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        fontWeight={600}
      >
        {timeLeft.minutes.toString().padStart(2, '0')}
      </Text>
      <Text
        position={[0, -0.8, -2.1]}
        fontSize={0.5}
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
        position={[2.1, 0, 0]}
        fontSize={1.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
        fontWeight={600}
      >
        {timeLeft.seconds.toString().padStart(2, '0')}
      </Text>
      <Text
        position={[2.1, -0.8, 0]}
        fontSize={0.5}
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
