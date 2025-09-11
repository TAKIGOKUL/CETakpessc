import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';

// Lazy load components for better performance
const About = lazy(() => import('./components/About'));
const Gallery = lazy(() => import('./components/Gallery'));
const Schedule = lazy(() => import('./components/Schedule'));
const Speakers = lazy(() => import('./components/Speakers'));
const Registration = lazy(() => import('./components/Registration'));
const Map = lazy(() => import('./components/Map'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Memoized callback to prevent unnecessary re-renders
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Optimized loading logic with single timeout
  useEffect(() => {
    // Faster loading for better UX
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Reduced from 1500ms to 1200ms

    return () => clearTimeout(loadingTimeout);
  }, []);

  // Memoized main content to prevent unnecessary re-renders
  const mainContent = useMemo(() => (
    <div key="content">
      <Navbar />
      <main className="main-wrapper">
        <Hero />
                <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
                  <About />
                </Suspense>
                <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
                  <Gallery />
                </Suspense>
                <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
                  <Schedule />
                </Suspense>
                <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
                  <Speakers />
                </Suspense>
                <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
                  <Registration />
                </Suspense>
                <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
                  <Map />
                </Suspense>
                <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
                  <Contact />
                </Suspense>
      </main>
      <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  ), []);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        ) : (
          mainContent
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;