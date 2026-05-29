export default {
  title: 'npm ERESOLVE unable to resolve dependency tree — how to fix',
  description: 'Fix "npm ERR! ERESOLVE unable to resolve dependency tree" by using --legacy-peer-deps, overrides, or resolving the conflicting version manually.',
  quickAnswer: `# Quick fix — use legacy peer deps resolution
npm install --legacy-peer-deps

# Or force install (riskier — may have broken packages)
npm install --force

# Inspect what is conflicting
npm install 2>&1 | head -30`,
  when: {
    error: `npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! 
npm ERR! While resolving: my-app@1.0.0
npm ERR! Found: react@18.3.0
npm ERR! node_modules/react
npm ERR!   react@"^18.3.0" from the root project
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^17.0.0" from some-library@2.1.0`,
    post: 'A dependency requires a specific peer dependency version that conflicts with another installed version.',
  },
  details: [
    {
      title: 'Use overrides to force a version (npm 8.3+)',
      code: `// package.json
{
  "overrides": {
    "some-library": {
      "react": "^18.0.0"
    }
  }
}`,
    },
    {
      title: 'Upgrade the conflicting package first',
      code: `# Check if a newer version supports your peer dep version
npm info some-library peerDependencies

# Install specific version
npm install some-library@3.0.0`,
    },
    {
      title: 'Difference between --legacy-peer-deps and --force',
      code: `# --legacy-peer-deps: ignores peer dep conflicts (npm 6 behavior)
# --force: installs even with version mismatches (can break things)
# Prefer --legacy-peer-deps as it is less destructive`,
    },
  ],
  related: [
    { href: '/npm/missing-peer-dependency/', text: 'npm peer dependency warnings' },
    { href: '/npm/npm-cache-clean/', text: 'npm cache clean' },
    { href: '/npm/lock-file-conflict/', text: 'package-lock.json conflict' },
  ],
};
