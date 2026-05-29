export default {
  title: 'regex character classes — [...], \\d, \\w, \\s',
  description: 'Use regex character classes to match sets of characters. Covers [...], negated [^...], shorthand classes \\d \\w \\s and their inverses.',
  quickAnswer: `[abc]     match a, b, or c
[a-z]     match any lowercase letter
[A-Za-z0-9]  alphanumeric
[^abc]    match anything except a, b, c

\\d    digit       [0-9]
\\D    non-digit   [^0-9]
\\w    word char   [a-zA-Z0-9_]
\\W    non-word
\\s    whitespace  [ \\t\\r\\n\\f\\v]
\\S    non-whitespace`,
  when: {
    label: 'Usage',
    pre: 'Character classes let you match any one character from a defined set.',
  },
  details: [
    {
      title: 'Common patterns using character classes',
      code: `# Match hex color
/#[0-9a-fA-F]{6}/

# Match identifier (starts with letter/underscore)
/[a-zA-Z_]\\w*/

# Match one whitespace character
/\\s/

# Match a digit sequence
/\\d+/

# Strip non-alphanumeric
str.replace(/[^\\w\\s]/g, '')`,
    },
    {
      title: 'Special characters inside [...]',
      explanation: 'Most metacharacters lose their meaning inside <code>[...]</code>. Only <code>]</code>, <code>\\</code>, <code>^</code>, and <code>-</code> need escaping.',
      code: `[.?+*]   # matches literal . ? + * (no escaping needed)
[\\^]     # matches literal ^
[\\-]     # matches literal - (or put it first/last: [-az])
[a\\]b]   # matches a ] or b`,
    },
    {
      title: 'Unicode property classes (\\p{}) — JS and Python',
      code: `// JavaScript (ES2018+) — /u flag required
/\\p{Letter}/u     // any Unicode letter
/\\p{Number}/u     // any Unicode number

# Python
import re
re.findall(r'\\p{L}+', text)   # requires 'regex' package, not 're'`,
    },
  ],
  related: [
    { href: '/regex/anchors/', text: 'anchors ^ and $' },
    { href: '/regex/non-greedy/', text: 'non-greedy matching' },
    { href: '/regex/alternation/', text: 'alternation with |' },
  ],
};
