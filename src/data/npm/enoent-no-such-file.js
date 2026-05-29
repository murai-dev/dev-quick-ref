export default {
  title: 'npm ENOENT no such file or directory — how to fix',
  description: 'Fix npm "ENOENT: no such file or directory" errors during install, run, or build by checking paths, node_modules, and package.json.',
  quickAnswer: `# Most common fix — reinstall node_modules
rm -rf node_modules package-lock.json
npm install

# Or clear npm cache and reinstall
npm cache clean --force
npm install`,
  when: {
    error: `npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /home/user/project/package.json
npm ERR! errno -2
npm ERR! enoent ENOENT: no such file or directory, open 'package.json'`,
    post: 'npm cannot find a required file. Most commonly <code>package.json</code> is missing (you are in the wrong directory) or <code>node_modules</code> is corrupted.',
  },
  details: [
    {
      title: 'Wrong working directory',
      code: `# Make sure you are in the project root
ls package.json   # should exist
cd my-project
npm install`,
    },
    {
      title: 'Missing package.json — initialize a new project',
      code: `npm init -y   # create package.json with defaults`,
    },
    {
      title: 'Path issues with npm scripts',
      explanation: 'If a script references a file that does not exist, you get ENOENT when running it.',
      code: `# package.json scripts
"scripts": {
  "build": "node scripts/build.js"   # ← scripts/build.js must exist
}`,
    },
  ],
  related: [
    { href: '/npm/module-not-found/', text: 'npm Cannot find module' },
    { href: '/npm/eresolve-peer-deps/', text: 'npm ERESOLVE — dependency conflict' },
    { href: '/npm/npm-cache-clean/', text: 'npm cache clean and verify' },
  ],
};
