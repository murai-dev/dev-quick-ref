export default {
  title: 'npm audit fix — resolve security vulnerabilities',
  description: 'Find and fix npm security vulnerabilities with npm audit and npm audit fix. Covers breaking changes, manual fixes, and audit levels.',
  quickAnswer: `# Show all vulnerabilities
npm audit

# Auto-fix compatible updates
npm audit fix

# Fix including breaking (major version) changes
npm audit fix --force`,
  when: {
    label: 'Usage',
    pre: 'npm audit reports known security vulnerabilities in your dependencies.',
  },
  details: [
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
# {criticals: 0, high: 2, moderate: 1, low: 0, total: 3}

# Fail CI on high+ severity
npm audit --audit-level=high`,
    },
  ],
  related: [
    { href: '/npm/outdated-packages/', text: 'npm outdated — check for updates' },
    { href: '/npm/eresolve-peer-deps/', text: 'npm ERESOLVE dependency conflict' },
  ],
};
