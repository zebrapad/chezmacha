// Utility functions for robust image detection and management

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
    {
      filename: '2024-12-20',
      extension: '.jpeg',
      fullPath: '/asset/guest/2024-12-20.jpeg',
      date: '2024-12-20'
    },
    {
      filename: '2025-09-04',
      extension: '.jpeg',
      fullPath: '/asset/guest/2025-09-04.jpeg',
      date: '2025-09-04'
    },
    {
      filename: '2025-09-18',
      extension: '.jpg',
      fullPath: '/asset/guest/2025-09-18.jpg',
      date: '2025-09-18'
    },
    {
      filename: '2025-09-19',
      extension: '.jpg',
      fullPath: '/asset/guest/2025-09-19.jpg',
      date: '2025-09-19'
    },
    {
      filename: '2025-09-28',
      extension: '.jpg',
      fullPath: '/asset/guest/2025-09-28.jpg',
      date: '2025-09-28'
    }
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
    return `${imageInfo.fullPath}?v=${Date.now()}`;
  }
  
  // Fallback to default image
  return `/asset/event/optimized_vizorek.jpg?v=${Date.now()}`;
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

