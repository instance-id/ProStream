import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getOfflineArtifactsDir, offlineMarkdownName } from './docs-version.mjs';
import { replaceMermaidFencesWithImageMarkdown } from './mermaid-diagrams.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');
const docsSourceDir = path.join(docsDir, 'src');
const outputPath = path.join(docsDir, 'offline', 'offline-documentation.md');
const offlineDir = path.join(docsDir, 'offline');
const offlineArtifactsDir = getOfflineArtifactsDir(rootDir);
const offlineArtifactsMarkdownPath = path.join(offlineArtifactsDir, offlineMarkdownName);
const legacyOfflineDir = path.join(docsSourceDir, 'offline');
const legacyOfflinePath = path.join(legacyOfflineDir, 'offline-documentation.md');
const publicImagesDir = path.join(docsDir, 'public', 'images');
const offlineImagesDir = path.join(offlineDir, 'images');
const offlineArtifactsImagesDir = path.join(offlineArtifactsDir, 'images');
const docsSiteBaseUrl = 'https://psdocs.instance.id';

const sections = [
  {
    group: 'Planned Features',
    pages: [
      {
        title: 'Planned Features',
        path: 'planned-features/index.md',
        exportLinkMode: 'absolute-site'
      }
    ]
  },
  {
    group: 'Getting Started',
    pages: [
      { title: 'Setup', path: 'getting-started/setup.md' },
      { title: 'Sample Project Quickstart', path: 'getting-started/sample-quickstart.md' },
      { title: 'Standard Workflow', path: 'getting-started/standard-workflow.md' }
    ]
  },
  {
    group: 'Core Concepts',
    pages: [
      { title: 'Importance of Prefabs', path: 'core-concepts/importance-of-prefabs.md' },
      { title: 'Streaming Layers', path: 'core-concepts/layers/streaming-layers.md' },
      {
        title: 'Workflows',
        path: 'core-concepts/workflows.md',
        children: [
          { title: 'InstanceObjects Workflow', path: 'core-concepts/workflow-guides/instanceobjects-workflow.md' },
          { title: 'ColliderObjects Workflow', path: 'core-concepts/workflow-guides/colliderobjects-workflow.md' }
        ]
      }
    ]
  },
  {
    group: 'Editor Guide',
    pages: [
      { title: 'ProStream Editor', path: 'editor-guide/windows/prostream-editor.md' },
      { title: 'Scene Connector', path: 'editor-guide/components/scene-connector.md' },
      { title: 'Scene Search Filter', path: 'editor-guide/components/scene-search-filter.md' },
      { title: 'Rule Engine', path: 'editor-guide/engines/rule-engine.md' },
      { title: 'Modification Engine', path: 'editor-guide/engines/modification-engine.md' },
      { title: 'Operation Engine', path: 'editor-guide/engines/operation-engine.md' },
      { title: 'Workflows Configuration', path: 'editor-guide/engines/workflows-configuration.md' },
      { title: 'Validation and Diagnostics', path: 'editor-guide/tools/validation-diagnostics.md' },
      { title: 'Pipeline Validation', path: 'editor-guide/tools/validation-pipeline.md' }
    ]
  },
  {
    group: 'Processes',
    pages: [
      { title: 'Prepare Scene', path: 'processes/prepare-scene.md' },
      { title: 'SubScene Creation', path: 'processes/process-subscenes.md' }
    ]
  },
  {
    group: 'Runtime Systems',
    pages: [
      { title: 'Runtime Streaming', path: 'runtime-systems/runtime-streaming.md' },
      { title: 'Advanced Configuration', path: 'runtime-systems/advanced-configuration.md' }
    ]
  },
  {
    group: 'Known Limitations',
    pages: [{ title: 'Known Limitations', path: 'known-limitations/overview.md' }]
  },
  {
    group: 'Troubleshooting',
    pages: [
      { title: 'Common Issues', path: 'troubleshooting/troubleshooting.md' },
      { title: 'Install and Update', path: 'troubleshooting/install-update.md' },
      { title: 'Build and Runtime', path: 'troubleshooting/build-runtime.md' }
    ]
  },
  {
    group: 'Reference',
    pages: [
      { title: 'FAQ', path: 'reference/faq.md' },
      { title: 'Settings Reference', path: 'reference/settings-reference.md' },
      { title: 'Change Log', path: 'reference/change-log.md' }
    ]
  }
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

function toSitePath(relativeDocPath) {
  const normalized = relativeDocPath.replace(/\\/g, '/');

  if (normalized === 'index.md') {
    return '/';
  }

  if (normalized.endsWith('/index.md')) {
    return `/${normalized.slice(0, -'/index.md'.length)}/`;
  }

  if (normalized.endsWith('.md')) {
    return `/${normalized.slice(0, -3)}`;
  }

  return `/${normalized}`;
}

function toAbsoluteSiteUrl(href, pagePath) {
  const trimmedHref = href.trim();

  if (!trimmedHref || trimmedHref.startsWith('#') || /^[a-z]+:/i.test(trimmedHref) || trimmedHref.startsWith('/images/')) {
    return null;
  }

  if (trimmedHref.startsWith('/')) {
    return `${docsSiteBaseUrl}${trimmedHref}`;
  }

  const [pathAndQuery, hash = ''] = trimmedHref.split('#');
  const [targetPath, query = ''] = pathAndQuery.split('?');

  if (!targetPath.endsWith('.md')) {
    return null;
  }

  const resolvedPath = path.resolve(path.dirname(pagePath), targetPath);

  if (!resolvedPath.startsWith(docsSourceDir)) {
    return null;
  }

  const relativeDocPath = path.relative(docsSourceDir, resolvedPath);
  const sitePath = toSitePath(relativeDocPath);
  const querySuffix = query ? `?${query}` : '';
  const hashSuffix = hash ? `#${hash}` : '';
  return `${docsSiteBaseUrl}${sitePath}${querySuffix}${hashSuffix}`;
}

function externalizeDocLinks(content, pagePath) {
  let output = content;

  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, href) => {
    const absoluteHref = toAbsoluteSiteUrl(href, pagePath);
    if (!absoluteHref) {
      return match;
    }

    return `[${label}](${absoluteHref})`;
  });

  output = output.replace(/href="([^"]+)"/g, (match, href) => {
    const absoluteHref = toAbsoluteSiteUrl(href, pagePath);
    if (!absoluteHref) {
      return match;
    }

    return `href="${absoluteHref}"`;
  });

  return output;
}

