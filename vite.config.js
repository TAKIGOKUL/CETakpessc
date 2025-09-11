import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // Optimize dev server performance
    hmr: {
      overlay: false // Disable error overlay for better performance
    }
  },
  build: {
    outDir: 'build',
    sourcemap: false, // Disable sourcemaps for production
    minify: 'esbuild', // Use esbuild minifier (default)
    // Optimize build performance
    target: 'esnext',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Optimized chunk splitting for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion', 'gsap'],
          ui: ['bootstrap']
        },
        // Optimize asset naming for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|webp)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    chunkSizeWarningLimit: 1000,
    // Optimize build performance
    reportCompressedSize: false,
    // Enable tree shaking
    treeshake: true,
    // Optimize CSS
    cssMinify: true
  },
  base: './', // Use relative paths for flexible deployment
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'gsap', 'lenis'],
    exclude: ['bootstrap-icons'],
    // Optimize dependency pre-bundling
    force: false
  },
  // Optimize CSS
  css: {
    devSourcemap: false
  }
})
