import fs from 'fs';
import path from 'path';

function copyViews() {
  const viewsDir = path.join(import.meta.dirname, '..', 'views');
  const distViewsDir = path.join(import.meta.dirname, '..', 'dist', 'views');

  // Create dist/views directory if it doesn't exist
  if (!fs.existsSync(distViewsDir)) {
    fs.mkdirSync(distViewsDir);
  }
  
  // Copy all files from views to dist/views
  const files = fs.readdirSync(viewsDir);
  for (const file of files) {
    const source = path.join(viewsDir, file);
    const dest = path.join(distViewsDir, file);
    if (fs.statSync(source).isFile()) {
      fs.copyFileSync(source, dest);
    }
  }
}

copyViews();