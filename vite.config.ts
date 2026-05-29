import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

const SCAN_IGNORE = new Set(['src', 'node_modules', 'dist', 'scripts', 'documents', 'public', 'locales', 'tests', '.git']);

/** Find all index.html files in root-level category dirs (depth 1 and 2) */
function findPages(dir: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const cat of readdirSync(dir)) {
    if (SCAN_IGNORE.has(cat) || cat.startsWith('.')) continue;
    const catPath = join(dir, cat);
    if (!statSync(catPath).isDirectory()) continue;

    // depth-1: e.g. about/index.html
    const directIndex = join(catPath, 'index.html');
    if (existsSync(directIndex)) {
      result[cat] = directIndex;
    }

    // depth-2: e.g. git/push-rejected/index.html
    for (const slug of readdirSync(catPath)) {
      const slugPath = join(catPath, slug);
      if (!statSync(slugPath).isDirectory()) continue;
      const slugIndex = join(slugPath, 'index.html');
      if (existsSync(slugIndex)) {
        result[`${cat}-${slug}`] = slugIndex;
      }
    }
  }
  return result;
}

const pagesInput = findPages(rootDir);

export default defineConfig({
  base: '/',
  server: {
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        ...pagesInput,
      },
    },
  },
});
