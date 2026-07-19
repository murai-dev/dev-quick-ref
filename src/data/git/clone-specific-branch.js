export default {
  title: 'git clone a specific branch',
  description: 'Clone and check out one branch with git clone --branch. Add --single-branch when you do not need the other remote branches.',
  quickAnswer: `git clone --branch feature/login --single-branch https://github.com/user/repo.git`,
  when: {
    label: 'When to use this',
    post: 'You only need one branch of a large repository, or you want to clone a non-default branch directly.',
  },
  details: [
    {
      title: 'Clone with only the latest commit (shallow + single branch)',
      explanation: 'Fastest option for CI/CD — downloads only the tip of one branch.',
      code: `git clone --depth 1 --branch feature/login --single-branch https://github.com/user/repo.git`,
    },
    {
      title: 'Switch to a different branch after cloning',
      code: `git fetch origin other-branch
git checkout other-branch`,
    },
    {
      title: 'Clone a specific tag',
      explanation: 'Checking out a tag leaves the repository in detached HEAD state. Create a branch before committing changes.',
      code: `git clone --branch v2.1.0 --single-branch https://github.com/user/repo.git
cd repo
git switch -c work-from-v2.1.0`,
    },
  ],
  related: [
    { href: '/git/shallow-to-full-clone/', text: 'git convert shallow clone to full history' },
    { href: '/git/remote-change-url/', text: 'git remote change URL' },
    { href: '/git/permission-denied-publickey/', text: 'git permission denied (publickey) — fix' },
  ],
};
