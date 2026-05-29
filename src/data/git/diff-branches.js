export default {
  title: 'git diff between two branches',
  description: 'Compare two git branches with git diff. See all changed files, or diff a specific file between branches.',
  quickAnswer: `# Show all changes between two branches
git diff main..feature/login

# Show only the changed file names (no diff content)
git diff --name-only main..feature/login`,
  when: {
    label: 'When to use this',
    post: 'You want to review what changed on a feature branch before merging it into main.',
  },
  details: [
    {
      title: 'Diff a specific file between two branches',
      code: `git diff main..feature/login -- src/auth.ts`,
    },
    {
      title: 'Two-dot (..) vs three-dot (...) diff',
      explanation: '<code>main..feature</code> shows changes since the branches diverged. <code>main...feature</code> shows only what changed on feature since the merge base.',
      code: `git diff main..feature     # all diff between the two branch tips
git diff main...feature    # only what feature changed since branching off main`,
    },
    {
      title: 'Show a summary of changed lines per file',
      code: `git diff --stat main..feature/login`,
    },
  ],
  related: [
    { href: '/git/merge-conflict/', text: 'git merge conflict — how to resolve' },
    { href: '/git/show-file-at-commit/', text: 'git show a file at a specific commit' },
    { href: '/git/squash-commits/', text: 'git squash commits before merging' },
  ],
};
