export default {
  title: 'package-lock.json conflict — how to resolve',
  description: 'Resolve a package-lock.json merge conflict while preserving reviewed dependency versions and the dependency changes from both branches.',
  quickAnswer: `# First resolve and stage package.json, then choose a lockfile base
git checkout --ours package-lock.json

# Update the lockfile to match the merged package.json
npm install --package-lock-only

# Verify that a clean install succeeds
npm ci`,
  when: {
    error: `<<<<<<< HEAD
  "lockfileVersion": 3,
=======
  "lockfileVersion": 2,
>>>>>>> feature-branch
# (inside package-lock.json after git merge/rebase)`,
    post: 'Two branches modified package-lock.json. Resolve package.json first, then update the lockfile from one known side of the conflict. Deleting the lockfile can change unrelated transitive dependency versions.',
  },
  details: [
    {
      title: 'Prevent future conflicts with npm-merge-driver',
      code: `# Install the merge driver
npx npm-merge-driver install --global

# It automatically handles package-lock.json conflicts`,
    },
    {
      title: 'Use either side of the conflict as a known base',
      code: `# Accept your version (HEAD)
git checkout --ours package-lock.json
npm install --package-lock-only

# Accept the incoming version
git checkout --theirs package-lock.json
npm install --package-lock-only`,
    },
    {
      title: 'Add package-lock.json to .gitattributes',
      code: `# .gitattributes — use a custom merge strategy
package-lock.json merge=npm-merge-driver`,
    },
    {
      title: 'Regenerate only when the version changes are intentional',
      explanation: 'Removing the lockfile may select newer transitive dependencies. Review the resulting diff and run the test suite before committing it.',
      code: `rm package-lock.json
npm install --package-lock-only
npm ci`,
    },
  ],
  related: [
    { href: '/npm/eresolve-peer-deps/', text: 'npm ERESOLVE dependency conflict' },
    { href: '/npm/npm-cache-clean/', text: 'npm cache clean' },
    { href: '/git/merge-conflict/', text: 'git merge conflict — how to resolve' },
  ],
};
