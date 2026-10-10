export default {
  title: 'npm ENOENT no such file or directory — how to fix',
  description: 'Fix npm "ENOENT: no such file or directory" by checking the missing path, project root, package.json, scripts, and dependencies in the right order.',
  quickAnswer: `# 1. Confirm that npm is running in the project root
pwd
ls -la package.json

# 2. Restore dependencies without deleting the lockfile
npm install

# In CI or when package-lock.json is committed:
npm ci`,
  when: {
    error: `npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /home/user/project/package.json
npm ERR! errno -2
npm ERR! enoent ENOENT: no such file or directory, open 'package.json'`,
    post: 'ENOENT is the operating system error for a missing path. The value after <code>npm ERR! path</code> identifies what npm could not open, so inspect that path before deleting dependencies or clearing the cache.',
  },
  sections: [
    {
      label: 'Diagnosis',
      title: 'Read the missing path before changing the install',
      paragraphs: [
        'The same ENOENT code can mean different things. npm may be looking for <code>package.json</code> in the wrong directory, a script may reference a file that is not checked out, or a dependency install may be incomplete.',
        'Start with the path printed in the error and compare it with the current directory. <code>npm prefix</code> also shows the nearest directory npm treats as the project root.',
      ],
      code: `pwd
npm prefix
ls -la
test -f package.json && echo "package.json exists" || echo "package.json is missing"`,
    },
    {
      label: 'Repair',
      title: 'Restore only the missing project input',
      paragraphs: [
        'If the path points to <code>package.json</code>, move to the directory that contains the existing project file. If this is a new project, initialize it with <code>npm init</code>. If it is an existing project, restore the file from version control instead of creating a replacement.',
        'If the path is inside <code>node_modules</code>, install from the project manifest. Keep <code>package-lock.json</code> when it represents the dependency versions that the project expects.',
      ],
      code: `# Existing project
cd /path/to/project
npm install

# Reproducible install when package-lock.json is present
npm ci

# New project only
npm init -y`,
    },
  ],
  details: [
    {
      title: 'Wrong working directory',
      explanation: 'npm resolves a local package.json from the current project context. A shell opened one directory above the repository can therefore produce ENOENT even though the file exists.',
      code: `# Make sure you are in the project root
cd /path/to/my-project
ls -la package.json
npm install`,
    },
    {
      title: 'Missing package.json in an existing project',
      explanation: 'Do not run npm init automatically in an existing repository. Check the repository status and restore the file if it was deleted or the command ran from the wrong checkout.',
      code: `git status --short
git restore package.json

# If the file belongs to another commit, inspect history first:
git log -- package.json`,
    },
    {
      title: 'Path issues with npm scripts',
      explanation: 'If a script references a file that does not exist, you get ENOENT when running it.',
      code: `# package.json scripts
"scripts": {
  "build": "node scripts/build.js"
}`,
    },
    {
      title: 'Missing files under node_modules',
      explanation: 'When the missing path is inside node_modules, reinstall from the manifest first. Delete the dependency directory only when the install itself is known to be inconsistent, and never delete the lockfile as a routine ENOENT fix.',
      code: `# Keep package-lock.json and reinstall
rm -rf node_modules
npm ci

# Check the cache before considering a cache repair
npm cache verify`,
    },
  ],
  related: [
    { href: '/npm/npm-basics/', text: 'npm basics — package.json, lockfiles, and installs' },
    { href: '/npm/module-not-found/', text: 'npm Cannot find module' },
    { href: '/npm/eresolve-peer-deps/', text: 'npm ERESOLVE — dependency conflict' },
    { href: '/npm/npm-cache-clean/', text: 'npm cache clean and verify' },
  ],
};
