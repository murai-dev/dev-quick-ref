export default {
  title: 'git squash commits — combine commits before merging',
  description: 'Squash multiple git commits into one using interactive rebase (git rebase -i). Clean up your commit history before opening a pull request.',
  quickAnswer: `# Squash the last 3 commits into one
git rebase -i HEAD~3

# In the editor: change "pick" to "squash" (or "s") for all but the first commit
# Save and close — git opens another editor for the combined commit message`,
  when: {
    label: 'When to use this',
    post: 'You have several "WIP" or "fix typo" commits on your feature branch and want to clean them up before merging.',
  },
  details: [
    {
      title: 'What the rebase editor looks like',
      code: `pick abc1234 add login page
squash def5678 fix typo
squash ghi9012 remove console.log`,
    },
    {
      title: 'Squash all commits on a feature branch at once',
      explanation: 'Use the merge-base to find where your branch diverged from main:',
      code: `git rebase -i $(git merge-base HEAD main)`,
    },
    {
      title: 'Push after squashing (force push required)',
      code: `git push --force-with-lease origin feature-branch`,
    },
  ],
  related: [
    { href: '/git/rebase-abort/', text: 'git rebase --abort' },
    { href: '/git/amend-commit-message/', text: 'git amend last commit message' },
    { href: '/git/pull-rebase-vs-merge/', text: 'git pull --rebase vs --merge' },
  ],
};
