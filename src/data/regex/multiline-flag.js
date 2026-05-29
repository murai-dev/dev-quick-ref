export default {
  title: 'regex multiline flag — ^ and $ match line start/end',
  description: 'Use the multiline flag (m) so ^ and $ match the start and end of each line, not just the entire string. Covers JavaScript, Python, and the DOTALL flag.',
  quickAnswer: `// JavaScript — use /m flag
const text = "first line\\nsecond line\\nthird line";

text.match(/^\\w+/m)    // ["first"]  — only first line without /m
text.match(/^\\w+/gm)   // ["first", "second", "third"]  — all lines

# Python
import re
re.findall(r'^\\w+', text, re.MULTILINE)
# ['first', 'second', 'third']`,
  when: {
    label: 'Usage',
    pre: 'Without the multiline flag, <code>^</code> matches only the start of the whole string, and <code>$</code> matches only the end.',
  },
  details: [
    {
      title: 'DOTALL / single-line flag — . matches newlines',
      explanation: 'By default <code>.</code> does NOT match newline characters. The DOTALL flag changes this.',
      code: `// JavaScript — use /s flag (ES2018+)
'first\\nsecond'.match(/first.second/s)   // matches

# Python
re.search(r'first.second', 'first\\nsecond', re.DOTALL)`,
    },
    {
      title: 'Combining flags',
      code: `// JavaScript — multiline + global + case insensitive
text.match(/^pattern/gmi)

# Python — combine with |
re.findall(r'^pattern', text, re.MULTILINE | re.IGNORECASE)`,
    },
    {
      title: 'Match end of each line with $',
      code: `// Find lines ending with a semicolon
code.match(/^.*;\$/gm)`,
    },
  ],
  related: [
    { href: '/regex/anchors/', text: 'anchors ^ and $ — match start and end' },
    { href: '/regex/non-greedy/', text: 'non-greedy matching (.*?)' },
    { href: '/regex/global-replace/', text: 'global replace with regex' },
  ],
};
