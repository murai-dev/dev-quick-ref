export default {
  title: 'regex lookahead and lookbehind — (?=...) (?<=...) (?!...) (?<!...)',
  metaTitle: 'regex lookahead & lookbehind — zero-width assertions',
  description: 'Use regex lookahead (?=...) and lookbehind (?<=...) assertions to match patterns without including them in the result.',
  quickAnswer: `# Positive lookahead — match "foo" only when followed by "bar"
/foo(?=bar)/    matches "foobar" → "foo"

# Negative lookahead — match "foo" NOT followed by "bar"
/foo(?!bar)/    matches "fooX"  → "foo"

# Positive lookbehind — match "bar" only when preceded by "foo"
/(?<=foo)bar/   matches "foobar" → "bar"

# Negative lookbehind — match "bar" NOT preceded by "foo"
/(?<!foo)bar/   matches "Xbar"  → "bar"`,
  when: {
    label: 'Usage',
    pre: 'You need to assert context around a match without including that context in the captured text.',
  },
  details: [
    {
      title: 'JavaScript examples',
      code: `// Extract price number (not the $ sign)
const prices = '$10 $20 $30';
const matches = prices.match(/(?<=\\$)\\d+/g);
// ['10', '20', '30']

// Match word NOT followed by "px"
'10px 20em 30px'.match(/\\d+(?!px)/g)
// ['20'] — only the em value`,
    },
    {
      title: 'Python examples',
      code: `import re

# Positive lookahead — match digits before 'px'
re.findall(r'\\d+(?=px)', '10px 20em 30px')
# ['10', '30']

# Lookbehind — match value after 'color: '
re.search(r'(?<=color: )\\w+', 'color: red').group()
# 'red'`,
    },
    {
      title: 'Variable-length lookbehind (Python 3.9+, PCRE)',
      code: `# Python <3.9 requires fixed-length lookbehind
# (?<=ab|abc) → error in older Python
# (?<=(?:a|ab)) → also not allowed

# Workaround with a group
re.sub(r'(prefix_?)(\\w+)', r'\\g<2>', 'prefix_value')`,
    },
  ],
  related: [
    { href: '/regex/named-groups/', text: 'regex named capture groups' },
    { href: '/regex/non-greedy/', text: 'non-greedy matching (.*?)' },
    { href: '/regex/word-boundary/', text: 'word boundary \\b' },
  ],
};
