const fs = require('fs');
const path = require('path');

const galleryPath = path.join(__dirname, 'app', 'gallery');

try {
  if (fs.existsSync(galleryPath)) {
    fs.rmSync(galleryPath, { recursive: true, force: true });
    console.log('✓ Gallery folder deleted successfully');
  } else {
    console.log('Gallery folder does not exist');
  }
} catch (error) {
  console.error('Error deleting gallery folder:', error);
  process.exit(1);
}
