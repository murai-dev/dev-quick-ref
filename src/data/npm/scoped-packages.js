export default {
  title: '@scope/package-name — install and use scoped npm packages',
  description: 'Install and configure scoped npm packages (@scope/package-name). Covers public scoped packages, private scopes, and registry configuration.',
  quickAnswer: `# Install a scoped package
npm install @scope/package-name

# Examples
npm install @types/node
npm install @vitejs/plugin-react
npm install @company/internal-lib`,
  when: {
    label: 'Usage',
    pre: 'Scoped packages group related packages under an organization or user namespace.',
  },
  details: [
    {
      title: 'Publishing a scoped package',
      code: `# Publish publicly (scoped packages are private by default!)
npm publish --access public

# Publish privately (requires paid npm account or private registry)
npm publish`,
    },
    {
      title: 'Configure a scope to use a private registry',
      code: `# .npmrc — map @myorg scope to a private registry
@myorg:registry=https://npm.mycompany.com/

# Then install as normal
npm install @myorg/internal-lib`,
    },
    {
      title: 'Import in code',
      code: `// Both CommonJS and ESM work the same
import { helper } from '@scope/package-name';
const { helper } = require('@scope/package-name');`,
    },
  ],
  related: [
    { href: '/npm/private-registry/', text: 'npm private registry — .npmrc configuration' },
    { href: '/npm/link-local-package/', text: 'npm link — local package development' },
  ],
};
