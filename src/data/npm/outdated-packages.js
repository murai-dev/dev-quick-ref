export default {
  title: 'npm outdated — check for package updates',
  description: 'Use npm outdated to see which packages have newer versions, and npm update or manual version bumps to upgrade them.',
  quickAnswer: `# List outdated packages
npm outdated

# Update all packages to latest compatible version (respects semver)
npm update

# Update a specific package
npm update lodash`,
  when: {
    label: 'Usage',
    pre: 'You want to check if your dependencies have newer versions available.',
  },
  details: [
    {
      title: 'Reading npm outdated output',
      code: `npm outdated
# Package    Current   Wanted   Latest   Location
# lodash     4.17.20  4.17.21  4.17.21  node_modules/lodash
# react      17.0.2   17.0.2   18.3.0   node_modules/react
#
# Current: installed version
# Wanted:  latest that satisfies your package.json range
# Latest:  latest published on npm`,
    },
    {
      title: 'Upgrade to latest (beyond semver range)',
      code: `# Install latest explicitly
npm install lodash@latest

# Or use npm-check-updates to bump package.json
npx npm-check-updates -u
npm install`,
    },
    {
      title: 'Check global packages',
      code: `npm outdated -g`,
    },
  ],
  related: [
    { href: '/npm/audit-fix/', text: 'npm audit fix — security vulnerabilities' },
    { href: '/npm/eresolve-peer-deps/', text: 'npm ERESOLVE dependency conflict' },
  ],
};
