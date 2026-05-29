export default {
  title: 'git stash drop — remove a specific stash',
  description: 'Drop a specific git stash entry with git stash drop stash@{n}, or clear all stashes at once with git stash clear.',
  quickAnswer: `# List your stashes first
git stash list

# Drop a specific stash by index
git stash drop stash@{0}

# Drop all stashes at once
git stash clear`,
  when: {
    label: 'When to use this',
    post: 'Your stash list has grown and you want to clean up entries you no longer need.',
  },
  details: [
    {
      title: 'Apply a stash and remove it in one step',
      code: `git stash pop              # applies stash@{0} and drops it`,
    },
    {
      title: 'Apply a stash without removing it',
      code: `git stash apply stash@{1}  # keeps the stash in the list`,
    },
    {
      title: 'Show the contents of a stash before dropping',
      code: `git stash show -p stash@{1}   # full diff of what is in stash@{1}`,
    },
  ],
  related: [
    { href: '/git/discard-unstaged-changes/', text: 'git discard all unstaged changes' },
    { href: '/git/undo-last-commit/', text: 'git undo last commit' },
    { href: '/git/merge-conflict/', text: 'git merge conflict — how to resolve' },
  ],
};
