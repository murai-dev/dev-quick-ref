export default {
  title: 'npm node-gyp build failed — how to fix',
  description: 'Fix npm node-gyp build failures by identifying the first failing tool, installing Python and the platform compiler, and matching node-gyp with the Node.js version.',
  quickAnswer: `# Identify the tool that failed before changing dependencies
node --version
npm --version
python3 --version
make --version
c++ --version

# macOS
xcode-select --install

# Ubuntu/Debian
sudo apt install -y python3 make g++

# Windows: install Python and Visual Studio
# with the "Desktop development with C++" workload`,
  when: {
    error: `gyp ERR! build error
gyp ERR! stack Error: \`make\` failed with exit code: 2
gyp ERR! System    Darwin 23.0.0
gyp ERR! command   "node" "/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "build" "--fallback-to-build"`,
    post: 'node-gyp compiles native Node.js addons. A failure can occur while locating Python, generating build files, compiling C/C++ code, or downloading headers. The final <code>npm ERR! code 1</code> is only the result; the first <code>gyp ERR!</code> message identifies the repair.',
  },
  sections: [
    {
      label: 'Diagnosis',
      title: 'Find the first failing tool',
      paragraphs: [
        'Read upward from the final npm error. Messages about <code>find Python</code> indicate a Python discovery problem, <code>find VS</code> indicates a Windows Visual Studio toolchain problem, and a compiler error indicates a failure in the native source itself or the installed SDK.',
        'Run the checks for the current platform before reinstalling the package. A native dependency can fall back to compilation when no compatible pre-built binary exists, so the same package may work on one machine and fail on another.',
      ],
      code: `node --version
npm --version
python3 --version
make --version
cc --version

# Windows PowerShell
py --version
where.exe cl`,
    },
    {
      label: 'Platform setup',
      title: 'Install the compiler toolchain for your platform',
      paragraphs: [
        'On macOS, install Xcode Command Line Tools. On Unix-like systems, install a supported Python version, <code>make</code>, and a C/C++ compiler such as GCC or Clang.',
        'On Windows, install Python and Visual Studio or Build Tools with the <code>Desktop development with C++</code> workload. The old <code>windows-build-tools</code> npm package is not the current node-gyp setup path.',
      ],
      code: `# macOS
xcode-select --install

# Ubuntu/Debian
sudo apt update
sudo apt install -y python3 make g++

# Windows PowerShell: list installed Python interpreters
py --list-paths`,
    },
    {
      label: 'Compatibility',
      title: 'Match Python, node-gyp, and Node.js versions',
      paragraphs: [
        'Python 3.12 and newer requires node-gyp 10 or newer. If the package brings an older node-gyp through npm, upgrade the package or use a supported Python version instead of changing Python blindly.',
        'Check the native package and its node-gyp dependency before choosing a Node.js version. Native addons may need a release that supports the ABI of the installed Node.js version.',
      ],
      code: `npm ls node-gyp
npm ls <native-package-name>
node --version

# Show the package version that npm resolved
npm explain <native-package-name>`,
    },
    {
      label: 'Retry',
      title: 'Reinstall only after the toolchain is ready',
      paragraphs: [
        'Once Python, the compiler, and the Node.js version are compatible, reinstall the dependencies. Keep <code>package-lock.json</code> when the project has one so that the retry uses the same dependency graph.',
      ],
      code: `rm -rf node_modules

# Use the lockfile when it is committed
npm ci

# Otherwise resolve dependencies again
npm install`,
    },
  ],
  details: [
    {
      title: 'Tell node-gyp which Python to use',
      explanation: 'When several Python versions are installed, pass the executable explicitly to node-gyp. The npm_config_python environment variable is documented for npm-invoked builds, but direct --python is the least ambiguous option and avoids npm version-specific configuration behavior.',
      code: `# Direct node-gyp invocation
node-gyp configure --python /path/to/python
node-gyp build

# npm invokes node-gyp
export npm_config_python=/path/to/python
npm install

# PowerShell
$Env:npm_config_python="C:\\Path\\python.exe"
npm install`,
    },
    {
      title: 'A pre-built binary is unavailable',
      explanation: 'Many native packages try a pre-built binary first and compile from source when the binary does not match your operating system, CPU, or Node.js version. Upgrade the package to a release that supports your environment, or choose a compatible Node.js version.',
      code: `npm outdated <native-package-name>
npm view <native-package-name> versions --json`,
    },
    {
      title: 'Use --ignore-scripts only as a diagnostic',
      explanation: 'Skipping lifecycle scripts can confirm that the failure occurs during native compilation, but it leaves the addon unbuilt and may make the application unusable. It is not a production fix.',
      code: `npm install --ignore-scripts

# Re-enable scripts after fixing the toolchain
npm rebuild`,
    },
  ],
  related: [
    { href: '/npm/enoent-no-such-file/', text: 'npm ENOENT — identify the missing path' },
    { href: '/npm/npm-cache-clean/', text: 'npm cache clean' },
    { href: '/npm/module-not-found/', text: 'npm Cannot find module' },
  ],
};
