export default {
  title: 'git cherry-pick — apply a commit from another branch',
  description: 'Use git cherry-pick to copy a specific commit from one branch to another without merging the whole branch.',
  quickAnswer: `# Find the commit hash
git log --oneline feature-branch

# Apply that commit to the current branch
git cherry-pick abc1234`,
  when: {
    label: 'When to use this',
    post: 'You want to bring a single bug fix or feature commit from another branch without merging everything else on that branch.',
  },
  details: [
    {
      title: 'Cherry-pick a range of commits',
      code: `git cherry-pick abc1234..def5678   # applies commits from abc (exclusive) to def (inclusive)`,
    },
    {
      title: 'Cherry-pick without committing immediately',
      explanation: 'Use <code>-n</code> (no-commit) to stage the changes without creating a commit, so you can edit before committing.',
      code: `git cherry-pick -n abc1234
git status          # review staged changes
git commit -m "Applied fix from feature branch"`,
    },
    {
      title: 'Resolve conflicts during cherry-pick',
      code: `# Edit conflicted files, then:
git add .
git cherry-pick --continue

# Or abort entirely:
git cherry-pick --abort`,
    },
  ],
  related: [
    { href: '/git/merge-conflict/', text: 'git merge conflict — how to resolve' },
    { href: '/git/squash-commits/', text: 'git squash commits before merging' },
    { href: '/git/rebase-abort/', text: 'git rebase --abort' },
  ],
};
