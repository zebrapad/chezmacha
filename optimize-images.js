const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const assetDir = path.join(__dirname, 'public', 'asset');
  const files = ['hero.jpg', 'macha1.jpg', 'macha2.jpg', 'macha3.jpg'];
  
  for (const file of files) {
    const inputPath = path.join(assetDir, file);
    const outputPath = path.join(assetDir, `optimized_${file}`);
    
    if (fs.existsSync(inputPath)) {
      try {
        await sharp(inputPath)
          .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toFile(outputPath);
        
        console.log(`Optimized ${file}`);
      } catch (error) {
        console.error(`Error optimizing ${file}:`, error);
      }
    }
  }
}

optimizeImages();
