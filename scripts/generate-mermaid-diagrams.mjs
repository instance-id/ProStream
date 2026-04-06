import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureMermaidSvg, getMermaidFenceMatches } from './mermaid-diagrams.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const docsSourceDir = path.join(rootDir, 'docs', 'src');

function getMarkdownFiles(dirPath) {
  const results = [];

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      results.push(...getMarkdownFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }

  return results;
}

let diagramCount = 0;

for (const filePath of getMarkdownFiles(docsSourceDir)) {
  const content = fs.readFileSync(filePath, 'utf8');
  const diagrams = getMermaidFenceMatches(content);

  for (const diagram of diagrams) {
    ensureMermaidSvg(diagram);
    diagramCount += 1;
  }
}

console.log(`Prepared ${diagramCount} Mermaid diagram${diagramCount === 1 ? '' : 's'}.`);