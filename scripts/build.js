import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

const COPY_ITEMS = [
  'index.html',
  'assets',
  'library',
  'companion-bridge.js',
  'fluenthour.svg',
  'vite.svg'
];

async function pathExists(p) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}

async function copyToDist(relPath) {
  const src = path.join(ROOT, relPath);
  if (!(await pathExists(src))) return;

  const dest = path.join(DIST, relPath);
  await fs.mkdir(path.dirname(dest), { recursive: true });

  const st = await fs.stat(src);
  if (st.isDirectory()) {
    await fs.cp(src, dest, { recursive: true });
  } else {
    await fs.copyFile(src, dest);
  }
}

async function main() {
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(DIST, { recursive: true });

  for (const item of COPY_ITEMS) {
    await copyToDist(item);
  }

  // Also copy any additional root-level assets we might add later.
  const entries = await fs.readdir(ROOT, { withFileTypes: true });
  for (const e of entries) {
    if (!e.isFile()) continue;
    const name = e.name;

    if (name.startsWith('.')) continue;
    if (['index.html', 'netlify.toml', 'readme.txt', 'README.md', 'package.json', 'package-lock.json'].includes(name)) continue;

    if (name.endsWith('.js') || name.endsWith('.css') || name.endsWith('.json')) {
      if (!COPY_ITEMS.includes(name)) {
        await copyToDist(name);
      }
    }
  }

  console.log('Built static site into dist/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
