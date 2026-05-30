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
const BASE_URL = 'https://errorfix.dev';

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

const entries = [];

// Homepage
entries.push(urlEntry(`${BASE_URL}/`, '1.0', 'daily'));

// About
entries.push(urlEntry(`${BASE_URL}/about/`, '0.5', 'monthly'));

// Category index pages + individual pages
for (const cat of ALL_CATEGORIES) {
  entries.push(urlEntry(`${BASE_URL}/${cat}/`, '0.8', 'weekly'));

  const files = await readdir(join(dataDir, cat));
  const slugs = files
    .filter(f => f.endsWith('.js'))
    .map(f => f.replace(/\.js$/, ''))
    .sort();

  for (const slug of slugs) {
    entries.push(urlEntry(`${BASE_URL}/${cat}/${slug}/`, '0.7', 'monthly'));
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

await writeFile(join(rootDir, 'public/sitemap.xml'), xml, 'utf8');
console.log(`✓ sitemap.xml generated (${entries.length} URLs)`);
