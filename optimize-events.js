const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeEventImages() {
  const eventDir = path.join(__dirname, 'public', 'asset', 'event');
  const files = fs.readdirSync(eventDir).filter(file => file.endsWith('.jpg'));
  
  for (const file of files) {
    const inputPath = path.join(eventDir, file);
    const outputPath = path.join(eventDir, `optimized_${file}`);
    
    try {
      await sharp(inputPath)
        .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Optimized ${file}`);
    } catch (error) {
      console.error(`Error optimizing ${file}:`, error);
    }
  }
}

optimizeEventImages();
