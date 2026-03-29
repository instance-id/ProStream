import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const offlineArtifactsRootName = 'offline-docs';
export const offlineMarkdownName = 'prostream-docs.md';
export const offlinePdfName = 'prostream-docs.pdf';

export function getRootDir() {
  return path.resolve(__dirname, '..');
}

export function getDocsConfigPath(rootDir = getRootDir()) {
  return path.join(rootDir, 'docs', '.vitepress', 'config.mts');
}

export function getCurrentDocsVersion(rootDir = getRootDir()) {
  const configPath = getDocsConfigPath(rootDir);
  const configContents = fs.readFileSync(configPath, 'utf8');
  const match = configContents.match(/const\s+currentVersion\s*=\s*['\"]([^'\"]+)['\"]/);

  if (!match) {
    throw new Error(`Unable to determine currentVersion from ${configPath}`);
  }

  return match[1];
}

export function getOfflineArtifactsDir(rootDir = getRootDir(), version = getCurrentDocsVersion(rootDir)) {
  return path.join(rootDir, offlineArtifactsRootName, version);
}

function isExecutedDirectly() {
  const entryPath = process.argv[1];

  if (!entryPath) {
    return false;
  }

  return import.meta.url === pathToFileURL(path.resolve(entryPath)).href;
}

if (isExecutedDirectly()) {
  console.log(getCurrentDocsVersion());
}
