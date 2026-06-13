#!/usr/bin/env node
/**
 * scripts/research.js
 *
 * MVP candidates validation
 *   1. Google Suggest count  (en / us, 0-10)
 *   2. Stack Overflow top question view count
 *   3. Google Trends keyword comparison (optional)
 *
 * Usage:
 *   node scripts/research.js
 *   node scripts/research.js --category git
 *   node scripts/research.js --compare-trends "query A|query B|query C"
 *   node scripts/research.js --compare-trends "query A|query B" --trends-window 30d --trends-geo US
 */

import https from 'node:https';
import zlib from 'node:zlib';
import googleTrends from 'google-trends-api';

// ------------------------------------------------------------------ helpers

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
            'Accept-Encoding': 'gzip, deflate',
          },
        },
        (res) => {
          const enc = res.headers['content-encoding'];
          let stream = res;
          if (enc === 'gzip') stream = res.pipe(zlib.createGunzip());
          else if (enc === 'deflate') stream = res.pipe(zlib.createInflate());

          let body = '';
          stream.on('data', (c) => (body += c));
          stream.on('end', () => resolve({ status: res.statusCode, body }));
          stream.on('error', reject);
        },
      )
      .on('error', reject);
  });
}

async function getSuggestCount(query) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=${encodeURIComponent(query)}`;
  try {
    const { body } = await get(url);
    const parsed = JSON.parse(body);
    return Array.isArray(parsed[1]) ? parsed[1].length : 0;
  } catch {
    return -1;
  }
}

async function getSOTopViews(query) {
  const url =
    `https://api.stackexchange.com/2.3/search` +
    `?order=desc&sort=relevance` +
    `&intitle=${encodeURIComponent(query)}` +
    `&site=stackoverflow&pagesize=1`;
  try {
    const { body } = await get(url);
    const parsed = JSON.parse(body);
    const top = parsed.items?.[0];
    if (!top) return 0;
    return top.view_count ?? 0;
  } catch {
    return -1;
  }
}

function fmtViews(n) {
  if (n < 0) return 'ERR';
  if (n === 0) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

function parseArgs(argv) {
  const args = {
    category: null,
    compareTrends: null,
    trendsGeo: 'US',
    trendsWindow: '90d',
    trendsHl: 'en-US',
  };

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === '--category' && next) {
      args.category = next;
      i++;
      continue;
    }

    if (arg === '--compare-trends' && next) {
      args.compareTrends = next;
      i++;
      continue;
    }

    if (arg === '--trends-geo' && next) {
      args.trendsGeo = next;
      i++;
      continue;
    }

    if (arg === '--trends-window' && next) {
      args.trendsWindow = next;
      i++;
      continue;
    }

    if (arg === '--trends-hl' && next) {
      args.trendsHl = next;
      i++;
    }
  }

  return args;
}

function parseWindowToDateRange(windowValue) {
  const endTime = new Date();
  const startTime = new Date(endTime);

  if (/^\d+d$/.test(windowValue)) {
    startTime.setDate(endTime.getDate() - Number.parseInt(windowValue, 10));
    return { startTime, endTime };
  }

  if (/^\d+m$/.test(windowValue)) {
    startTime.setMonth(endTime.getMonth() - Number.parseInt(windowValue, 10));
    return { startTime, endTime };
  }

  if (/^\d+y$/.test(windowValue)) {
    startTime.setFullYear(endTime.getFullYear() - Number.parseInt(windowValue, 10));
    return { startTime, endTime };
  }

  throw new Error(`Unsupported --trends-window value: ${windowValue}. Use formats like 7d, 30d, 90d, 12m, 5y.`);
}

function summarizeTimeline(keyword, timelineData, index) {
  const values = timelineData
    .map((point) => Number.parseInt(point.value?.[index] ?? '0', 10))
    .filter((value) => Number.isFinite(value));

  if (values.length === 0) {
    return { keyword, average: 0, peak: 0 };
  }

  const total = values.reduce((sum, value) => sum + value, 0);
  return {
    keyword,
    average: Number((total / values.length).toFixed(1)),
    peak: Math.max(...values),
  };
}

