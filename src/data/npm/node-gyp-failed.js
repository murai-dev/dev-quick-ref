export default {
  title: 'npm node-gyp build failed — how to fix',
  description: 'Fix "node-gyp build failed" by installing Python, build tools (make, gcc), and the correct Node.js headers. Covers macOS, Linux, and Windows.',
  quickAnswer: `# macOS — install Xcode Command Line Tools
xcode-select --install

# Ubuntu/Debian — install build tools
sudo apt install -y build-essential python3

# Windows — install Windows Build Tools
npm install -g windows-build-tools
# or in PowerShell (admin):
npm install --global --production windows-build-tools`,
  when: {
    error: `gyp ERR! build error
gyp ERR! stack Error: \`make\` failed with exit code: 2
gyp ERR! System    Darwin 23.0.0
gyp ERR! command   "node" "/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "build" "--fallback-to-build"`,
    post: 'node-gyp compiles native Node.js addons. It requires Python (2.7 or 3.x), <code>make</code>, and a C++ compiler.',
  },
  details: [
    {
      title: 'Specify Python version',
      code: `npm install --python=/usr/bin/python3

# Or set globally
npm config set python python3`,
    },
    {
      title: 'Use a pre-built binary if available',
      explanation: 'Some packages offer pre-built binaries via <code>node-pre-gyp</code> that skip compilation.',
      code: `npm install --ignore-scripts   # skip build step (may break native addons)

# Or try the @next or community fork that dropped native deps
# e.g. bcryptjs instead of bcrypt (pure JS)`,
    },
    {
      title: 'Verify environment',
      code: `node -e "require('node-gyp').find()" 2>&1 || true
python3 --version
which make
which gcc`,
    },
  ],
  related: [
    { href: '/npm/enoent-no-such-file/', text: 'npm ENOENT error' },
    { href: '/npm/npm-cache-clean/', text: 'npm cache clean' },
    { href: '/npm/module-not-found/', text: 'npm Cannot find module' },
  ],
};
