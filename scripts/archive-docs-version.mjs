import fs from 'node:fs';
import path from 'node:path';
import { getCurrentDocsVersion, getRootDir } from './docs-version.mjs';

const rootDir = getRootDir();
const docsDir = path.join(rootDir, 'docs');
const sourceDir = path.join(docsDir, 'src');
const version = process.argv[2] ?? getCurrentDocsVersion(rootDir);
const archiveDir = path.join(docsDir, 'archive', version);

if (!fs.existsSync(sourceDir)) {
  throw new Error(`Docs source directory not found: ${sourceDir}`);
}

if (fs.existsSync(archiveDir)) {
  throw new Error(`Archive version already exists: ${archiveDir}`);
}

fs.mkdirSync(path.dirname(archiveDir), { recursive: true });
fs.cpSync(sourceDir, archiveDir, { recursive: true });

console.log(`Archived docs/src to: ${path.relative(rootDir, archiveDir)}`);
