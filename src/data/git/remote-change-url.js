export default {
  title: 'git remote change URL — switch origin or add new remote',
  description: 'Change a git remote URL with git remote set-url. Switch between HTTPS and SSH, or update after a repository was renamed or moved.',
  quickAnswer: `# Check current remote URLs
git remote -v

# Change the origin URL
git remote set-url origin git@github.com:user/repo.git`,
  when: {
    label: 'When to use this',
    post: 'You need to switch from HTTPS to SSH, the repository was renamed, or you moved it to a different host.',
  },
  details: [
    {
      title: 'Switch from SSH to HTTPS',
      code: `git remote set-url origin https://github.com/user/repo.git`,
    },
    {
      title: 'Add a second remote (e.g., both GitHub and GitLab)',
      code: `git remote add gitlab git@gitlab.com:user/repo.git
git push gitlab main`,
    },
    {
      title: 'Remove a remote entirely',
      code: `git remote remove origin`,
    },
  ],
  related: [
    { href: '/git/permission-denied-publickey/', text: 'git permission denied (publickey) — fix' },
    { href: '/git/push-rejected/', text: 'git push rejected — fix' },
    { href: '/git/clone-specific-branch/', text: 'git clone a specific branch' },
  ],
};
