# Image Management System

## Overview
The website now has a robust image detection system that automatically finds and displays images for events based on their dates.

## How It Works

### 1. **Automatic Image Detection**
- Images are automatically detected from the `public/asset/guest/` folder
- Images should be named with the event date in `YYYY-MM-DD` format
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

### 2. **Status-Based Event Filtering**
- **"not yet" status**: Shows in upcoming shows (limited to 4 next events)
- **"closed" status**: Only shows when clicking "ALL SHOWS"
- **"full" status**: Shows as "SOLD OUT"

### 3. **Google Sheets Integration**
- Events are loaded from Google Sheets with status field
- Status values: `not yet`, `closed`, `full`
- Events are automatically filtered based on status

## Adding New Images

### Method 1: Manual Update (Current)
1. Add your image to `public/asset/guest/` with format: `YYYY-MM-DD.jpg`
2. Run the update script: `node scripts/update-images.js`
3. The system will automatically detect the new image

### Method 2: Direct File Addition
1. Add your image to `public/asset/guest/` with format: `YYYY-MM-DD.jpg`
2. Update `src/lib/image-utils.ts` manually by adding the new image to the `availableImages` array

## Example Image Names
```
2025-09-04.jpeg  # For event on September 4, 2025
2025-09-18.jpg   # For event on September 18, 2025
2025-09-19.jpg   # For event on September 19, 2025
2024-12-20.jpeg  # For event on December 20, 2024
```

## Google Sheets Setup
Your Google Sheet should have these columns:
- **A**: event_id
- **B**: title  
- **C**: subtitle
- **D**: date (YYYY-MM-DD format)
- **E**: place
- **F**: guests
- **G**: status (`not yet`, `closed`, or `full`)

## Current Image Files
Based on the current system, these images are available:
- `2024-12-20.jpeg`
- `2025-09-04.jpeg`
- `2025-09-18.jpg`
- `2025-09-19.jpg`

## Benefits
✅ **Automatic Detection**: No need to hardcode image paths  
✅ **Status-Based Filtering**: Events show based on their Google Sheets status  
✅ **Cache Busting**: Images reload when updated  
✅ **Fallback System**: Shows default image if no specific image found  
✅ **Easy Management**: Simple script to update image list  

## Future Enhancements
- API endpoint to scan folder dynamically
- Build-time image generation
- Image optimization and resizing
- Multiple image support per event

