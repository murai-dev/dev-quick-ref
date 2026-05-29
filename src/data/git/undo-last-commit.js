export default {
  title: 'git undo last commit — keep or discard changes',
  description: 'Undo the last git commit without losing your work using git reset --soft HEAD~1. Covers all three modes: soft, mixed, and hard reset.',
  quickAnswer: `# Keep changes staged (safest — just undoes the commit)
git reset --soft HEAD~1

# Keep changes but unstage them  (default behavior)
git reset HEAD~1

# Discard all changes entirely  (destructive — cannot undo)
git reset --hard HEAD~1`,
  when: {
    label: 'When to use this',
    post: 'You just ran <code>git commit</code> and want to undo it — to fix the message, add a forgotten file, or split it into smaller commits.',
  },
  detailsLabel: 'More options',
  details: [
    {
      title: 'Undo multiple commits at once',
      code: `git reset --soft HEAD~3     # undo last 3 commits, keep changes staged
git reset HEAD~3            # undo last 3, keep changes unstaged`,
    },
    {
      title: 'Undo a commit that was already pushed',
      explanation: 'Use <code>git revert</code> instead of <code>git reset</code> — it adds a new "undo" commit without rewriting history.',
      code: `git revert HEAD             # creates a new revert commit
git push origin main`,
    },
  ],
  related: [
    { href: '/git/amend-commit-message/', text: 'git amend last commit message' },
    { href: '/git/reset-soft-mixed-hard/', text: 'git reset --soft vs --mixed vs --hard' },
    { href: '/git/discard-unstaged-changes/', text: 'git discard all unstaged changes' },
  ],
};
