export default {
  title: 'regex non-greedy matching — .*? vs .*',
  description: 'Use non-greedy (lazy) quantifiers like .*? to match as little as possible. Explains the difference between greedy and lazy matching with examples.',
  quickAnswer: `# Greedy — matches as much as possible
/<.+>/    on "<b>bold</b>" matches "<b>bold</b>" (the whole thing)

# Non-greedy (lazy) — matches as little as possible
/<.+?>/   on "<b>bold</b>" matches "<b>" then "</b>" separately`,
  when: {
    label: 'Usage',
    pre: 'Greedy quantifiers (<code>*</code>, <code>+</code>, <code>?</code>) match as much as possible. Add <code>?</code> after them to make them lazy.',
  },
  details: [
    {
      title: 'Lazy quantifier syntax',
      code: `*?    zero or more (lazy)
+?    one or more (lazy)
??    zero or one (lazy)
{n,m}? n to m times (lazy)`,
    },
    {
      title: 'JavaScript example',
      code: `const html = '<b>bold</b> and <i>italic</i>';

// Greedy — matches from first < to last >
html.match(/<.+>/)[0]
// '<b>bold</b> and <i>italic</i>'

// Non-greedy — matches each tag separately
html.match(/<.+?>/g)
// ['<b>', '</b>', '<i>', '</i>']`,
    },
    {
      title: 'Python example',
      code: `import re

text = '"first" and "second"'

# Greedy — one big match from first " to last "
re.findall(r'".*"', text)
# ['"first" and "second"']

# Non-greedy — each quoted string separately
re.findall(r'".*?"', text)
# ['"first"', '"second"']`,
    },
    {
      title: 'Prefer [^...] over .*? when possible',
      explanation: 'A negated character class is clearer and faster than a lazy quantifier.',
      code: `# Instead of: "<.*?>"
# Use:         "<[^>]*>"  — everything that is not a >
/<[^>]*>/g`,
    },
  ],
  related: [
    { href: '/regex/lookahead-lookbehind/', text: 'lookahead and lookbehind' },
    { href: '/regex/character-classes/', text: 'character classes [...]' },
    { href: '/regex/multiline-flag/', text: 'multiline flag — ^ and $ per line' },
  ],
};
