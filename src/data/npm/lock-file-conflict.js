export default {
  title: 'package-lock.json conflict — how to resolve',
  description: 'Fix package-lock.json merge conflicts by deleting the lock file and regenerating it, or using npm-merge-driver for automated resolution.',
  quickAnswer: `# Simplest fix — delete and regenerate
rm package-lock.json
npm install

# This regenerates package-lock.json from package.json`,
  when: {
    error: `<<<<<<< HEAD
  "lockfileVersion": 3,
=======
  "lockfileVersion": 2,
>>>>>>> feature-branch
# (inside package-lock.json after git merge/rebase)`,
    post: 'Two branches modified package-lock.json. It is auto-generated, so manual merging is error-prone. Deleting and regenerating is the safest approach.',
  },
  details: [
    {
      title: 'Prevent future conflicts with npm-merge-driver',
      code: `# Install the merge driver
npx npm-merge-driver install --global

# It automatically handles package-lock.json conflicts`,
    },
    {
      title: 'Keep one side of the conflict',
      code: `# Accept your version (HEAD)
git checkout --ours package-lock.json
npm install   # regenerate to ensure consistency

# Accept the incoming version
git checkout --theirs package-lock.json
npm install`,
    },
    {
      title: 'Add package-lock.json to .gitattributes',
      code: `# .gitattributes — use a custom merge strategy
package-lock.json merge=npm-merge-driver`,
    },
  ],
  related: [
    { href: '/npm/eresolve-peer-deps/', text: 'npm ERESOLVE dependency conflict' },
    { href: '/npm/npm-cache-clean/', text: 'npm cache clean' },
    { href: '/git/merge-conflict/', text: 'git merge conflict — how to resolve' },
  ],
};
