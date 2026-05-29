export default {
  title: 'bash xargs — run a command for each input line',
  description: 'Use xargs to pass stdin lines as arguments to a command. Covers -I, -P for parallel execution, null-delimited input, and safe filenames with spaces.',
  quickAnswer: `# Pass multiple arguments at once (default)
find . -name "*.log" | xargs rm

# Pass one argument per call with -I
find . -name "*.txt" | xargs -I{} cp {} /backup/

# Null-delimited (safe with filenames containing spaces)
find . -name "*.txt" -print0 | xargs -0 rm`,
  when: {
    label: 'Usage',
    pre: 'You need to run a command for each item from a list or command output, and the command does not accept stdin.',
  },
  details: [
    {
      title: 'Parallel execution with -P',
      code: `# Run up to 4 processes in parallel
find . -name "*.png" | xargs -P 4 -I{} convert {} {}.webp`,
    },
    {
      title: 'Limit arguments per call with -n',
      code: `# Run rm with at most 10 files at a time
find . -name "*.tmp" | xargs -n 10 rm`,
    },
    {
      title: 'Preview the command before running',
      code: `find . -name "*.log" | xargs -p rm
# xargs -p asks for confirmation before each call`,
    },
    {
      title: 'Handle empty input safely',
      code: `# Without -r, xargs runs the command even with empty input
find . -name "*.tmp" | xargs -r rm
# -r (--no-run-if-empty) skips execution when stdin is empty`,
    },
  ],
  related: [
    { href: '/bash/find-files/', text: 'find files by name or extension' },
    { href: '/bash/for-loop/', text: 'bash for loop over files' },
    { href: '/bash/read-file-line-by-line/', text: 'read a file line by line' },
  ],
};
