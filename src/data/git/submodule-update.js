export default {
  title: 'git submodule update — initialize and update all submodules',
  description: 'Initialize and update all git submodules recursively with git submodule update --init --recursive. Fix missing submodule directories after cloning.',
  quickAnswer: `# Initialize and update all submodules (run after git clone)
git submodule update --init --recursive`,
  when: {
    label: 'When to use this',
    post: 'You cloned a repository that uses submodules and the submodule directories are empty, or a teammate added a new submodule and your local copy is out of date.',
  },
  details: [
    {
      title: 'Clone a repo and initialize submodules in one command',
      code: `git clone --recurse-submodules https://github.com/user/repo.git`,
    },
    {
      title: 'Pull latest changes in all submodules',
      code: `git submodule update --remote --recursive`,
    },
    {
      title: 'Show submodule status',
      code: `git submodule status`,
    },
  ],
  related: [
    { href: '/git/shallow-to-full-clone/', text: 'git shallow clone to full history' },
    { href: '/git/clone-specific-branch/', text: 'git clone a specific branch' },
    { href: '/git/remote-change-url/', text: 'git remote change URL' },
  ],
};
