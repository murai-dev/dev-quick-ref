export default {
  title: 'git rename a branch (local and remote)',
  description: 'Rename a git branch locally with git branch -m, then update the remote by pushing the new name and deleting the old one.',
  quickAnswer: `# Rename the current branch
git branch -m new-name

# Push the new name and set upstream
git push origin -u new-name

# Delete the old remote branch
git push origin --delete old-name`,
  when: {
    label: 'When to use this',
    post: 'You want to rename a branch — for example to follow a new naming convention or fix a typo.',
  },
  details: [
    {
      title: 'Rename a branch you are not currently on',
      code: `git branch -m old-name new-name`,
    },
    {
      title: 'Update other teammates after renaming',
      explanation: 'Others with the old branch checked out need to reset their upstream reference:',
      code: `git fetch origin
git branch -u origin/new-name new-name`,
    },
  ],
  related: [
    { href: '/git/delete-remote-branch/', text: 'git delete a remote branch' },
    { href: '/git/remote-change-url/', text: 'git remote change URL' },
    { href: '/git/push-rejected/', text: 'git push rejected — fix' },
  ],
};
