#!/usr/bin/env node
/**
 * generate-sitemap.js
 * Reads src/data/{category}/*.js and writes public/sitemap.xml
 *
 * Usage:
 *   node scripts/generate-sitemap.js
 */
import { readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const dataDir  = join(rootDir, 'src/data');

// Use SITE_URL from environment when available (fallback to Pages URL)
const BASE_URL = process.env.SITE_URL || 'https://dev-quick-ref.pages.dev';

const ALL_CATEGORIES = ['git', 'docker', 'bash', 'regex', 'npm'];
const TODAY = new Date().toISOString().split('T')[0];

function urlEntry(loc, priority, changefreq = 'weekly') {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${TODAY}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

const urls = [];

// Homepage
urls.push({ loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'daily', lastmod: TODAY });

// About
urls.push({ loc: `${BASE_URL}/about/`, priority: '0.5', changefreq: 'monthly', lastmod: TODAY });

// Category index pages + individual pages
for (const cat of ALL_CATEGORIES) {
  urls.push({ loc: `${BASE_URL}/${cat}/`, priority: '0.8', changefreq: 'weekly', lastmod: TODAY });

  const files = await readdir(join(dataDir, cat));
  const slugs = files
    .filter(f => f.endsWith('.js'))
    .map(f => f.replace(/\.js$/, ''))
    .sort();

  for (const slug of slugs) {
    urls.push({ loc: `${BASE_URL}/${cat}/${slug}/`, priority: '0.7', changefreq: 'monthly', lastmod: TODAY });
  }
}

const xmlEntries = urls.map(u => urlEntry(u.loc, u.priority, u.changefreq));
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlEntries.join('\n')}\n</urlset>\n`;

await writeFile(join(rootDir, 'public/sitemap.xml'), xml, 'utf8');

// Also generate a human-readable sitemap.html for browsers and quick inspection.
const htmlList = urls.map(u => `  <li><a href="${u.loc}">${u.loc}</a> <small>${u.lastmod}</small></li>`).join('\n');
const html = `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width,initial-scale=1" />\n    <title>Sitemap — ${BASE_URL}</title>\n  </head>\n  <body>\n    <h1>Sitemap</h1>\n    <p>Generated: ${TODAY}</p>\n    <ul>\n${htmlList}\n    </ul>\n  </body>\n</html>\n`;

await writeFile(join(rootDir, 'public/sitemap.html'), html, 'utf8');

console.log(`✓ sitemap.xml generated (${urls.length} URLs)`);
console.log(`✓ sitemap.html generated (${urls.length} URLs)`);
