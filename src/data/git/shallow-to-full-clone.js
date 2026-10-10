export default {
  title: 'git fetch --unshallow — convert shallow clone to full history',
  metaTitle: 'git fetch --unshallow: convert shallow clone',
  description: 'Convert a shallow Git clone to full history with git fetch --unshallow. Covers shallow checks, partial history, CI fetch depth, and complete repositories.',
  quickAnswer: `# Check whether this repository is shallow
git rev-parse --is-shallow-repository

# Convert the current clone to full history
git fetch --unshallow origin

# If you need only a bounded amount of additional history
git fetch --deepen=100`,
  when: {
    error: `fatal: --unshallow on a complete repository does not make sense
# or a history-dependent command cannot see older commits`,
    post: 'A shallow clone stores only part of the commit graph. Commands such as <code>git log</code>, <code>git blame</code>, <code>git bisect</code>, and release comparison scripts can therefore stop at the shallow boundary.',
  },
  sections: [
    {
      label: 'Meaning',
      title: 'A shallow clone has an explicit history boundary',
      paragraphs: [
        'Git marks a shallow repository with a boundary in <code>.git/shallow</code>. A clone created with <code>--depth 1</code> can check out the current snapshot, but it does not have the parent commits needed for operations that traverse history.',
        'The problem is repository history, not a damaged working tree. Confirm the state before fetching so a script does not treat an already complete repository as an error.',
      ],
      code: `git rev-parse --is-shallow-repository
git log --oneline --decorate -n 5
git remote -v`,
    },
    {
      label: 'Complete history',
      title: 'Use git fetch --unshallow for the full commit graph',
      paragraphs: [
        'Run <code>git fetch --unshallow</code> when commands need every reachable commit from the configured remote. Specify the remote explicitly when the repository has more than one remote or does not use <code>origin</code>.',
      ],
      code: `git fetch --unshallow origin

# Confirm that the boundary is gone
git rev-parse --is-shallow-repository
# false`,
    },
    {
      label: 'Partial history',
      title: 'Deepen the clone when full history is unnecessary',
      paragraphs: [
        'Use <code>--deepen</code> to add a fixed number of commits to the existing depth. Use <code>--depth</code> when you want to set the total depth. Neither option is a substitute for full history when a tool must inspect all ancestors.',
      ],
      code: `# Add 100 commits to the current depth
git fetch --deepen=100 origin

# Set the total depth to 100 commits
git fetch --depth=100 origin`,
    },
    {
      label: 'CI',
      title: 'Request full history at checkout time',
      paragraphs: [
        'If the shallow clone is created by CI, changing the checkout configuration is more reliable than fetching extra history in every job. For GitHub Actions, set <code>fetch-depth: 0</code> on the checkout step when the workflow needs tags or the complete history.',
      ],
      code: `- uses: actions/checkout@v4
  with:
    fetch-depth: 0`,
    },
  ],
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
      explanation: 'If you only need more commits for a build or comparison, increasing depth is faster than downloading the entire repository history. Use --deepen to add commits to the existing boundary or --depth to set the final total depth.',
      code: `git fetch --deepen=100 origin

# Set the total history depth to 100
git fetch --depth=100 origin`,
    },
    {
      title: 'If git fetch --unshallow says the repository is complete',
      explanation: 'The message "fatal: --unshallow on a complete repository does not make sense" means the clone is already full history. Use the shallow check first when writing scripts.',
      code: `if git rev-parse --is-shallow-repository | grep -q true; then
  git fetch --unshallow origin
else
  echo "Repository already has full history"
fi`,
    },
  ],
  related: [
    { href: '/git/clone-specific-branch/', text: 'git clone a specific branch' },
    { href: '/git/bisect/', text: 'git bisect — needs full history' },
    { href: '/git/submodule-update/', text: 'git submodule update' },
    { href: '/git/git-basics/', text: 'Git basics — branches, remotes, and history' },
  ],
};