async function compareTrends(keywords, options) {
  const { startTime, endTime } = parseWindowToDateRange(options.trendsWindow);
  const raw = await googleTrends.interestOverTime({
    keyword: keywords,
    startTime,
    endTime,
    geo: options.trendsGeo,
    hl: options.trendsHl,
  });

  const parsed = JSON.parse(raw);
  const timelineData = parsed.default?.timelineData ?? [];
  const rows = keywords.map((keyword, index) => summarizeTimeline(keyword, timelineData, index));
  const winner = rows.reduce((best, row) => (row.average > best.average ? row : best), rows[0]);

  return {
    window: options.trendsWindow,
    geo: options.trendsGeo,
    hl: options.trendsHl,
    startTime,
    endTime,
    rows,
    winner,
  };
}

function printTrendsComparison(result) {
  console.log(`Google Trends comparison (${result.geo}, ${result.window})`);
  console.log('| keyword | average interest | peak interest |');
  console.log('| --- | ---: | ---: |');

  for (const row of result.rows) {
    console.log(`| ${row.keyword} | ${row.average} | ${row.peak} |`);
  }

  console.log('');
  console.log(`Winner: ${result.winner.keyword} (avg ${result.winner.average})`);
  console.log(`Range: ${result.startTime.toISOString().slice(0, 10)} -> ${result.endTime.toISOString().slice(0, 10)}`);
  console.log('Note: values are relative within this comparison batch, so compare only keywords in the same run.');
}

// ------------------------------------------------------------------ queries

