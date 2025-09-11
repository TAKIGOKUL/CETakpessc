import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Optimize root creation and rendering
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

// Optimized rendering with error boundary
const renderApp = () => {
  try {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to render app:', error);
    // Fallback UI
    rootElement.innerHTML = '<div style="padding: 2rem; text-align: center; color: #fffdf7; background: #09543d;">Failed to load application. Please refresh the page.</div>';
  }
};

// Use requestIdleCallback for better performance if available
if ('requestIdleCallback' in window) {
  requestIdleCallback(renderApp);
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(renderApp, 0);
}
