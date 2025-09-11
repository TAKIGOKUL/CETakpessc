#!/bin/bash

# GitHub Pages Deployment Script
# This script provides an alternative deployment method

echo "🚀 Starting GitHub Pages deployment..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "📦 gh-pages branch exists, switching to it..."
    git checkout gh-pages
    git merge main --no-edit
else
    echo "📦 Creating gh-pages branch..."
    git checkout -b gh-pages
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Copy dist contents to root
echo "📁 Copying build files..."
cp -r dist/* .

# Add all files
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "🚀 Deploy to GitHub Pages - $(date)"

# Push to gh-pages branch
echo "📤 Pushing to GitHub Pages..."
git push origin gh-pages

# Switch back to main
git checkout main

echo "✅ Deployment complete!"
echo "🌐 Your site should be available at: https://takigokul.github.io/CETakpessc"
echo "⏰ It may take a few minutes for changes to be visible."
