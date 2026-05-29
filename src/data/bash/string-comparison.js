export default {
  title: 'bash string comparison — equality, contains, starts with',
  description: 'Compare strings in bash using [[ ]] with =, !=, =~, and parameter expansion. Covers equality, contains, starts with, ends with, and empty checks.',
  quickAnswer: `# Equal
[[ "$a" == "$b" ]] && echo "equal"

# Not equal
[[ "$a" != "$b" ]] && echo "different"

# Empty / not empty
[[ -z "$var" ]] && echo "empty"
[[ -n "$var" ]] && echo "not empty"

# Contains (glob pattern)
[[ "$str" == *"substr"* ]] && echo "contains"`,
  when: {
    label: 'Usage',
    pre: 'String comparison in bash has many pitfalls. Use <code>[[ ]]</code> (not <code>[ ]</code>) for most cases.',
  },
  details: [
    {
      title: 'Regex match with =~',
      code: `# Check if string matches a regex
if [[ "$email" =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$ ]]; then
  echo "valid email"
fi

# Access capture groups via BASH_REMATCH
if [[ "2024-01-15" =~ ^([0-9]{4})-([0-9]{2})-([0-9]{2})$ ]]; then
  echo "year=\${BASH_REMATCH[1]}"
fi`,
    },
    {
      title: 'Starts with / ends with',
      code: `# Starts with "prefix"
[[ "$str" == prefix* ]] && echo "starts with prefix"

# Ends with ".log"
[[ "$str" == *.log ]] && echo "ends with .log"`,
    },
    {
      title: 'Case-insensitive comparison',
      code: `shopt -s nocasematch
[[ "Hello" == "hello" ]] && echo "match"
shopt -u nocasematch  # restore`,
    },
    {
      title: 'String length',
      code: `str="hello"
echo \${#str}   # 5`,
    },
  ],
  related: [
    { href: '/bash/check-exit-code/', text: 'check exit code ($?)' },
    { href: '/bash/array-usage/', text: 'bash arrays — create, iterate, append' },
    { href: '/bash/for-loop/', text: 'bash for loop' },
  ],
};
