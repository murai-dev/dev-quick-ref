export default {
  title: 'git recover deleted branch — using reflog',
  description: 'Recover a deleted git branch by finding its last commit in git reflog and recreating the branch with git checkout -b.',
  quickAnswer: `# Find the commit the deleted branch was pointing to
git reflog

# Recreate the branch at that commit
git checkout -b recovered-branch abc1234`,
  when: {
    label: 'When to use this',
    post: 'You accidentally deleted a branch with <code>git branch -D</code> and want to get it back.',
  },
  details: [
    {
      title: 'Reading the reflog output',
      explanation: 'Look for a line like <code>abc1234 HEAD@{3}: checkout: moving from recovered-branch to main</code> — the hash before the checkout is your branch tip.',
      code: `git reflog --oneline | head -20`,
    },
    {
      title: 'Recover a branch deleted on the remote',
      explanation: 'If the branch was deleted on GitHub/GitLab but still exists locally:',
      code: `git push origin recovered-branch`,
    },
    {
      title: 'Reflog only keeps entries for ~90 days',
      explanation: 'If the branch was deleted a long time ago, the commit may have been garbage-collected. Act quickly.',
      code: `git gc --prune=now   # do NOT run this if you are trying to recover`,
    },
  ],
  related: [
    { href: '/git/detached-head/', text: 'git detached HEAD — how to fix' },
    { href: '/git/undo-last-commit/', text: 'git undo last commit' },
    { href: '/git/reset-soft-mixed-hard/', text: 'git reset --hard — how to undo' },
  ],
};
