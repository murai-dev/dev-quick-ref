export default {
  title: 'git pull --rebase vs --merge — which to use',
  description: 'Understand the difference between git pull --rebase and git pull --merge. Use rebase for a linear history, merge for explicit merge commits.',
  quickAnswer: `# Rebase: linear history, no merge commits (recommended for most teams)
git pull --rebase origin main

# Merge: explicit merge commit showing branches converged (default behavior)
git pull origin main`,
  when: {
    label: 'Quick comparison',
    post: '<code>--rebase</code> rewrites your local commits on top of the remote ones. <code>--merge</code> creates a merge commit. Both end up with the same content.',
  },
  detailsLabel: 'Details',
  details: [
    {
      title: 'Set rebase as the default for all pulls',
      code: `git config --global pull.rebase true`,
    },
    {
      title: 'History shape: rebase vs merge',
      code: `# Rebase result (linear):
A - B - C - D'  (your commit rebased on top)

# Merge result (graph):
A - B - C - M   (M = merge commit)
         \\   /
          D`,
    },
    {
      title: 'When to prefer --merge',
      explanation: 'Use merge when you want the history to explicitly show that two branches were combined — common on long-lived integration branches.',
      code: `git pull --no-rebase origin main    # equivalent to --merge`,
    },
  ],
  related: [
    { href: '/git/rebase-abort/', text: 'git rebase --abort' },
    { href: '/git/merge-conflict/', text: 'git merge conflict — how to resolve' },
    { href: '/git/push-rejected/', text: 'git push rejected — fix' },
  ],
};
