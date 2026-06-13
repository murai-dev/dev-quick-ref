export default {
  title: 'git revert merge commit — how to undo a merge safely',
  description: 'Undo a merge commit without rewriting history using git revert -m 1 <merge-commit>. Includes how to find the merge hash and choose the correct parent.',
  quickAnswer: `# 1. Find the merge commit hash
git log --oneline --graph

# 2. Revert the merge commit
git revert -m 1 <merge-commit-hash>

# 3. Push the new revert commit
git push origin main`,
  when: {
    pre: 'You already merged a branch and pushed it, but now need to undo that merge without rewriting shared history.',
    error: `error: commit abc1234 is a merge but no -m option was given.
fatal: revert failed`,
    post: 'Merge commits have more than one parent, so git revert needs the <code>-m</code> option to know which parent should be kept as the mainline.',
  },
  detailsLabel: 'Details',
  details: [
    {
      title: 'What `-m 1` means',
      explanation: '<code>-m 1</code> tells Git to keep parent 1, which is usually the branch you were on when you ran <code>git merge</code>. The merged-in branch changes are undone.',
      code: `# Most common case
git revert -m 1 <merge-commit-hash>`,
    },
    {
      title: 'Inspect the parents before reverting',
      code: `git show --summary <merge-commit-hash>

# Or list parents directly
git rev-list --parents -n 1 <merge-commit-hash>`,
    },
    {
      title: 'If conflicts happen during the revert',
      code: `# Resolve conflicts in the files
git status
git add .
git revert --continue

# Or abandon the revert
git revert --abort`,
    },
    {
      title: 'Do not use reset on shared branches',
      explanation: 'If the merge commit is already pushed to a shared branch, prefer <code>git revert</code> over <code>git reset</code>. Reset rewrites history and usually requires a force-push.',
      code: `# Safer on shared branches
git revert -m 1 <merge-commit-hash>

# Risky on shared branches
git reset --hard <commit-before-merge>`,
    },
  ],
  related: [
    { href: '/git/undo-last-commit/', text: 'git undo last commit' },
    { href: '/git/merge-conflict/', text: 'git merge conflict — how to resolve' },
    { href: '/git/reset-soft-mixed-hard/', text: 'git reset --soft vs --mixed vs --hard' },
    { href: '/git/rebase-abort/', text: 'git rebase --abort' },
  ],
};