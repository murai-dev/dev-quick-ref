export default {
  title: 'git reset --soft vs --mixed vs --hard — the difference',
  description: 'Understand the difference between git reset --soft, --mixed (default), and --hard. Which one keeps your changes and which one discards them.',
  quickAnswer: `# --soft   → undo commit, keep changes STAGED
git reset --soft HEAD~1

# --mixed  → undo commit, keep changes UNSTAGED  (default)
git reset HEAD~1

# --hard   → undo commit, DISCARD all changes  (destructive)
git reset --hard HEAD~1`,
  when: {
    label: 'Quick reference',
    post: 'All three move HEAD backward — they differ only in what happens to your working directory and staging area.',
  },
  detailsLabel: 'Mode comparison',
  details: [
    {
      title: '--soft: safest — keeps everything staged',
      explanation: 'The commit is removed, but all changes from that commit are left in the staging area, ready to recommit.',
      code: `git reset --soft HEAD~1
git status          # changes show as "Changes to be committed"
git commit -m "Better message"`,
    },
    {
      title: '--mixed (default): unstages but keeps files',
      explanation: 'The commit is removed and changes are unstaged, but your actual files are not touched.',
      code: `git reset HEAD~1
git status          # changes show as "Changes not staged for commit"`,
    },
    {
      title: '--hard: discards everything (use with care)',
      explanation: '<strong>Cannot be undone easily.</strong> All changes from the commit and any unstaged edits are permanently deleted.',
      code: `git reset --hard HEAD~1
# If you regret this, try:
git reflog          # find the lost commit hash
git checkout -b recovery abc1234`,
    },
  ],
  related: [
    { href: '/git/undo-last-commit/', text: 'git undo last commit' },
    { href: '/git/discard-unstaged-changes/', text: 'git discard all unstaged changes' },
    { href: '/git/recover-deleted-branch/', text: 'git recover a deleted branch via reflog' },
  ],
};
