export default {
  title: 'eslint version conflict with TypeScript — how to fix',
  description: 'Fix ESLint and typescript-eslint version conflicts, including peer dependency issues between eslint@8/9 and @typescript-eslint packages.',
  quickAnswer: `# ESLint 9 (flat config) — use latest @typescript-eslint
npm install --save-dev eslint@^9 @typescript-eslint/parser@^8 @typescript-eslint/eslint-plugin@^8

# ESLint 8 (legacy config) — use v6
npm install --save-dev eslint@^8 @typescript-eslint/parser@^6 @typescript-eslint/eslint-plugin@^6`,
  when: {
    error: `npm ERR! peer eslint@"^8.56.0" from @typescript-eslint/eslint-plugin@6.21.0
npm ERR! node_modules/@typescript-eslint/eslint-plugin
npm ERR!   Conflicting peer dependency: eslint@8.57.1`,
    post: 'ESLint and @typescript-eslint must be at compatible major versions.',
  },
  details: [
    {
      title: 'Check current installed versions',
      code: `npm ls eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`,
    },
    {
      title: 'ESLint 9 flat config — eslint.config.js',
      code: `// eslint.config.js (ESLint 9)
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...tseslint.configs.recommended
);`,
    },
    {
      title: 'ESLint 8 legacy config — .eslintrc.json',
      code: `// .eslintrc.json (ESLint 8)
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": ["plugin:@typescript-eslint/recommended"]
}`,
    },
  ],
  related: [
    { href: '/npm/eresolve-peer-deps/', text: 'npm ERESOLVE dependency conflict' },
    { href: '/npm/missing-peer-dependency/', text: 'npm peer dependency warnings' },
    { href: '/npm/outdated-packages/', text: 'npm outdated — check for updates' },
  ],
};
