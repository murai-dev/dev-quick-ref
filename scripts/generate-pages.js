#!/usr/bin/env node
/**
 * generate-pages.js
 * Reads src/data/{category}/{slug}.js and writes src/pages/{category}/{slug}/index.html
 *
 * Usage:
 *   node scripts/generate-pages.js              # all categories
 *   node scripts/generate-pages.js git          # one category
 *   node scripts/generate-pages.js git push-rejected  # one page
 */
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const dataDir  = join(rootDir, 'src/data');
const pagesDir = rootDir;

const ALL_CATEGORIES = ['git', 'docker', 'bash', 'regex', 'npm'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Escape for use inside <pre><code> blocks */
function esc(str) {
  return String(str)
    // Strip HTML-invalid control characters (keep tab, LF, CR)
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Escape for use inside HTML attribute values (e.g. content="...") */
function escAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
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

function codeBlock(code, copyBtn = true) {
  const btn = copyBtn ? '\n          <button class="copy-btn">Copy</button>' : '';
  return `        <div class="code-block">${btn}
          <pre><code>${esc(code)}</code></pre>
        </div>`;
}

// ---------------------------------------------------------------------------
// HTML template
// ---------------------------------------------------------------------------

function renderPage(data, category, slug) {
  /* ── when section ── */
  let whenSection = '';
  if (data.when) {
    const w = data.when;
    const label = w.label ?? (w.error ? 'When this happens' : 'Usage');
    const parts = [];
    if (w.pre)   parts.push(`        <p>${w.pre}</p>`);
    if (w.error) parts.push(
      `        <div class="code-block error-block">\n          <pre><code>${esc(w.error)}</code></pre>\n        </div>`,
    );
    if (w.post)  parts.push(`        <p>${w.post}</p>`);
    whenSection = `
      <section class="section">
        <p class="section-label">${label}</p>
${parts.join('\n')}
      </section>`;
  }

  /* ── details section ── */
  let detailsSection = '';
  if (data.details && data.details.length > 0) {
    const label = data.detailsLabel ?? 'Other causes &amp; fixes';
    const items = data.details.map(d => {
      const expHtml = d.explanation ? `        <p>${d.explanation}</p>\n` : '';
      const codeHtml = d.code ? `\n${codeBlock(d.code, true)}\n` : '';
      return `        <h3>${esc(d.title)}</h3>\n${expHtml}${codeHtml}`;
    }).join('\n');
    detailsSection = `
      <section class="section">
        <p class="section-label">${label}</p>
${items}
      </section>`;
  }

  /* ── related section ── */
  const relatedItems = (data.related ?? [])
    .map(r => `          <li><a href="${r.href}">${r.text}</a></li>`)
    .join('\n');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escAttr(data.title)} | errorfix.dev</title>
    <meta name="description" content="${escAttr(data.description)}" />
    <link rel="canonical" href="https://errorfix.dev/${category}/${slug}/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="errorfix.dev" />
    <meta property="og:url" content="https://errorfix.dev/${category}/${slug}/" />
    <meta property="og:title" content="${escAttr(data.title)} | errorfix.dev" />
    <meta property="og:description" content="${escAttr(data.description)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escAttr(data.title)} | errorfix.dev" />
    <meta name="twitter:description" content="${escAttr(data.description)}" />
    <meta name="google-site-verification" content="enxC6My621Y-D7FP7s1Iyb3QHPBgvCvtkHjFOZtuAYg" />
    <link rel="preconnect" href="https://www.googletagmanager.com" />
    <script defer src="https://www.googletagmanager.com/gtag/js?id=G-C7WNG19TNC"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-C7WNG19TNC');</script>
    <script type="module" src="../../src/entrypoints/page.ts"></script>
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

      <p class="breadcrumb"><a href="/${category}/">${category}</a> / ${slug}</p>

      <h1>${esc(data.title)}</h1>

      <section class="quick-answer">
        <p class="section-label">Quick Answer</p>
${codeBlock(data.quickAnswer, true)}
      </section>
${whenSection}${detailsSection}
      <section class="section">
        <p class="section-label">Related</p>
        <ul class="related-list">
${relatedItems}
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

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const [, , argCat, argSlug] = process.argv;
  const categories = argCat ? [argCat] : ALL_CATEGORIES;
  let generated = 0;

  for (const category of categories) {
    const catDataDir = join(dataDir, category);
    if (!existsSync(catDataDir)) continue;

    const files = (await readdir(catDataDir)).filter(f => f.endsWith('.js'));

    for (const file of files) {
      const slug = file.replace(/\.js$/, '');
      if (argSlug && slug !== argSlug) continue;

      const { default: data } = await import(join(catDataDir, file));
      const html = renderPage(data, category, slug);

      const outDir = join(pagesDir, category, slug);
      await mkdir(outDir, { recursive: true });
      await writeFile(join(outDir, 'index.html'), html, 'utf-8');
      process.stderr.write(`✓ ${category}/${slug}\n`);
      generated++;
    }
  }

  console.log(`Generated ${generated} page(s).`);
}

main().catch(err => { console.error(err); process.exit(1); });