const QUERIES = [
  // Git (30)
  { category: 'git', slug: 'detached-head',           query: 'git detached HEAD how to fix' },
  { category: 'git', slug: 'undo-last-commit',        query: 'git undo last commit keep changes' },
  { category: 'git', slug: 'reset-soft-mixed-hard',   query: 'git reset soft vs mixed vs hard difference' },
  { category: 'git', slug: 'merge-conflict',          query: 'git merge conflict how to resolve' },
  { category: 'git', slug: 'stash-drop',              query: 'git stash drop specific stash' },
  { category: 'git', slug: 'rebase-abort',            query: 'git rebase abort' },
  { category: 'git', slug: 'cherry-pick',             query: 'git cherry-pick specific commit' },
  { category: 'git', slug: 'delete-remote-branch',    query: 'git delete remote branch' },
  { category: 'git', slug: 'rename-branch',           query: 'git rename branch' },
  { category: 'git', slug: 'amend-commit-message',    query: 'git amend last commit message' },
  { category: 'git', slug: 'recover-deleted-branch',  query: 'git recover deleted branch' },
  { category: 'git', slug: 'discard-unstaged-changes',query: 'git discard all unstaged changes' },
  { category: 'git', slug: 'bisect',                  query: 'git bisect find breaking commit' },
  { category: 'git', slug: 'squash-commits',          query: 'git squash commits before push' },
  { category: 'git', slug: 'pull-rebase-vs-merge',    query: 'git pull rebase vs merge' },
  { category: 'git', slug: 'clone-specific-branch',   query: 'git clone specific branch' },
  { category: 'git', slug: 'remote-change-url',       query: 'git remote change URL' },
  { category: 'git', slug: 'untrack-file',            query: 'git ignore already tracked file' },
  { category: 'git', slug: 'remove-untracked',        query: 'git remove untracked files' },
  { category: 'git', slug: 'diff-branches',           query: 'git diff between two branches' },
  { category: 'git', slug: 'show-file-at-commit',     query: 'git show file at specific commit' },
  { category: 'git', slug: 'push-rejected',           query: 'git push rejected non-fast-forward' },
  { category: 'git', slug: 'permission-denied-publickey', query: 'git permission denied publickey' },
  { category: 'git', slug: 'ssl-certificate-error',   query: 'git SSL certificate problem fix' },
  { category: 'git', slug: 'line-ending-crlf',        query: 'git line ending CRLF LF fix' },
  { category: 'git', slug: 'submodule-update',        query: 'git submodule update all' },
  { category: 'git', slug: 'large-file-rejected',     query: 'git large file rejected fix' },
  { category: 'git', slug: 'shallow-to-full-clone',   query: 'git shallow clone to full history' },
  { category: 'git', slug: 'tag-commit',              query: 'git tag specific commit' },
  { category: 'git', slug: 'worktree',                query: 'git worktree add and use' },

  // Docker (20)
  { category: 'docker', slug: 'container-not-stopping',    query: 'docker container not stopping kill' },
  { category: 'docker', slug: 'port-already-in-use',       query: 'docker port already in use fix' },
  { category: 'docker', slug: 'permission-denied-socket',  query: 'docker permission denied socket' },
  { category: 'docker', slug: 'no-space-left',             query: 'docker no space left on device' },
  { category: 'docker', slug: 'container-exits-immediately',query: 'docker container exits immediately' },
  { category: 'docker', slug: 'exec-container-not-running',query: 'docker exec container not running' },
  { category: 'docker', slug: 'image-prune',               query: 'docker image prune which is safe' },
  { category: 'docker', slug: 'network-not-found',         query: 'docker network not found' },
  { category: 'docker', slug: 'compose-env-file',          query: 'docker compose env file not loading' },
  { category: 'docker', slug: 'volume-permission-denied',  query: 'docker volume mount permission denied' },
  { category: 'docker', slug: 'build-context-too-large',   query: 'docker build context too large' },
  { category: 'docker', slug: 'cache-invalidated',         query: 'docker layer cache invalidated fix' },
  { category: 'docker', slug: 'copy-file-from-container',  query: 'docker copy file from container' },
  { category: 'docker', slug: 'inspect-ip-address',        query: 'docker inspect container IP address' },
  { category: 'docker', slug: 'logs-follow',               query: 'docker logs follow realtime' },
  { category: 'docker', slug: 'remove-dangling-images',    query: 'docker remove dangling images' },
  { category: 'docker', slug: 'pull-rate-limit',           query: 'docker pull rate limit exceeded' },
  { category: 'docker', slug: 'compose-depends-on',        query: 'docker compose depends_on wait for service ready' },
  { category: 'docker', slug: 'wsl2-integration',          query: 'docker on Windows WSL2 integration' },
  { category: 'docker', slug: 'multi-stage-build',         query: 'docker multi-stage build reduce image size' },

  // Bash (20)
  { category: 'bash', slug: 'check-file-exists',       query: 'bash check if file exists' },
  { category: 'bash', slug: 'read-file-line-by-line',  query: 'bash read file line by line' },
  { category: 'bash', slug: 'loop-through-files',      query: 'bash loop through files in directory' },
  { category: 'bash', slug: 'string-contains',         query: 'bash string contains substring' },
  { category: 'bash', slug: 'check-command-exists',    query: 'bash check if command exists' },
  { category: 'bash', slug: 'exit-code',               query: 'bash exit code previous command' },
  { category: 'bash', slug: 'compare-strings',         query: 'bash compare strings' },
  { category: 'bash', slug: 'array-add-element',       query: 'bash array add element' },
  { category: 'bash', slug: 'trim-whitespace',         query: 'bash trim whitespace from string' },
  { category: 'bash', slug: 'replace-string-in-file',  query: 'bash replace string in file sed' },
  { category: 'bash', slug: 'find-and-execute',        query: 'bash find files and execute command' },
  { category: 'bash', slug: 'redirect-stdout-stderr',  query: 'bash redirect stdout and stderr' },
  { category: 'bash', slug: 'background-process',      query: 'bash run process in background wait' },
  { category: 'bash', slug: 'split-string',            query: 'bash split string by delimiter' },
  { category: 'bash', slug: 'numeric-comparison',      query: 'bash numeric comparison operators' },
  { category: 'bash', slug: 'default-variable-value',  query: 'bash default value if variable is empty' },
  { category: 'bash', slug: 'check-port-in-use',       query: 'bash check if port is in use' },
  { category: 'bash', slug: 'kill-process-by-name',    query: 'bash kill process by name' },
  { category: 'bash', slug: 'count-lines',             query: 'bash count lines in file' },
  { category: 'bash', slug: 'check-directory-exists',  query: 'bash check if directory exists' },

  // Regex (15)
  { category: 'regex', slug: 'match-email',            query: 'regex match email address' },
  { category: 'regex', slug: 'match-url',              query: 'regex match URL' },
  { category: 'regex', slug: 'match-ip-address',       query: 'regex match IP address' },
  { category: 'regex', slug: 'remove-html-tags',       query: 'regex remove HTML tags' },
  { category: 'regex', slug: 'match-date-format',      query: 'regex match date YYYY-MM-DD' },
  { category: 'regex', slug: 'match-phone-number',     query: 'regex match phone number' },
  { category: 'regex', slug: 'non-greedy',             query: 'regex non-greedy match' },
  { category: 'regex', slug: 'lookahead-lookbehind',   query: 'regex lookahead and lookbehind' },
  { category: 'regex', slug: 'multiline-mode',         query: 'regex multiline mode' },
  { category: 'regex', slug: 'named-capture-groups',   query: 'regex named capture groups' },
  { category: 'regex', slug: 'match-file-extension',   query: 'regex match file extension' },
  { category: 'regex', slug: 'replace-javascript',     query: 'regex replace in JavaScript' },
  { category: 'regex', slug: 'remove-blank-lines',     query: 'regex grep remove blank lines' },
  { category: 'regex', slug: 'match-between-brackets', query: 'regex match between brackets' },
  { category: 'regex', slug: 'validate-password',      query: 'regex validate password strength' },

  // npm / Node.js (15)
  { category: 'npm', slug: 'eacces-permission',         query: 'npm EACCES permission denied fix' },
  { category: 'npm', slug: 'peer-dependency-conflict',  query: 'npm peer dependency conflict resolve' },
  { category: 'npm', slug: 'package-lock-conflict',     query: 'npm package-lock.json merge conflict' },
  { category: 'npm', slug: 'nvm-switch-version',        query: 'node version switch with nvm' },
  { category: 'npm', slug: 'certificate-error',         query: 'npm certificate error SELF_SIGNED fix' },
  { category: 'npm', slug: 'global-packages-location',  query: 'npm global packages location' },
  { category: 'npm', slug: 'audit-fix-breaking',        query: 'npm audit fix with breaking changes' },
  { category: 'npm', slug: 'require-vs-import',         query: 'node require vs import difference' },
  { category: 'npm', slug: 'list-outdated',             query: 'npm list outdated packages' },
  { category: 'npm', slug: 'run-script-not-found',      query: 'npm run script not found' },
  { category: 'npm', slug: 'heap-out-of-memory',        query: 'node heap out of memory' },
  { category: 'npm', slug: 'cache-clean',               query: 'npm cache clean when to use' },
  { category: 'npm', slug: 'unhandled-promise-rejection',query: 'node unhandled promise rejection' },
  { category: 'npm', slug: 'link-local-package',        query: 'npm link local package' },
  { category: 'npm', slug: 'cannot-find-module',        query: 'node cannot find module error' },
];

