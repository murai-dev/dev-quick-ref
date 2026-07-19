export default {
  title: 'npm cache clean and verify — fix corrupted installs',
  description: 'Fix corrupted npm installs by cleaning the npm cache with npm cache clean --force or npm cache verify.',
  quickAnswer: `# Verify cache integrity (safer — reports issues)
npm cache verify

# Clean the cache (clears all cached data)
npm cache clean --force

# Reinstall exactly what package-lock.json specifies
rm -rf node_modules
npm ci`,
  when: {
    label: 'Usage',
    pre: 'A package install fails with a checksum mismatch or corrupted files, even after retrying.',
  },
  details: [
    {
      title: 'Cache location',
      code: `# Find where npm stores cache
npm config get cache
# Usually: ~/.npm (Linux/macOS) or %AppData%/npm-cache (Windows)`,
    },
    {
      title: 'Offline installs using cache',
      code: `# Use cached packages without a network request
npm install --prefer-offline

# Force a fresh download (ignore cache)
npm install --prefer-online`,
    },
    {
      title: 'Check npm and Node.js versions',
      code: `node --version
npm --version

# Update npm
npm install -g npm@latest`,
    },
  ],
  related: [
    { href: '/npm/enoent-no-such-file/', text: 'npm ENOENT no such file' },
    { href: '/npm/eresolve-peer-deps/', text: 'npm ERESOLVE conflict' },
    { href: '/npm/node-gyp-failed/', text: 'node-gyp build failed' },
  ],
};
