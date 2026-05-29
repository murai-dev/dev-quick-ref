export default {
  title: 'npm engines field — require specific Node.js version',
  description: 'Use the engines field in package.json to declare required Node.js and npm versions. Covers npm engine-strict and .nvmrc.',
  quickAnswer: `// package.json
{
  "engines": {
    "node": ">=20.0.0",
    "npm":  ">=9.0.0"
  }
}

# By default this is advisory. To enforce it:
# .npmrc
engine-strict=true`,
  when: {
    error: `npm warn EBADENGINE Unsupported engine {
  package: 'my-app@1.0.0',
  required: { node: '>=20.0.0' },
  current: { node: 'v18.12.0', npm: '8.19.2' }
}`,
    post: 'The installed Node.js version does not satisfy the engines requirement in package.json.',
  },
  details: [
    {
      title: 'Enforce engines (blocks install on wrong version)',
      code: `# .npmrc
engine-strict=true

# Now npm install will fail if Node.js version is incompatible`,
    },
    {
      title: 'Use .nvmrc to pin the Node.js version',
      code: `# .nvmrc
20.15.0

# Switch to the project version automatically
nvm use        # reads .nvmrc
nvm install    # installs if not present`,
    },
    {
      title: 'Use Volta to manage Node.js per project',
      code: `# Pin Node.js version with Volta (auto-switches)
volta pin node@20
volta pin npm@10

# This adds to package.json:
# "volta": { "node": "20.x.x", "npm": "10.x.x" }`,
    },
  ],
  related: [
    { href: '/npm/run-scripts/', text: 'npm scripts — custom commands' },
    { href: '/npm/eresolve-peer-deps/', text: 'npm ERESOLVE dependency conflict' },
  ],
};