function expandDetailsBlocks(content) {
  return content.replace(/^:::\s*details\b[^\n]*$/gm, (match) => {
    if (match.includes('{open}')) {
      return match;
    }

    return `${match.trimEnd()} {open}`;
  });
}

function readPage(relativePath, options = {}) {
  const fullPath = path.join(docsSourceDir, relativePath);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const noFrontmatter = stripFrontmatter(raw);
  const expanded = expandIncludes(noFrontmatter, fullPath);
  const noTitle = stripTopHeading(expanded);
  const noComments = removeHtmlComments(noTitle);
  const withRenderedMermaid = replaceMermaidFencesWithImageMarkdown(noComments, {
    alt: 'Workflow process diagram'
  });
  const rewritten = rewriteStandaloneAssetLinks(withRenderedMermaid);
  const linkAdjusted = externalizeDocLinks(rewritten, fullPath);
  const expandedDetails = expandDetailsBlocks(linkAdjusted);
  return expandedDetails.trim();
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function flattenPages(pages, depth = 0) {
  const flattened = [];

  for (const page of pages) {
    flattened.push({ page, depth });

    if (Array.isArray(page.children) && page.children.length > 0) {
      flattened.push(...flattenPages(page.children, depth + 1));
    }
  }

  return flattened;
}

function buildTableOfContents() {
  let docIndex = 1;
  const lines = [];

  for (const section of sections) {
    lines.push(`- ${section.group}`);
    const flattenedPages = flattenPages(section.pages, 0);

    for (const { page, depth } of flattenedPages) {
      const anchor = `doc-${docIndex}-${slugify(page.title)}`;
      const indent = '  '.repeat(depth + 1);
      lines.push(`${indent}- ${docIndex}. [${page.title}](#${anchor})`);
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

    const flattenedPages = flattenPages(section.pages, 0);

    for (const { page, depth } of flattenedPages) {
      const anchor = `doc-${docIndex}-${slugify(page.title)}`;
      const headingLevel = '#'.repeat(Math.min(6, 3 + depth));
      parts.push(`<a id="${anchor}"></a>`);
      parts.push('');
      parts.push(`${headingLevel} ${docIndex}. ${page.title}`);
      parts.push('');
      parts.push(readPage(page.path, { exportLinkMode: page.exportLinkMode }));
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
  fs.rmSync(offlineArtifactsImagesDir, { recursive: true, force: true });
  fs.cpSync(publicImagesDir, offlineArtifactsImagesDir, { recursive: true });
}

function removeLegacyOfflineArtifacts() {
  fs.rmSync(legacyOfflinePath, { force: true });

  if (fs.existsSync(legacyOfflineDir) && fs.readdirSync(legacyOfflineDir).length === 0) {
    fs.rmdirSync(legacyOfflineDir);
  }
}

fs.mkdirSync(offlineDir, { recursive: true });
fs.mkdirSync(offlineArtifactsDir, { recursive: true });
removeLegacyOfflineArtifacts();
syncOfflineImages();
const documentContents = `${buildDocument()}\n`;
fs.writeFileSync(outputPath, documentContents, 'utf8');
fs.writeFileSync(offlineArtifactsMarkdownPath, documentContents, 'utf8');
console.log(`Generated offline markdown: ${path.relative(rootDir, outputPath)}`);
console.log(`Generated offline distributable markdown: ${path.relative(rootDir, offlineArtifactsMarkdownPath)}`);
