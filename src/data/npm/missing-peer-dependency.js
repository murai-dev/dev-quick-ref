export default {
  title: 'npm peer dependency warning — how to handle',
  description: 'Understand and fix npm peer dependency warnings. Covers why they appear, when it is safe to ignore them, and how to install missing peer deps.',
  quickAnswer: `# Install missing peer dependency explicitly
npm install react@18 react-dom@18

# Suppress warnings by installing with --legacy-peer-deps
npm install --legacy-peer-deps

# See all peer dependency issues
npm ls 2>&1 | grep "peer dep"`,
  when: {
    error: `npm warn peer dep missing: react@>=16.8.0, required by some-component@1.0.0
npm warn deprecated some-component@1.0.0: Use new-component instead`,
    post: 'A package lists another package as a peer dependency, meaning you are expected to install that dependency separately at the right version.',
  },
  details: [
    {
      title: 'What is a peer dependency?',
      explanation: 'Peer dependencies are packages that a library needs you to provide, rather than bundling itself. Common pattern: a plugin that requires the host library (e.g. a React component requiring React).',
      code: `// A package.json might say:
{
  "peerDependencies": {
    "react": ">=17.0.0 <19.0.0"
  }
}
// You must have react installed at a compatible version`,
    },
    {
      title: 'Auto-install peer deps (npm 7+)',
      explanation: 'npm 7+ installs peer deps automatically. This can cause ERESOLVE errors when versions conflict. npm 6 only warned.',
      code: `# Revert to npm 6 behavior (warn, do not block)
npm install --legacy-peer-deps`,
    },
    {
      title: 'Check which peers are missing',
      code: `npm ls
# Packages with "peer dep unmet" or missing entries need attention`,
    },
  ],
  related: [
    { href: '/npm/eresolve-peer-deps/', text: 'npm ERESOLVE — dependency tree conflict' },
    { href: '/npm/outdated-packages/', text: 'npm outdated — check for updates' },
  ],
};