// ------------------------------------------------------------------ main

const args = parseArgs(process.argv);

async function main() {
  if (args.compareTrends) {
    const keywords = args.compareTrends
      .split('|')
      .map((keyword) => keyword.trim())
      .filter(Boolean);

    if (keywords.length < 2) {
      throw new Error('Use at least two keywords with --compare-trends, separated by "|".');
    }

    process.stderr.write(`Comparing Google Trends for ${keywords.length} keywords...\n\n`);
    const trends = await compareTrends(keywords, args);
    printTrendsComparison(trends);
    return;
  }

  const targets = args.category
    ? QUERIES.filter((q) => q.category === args.category)
    : QUERIES;

  process.stderr.write(`Running research for ${targets.length} queries...\n\n`);

  const results = [];
  let i = 0;

  for (const { category, slug, query } of targets) {
    i++;
    process.stderr.write(`[${i}/${targets.length}] ${query}\n`);

    const suggest = await getSuggestCount(query);
    await sleep(250);
    const soViews = await getSOTopViews(query);
    await sleep(250);

    results.push({ category, slug, query, suggest, soViews });
  }

  process.stderr.write('\n');

  // Markdown table output
  console.log('| category | slug | query | suggest (en/us) | SO top views |');
  console.log('| --- | --- | --- | :---: | ---: |');
  for (const r of results) {
    console.log(
      `| ${r.category} | ${r.slug} | ${r.query} | ${r.suggest}/10 | ${fmtViews(r.soViews)} |`,
    );
  }

  // Summary
  const avgSuggest = (results.reduce((s, r) => s + Math.max(r.suggest, 0), 0) / results.length).toFixed(1);
  const highSuggest = results.filter((r) => r.suggest >= 8).length;
  const highViews = results.filter((r) => r.soViews >= 100_000).length;

  process.stderr.write(`\n--- Summary ---\n`);
  process.stderr.write(`Avg suggest count : ${avgSuggest}/10\n`);
  process.stderr.write(`Suggest >= 8/10   : ${highSuggest} queries\n`);
  process.stderr.write(`SO views >= 100K  : ${highViews} queries\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
