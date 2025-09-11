#!/usr/bin/env node

/**
 * Helper script to update the image-utils.ts file with new images
 * Usage: node scripts/update-images.js
 * 
 * This script scans the public/asset/guest folder and updates the image-utils.ts file
 * with the current list of available images.
 */

const fs = require('fs');
const path = require('path');

const GUEST_FOLDER = path.join(__dirname, '..', 'public', 'asset', 'guest');
const IMAGE_UTILS_FILE = path.join(__dirname, '..', 'src', 'lib', 'image-utils.ts');

function scanGuestFolder() {
  try {
    const files = fs.readdirSync(GUEST_FOLDER);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    });

    const imageInfos = imageFiles.map(file => {
      const nameWithoutExt = path.parse(file).name;
      const ext = path.extname(file).toLowerCase();
      
      // Extract date from filename (assuming format: YYYY-MM-DD)
      const dateMatch = nameWithoutExt.match(/^(\d{4}-\d{2}-\d{2})$/);
      const date = dateMatch ? dateMatch[1] : nameWithoutExt;
      
      return {
        filename: nameWithoutExt,
        extension: ext,
        fullPath: `/asset/guest/${file}`,
        date: date
      };
    });

    return imageInfos.sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    console.error('Error scanning guest folder:', error);
    return [];
  }
}

function generateImageUtilsContent(imageInfos) {
  const imageArrayString = imageInfos.map(img => 
    `    {\n      filename: '${img.filename}',\n      extension: '${img.extension}',\n      fullPath: '${img.fullPath}',\n      date: '${img.date}'\n    }`
  ).join(',\n');

  return `// Utility functions for robust image detection and management

export interface ImageInfo {
  filename: string;
  extension: string;
  fullPath: string;
  date: string; // Extracted from filename (YYYY-MM-DD format)
}

/**
 * Automatically detects all available images in the guest folder
 * This function simulates what would be a dynamic file system scan
 * In a real implementation, this could be an API endpoint that scans the folder
 */
export function getAvailableGuestImages(): ImageInfo[] {
  // This is a static list for now, but in production this could be:
  // 1. An API endpoint that scans the public/asset/guest folder
  // 2. A build-time script that generates this list
  // 3. A server-side function that reads the directory
  
  const availableImages: ImageInfo[] = [
${imageArrayString}
  ];

  return availableImages;
}

/**
 * Finds the best matching image for a given event date
 * @param eventDate - The event date in YYYY-MM-DD format
 * @returns ImageInfo or null if no match found
 */
export function findImageForEventDate(eventDate: string): ImageInfo | null {
  const availableImages = getAvailableGuestImages();
  
  // Try exact match first
  const exactMatch = availableImages.find(img => img.date === eventDate);
  if (exactMatch) {
    return exactMatch;
  }

  // If no exact match, return null (could be extended to find closest date)
  return null;
}

/**
 * Gets the image URL with cache-busting for a given event date
 * @param eventDate - The event date in YYYY-MM-DD format
 * @returns The image URL with cache-busting parameter
 */
export function getEventImageUrl(eventDate: string): string {
  const imageInfo = findImageForEventDate(eventDate);
  
  if (imageInfo) {
    return \`\${imageInfo.fullPath}?v=\${Date.now()}\`;
  }
  
  // Fallback to default image
  return \`/asset/event/optimized_vizorek.jpg?v=\${Date.now()}\`;
}

/**
 * Checks if an image exists for a given event date
 * @param eventDate - The event date in YYYY-MM-DD format
 * @returns boolean indicating if image exists
 */
export function hasImageForEventDate(eventDate: string): boolean {
  return findImageForEventDate(eventDate) !== null;
}

/**
 * Gets all available event dates that have images
 * @returns Array of date strings in YYYY-MM-DD format
 */
export function getAvailableEventDates(): string[] {
  return getAvailableGuestImages().map(img => img.date);
}

/**
 * Updates the available images list (for when new images are added)
 * In a real implementation, this could trigger a rebuild or API refresh
 */
export function refreshAvailableImages(): void {
  // This could trigger a rebuild or API call to refresh the image list
  console.log('Refreshing available images...');
  // In production, this might:
  // 1. Call an API to scan the folder
  // 2. Trigger a build process
  // 3. Update a cache
}
`;
}

function updateImageUtils() {
  console.log('🔍 Scanning guest folder for images...');
  const imageInfos = scanGuestFolder();
  
  if (imageInfos.length === 0) {
    console.log('❌ No images found in guest folder');
    return;
  }

  console.log(`📸 Found ${imageInfos.length} images:`);
  imageInfos.forEach(img => {
    console.log(`   - ${img.filename}${img.extension} (${img.date})`);
  });

  console.log('📝 Updating image-utils.ts...');
  const newContent = generateImageUtilsContent(imageInfos);
  
  try {
    fs.writeFileSync(IMAGE_UTILS_FILE, newContent, 'utf8');
    console.log('✅ Successfully updated image-utils.ts');
    console.log('🎉 Your images are now automatically detected!');
  } catch (error) {
    console.error('❌ Error updating image-utils.ts:', error);
  }
}

// Run the script
if (require.main === module) {
  updateImageUtils();
}

module.exports = { updateImageUtils, scanGuestFolder };

