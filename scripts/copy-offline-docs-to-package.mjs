import fs from 'node:fs';
import path from 'node:path';
import {
  getOfflineArtifactsDir,
  getRootDir,
  offlineMarkdownName,
  offlinePdfName,
} from './docs-version.mjs';

const rootDir = getRootDir();
const destinationDir = process.argv[2];

if (!destinationDir) {
  throw new Error('Destination directory argument is required.');
}

const sourceDir = getOfflineArtifactsDir(rootDir);
const sourcePdfPath = path.join(sourceDir, offlinePdfName);
const sourceMarkdownPath = path.join(sourceDir, offlineMarkdownName);
const sourceImagesDir = path.join(sourceDir, 'images');
const outputDir = path.resolve(rootDir, destinationDir);
const outputPdfPath = path.join(outputDir, offlinePdfName);
const outputMarkdownPath = path.join(outputDir, offlineMarkdownName);
const outputImagesDir = path.join(outputDir, 'images');

for (const requiredPath of [sourcePdfPath, sourceMarkdownPath, sourceImagesDir]) {
  if (!fs.existsSync(requiredPath)) {
    throw new Error(`Offline artifact not found: ${requiredPath}`);
  }
}

fs.mkdirSync(outputDir, { recursive: true });
fs.rmSync(outputPdfPath, { force: true });
fs.rmSync(outputMarkdownPath, { force: true });
fs.rmSync(outputImagesDir, { recursive: true, force: true });
fs.copyFileSync(sourcePdfPath, outputPdfPath);
// fs.copyFileSync(sourceMarkdownPath, outputMarkdownPath);
// fs.cpSync(sourceImagesDir, outputImagesDir, { recursive: true });

console.log(`Copied offline docs to: ${outputDir}`);
