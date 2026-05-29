export default {
  title: 'git worktree — work on multiple branches simultaneously',
  description: 'Use git worktree to check out multiple branches at once in separate directories. No stashing or switching required.',
  quickAnswer: `# Create a new worktree for a branch
git worktree add ../hotfix-1.x hotfix/1.x

# Now you have two working directories:
#   ./           → your current branch
#   ../hotfix-1.x → hotfix/1.x branch`,
  when: {
    label: 'When to use this',
    post: 'You need to switch to a hotfix branch urgently but do not want to stash or commit unfinished work on your current branch.',
  },
  details: [
    {
      title: 'Create a worktree for a new branch',
      code: `git worktree add -b hotfix/login-null ../hotfix-login main`,
    },
    {
      title: 'List all worktrees',
      code: `git worktree list`,
    },
    {
      title: 'Remove a worktree when done',
      code: `git worktree remove ../hotfix-1.x`,
    },
  ],
  related: [
    { href: '/git/detached-head/', text: 'git detached HEAD — inspect old commits safely' },
    { href: '/git/stash-drop/', text: 'git stash — alternative when switching branches' },
    { href: '/git/clone-specific-branch/', text: 'git clone a specific branch' },
  ],
};
