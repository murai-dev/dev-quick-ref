export default {
  title: "cannot find module / npm module not found — how to fix",
  description: "Fix \"Cannot find module\" and npm module not found errors in Node.js by installing the missing package, checking paths, and verifying module resolution.",
  quickAnswer: `# Install the missing module
npm install xyz

# If it's a dev dependency
npm install --save-dev xyz

# Rebuild node_modules from scratch
rm -rf node_modules package-lock.json
npm install`,
  when: {
    error: `Error: Cannot find module 'express'
Require stack:
- /home/user/project/src/index.js
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:1039:15)`,
    post: 'Node.js cannot locate the module because it is not installed, the package name is misspelled, or node_modules is missing. This is the common "cannot find module" error.',
  },
  details: [
    {
      title: 'Check if it is installed',
      code: `# List installed packages
npm ls express

# Or check node_modules
ls node_modules/express`,
    },
    {
      title: 'Relative path import errors',
      explanation: 'For local file imports, check the path is correct relative to the importing file.',
      code: `// WRONG — missing ./ prefix
const utils = require('utils');     // looks in node_modules

// CORRECT — explicit relative path
const utils = require('./utils');
const utils = require('../lib/utils');`,
    },
    {
      title: 'TypeScript — missing @types package',
      code: `# Install type definitions
npm install --save-dev @types/express

# Or check if types are bundled
npm info express types`,
    },
    {
      title: 'ESM vs CJS mismatch',
      code: `# package.json "type": "module" uses ESM — use import instead of require
import express from 'express';

# Or rename file to .cjs to use CommonJS
// index.cjs
const express = require('express');`,
    },
  ],
  related: [
    { href: '/npm/enoent-no-such-file/', text: 'npm ENOENT no such file' },
    { href: '/npm/eresolve-peer-deps/', text: 'npm ERESOLVE dependency conflict' },
    { href: '/npm/missing-script/', text: 'npm ERR! missing script' },
    { href: '/npm/npm-cache-clean/', text: 'npm cache clean' },
  ],
};
