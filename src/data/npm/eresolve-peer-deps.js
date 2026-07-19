export default {
  title: 'npm peer dependency conflict / ERESOLVE — how to fix',
  description: 'Resolve npm ERESOLVE errors by identifying incompatible peer dependency ranges and installing versions that support each other.',
  quickAnswer: `# Show why the conflicting package is installed
npm explain some-library

# Check the peer dependency range required by that package
npm info some-library@latest peerDependencies

# Upgrade or select compatible versions, then install again
npm install some-library@latest
npm install`,
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
    post: 'A dependency requires a specific peer dependency version that conflicts with another installed version. This is the typical npm peer dependency conflict.',
  },
  details: [
    {
      title: 'Find the incompatible version requirement',
      explanation: 'Read both the package version npm found and the peer dependency range it could not satisfy. Then choose package versions whose ranges overlap.',
      code: `npm explain some-library
npm info some-library versions --json
npm info some-library@3.0.0 peerDependencies`,
    },
    {
      title: 'Install compatible package versions',
      code: `# Check if a newer version supports your peer dep version
npm info some-library peerDependencies

# Install a version with a compatible peer dependency range
npm install some-library@3.0.0`,
    },
    {
      title: 'Bypass the check only as a temporary fallback',
      explanation: 'These flags do not make incompatible packages compatible. Run the project tests before keeping an installation created with either option.',
      code: `# --legacy-peer-deps: ignores peer dep conflicts (npm 6 behavior)
# --force: allows npm to install despite conflicting protections
npm install --legacy-peer-deps
npm install --force`,
    },
  ],
  related: [
    { href: '/npm/missing-peer-dependency/', text: 'npm peer dependency warnings' },
    { href: '/npm/missing-script/', text: 'npm ERR! missing script' },
    { href: '/npm/npm-cache-clean/', text: 'npm cache clean' },
    { href: '/npm/lock-file-conflict/', text: 'package-lock.json conflict' },
  ],
};
