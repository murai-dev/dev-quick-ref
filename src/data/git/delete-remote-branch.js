export default {
  title: 'git delete remote branch — push delete',
  description: 'Delete a remote branch in git using git push origin --delete branch-name. Also covers deleting local branches and pruning stale remote refs.',
  quickAnswer: `# Delete the remote branch
git push origin --delete feature/my-branch

# Delete the local branch (if you also want that gone)
git branch -d feature/my-branch`,
  when: {
    label: 'When to use this',
    post: 'A feature branch has been merged and you want to clean it up on the remote (GitHub / GitLab / Bitbucket).',
  },
  details: [
    {
      title: 'Force-delete a local branch that is not fully merged',
      code: `git branch -D feature/my-branch    # uppercase D skips the merge check`,
    },
    {
      title: 'Prune remote tracking refs for deleted branches',
      explanation: 'After others delete branches on the remote, your local repo still shows stale <code>origin/branch</code> entries. Prune them:',
      code: `git fetch --prune
# or configure git to prune automatically:
git config --global fetch.prune true`,
    },
    {
      title: 'List all remote branches',
      code: `git branch -r`,
    },
  ],
  related: [
    { href: '/git/rename-branch/', text: 'git rename a branch (local and remote)' },
    { href: '/git/remote-change-url/', text: 'git remote change URL' },
    { href: '/git/push-rejected/', text: 'git push rejected — fix' },
  ],
};
