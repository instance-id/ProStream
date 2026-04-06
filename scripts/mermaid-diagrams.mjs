import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDiagramDir = path.join(rootDir, 'docs', 'public', 'images', 'diagrams', 'mermaid');
const publicDiagramPath = '/images/diagrams/mermaid';
const cacheDir = path.join(rootDir, 'node_modules', '.cache', 'prostream-docs-mermaid');
const inputDir = path.join(cacheDir, 'input');
const mmdcPath = path.join(rootDir, 'node_modules', '.bin', process.platform === 'win32' ? 'mmdc.cmd' : 'mmdc');
const mermaidConfigPath = path.join(rootDir, 'scripts', 'mermaid-theme.json');
const puppeteerConfigPath = path.join(cacheDir, 'puppeteer-config.json');

function ensureDirectories() {
  fs.mkdirSync(publicDiagramDir, { recursive: true });
  fs.mkdirSync(inputDir, { recursive: true });

  if (!fs.existsSync(puppeteerConfigPath)) {
    fs.writeFileSync(
      puppeteerConfigPath,
      JSON.stringify(
        {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        },
        null,
        2
      )
    );
  }
}

function normalizeDiagramCode(code) {
  return code.replace(/\r\n/g, '\n').trim();
}

function getMermaidConfigSignature(options = {}) {
  const configSignature = {
    theme: options.theme ?? null,
    config: fs.existsSync(mermaidConfigPath) ? fs.readFileSync(mermaidConfigPath, 'utf8') : null
  };

  return JSON.stringify(configSignature);
}

function getDiagramHash(code, options = {}) {
  return crypto
    .createHash('sha256')
    .update(normalizeDiagramCode(code))
    .update(getMermaidConfigSignature(options))
    .digest('hex')
    .slice(0, 16);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function ensureMermaidSvg(code, options = {}) {
  const normalizedCode = normalizeDiagramCode(code);
  const hash = getDiagramHash(normalizedCode, options);
  const fileName = `mermaid-${hash}.svg`;
  const outputPath = path.join(publicDiagramDir, fileName);

  ensureDirectories();

  if (!fs.existsSync(outputPath)) {
    if (!fs.existsSync(mmdcPath)) {
      throw new Error(`Mermaid CLI not found at ${mmdcPath}`);
    }

    const inputPath = path.join(inputDir, `mermaid-${hash}.mmd`);
    fs.writeFileSync(inputPath, `${normalizedCode}\n`);

    const args = ['-q', '-i', inputPath, '-o', outputPath, '-b', 'transparent', '-p', puppeteerConfigPath];

    if (fs.existsSync(mermaidConfigPath)) {
      args.push('-c', mermaidConfigPath);
    }

    if (options.theme) {
      args.push('-t', options.theme);
    }

    const result = spawnSync(mmdcPath, args, {
      cwd: rootDir,
      encoding: 'utf8'
    });

    if (result.status !== 0) {
      const details = [result.stderr, result.stdout].filter(Boolean).join('\n').trim();
      throw new Error(`Failed to render Mermaid diagram.${details ? `\n${details}` : ''}`);
    }
  }

  return `${publicDiagramPath}/${fileName}`;
}

export function renderMermaidFenceToHtml(code, options = {}) {
  const alt = options.alt ?? 'Mermaid diagram';
  const src = ensureMermaidSvg(code, options);

  return `<figure class="diagram diagram--mermaid"><img src="${src}" alt="${escapeHtml(alt)}" class="diagram__image diagram__image--mermaid" loading="lazy"></figure>`;
}

export function replaceMermaidFencesWithImageMarkdown(content, options = {}) {
  const alt = options.alt ?? 'Mermaid diagram';

  return content.replace(/```mermaid\s*\n([\s\S]*?)```/g, (_, code) => {
    const src = ensureMermaidSvg(code, options);
    return `![${alt}](${src})`;
  });
}

export function getMermaidFenceMatches(content) {
  return [...content.matchAll(/```mermaid\s*\n([\s\S]*?)```/g)].map((match) => match[1]);
}