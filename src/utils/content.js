import fs from 'fs';
import path from 'path';

function loadJsonFilesFromDir(dirPath) {
  try {
    const fullPath = path.isAbsolute(dirPath) ? dirPath : path.join(process.cwd(), dirPath);
    if (!fs.existsSync(fullPath)) return [];
    
    const files = fs.readdirSync(fullPath);
    const items = [];
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(fullPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        try {
          const parsed = JSON.parse(fileContent);
          const slug = file.replace(/\.json$/, '');
          items.push({ slug, ...parsed });
        } catch (e) {
          console.error(`Error parsing JSON file ${filePath}:`, e);
        }
      }
    }
    
    return items.sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));
  } catch (err) {
    console.error(`Error loading directory ${dirPath}:`, err);
    return [];
  }
}

export function getPhotos() {
  return loadJsonFilesFromDir('src/data/photos');
}

export function getVideos() {
  return loadJsonFilesFromDir('src/data/videos');
}

export function getDesigns() {
  return loadJsonFilesFromDir('src/data/designs');
}

export function getWebsites() {
  return loadJsonFilesFromDir('src/data/websites');
}

export function getProfile() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/profile.json');
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (e) {
    console.error('Error loading profile.json:', e);
  }
  return {
    name: "Rangga Danuarta",
    brandName: "Frame Of Rangga",
    tagline: "Visual Storyteller",
    bio: "Crafting visual narratives through the lens of cinematic precision and editorial depth.",
    whatsapp: "6287779560264",
    email: "frameofrangga@gmail.com",
    instagram: "https://instagram.com/rggadnrt",
    tiktok: "https://www.tiktok.com/@madebyrangga",
    siteUrl: "https://for-portfolio-mu.vercel.app"
  };
}
