export default {
  title: 'bash syntax error: unexpected end of file — how to fix',
  description: 'Fix "syntax error: unexpected end of file" in bash scripts caused by unclosed if/for/while, missing fi/done/esac, or CRLF line endings.',
  quickAnswer: `# Check line endings (CRLF is the usual culprit)
file script.sh
# If: "CRLF line terminators"
dos2unix script.sh
# or
sed -i 's/\r//' script.sh

# Check for unclosed blocks — count openers vs closers
grep -c '\bif\b' script.sh   # should match fi count
grep -c '\bfi\b' script.sh`,
  when: {
    error: `script.sh: line 42: syntax error: unexpected end of file
# or
script.sh: line 1: syntax error: unexpected end of file`,
    post: 'Bash reached the end of the script without finding a closing keyword for an open block (<code>fi</code>, <code>done</code>, <code>esac</code>, <code>}</code>, or <code>"</code>).',
  },
  details: [
    {
      title: 'Missing fi — if without fi',
      code: `# WRONG
if [ "$var" = "yes" ]; then
  echo "yes"
# Missing: fi

# CORRECT
if [ "$var" = "yes" ]; then
  echo "yes"
fi`,
    },
    {
      title: 'Missing done — for/while without done',
      code: `# WRONG
for file in *.txt; do
  echo "$file"
# Missing: done

# CORRECT
for file in *.txt; do
  echo "$file"
done`,
    },
    {
      title: 'Unclosed string or heredoc',
      code: `# WRONG — unclosed double quote
echo "Hello world

# CORRECT
echo "Hello world"

# Check heredoc delimiter matches exactly
cat <<EOF
content here
EOF`,
    },
    {
      title: 'Use bash -n to syntax-check without running',
      code: `bash -n script.sh
# Prints errors without executing anything`,
    },
  ],
  related: [
    { href: '/bash/no-such-file/', text: 'bash: no such file or directory' },
    { href: '/bash/set-e-exit-on-error/', text: 'bash set -e — exit on error' },
    { href: '/bash/here-doc/', text: 'bash heredoc — multiline strings' },
  ],
};
