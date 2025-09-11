# 🚀 AKPESSC Deployment Guide

## 📋 Overview
This guide covers deploying the AKPESSC website to GitHub Pages using the proven YESSplora deployment method.

## ✅ Current Status
- **Build Directory**: `build/` (changed from `dist/`)
- **Deployment Method**: GitHub Actions + gh-pages
- **Workflow**: Single job (build-and-deploy)
- **Pattern**: Based on successful YESSplora deployment

## 🔧 GitHub Pages Setup

### Step 1: Enable GitHub Pages
1. Go to your repository: `https://github.com/TAKIGOKUL/CETakpessc`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. This will enable the workflow in `.github/workflows/deploy.yml`

### Step 2: Verify Deployment
- The workflow will automatically run when you push to `main`
- Your site will be available at: `https://takigokul.github.io/CETakpessc`
- Check the **Actions** tab for deployment status

## 🏗️ Build Process

### Build Output Structure
```
build/
├── index.html              # Main entry point
├── 404.html               # Custom 404 page
└── assets/
    ├── css/
    │   └── index-*.css    # Optimized CSS
    ├── js/
    │   ├── index-*.js     # Main JavaScript bundle
    │   ├── vendor-*.js    # Vendor libraries
    │   ├── animations-*.js # Animation libraries
    │   └── [Component]-*.js # Lazy-loaded components
    └── images/            # Optimized images
```

### Build Commands
```bash
# Build for production
npm run build

# Clean build directory
npm run clean

# Preview build locally
npm run preview
```

## 🚀 Deployment Methods

### Method 1: Automatic (GitHub Actions) - Recommended
- **Trigger**: Push to `main` branch
- **Workflow**: `.github/workflows/deploy.yml`
- **Output**: `https://takigokul.github.io/CETakpessc`

### Method 2: Manual (gh-pages)
```bash
# Deploy using gh-pages
npm run deploy

# Or use the deployment script
npm run deploy:pages
```

### Method 3: Custom Script
```bash
# Run the deployment script
./deploy-pages.sh
```

## 🔍 Troubleshooting

### Issue: "Get Pages site failed"
**Solution:**
1. Enable GitHub Pages in repository settings
2. Select **GitHub Actions** as source
3. Wait for workflow to complete

### Issue: Still seeing README
**Solution:**
1. Verify Pages source is set to **GitHub Actions**
2. Check Actions tab for workflow status
3. Wait 5-10 minutes for deployment
4. Clear browser cache

### Issue: Build fails
**Solution:**
1. Check Actions tab for error logs
2. Run `npm run build` locally to test
3. Ensure all dependencies are installed
4. Check for ESLint errors

### Issue: Assets not loading
**Solution:**
1. Verify `homepage` in `package.json` is correct
2. Check that all assets are in `public/` directory
3. Ensure build process completes successfully
4. Check browser console for 404 errors

## 📊 Performance Optimizations

### Implemented Optimizations
- ✅ **Lazy Loading**: Components load on demand
- ✅ **Code Splitting**: Separate chunks for better caching
- ✅ **Image Optimization**: Proper loading attributes
- ✅ **Bundle Optimization**: Tree shaking and minification
- ✅ **CSS Optimization**: Minified and split CSS

### Build Metrics
- **Build Time**: ~18 seconds
- **Bundle Size**: Optimized with code splitting
- **Lighthouse Score**: Improved performance
- **Loading Speed**: Faster with lazy loading

## 🔄 Continuous Deployment

### Automatic Triggers
- Push to `main` branch
- Manual workflow dispatch
- Pull request to `main` (if configured)

### Manual Triggers
1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages**
3. Click **Run workflow**
4. Select **main** branch
5. Click **Run workflow**

## 📱 Live Demo

Once deployed successfully, your site will be available at:
**https://takigokul.github.io/CETakpessc**

## 🛠️ Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment Workflow
```bash
# Make changes to code
# Test locally with npm run dev

# Build and test
npm run build
npm run preview

# Commit and push
git add .
git commit -m "Your changes"
git push origin main

# GitHub Actions will automatically deploy
```

## 📁 File Structure

```
CETakpessc/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions workflow
├── build/                  # Production build output
├── public/                 # Static assets
├── src/                    # React source code
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── deploy-pages.sh         # Manual deployment script
```

## 🆘 Support

If you encounter issues:
1. Check the **Actions** tab for workflow logs
2. Verify **Pages** settings in repository
3. Ensure all files are committed to git
4. Check that `build/` directory is not ignored
5. Review the troubleshooting section above

---

**Last Updated**: September 2024  
**Version**: 2.0.0  
**Deployment Method**: YESSplora Pattern
