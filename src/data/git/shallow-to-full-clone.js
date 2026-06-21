export default {
  title: 'git fetch --unshallow — convert shallow clone to full history',
  metaTitle: 'git fetch --unshallow: convert shallow clone',
  description: 'Use git fetch --unshallow to convert a shallow clone (--depth 1) into a full-history repository. Includes checks for shallow repos and common alternatives.',
  quickAnswer: `# Check whether this repository is shallow
git rev-parse --is-shallow-repository

# Convert a shallow clone to full history
git fetch --unshallow

# If you only need more history, not all history
git fetch --depth=100`,
  when: {
    error: `fatal: --shallow-since is only allowed for fetch
# or
warning: Could not find remote branch ...`,
    post: 'Your repository was cloned with <code>--depth 1</code> (common in CI/CD). Commands that need full history, such as <code>git log</code>, <code>git blame</code>, <code>git bisect</code>, or release comparison scripts, may be incomplete until you unshallow the clone.',
  },
  details: [
    {
      title: 'Check if your clone is shallow',
      explanation: 'Before running git fetch --unshallow, confirm that Git still considers the repository shallow. A full clone prints false and does not need unshallowing.',
      code: `git rev-parse --is-shallow-repository    # prints "true" if shallow`,
    },
    {
      title: 'Convert shallow clone to full history',
      explanation: 'This is the direct fix when you need the complete commit history. It downloads the missing commits from the configured remote.',
      code: `git fetch --unshallow

# If your remote is not named origin, specify it:
git fetch --unshallow origin`,
    },
    {
      title: 'Fetch only more depth, not full history',
      explanation: 'If you only need more commits for a build or comparison, increasing depth is faster than downloading the entire repository history.',
      code: `git fetch --depth=100`,
    },
    {
      title: 'If git fetch --unshallow says the repository is complete',
      explanation: 'The message "fatal: --unshallow on a complete repository does not make sense" means the clone is already full history. Use the shallow check first when writing scripts.',
      code: `if git rev-parse --is-shallow-repository | grep -q true; then
  git fetch --unshallow
else
  echo "Repository already has full history"
fi`,
    },
  ],
  related: [
    { href: '/git/clone-specific-branch/', text: 'git clone a specific branch' },
    { href: '/git/bisect/', text: 'git bisect — needs full history' },
    { href: '/git/submodule-update/', text: 'git submodule update' },
  ],
};
