export default {
  title: 'npm audit fix — resolve security vulnerabilities',
  description: 'Find and fix npm security vulnerabilities with npm audit and npm audit fix. Covers breaking changes, manual fixes, and audit levels.',
  quickAnswer: `# Show all vulnerabilities
npm audit

# Apply updates that stay within declared dependency ranges
npm audit fix`,
  when: {
    label: 'Usage',
    pre: 'npm audit reports known security vulnerabilities in your dependencies.',
  },
  details: [
    {
      title: 'Review breaking updates before using --force',
      explanation: '<code>npm audit fix --force</code> may install dependencies outside the ranges declared in package.json, including major-version upgrades. Review the proposed changes and run the test suite.',
      code: `# Preview the changes first
npm audit fix --force --dry-run

# Apply only after reviewing the proposed dependency changes
npm audit fix --force`,
    },
    {
      title: 'Audit output explained',
      code: `npm audit
# Severity levels: critical, high, moderate, low, info
#
# ┌─────────────────────────────────────────────────────────────┐
# │                       === npm audit ===                     │
# │  found 3 vulnerabilities (1 moderate, 2 high)              │
# └─────────────────────────────────────────────────────────────┘`,
    },
    {
      title: 'Audit only prod dependencies',
      code: `npm audit --omit=dev`,
    },
    {
      title: 'Manually fix a specific vulnerable package',
      code: `# Upgrade a specific package
npm install lodash@latest

# Or pin to a patched version
npm install lodash@4.17.21`,
    },
    {
      title: 'Get JSON output for CI',
      code: `npm audit --json | jq '.metadata.vulnerabilities'
# {info: 0, low: 0, moderate: 1, high: 2, critical: 0, total: 3}

# Fail CI on high+ severity
npm audit --audit-level=high`,
    },
  ],
  related: [
    { href: '/npm/outdated-packages/', text: 'npm outdated — check for updates' },
    { href: '/npm/eresolve-peer-deps/', text: 'npm ERESOLVE dependency conflict' },
  ],
};
