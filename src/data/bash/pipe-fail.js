export default {
  title: 'bash set -o pipefail — catch errors in pipelines',
  description: 'Use set -o pipefail to make bash pipelines fail when any command in the pipeline fails, not just the last one.',
  quickAnswer: `set -o pipefail

# Now this will fail (grep fails because the file is missing)
cat missing-file.txt | grep "pattern" | wc -l
# Without pipefail: exit code 0 (wc succeeded)
# With pipefail:    exit code 1 (cat failed)`,
  when: {
    label: 'Problem without pipefail',
    pre: 'Without <code>pipefail</code>, only the exit code of the last command in a pipeline matters:',
    error: `false | true
echo $?   # prints 0 — the "false" failure is silently swallowed`,
    post: 'Silent failures in pipelines are a common source of subtle bugs in shell scripts.',
  },
  details: [
    {
      title: 'Combine with set -e and set -u',
      code: `#!/usr/bin/env bash
set -euo pipefail

# Script now exits on:
# - any command failure (-e)
# - unset variable reference (-u)
# - pipeline failure (-o pipefail)`,
    },
    {
      title: 'Get individual pipeline exit codes',
      code: `cat file.txt | grep pattern | sort
echo "\${PIPESTATUS[@]}"   # e.g. "0 1 0" — grep failed, others ok`,
    },
    {
      title: 'Allow specific pipeline failures',
      code: `# Use || true to ignore expected failures
grep "pattern" file.txt | head -5 || true`,
    },
  ],
  related: [
    { href: '/bash/set-e-exit-on-error/', text: 'bash set -e — exit on error' },
    { href: '/bash/check-exit-code/', text: 'check exit code of last command ($?)' },
    { href: '/bash/redirect-stderr/', text: 'redirect stderr to stdout (2>&1)' },
  ],
};
