export default {
  title: 'bash check exit code of last command — $?',
  description: 'Check the exit code of the last bash command with $?. Exit code 0 means success; anything else means failure.',
  quickAnswer: `# Run a command
ls /nonexistent
echo $?   # 2 — ls failed (No such file or directory)

# Success check
if [ $? -eq 0 ]; then
  echo "success"
else
  echo "failed"
fi`,
  when: {
    label: 'Usage',
    pre: 'Every command exits with a numeric code. <code>0</code> = success, <code>1-255</code> = failure. <code>$?</code> holds the last exit code.',
  },
  details: [
    {
      title: 'Capture exit code immediately',
      explanation: '<code>$?</code> is overwritten by every command. Save it to a variable if you need it later.',
      code: `some_command
exit_code=$?

echo "did other stuff"

if [ $exit_code -ne 0 ]; then
  echo "some_command failed with code $exit_code"
fi`,
    },
    {
      title: 'Common exit codes',
      code: `# 0   success
# 1   general error
# 2   misuse of shell builtins (e.g. missing argument)
# 126 command found but not executable
# 127 command not found
# 128 invalid argument to exit
# 130 terminated by Ctrl+C (128 + signal 2)`,
    },
    {
      title: 'Inline conditional on exit code',
      code: `# Run b only if a succeeds
command_a && command_b

# Run b only if a fails
command_a || command_b

# Run b regardless
command_a; command_b`,
    },
  ],
  related: [
    { href: '/bash/set-e-exit-on-error/', text: 'bash set -e — exit on error' },
    { href: '/bash/pipe-fail/', text: 'bash set -o pipefail' },
    { href: '/bash/redirect-stderr/', text: 'redirect stderr to stdout (2>&1)' },
  ],
};
