import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');
const distDir = path.join(docsDir, '.vitepress', 'dist');
const outputDir = path.join(rootDir, 'offline-docs');
const outputPdfPath = path.join(outputDir, 'ProStream-Offline-Documentation.pdf');
const port = 4179;

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      stdio: 'inherit',
      shell: false,
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`Command failed: ${command} ${args.join(' ')} (exit ${code ?? 'unknown'})`));
    });
  });
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
    case '.mjs':
      return 'application/javascript; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.woff':
      return 'font/woff';
    case '.woff2':
      return 'font/woff2';
    default:
      return 'application/octet-stream';
  }
}

function createStaticServer(root) {
  const server = http.createServer((req, res) => {
    const requestUrl = req.url ?? '/';
    const cleanUrl = requestUrl.split('?')[0] || '/';
    const safePath = path.normalize(decodeURIComponent(cleanUrl)).replace(/^\.\.(\/|\\|$)/, '');

    let filePath = path.join(root, safePath);
    if (safePath.endsWith('/')) {
      filePath = path.join(root, safePath, 'index.html');
    }

    if (!path.extname(filePath) && !fs.existsSync(filePath)) {
      filePath = path.join(root, safePath, 'index.html');
    }

    if (!filePath.startsWith(root)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Forbidden');
      return;
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }

    res.writeHead(200, { 'Content-Type': getContentType(filePath) });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

async function main() {
  await run('node', ['scripts/build-offline-markdown.mjs']);
  await run('npm', ['run', 'docs:build']);

  if (!fs.existsSync(distDir)) {
    throw new Error(`Build output not found: ${distDir}`);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const server = await createStaticServer(distDir);

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`http://127.0.0.1:${port}/offline/offline-documentation.html`, {
      waitUntil: 'networkidle',
    });

    await page.emulateMedia({ media: 'print' });

    await page.pdf({
      path: outputPdfPath,
      format: 'A4',
      scale: 0.9,
      printBackground: true,
      displayHeaderFooter: true,
      margin: {
        top: '12mm',
        right: '10mm',
        bottom: '14mm',
        left: '10mm',
      },
      headerTemplate: '<div style="font-size:8px; width:100%; text-align:center; color:#6b7280;"></div>',
      footerTemplate:
        '<div style="font-size:8px; width:100%; padding:0 12mm; color:#6b7280; display:flex; justify-content:space-between;">' +
        '<span>ProStream Offline Documentation</span>' +
        '<span><span class="pageNumber"></span>/<span class="totalPages"></span></span>' +
        '</div>',
    });

    await browser.close();
  } finally {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  console.log(`Offline PDF generated: ${path.relative(rootDir, outputPdfPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
