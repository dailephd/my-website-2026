import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const repoRoot = process.cwd();
const iconsDir = path.join(repoRoot, 'public', 'icons');
const sourceSvgPath = path.join(iconsDir, 'dl-favicon-light.svg');

if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

const sourceSvg = readFileSync(sourceSvgPath);

const targets = [
  { size: 16, file: 'icon-16.png' },
  { size: 32, file: 'icon-32.png' },
  { size: 48, file: 'icon-48.png' },
  { size: 180, file: 'apple-touch-icon.png' },
  { size: 192, file: 'icon-192.png' },
  { size: 512, file: 'icon-512.png' },
];

for (const { size, file } of targets) {
  const outputPath = path.join(iconsDir, file);
  await sharp(sourceSvg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(outputPath);
  console.log(`Wrote ${path.relative(repoRoot, outputPath)} (${size}x${size})`);
}

console.log('Favicon PNG export complete.');
