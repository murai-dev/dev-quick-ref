export default {
  title: 'regex replace with capture group backreference',
  description: 'Use capture group backreferences ($1, \\1, \\g<1>) in regex replacements to reuse matched text. Covers JavaScript, Python, sed, and named groups.',
  quickAnswer: `// JavaScript — $1, $2... or $<name>
'John Smith'.replace(/(\\w+) (\\w+)/, '$2, $1')
// 'Smith, John'

# Python — \\1, \\2... or \\g<name>
import re
re.sub(r'(\\w+) (\\w+)', r'\\2, \\1', 'John Smith')
# 'Smith, John'

# sed
echo "John Smith" | sed 's/\\(\\w\\+\\) \\(\\w\\+\\)/\\2, \\1/'`,
  when: {
    label: 'Usage',
    pre: 'Backreferences let you reuse captured text in the replacement string without re-specifying it.',
  },
  details: [
    {
      title: 'Named group backreference in replacement',
      code: `# Python — \\g<name>
import re
re.sub(
  r'(?P<first>\\w+) (?P<last>\\w+)',
  r'\\g<last>, \\g<first>',
  'John Smith'
)
# 'Smith, John'

// JavaScript — $<name>
'John Smith'.replace(/(?<first>\\w+) (?<last>\\w+)/, '$<last>, $<first>')`,
    },
    {
      title: 'Wrap matched text with backreference',
      code: `// Wrap all numbers in <strong>
'Price: 42 dollars'.replace(/(\\d+)/g, '<strong>$1</strong>')
// 'Price: <strong>42</strong> dollars'`,
    },
    {
      title: 'sed extended regex',
      code: `# Use -E for extended regex (no backslash for groups)
echo "2024-01-15" | sed -E 's/([0-9]{4})-([0-9]{2})-([0-9]{2})/\\3\\/\\2\\/\\1/'
# 15/01/2024`,
    },
  ],
  related: [
    { href: '/regex/named-groups/', text: 'regex named capture groups' },
    { href: '/regex/global-replace/', text: 'global replace with regex' },
    { href: '/regex/lookahead-lookbehind/', text: 'lookahead and lookbehind' },
  ],
};
