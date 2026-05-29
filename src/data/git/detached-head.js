export default {
  title: 'git detached HEAD — what it means and how to fix',
  description: 'Fix a git detached HEAD state by creating a new branch to save your work, or switch back to an existing branch. Recover commits made while detached.',
  quickAnswer: `# Save your work to a new branch (recommended)
git checkout -b my-fix

# Or discard nothing and go back to main
git checkout main`,
  when: {
    error: `HEAD detached at abc1234`,
    post: 'You checked out a specific commit, tag, or remote branch directly. Any commits made now will not belong to a branch and can be lost.',
  },
  details: [
    {
      title: 'Recover commits already made while detached',
      explanation: 'Find the commit hash with <code>git log --oneline</code>, then attach it to a new branch.',
      code: `git log --oneline -5         # note the hash of your last commit
git checkout -b recovery-branch abc1234`,
    },
    {
      title: 'How to safely inspect a past commit',
      explanation: 'Use a worktree to check out an old commit without detaching HEAD in your main working directory.',
      code: `git worktree add ../inspect abc1234
cd ../inspect
# ... look around ...
git worktree remove ../inspect`,
    },
  ],
  related: [
    { href: '/git/recover-deleted-branch/', text: 'git recover a deleted branch' },
    { href: '/git/undo-last-commit/', text: 'git undo last commit' },
    { href: '/git/worktree/', text: 'git worktree — work on multiple branches at once' },
  ],
};
