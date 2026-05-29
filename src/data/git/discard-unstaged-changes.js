export default {
  title: 'git discard all unstaged changes',
  description: 'Discard all unstaged changes in your working directory with git restore . or git checkout -- . Covers discarding a single file and staged changes.',
  quickAnswer: `# Discard all unstaged changes (current directory and below)
git restore .

# Discard changes in a specific file only
git restore src/app.ts`,
  when: {
    label: 'When to use this',
    post: 'You edited files but want to throw away the changes and revert to the last committed state.',
  },
  details: [
    {
      title: 'Old syntax (git < 2.23)',
      code: `git checkout -- .           # same as git restore .
git checkout -- src/app.ts  # specific file`,
    },
    {
      title: 'Discard staged changes (unstage + discard)',
      code: `git restore --staged .      # unstage all
git restore .               # then discard unstaged`,
    },
    {
      title: 'Preview what would be discarded first',
      code: `git diff                    # shows unstaged changes before discarding`,
    },
  ],
  related: [
    { href: '/git/undo-last-commit/', text: 'git undo last commit' },
    { href: '/git/stash-drop/', text: 'git stash — temporarily save changes' },
    { href: '/git/remove-untracked/', text: 'git remove untracked files' },
  ],
};
