export default {
  title: 'git show a file at a specific commit',
  description: 'View or restore a file from any past git commit using git show or git checkout. No need to switch branches.',
  quickAnswer: `# Print the file contents at a specific commit
git show abc1234:src/app.ts

# Restore a file from a past commit into your working directory
git checkout abc1234 -- src/app.ts`,
  when: {
    label: 'When to use this',
    post: 'You want to inspect or recover a file as it looked at a past commit — without switching branches.',
  },
  details: [
    {
      title: 'Save the old version to a different filename',
      code: `git show abc1234:src/app.ts > src/app.old.ts`,
    },
    {
      title: 'Show a file from a tag or branch',
      code: `git show v1.2.0:src/app.ts
git show main:src/app.ts`,
    },
    {
      title: 'See all files changed in a commit',
      code: `git show --name-only abc1234`,
    },
  ],
  related: [
    { href: '/git/bisect/', text: 'git bisect — find the commit that broke something' },
    { href: '/git/diff-branches/', text: 'git diff between two branches' },
    { href: '/git/recover-deleted-branch/', text: 'git recover deleted branch' },
  ],
};
