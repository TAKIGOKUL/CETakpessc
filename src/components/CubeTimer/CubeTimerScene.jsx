import React, { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SimpleCubeTimer from './SimpleCubeTimer'
import './CubeTimer.css'

const CubeTimerScene = () => {
  // Target date for AKPESSC 2025 - you can modify this date
  const targetDate = new Date('2025-10-10T09:00:00')
  const [webglSupported, setWebglSupported] = useState(true)
  const [contextLost, setContextLost] = useState(false)
  const [canvasError, setCanvasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const maxRetries = 3
  const retryTimeoutRef = useRef(null)

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Check WebGL support with enhanced detection
  useEffect(() => {
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        
        if (!gl) {
          setWebglSupported(false)
          return
        }

        // Test if WebGL actually works
        const testProgram = gl.createProgram()
        if (!testProgram) {
          setWebglSupported(false)
          return
        }
        
        gl.deleteProgram(testProgram)
        setWebglSupported(true)
      } catch (error) {
        console.warn('WebGL support check failed:', error)
        setWebglSupported(false)
      }
    }

    checkWebGLSupport()
  }, [])

  // Handle WebGL context lost with retry logic
  const handleContextLost = (event) => {
    event.preventDefault()
    setContextLost(true)
    console.warn('WebGL context lost, attempting recovery...')
    
    // Clear any existing retry timeout
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
    }
    
    // Retry after a delay
    if (retryCount < maxRetries) {
      retryTimeoutRef.current = setTimeout(() => {
        console.log(`Retrying WebGL context recovery (attempt ${retryCount + 1}/${maxRetries})`)
        setRetryCount(prev => prev + 1)
        setContextLost(false)
        setCanvasError(false)
      }, 2000 + (retryCount * 1000)) // Increasing delay
    }
  }

  // Handle WebGL context restored
  const handleContextRestored = () => {
    setContextLost(false)
    setCanvasError(false)
    setRetryCount(0)
    console.log('WebGL context restored successfully')
    
    // Clear retry timeout
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
      retryTimeoutRef.current = null
    }
  }

  // Handle canvas creation errors with retry
  const handleCanvasError = (error) => {
    console.error('Canvas creation error:', error)
    
    if (retryCount < maxRetries) {
      console.log(`Retrying canvas creation (attempt ${retryCount + 1}/${maxRetries})`)
      setRetryCount(prev => prev + 1)
      
      // Retry after delay
      retryTimeoutRef.current = setTimeout(() => {
        setCanvasError(false)
      }, 1000 + (retryCount * 500))
    } else {
      setCanvasError(true)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [])

  // Fallback component for when WebGL is not supported
  const FallbackTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
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

      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(targetDate))
      }, 1000)

      setTimeLeft(calculateTimeLeft(targetDate))

      return () => clearInterval(timer)
    }, [targetDate])

    return (
      <div className="fallback-timer">
        <div className="fallback-timer-content">
          <h3>Countdown to AKPESSC 2025</h3>
          
          {/* CSS 3D Cube */}
          <div className="css-cube-container">
            <div className="css-cube">
              <div className="css-cube-face front">
                <div className="face-number">{timeLeft.days.toString().padStart(2, '0')}</div>
                <div className="face-label">DAYS</div>
              </div>
              <div className="css-cube-face back">
                <div className="face-number">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="face-label">HOURS</div>
              </div>
              <div className="css-cube-face right">
                <div className="face-number">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="face-label">MINUTES</div>
              </div>
              <div className="css-cube-face left">
                <div className="face-number">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="face-label">SECONDS</div>
              </div>
              <div className="css-cube-face top">
                <div className="face-number">AKPESSC</div>
                <div className="face-label">2025</div>
              </div>
              <div className="css-cube-face bottom">
                <div className="face-number">IEEE</div>
                <div className="face-label">PES</div>
              </div>
            </div>
          </div>
          
          {/* Traditional countdown as backup */}
          <div className="fallback-countdown">
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.days.toString().padStart(2, '0')}</span>
              <span className="countdown-label">DAYS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="countdown-label">HOURS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="countdown-label">MINUTES</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="countdown-label">SECONDS</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!webglSupported || contextLost || canvasError) {
    return (
      <section id="countdown" className="section_countdown">
        <div className={`content-wrapper ${!isSmallScreen ? 'padding-global padding-section-large' : ''}`}>
          <div className="section-header">
            <h2 className="heading-style-h1">The Wait Ends In…</h2>
          </div>
          
          <div className="cube-timer-container">
            <FallbackTimer />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="countdown" className="section_countdown">
      <div className={`content-wrapper ${!isSmallScreen ? 'padding-global padding-section-large' : ''}`}>
        <div className="section-header">
          <h2 className="heading-style-h1">The Wait Ends In…</h2>
        </div>
        
        <div className="cube-timer-container">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            gl={{ 
              alpha: false,
              antialias: false, // Disable antialias to reduce GPU load
              powerPreference: "default", // Use default instead of high-performance
              failIfMajorPerformanceCaveat: false,
              preserveDrawingBuffer: false, // Reduce memory usage
              depth: true,
              stencil: false,
              premultipliedAlpha: false
            }}
            className="cube-timer-canvas"
            dpr={[1, 2]} // Limit device pixel ratio to reduce load
            performance={{ min: 0.5 }} // Reduce performance requirements
            onCreated={({ gl, scene, camera }) => {
              try {
                // Set up context lost handling on the WebGL context
                const canvas = gl.domElement
                canvas.addEventListener('webglcontextlost', handleContextLost)
                canvas.addEventListener('webglcontextrestored', handleContextRestored)
                
                // Optimize rendering
                gl.setClearColor('#09543D', 1.0)
                gl.shadowMap.enabled = false // Disable shadows to reduce load
                
                console.log('Canvas created successfully with optimizations')
              } catch (error) {
                handleCanvasError(error)
              }
            }}
            onError={handleCanvasError}
          >
            {/* Background with website theme */}
            <color attach="background" args={['#09543D']} /> 
            
            {/* Enhanced lighting for better visibility */}
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            
            {/* 3D Cube Timer */}
            <SimpleCubeTimer targetDate={targetDate} />
            
            {/* Interactive controls - Y-axis rotation only */}
            <OrbitControls 
              enableRotate={true}
              enableZoom={false}
              enablePan={false}
              enableDamping={true}
              dampingFactor={0.1}
              rotateSpeed={1.0}
              autoRotate={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
              minAzimuthAngle={-Infinity}
              maxAzimuthAngle={Infinity}
            />
          </Canvas>
        </div>
      </div>
    </section>
  )
}

export default CubeTimerScene
