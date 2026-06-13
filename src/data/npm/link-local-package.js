export default {
  title: 'npm link — use a local package without publishing',
  description: 'Use npm link to develop and test a local package in another project without publishing to the registry or package index.',
  quickAnswer: `# 1. In the package you are developing:
cd /path/to/my-library
npm link

# 2. In the project that uses it:
cd /path/to/my-app
npm link my-library

# Now changes in my-library are immediately reflected in my-app`,
  when: {
    label: 'Usage',
    pre: 'You are developing a library and want to test it in a real project with npm link, without publishing to npm.',
  },
  details: [
    {
      title: 'How npm link works',
      explanation: '<code>npm link</code> creates a symlink from the global node_modules to your local package. <code>npm link my-library</code> then symlinks from the project\'s node_modules to the global one.',
      code: `# Step 1 creates:
~/.nvm/versions/node/v20.x.x/lib/node_modules/my-library -> /path/to/my-library

# Step 2 creates:
/path/to/my-app/node_modules/my-library -> ~/.nvm/.../node_modules/my-library`,
    },
    {
      title: 'Unlink when done',
      code: `# In the consumer project
npm unlink my-library

# Re-install the published version
npm install my-library`,
    },
    {
      title: 'Alternative: file: protocol in package.json',
      code: `// package.json
{
  "dependencies": {
    "my-library": "file:../my-library"
  }
}
npm install`,
    },
  ],
  related: [
    { href: '/npm/run-scripts/', text: 'npm scripts — define and run custom commands' },
    { href: '/npm/scoped-packages/', text: '@scope/package — install scoped packages' },
  ],
};
