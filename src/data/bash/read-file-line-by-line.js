export default {
  title: 'bash read a file line by line',
  description: 'Read a file line by line in bash using a while read loop. Handles lines with spaces, special characters, and trailing newlines correctly.',
  quickAnswer: `while IFS= read -r line; do
  echo "$line"
done < input.txt`,
  when: {
    label: 'Usage',
    pre: 'You need to process a file line by line in a bash script.',
  },
  details: [
    {
      title: 'Why IFS= and -r matter',
      code: `# IFS=  preserves leading/trailing whitespace on each line
# -r    prevents backslash interpretation (\\n stays as \\n)

# Without them, lines with spaces or backslashes are mangled:
while read line; do   # BAD — leading spaces stripped, \\ consumed
  echo "$line"
done < file.txt`,
    },
    {
      title: 'Process the last line even without trailing newline',
      code: `while IFS= read -r line || [ -n "$line" ]; do
  echo "$line"
done < input.txt
# The || [ -n "$line" ] handles files missing a final newline`,
    },
    {
      title: 'Read from a command output',
      code: `while IFS= read -r line; do
  echo "Processing: $line"
done < <(find . -name "*.txt")`,
    },
    {
      title: 'Read two fields per line (CSV-like)',
      code: `while IFS=',' read -r name value; do
  echo "Name=$name  Value=$value"
done < data.csv`,
    },
    {
      title: 'Use mapfile to read all lines into an array',
      code: `mapfile -t lines < input.txt
echo "\${lines[0]}"   # first line
echo "\${#lines[@]}"  # line count`,
    },
  ],
  related: [
    { href: '/bash/for-loop/', text: 'bash for loop over files or list' },
    { href: '/bash/xargs/', text: 'xargs — run command for each input line' },
    { href: '/bash/redirect-stderr/', text: 'redirect stderr to stdout (2>&1)' },
  ],
};
