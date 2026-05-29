export default {
  title: 'regex word boundary \\b — match whole words only',
  description: 'Use \\b word boundary assertion to match whole words and avoid partial matches. Covers \\b, \\B, and word boundary in different languages.',
  quickAnswer: `// Match "cat" as a whole word — not "cats", "concatenate"
/\\bcat\\b/

// JavaScript
'The cat concatenate scat'.match(/\\bcat\\b/g)
// ['cat']

# Python
import re
re.findall(r'\\bcat\\b', 'The cat concatenate scat')
# ['cat']`,
  when: {
    label: 'Usage',
    pre: 'Without <code>\\b</code>, a pattern like <code>/cat/</code> matches inside "concatenate" and "scat".',
  },
  details: [
    {
      title: 'What counts as a word boundary',
      explanation: '<code>\\b</code> matches at a position between a word character (<code>\\w</code>: <code>[a-zA-Z0-9_]</code>) and a non-word character.',
      code: `// Boundaries in "hello world":
// |hello| |world|
// ^ between start-of-string and 'h' → \\b
// ^ between 'o' and ' '            → \\b
// ^ between ' ' and 'w'            → \\b
// ^ between 'd' and end-of-string  → \\b`,
    },
    {
      title: '\\B — match NON-word boundary',
      code: `// Match "cat" only inside a longer word
/\\Bcat\\B/.test('concatenate')   // true
/\\Bcat\\B/.test('cat')           // false`,
    },
    {
      title: 'Replace whole words only',
      code: `// JavaScript
'foo foobar foo'.replace(/\\bfoo\\b/g, 'baz')
// 'baz foobar baz'  — foobar is untouched

# Python
import re
re.sub(r'\\bfoo\\b', 'baz', 'foo foobar foo')
# 'baz foobar baz'`,
    },
  ],
  related: [
    { href: '/regex/anchors/', text: 'anchors ^ and $' },
    { href: '/regex/character-classes/', text: 'character classes \\w \\d \\s' },
    { href: '/regex/global-replace/', text: 'global replace with regex' },
  ],
};
