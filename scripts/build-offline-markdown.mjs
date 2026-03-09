import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');
const outputPath = path.join(docsDir, 'offline', 'offline-documentation.md');
const offlineDir = path.join(docsDir, 'offline');
const publicImagesDir = path.join(docsDir, 'public', 'images');
const offlineImagesDir = path.join(offlineDir, 'images');

const sections = [
  {
    group: 'Getting Started',
    pages: [
      ['Setup', 'getting-started/setup.md'],
      ['Sample Project Quickstart', 'getting-started/sample-quickstart.md'],
      ['Standard Workflow', 'getting-started/standard-workflow.md'],
    ],
  },
  {
    group: 'Core Concepts',
    pages: [
      ['Importance of Prefabs', 'core-concepts/importance-of-prefabs.md'],
      ['Streaming Layers', 'core-concepts/layers/streaming-layers.md'],
      ['Workflows', 'core-concepts/workflows.md'],
    ],
  },
  {
    group: 'Editor Guide',
    pages: [
      ['ProStream Editor', 'editor-guide/windows/prostream-editor.md'],
      ['Scene Connector', 'editor-guide/components/scene-connector.md'],
      ['Scene Search Filter', 'editor-guide/components/scene-search-filter.md'],
      ['Rule Engine', 'editor-guide/engines/rule-engine.md'],
      ['Modification Engine', 'editor-guide/engines/modification-engine.md'],
      ['Operation Engine', 'editor-guide/engines/operation-engine.md'],
      ['Workflows Configuration', 'editor-guide/engines/workflows-configuration.md'],
      ['Validation and Diagnostics', 'editor-guide/tools/validation-diagnostics.md'],
      ['Pipeline Validation', 'editor-guide/tools/validation-pipeline.md'],
    ],
  },
  {
    group: 'Processes',
    pages: [
      ['Prepare Scene', 'processes/prepare-scene.md'],
      ['SubScene Creation', 'processes/process-subscenes.md'],
    ],
  },
  {
    group: 'Runtime Systems',
    pages: [
      ['Runtime Streaming', 'runtime-systems/runtime-streaming.md'],
      ['Advanced Configuration', 'runtime-systems/advanced-configuration.md'],
    ],
  },
  {
    group: 'Troubleshooting',
    pages: [
      ['Common Issues', 'troubleshooting/troubleshooting.md'],
      ['Install and Update', 'troubleshooting/install-update.md'],
      ['Build and Runtime', 'troubleshooting/build-runtime.md'],
    ],
  },
  {
    group: 'Reference',
    pages: [
      ['Settings Reference', 'reference/settings-reference.md'],
      ['Change Log', 'reference/change-log.md'],
    ],
  },
];

function stripFrontmatter(content) {
  if (!content.startsWith('---\n')) {
    return content;
  }

  const endIdx = content.indexOf('\n---\n', 4);
  if (endIdx === -1) {
    return content;
  }

  return content.slice(endIdx + 5);
}

function resolveInclude(pagePath, includeTarget) {
  const normalizedTarget = includeTarget.split('#')[0].split('?')[0].trim();
  const resolved = path.resolve(path.dirname(pagePath), normalizedTarget);
  return resolved;
}

function expandIncludes(content, pagePath, includeStack = new Set()) {
  const includePattern = /<!--@include:\s*(.+?)\s*-->/g;
  return content.replace(includePattern, (_, includeTargetRaw) => {
    const includeTarget = includeTargetRaw.trim();
    const includePath = resolveInclude(pagePath, includeTarget);

    if (includeStack.has(includePath)) {
      throw new Error(`Circular include detected: ${includePath}`);
    }

    if (!fs.existsSync(includePath)) {
      throw new Error(`Included file not found: ${includePath}`);
    }

    const includedRaw = fs.readFileSync(includePath, 'utf8');
    const includedStripped = stripFrontmatter(includedRaw);

    const nextStack = new Set(includeStack);
    nextStack.add(includePath);

    return expandIncludes(includedStripped, includePath, nextStack);
  });
}

function stripTopHeading(content) {
  const normalized = content.replace(/\r\n/g, '\n');
  return normalized.replace(/^#\s+.+\n+/, '');
}

function removeHtmlComments(content) {
  return content.replace(/^<!--.*?-->\s*$/gm, '');
}

function rewriteStandaloneAssetLinks(content) {
  let output = content;

  // Rewrite markdown image links from site-root paths to local relative paths.
  output = output.replace(/!\[([^\]]*)\]\((\/images\/[^)\s]+)\)/g, (_, alt, imagePath) => {
    return `![${alt}](.${imagePath})`;
  });

  // Rewrite HTML image src attributes from site-root paths to local relative paths.
  output = output.replace(/(<img\b[^>]*\ssrc=")\/images\//g, '$1./images/');

  return output;
}

function readPage(relativePath) {
  const fullPath = path.join(docsDir, relativePath);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const noFrontmatter = stripFrontmatter(raw);
  const expanded = expandIncludes(noFrontmatter, fullPath);
  const noTitle = stripTopHeading(expanded);
  const noComments = removeHtmlComments(noTitle);
  const rewritten = rewriteStandaloneAssetLinks(noComments);
  return rewritten.trim();
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function buildTableOfContents() {
  let docIndex = 1;
  const lines = [];

  for (const section of sections) {
    lines.push(`- ${section.group}`);
    for (const [title] of section.pages) {
      const anchor = `doc-${docIndex}-${slugify(title)}`;
      lines.push(`  - ${docIndex}. [${title}](#${anchor})`);
      docIndex += 1;
    }
  }

  return lines.join('\n');
}

function buildDocument() {
  const now = new Date().toISOString().slice(0, 10);
  const parts = [];

  parts.push('# ProStream Offline Documentation');
  parts.push('');
  parts.push(`Generated: ${now}`);
  parts.push('');
  parts.push('This document is generated from the VitePress source docs for offline distribution.');
  parts.push('');
  parts.push('## Table of Contents');
  parts.push('');
  parts.push(buildTableOfContents());
  parts.push('');
  parts.push('## Setup Guide (Step by Step)');
  parts.push('');
  parts.push('Use the numbered setup and quickstart sections below for a complete installation and first-run walkthrough.');
  parts.push('');

  let docIndex = 1;
  for (const section of sections) {
    parts.push(`## ${section.group}`);
    parts.push('');

    for (const [title, relativePath] of section.pages) {
      const anchor = `doc-${docIndex}-${slugify(title)}`;
      parts.push(`<a id="${anchor}"></a>`);
      parts.push('');
      parts.push(`### ${docIndex}. ${title}`);
      parts.push('');
      parts.push(readPage(relativePath));
      parts.push('');
      docIndex += 1;
    }
  }

  parts.push('## Script and Systems Reference');
  parts.push('');
  parts.push('The following sections serve as script and systems reference for implementation and configuration details:');
  parts.push('');
  parts.push('- Editor Guide sections');
  parts.push('- Runtime Systems section');
  parts.push('- Settings Reference section');
  parts.push('');

  return parts.join('\n');
}

function syncOfflineImages() {
  if (!fs.existsSync(publicImagesDir)) {
    throw new Error(`Public images directory not found: ${publicImagesDir}`);
  }

  fs.rmSync(offlineImagesDir, { recursive: true, force: true });
  fs.cpSync(publicImagesDir, offlineImagesDir, { recursive: true });
}

fs.mkdirSync(offlineDir, { recursive: true });
syncOfflineImages();
fs.writeFileSync(outputPath, `${buildDocument()}\n`, 'utf8');
console.log(`Generated offline markdown: ${path.relative(rootDir, outputPath)}`);
