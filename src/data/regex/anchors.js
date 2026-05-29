export default {
  title: 'regex anchors — ^ and $ match start and end',
  description: 'Use ^ to match the start and $ to match the end of a string or line in regex. Covers \\A, \\Z in Python and the multiline flag.',
  quickAnswer: `// Match entire string
/^hello$/.test('hello')        // true
/^hello$/.test('say hello')    // false
/^hello$/.test('hello world')  // false

# Python
import re
re.fullmatch(r'hello', 'hello')          # matches
re.match(r'^hello$', 'hello')            # matches
re.match(r'^hello$', 'hello world')      # None`,
  when: {
    label: 'Usage',
    pre: 'Without anchors, a pattern can match anywhere in the string. Use <code>^</code> and <code>$</code> to constrain where the match occurs.',
  },
  details: [
    {
      title: 'Validate entire input',
      code: `// JavaScript — validate hex color
/^#[0-9a-fA-F]{6}$/.test('#ff5733')   // true
/^#[0-9a-fA-F]{6}$/.test('#ff5733xx') // false

# Python — validate US zip code
bool(re.fullmatch(r'\\d{5}(-\\d{4})?', '12345'))       # True
bool(re.fullmatch(r'\\d{5}(-\\d{4})?', '12345-6789'))   # True`,
    },
    {
      title: '\\A and \\Z — always match string boundaries (Python)',
      explanation: '<code>\\A</code> and <code>\\Z</code> always match the start and end of the whole string, even with re.MULTILINE.',
      code: `import re
text = "line1\\nline2"
re.findall(r'^\\w+', text, re.MULTILINE)   # ['line1', 'line2'] — ^ per line
re.findall(r'\\A\\w+', text, re.MULTILINE) # ['line1'] — always string start`,
    },
    {
      title: 'Multiline mode changes ^ and $ behavior',
      code: `// In multiline mode, ^ and $ match per line
const lines = "first\\nsecond\\nthird";
lines.match(/^\\w+$/gm)   // ['first', 'second', 'third']`,
    },
  ],
  related: [
    { href: '/regex/multiline-flag/', text: 'multiline flag' },
    { href: '/regex/word-boundary/', text: 'word boundary \\b' },
    { href: '/regex/character-classes/', text: 'character classes \\d \\w \\s' },
  ],
};
