import sharp from "sharp";
import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const MAX_WIDTH = 800; // images is se zyada wide nahi honi chahiye
const QUALITY = 75; // 0-100, 75 achi balance hai quality aur size ke beech

const exts = [".png", ".jpg", ".jpeg"];

function formatSize(bytes) {
  return (bytes / 1024).toFixed(0) + " KB";
}

async function compressImage(filePath) {
  const originalSize = fs.statSync(filePath).size;
  const ext = path.extname(filePath).toLowerCase();
  const tempPath = filePath + ".tmp";

  const image = sharp(filePath).resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (ext === ".png") {
    await image.png({ quality: QUALITY, compressionLevel: 9 }).toFile(tempPath);
  } else {
    await image.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tempPath);
  }

  const newSize = fs.statSync(tempPath).size;

  if (newSize < originalSize) {
    fs.renameSync(tempPath, filePath);
    const saved = (((originalSize - newSize) / originalSize) * 100).toFixed(0);
    console.log(`✅ ${path.basename(filePath)}: ${formatSize(originalSize)} → ${formatSize(newSize)} (${saved}% smaller)`);
  } else {
    fs.unlinkSync(tempPath);
    console.log(`⏭️  ${path.basename(filePath)}: already optimized, skipped`);
  }
}

async function run() {
  const files = fs.readdirSync(PUBLIC_DIR).filter((f) => exts.includes(path.extname(f).toLowerCase()));

  console.log(`Found ${files.length} images. Compressing...\n`);

  for (const file of files) {
    try {
      await compressImage(path.join(PUBLIC_DIR, file));
    } catch (err) {
      console.error(`❌ Failed on ${file}:`, err.message);
    }
  }

  console.log("\n🎉 Done! All images compressed.");
}

run();