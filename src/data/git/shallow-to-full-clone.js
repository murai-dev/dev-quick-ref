export default {
  title: 'git convert shallow clone to full history',
  description: 'Convert a shallow git clone (--depth 1) to a full clone with complete history using git fetch --unshallow.',
  quickAnswer: `git fetch --unshallow`,
  when: {
    error: `fatal: --shallow-since is only allowed for fetch
# or
warning: Could not find remote branch ...`,
    post: 'Your repository was cloned with <code>--depth 1</code> (common in CI/CD), so git commands that need full history — like <code>git log</code>, <code>git blame</code>, or <code>git bisect</code> — do not work correctly.',
  },
  details: [
    {
      title: 'Check if your clone is shallow',
      code: `git rev-parse --is-shallow-repository    # prints "true" if shallow`,
    },
    {
      title: 'Fetch only a limited depth (not full history)',
      explanation: 'If you do not need the complete history but need more than 1 commit:',
      code: `git fetch --depth=100`,
    },
    {
      title: 'Unshallow a specific remote',
      code: `git fetch --unshallow origin`,
    },
  ],
  related: [
    { href: '/git/clone-specific-branch/', text: 'git clone a specific branch' },
    { href: '/git/bisect/', text: 'git bisect — needs full history' },
    { href: '/git/submodule-update/', text: 'git submodule update' },
  ],
};
