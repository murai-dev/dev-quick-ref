export default {
  title: 'git clone a specific branch',
  description: 'Clone a specific branch from a git repository using git clone -b branch-name. Avoids downloading all branches.',
  quickAnswer: `git clone -b feature/login https://github.com/user/repo.git`,
  when: {
    label: 'When to use this',
    post: 'You only need one branch of a large repository, or you want to clone a non-default branch directly.',
  },
  details: [
    {
      title: 'Clone with only the latest commit (shallow + single branch)',
      explanation: 'Fastest option for CI/CD — downloads only the tip of one branch.',
      code: `git clone --depth 1 -b feature/login https://github.com/user/repo.git`,
    },
    {
      title: 'Switch to a different branch after cloning',
      code: `git fetch origin other-branch
git checkout other-branch`,
    },
    {
      title: 'Clone a specific tag',
      code: `git clone -b v2.1.0 https://github.com/user/repo.git`,
    },
  ],
  related: [
    { href: '/git/shallow-to-full-clone/', text: 'git convert shallow clone to full history' },
    { href: '/git/remote-change-url/', text: 'git remote change URL' },
    { href: '/git/permission-denied-publickey/', text: 'git permission denied (publickey) — fix' },
  ],
};
