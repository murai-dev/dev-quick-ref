export default {
  title: 'git bisect — find the commit that introduced a bug',
  description: 'Use git bisect to perform a binary search through your commit history and find the exact commit that introduced a bug.',
  quickAnswer: `# Start bisect, mark current state as bad
git bisect start
git bisect bad                  # current commit has the bug

# Mark a known-good commit (a tag, hash, or relative ref)
git bisect good v1.2.0

# git checks out the midpoint — test it, then mark it:
git bisect good                 # or: git bisect bad

# Repeat until git prints: "abc1234 is the first bad commit"

# When done, restore HEAD
git bisect reset`,
  when: {
    label: 'When to use this',
    post: 'A bug appeared somewhere between a known-good release and the current HEAD. Bisect finds the exact commit in O(log n) steps.',
  },
  details: [
    {
      title: 'Automate the test with a script',
      explanation: 'If you have a test command that exits 0 for good and non-zero for bad, bisect can run automatically:',
      code: `git bisect start
git bisect bad HEAD
git bisect good v1.2.0
git bisect run npm test -- --grep "failing test name"`,
    },
    {
      title: 'Skip a commit you cannot test',
      code: `git bisect skip`,
    },
  ],
  related: [
    { href: '/git/recover-deleted-branch/', text: 'git recover deleted branch via reflog' },
    { href: '/git/show-file-at-commit/', text: 'git show a file at a specific commit' },
    { href: '/git/cherry-pick/', text: 'git cherry-pick — apply a specific commit' },
  ],
};
