export default {
  title: 'bash set -e — exit script on error',
  description: 'Use set -e (errexit) to make a bash script exit immediately when any command fails. Covers caveats, set -u, and set -o pipefail.',
  quickAnswer: `#!/usr/bin/env bash
set -euo pipefail

# -e  exit on any non-zero exit code
# -u  treat unset variables as errors
# -o pipefail  pipelines fail on the first error, not just the last`,
  when: {
    label: 'Usage',
    pre: 'Without <code>set -e</code>, bash scripts continue running after errors, which can cause silent data corruption or partial deploys.',
  },
  details: [
    {
      title: 'Allow a command to fail intentionally',
      code: `set -e

# These patterns suppress the exit:
grep "pattern" file.txt || true
command_that_may_fail || echo "failed, continuing"

# Or temporarily disable
set +e
risky_command
set -e`,
    },
    {
      title: 'set -u — catch undefined variables',
      code: `set -u

echo "$UNDEFINED_VAR"
# bash: UNDEFINED_VAR: unbound variable → script exits

# Provide a default value to allow optional vars
echo "\${OPTIONAL_VAR:-default}"`,
    },
    {
      title: 'Trap errors for cleanup or logging',
      code: `set -e

cleanup() {
  echo "Error on line $1" >&2
}
trap 'cleanup $LINENO' ERR

# Or always run cleanup on exit
trap 'cleanup' EXIT`,
    },
    {
      title: 'set -e does not catch all failures',
      explanation: '<code>set -e</code> is ignored in some contexts: <code>if</code> conditions, <code>while</code>/<code>until</code> tests, <code>||</code> and <code>&&</code> lists.',
      code: `# This will NOT exit even with set -e
if failing_command; then
  echo "success"
fi`,
    },
  ],
  related: [
    { href: '/bash/pipe-fail/', text: 'bash set -o pipefail — fail pipelines on error' },
    { href: '/bash/check-exit-code/', text: 'check exit code of last command ($?)' },
    { href: '/bash/syntax-error-unexpected/', text: 'bash syntax error: unexpected end of file' },
  ],
};
