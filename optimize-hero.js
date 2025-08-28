const sharp = require('sharp');

sharp('public/asset/hero.png')
  .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
  .jpeg({ quality: 80 })
  .toFile('public/asset/optimized_hero.jpg')
  .then(() => console.log('Hero image optimized successfully!'))
  .catch(err => console.error('Error optimizing hero image:', err));
