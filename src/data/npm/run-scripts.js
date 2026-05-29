export default {
  title: 'npm scripts — define and run custom commands',
  description: 'Define and run npm scripts in package.json. Covers common patterns: chaining commands, passing arguments, lifecycle hooks, and cross-env.',
  quickAnswer: `# Run a script
npm run build
npm run dev
npm run test

# Shorthand for built-in scripts (no "run" needed)
npm start
npm test`,
  when: {
    label: 'Usage',
    pre: 'Automate project tasks (build, test, lint, deploy) using npm scripts defined in package.json.',
  },
  details: [
    {
      title: 'Defining scripts in package.json',
      code: `{
  "scripts": {
    "dev":   "vite",
    "build": "tsc && vite build",
    "test":  "vitest run",
    "lint":  "eslint src --ext ts,tsx"
  }
}`,
    },
    {
      title: 'Chaining commands',
      code: `{
  "scripts": {
    // Run sequentially (stop on failure)
    "build": "tsc && vite build",

    // Run in parallel
    "dev":   "tsc -w & vite",

    // Cross-platform parallel (use npm-run-all)
    "dev2":  "run-p tsc:watch vite:serve"
  }
}`,
    },
    {
      title: 'Passing arguments to a script',
      code: `npm run test -- --watch
# Everything after -- is forwarded to the script`,
    },
    {
      title: 'Pre and post hooks',
      code: `{
  "scripts": {
    "prebuild":  "rm -rf dist",
    "build":     "vite build",
    "postbuild": "gzip dist/assets/*.js"
  }
}
# prebuild runs before build, postbuild runs after`,
    },
    {
      title: 'Set environment variables cross-platform',
      code: `# Install cross-env
npm install --save-dev cross-env

{
  "scripts": {
    "build:prod": "cross-env NODE_ENV=production vite build"
  }
}`,
    },
  ],
  related: [
    { href: '/npm/link-local-package/', text: 'npm link — local package development' },
    { href: '/npm/engines-field/', text: 'npm engines — require Node.js version' },
  ],
};
