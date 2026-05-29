export default {
  title: 'bash redirect stderr to stdout — 2>&1 and &>',
  description: 'Redirect stderr (2) to stdout (1) in bash using 2>&1. Includes capturing both streams, redirecting to a file, and suppressing output.',
  quickAnswer: `# Redirect stderr to stdout (combine both streams)
command 2>&1

# Redirect both stdout and stderr to a file
command > output.log 2>&1
# Short form (bash 4+)
command &> output.log

# Suppress all output (stdout + stderr)
command &> /dev/null`,
  when: {
    label: 'Usage',
    pre: 'Stderr is separate from stdout. If you pipe a command, error messages are not captured unless you redirect stderr.',
  },
  details: [
    {
      title: 'Order matters — 2>&1 must come after >',
      code: `# CORRECT — redirect stdout to file, then stderr to wherever stdout goes
command > file.log 2>&1

# WRONG — redirects stderr to the terminal (original stdout), then stdout to file
command 2>&1 > file.log`,
    },
    {
      title: 'Capture only stderr (discard stdout)',
      code: `# Redirect stdout to /dev/null, keep stderr visible
command 2>&1 1>/dev/null
# Short: redirect stdout to /dev/null, stderr to stdout
command 1>/dev/null`,
    },
    {
      title: 'Append both streams to a log file',
      code: `command >> output.log 2>&1`,
    },
    {
      title: 'Capture command output into a variable',
      code: `output=$(command 2>&1)
echo "Got: $output"`,
    },
  ],
  related: [
    { href: '/bash/pipe-fail/', text: 'bash set -o pipefail' },
    { href: '/bash/check-exit-code/', text: 'check exit code ($?)' },
    { href: '/bash/read-file-line-by-line/', text: 'read a file line by line' },
  ],
};
