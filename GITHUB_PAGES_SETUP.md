# GitHub Pages Setup Guide

## 🚀 Quick Setup Instructions

### Method 1: Enable GitHub Pages in Repository Settings

1. **Go to your repository on GitHub**
   - Navigate to: `https://github.com/TAKIGOKUL/CETakpessc`

2. **Access Settings**
   - Click on the "Settings" tab in your repository

3. **Configure Pages**
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"
   - This will enable GitHub Pages to use the workflow we've created

4. **Verify Setup**
   - The workflow will automatically run when you push to main
   - Your site will be available at: `https://takigokul.github.io/CETakpessc`

### Method 2: Alternative Deployment (if GitHub Actions fails)

If you encounter issues with GitHub Actions, you can use the traditional gh-pages method:

```bash
# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run deploy
```

## 🔧 Troubleshooting

### Common Issues and Solutions

1. **"Get Pages site failed" Error**
   - **Solution**: Enable GitHub Pages in repository settings (Method 1 above)
   - **Alternative**: Use `npm run deploy` command

2. **Permission Denied**
   - **Solution**: Ensure the repository has the correct permissions
   - Check that the workflow has `pages: write` and `id-token: write` permissions

3. **Build Fails**
   - **Solution**: Check the Actions tab for detailed error logs
   - Ensure all dependencies are properly installed

4. **Site Not Updating**
   - **Solution**: Clear browser cache or wait a few minutes
   - Check the Actions tab to see if deployment completed successfully

## 📁 File Structure

The deployment uses the following structure:
```
dist/
├── index.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── 404.html
```

## 🌐 Access Your Site

Once deployed, your site will be available at:
- **Primary URL**: `https://takigokul.github.io/CETakpessc`
- **Custom Domain**: Can be configured in Pages settings

## 🔄 Automatic Deployment

The site will automatically deploy when:
- You push changes to the `main` branch
- You manually trigger the workflow from the Actions tab

## 📊 Monitoring

- Check deployment status in the "Actions" tab
- View deployment logs for any issues
- Monitor site performance and uptime

## 🆘 Need Help?

If you're still experiencing issues:
1. Check the GitHub Actions logs
2. Verify repository permissions
3. Ensure GitHub Pages is enabled
4. Try the alternative deployment method
