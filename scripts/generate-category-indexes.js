#!/usr/bin/env node
/**
 * generate-category-indexes.js
 * Creates /git/index.html, /docker/index.html, etc.
 * Each lists all pages in that category with title + description.
 *
 * Usage:
 *   node scripts/generate-category-indexes.js         # all categories
 *   node scripts/generate-category-indexes.js git     # one category
 */
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const dataDir  = join(rootDir, 'src/data');

const ALL_CATEGORIES = ['git', 'docker', 'bash', 'regex', 'npm'];

function escAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderNav(activeCategory) {
  return ALL_CATEGORIES
    .map(cat =>
      `          <li><a href="/${cat}/"${cat === activeCategory ? ' class="active"' : ''}>${cat}</a></li>`,
    )
    .join('\n') +
    '\n          <li class="nav-about"><a href="/about/">about</a></li>';
}

const CATEGORY_DESC = {
  git:    'Copy-paste fixes for common git errors and workflows.',
  docker: 'Copy-paste fixes for common Docker errors and commands.',
  bash:   'Copy-paste fixes for common bash scripting errors and patterns.',
  regex:  'Quick reference for regular expression patterns and syntax.',
  npm:    'Copy-paste fixes for common npm errors and workflows.',
};

function renderCategoryIndex(category, pages) {
  const count = pages.length;
  const desc = CATEGORY_DESC[category] ?? `${category} developer error reference.`;

  const items = pages
    .map(({ slug, title, description }) =>
      `          <li>\n` +
      `            <a href="/${category}/${slug}/">${esc(title)}</a>\n` +
      `            <p>${esc(description)}</p>\n` +
      `          </li>`,
    )
    .join('\n');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(category)} — errorfix.dev</title>
    <meta name="description" content="${escAttr(desc)}" />
    <link rel="canonical" href="https://errorfix.dev/${category}/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="errorfix.dev" />
    <meta property="og:url" content="https://errorfix.dev/${category}/" />
    <meta property="og:title" content="${esc(category)} — errorfix.dev" />
    <meta property="og:description" content="${escAttr(desc)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${esc(category)} — errorfix.dev" />
    <meta name="twitter:description" content="${escAttr(desc)}" />
    <meta name="google-site-verification" content="enxC6My621Y-D7FP7s1Iyb3QHPBgvCvtkHjFOZtuAYg" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-C7WNG19TNC"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-C7WNG19TNC');</script>
    <script type="module" src="../src/entrypoints/page.ts"></script>
  </head>
  <body>

    <header class="site-header">
      <a href="/" class="site-logo">errorfix.dev</a>
      <nav>
        <ul class="site-nav">
${renderNav(category)}
        </ul>
      </nav>
    </header>

    <main class="content-wrapper">

      <p class="breadcrumb"><a href="/">/</a> / ${category}</p>

      <h1>${category}</h1>

      <section class="section">
        <p class="section-label">${count} pages</p>
        <ul class="category-page-list">
${items}
        </ul>
      </section>

    </main>

    <footer class="site-footer">
      <a href="/">errorfix.dev</a> &mdash; developer error solutions
    </footer>

    <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "c552daa8ebee40379e994c6b8b6dd1f5"}'></script>
  </body>
</html>
`;
}

async function main() {
  const [, , argCat] = process.argv;
  const categories = argCat ? [argCat] : ALL_CATEGORIES;

  for (const category of categories) {
    const catDataDir = join(dataDir, category);
    if (!existsSync(catDataDir)) {
      console.error(`No data directory for: ${category}`);
      continue;
    }

    const files = (await readdir(catDataDir))
      .filter(f => f.endsWith('.js'))
      .sort();

    const pages = [];
    for (const file of files) {
      const slug = file.replace(/\.js$/, '');
      const { default: data } = await import(join(catDataDir, file));
      pages.push({ slug, title: data.title, description: data.description });
    }

    const html = renderCategoryIndex(category, pages);
    const outDir = join(rootDir, category);
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, 'index.html'), html, 'utf-8');
    process.stderr.write(`✓ ${category}/index.html (${pages.length} pages)\n`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
