const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'dist', 'src', 'index.js');
const dest = path.join(__dirname, '..', 'dist', 'index.js');

try {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log('postbuild: copied dist/src/index.js -> dist/index.js');
  } else {
    console.warn('postbuild: source not found:', src);
  }
} catch (e) {
  console.error('postbuild error:', e);
  // don’t fail the build for this convenience copy
}
