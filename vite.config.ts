import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

/** Recursively find all index.html files under src/pages/ */
function findPages(dir: string, prefix: string = ''): Record<string, string> {
  const result: Record<string, string> = {};
  if (!existsSync(dir)) return result;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = prefix ? `${prefix}/${entry}` : entry;
    if (statSync(full).isDirectory()) {
      Object.assign(result, findPages(full, rel));
    } else if (entry === 'index.html' && prefix) {
      result[rel.replace(/\//g, '-')] = full;
    }
  }
  return result;
}

const pagesInput = findPages(resolve(rootDir, 'src/pages'));

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
