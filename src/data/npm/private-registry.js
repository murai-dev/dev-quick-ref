export default {
  title: 'npm private registry — configure .npmrc for authentication',
  description: 'Configure npm to use a private registry (Verdaccio, GitHub Packages, Artifactory, etc.) using .npmrc. Covers authentication and per-scope configuration.',
  quickAnswer: `# .npmrc in project root
registry=https://registry.npmjs.org/

# Scope-specific registry
@myorg:registry=https://npm.pkg.github.com/

# Auth token for private registry
//npm.pkg.github.com/:_authToken=\${NPM_TOKEN}`,
  when: {
    label: 'Usage',
    pre: 'Your project uses packages from a private registry or GitHub Packages.',
  },
  details: [
    {
      title: 'GitHub Packages setup',
      code: `# .npmrc
@myorg:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}

# Authenticate via npm login
npm login --registry=https://npm.pkg.github.com/ --scope=@myorg`,
    },
    {
      title: 'Set registry temporarily',
      code: `# One-time install from a specific registry
npm install @myorg/lib --registry=https://npm.pkg.github.com/

# Set globally
npm config set registry https://registry.npmjs.org/`,
    },
    {
      title: 'Store token securely',
      code: `# WRONG — do not commit the token
//npm.pkg.github.com/:_authToken=ghp_actualtoken123

# CORRECT — use environment variable
//npm.pkg.github.com/:_authToken=\${NPM_TOKEN}

# Set NPM_TOKEN in CI environment variables or .env (not committed)`,
    },
  ],
  related: [
    { href: '/npm/scoped-packages/', text: '@scope/package — install scoped packages' },
    { href: '/npm/missing-peer-dependency/', text: 'npm peer dependency warnings' },
  ],
};
