export default {
  title: 'regex alternation — | operator and grouping',
  description: 'Use | in regex to match one of several alternatives. Covers grouping with (), non-capturing groups (?:...), and alternation precedence.',
  quickAnswer: `# Match "cat" or "dog"
/cat|dog/

# Anchored alternatives (group with parentheses)
/^(cat|dog)$/   # matches exactly "cat" or "dog"

# Non-capturing group
/(?:cat|dog)s/  # matches "cats" or "dogs", group not captured`,
  when: {
    label: 'Usage',
    pre: 'Alternation matches one of several patterns at the same position. Without grouping, <code>|</code> applies to the whole expression on each side.',
  },
  details: [
    {
      title: 'Alternation has lowest precedence',
      code: `# "cat or dog" — ^ and $ apply to each alternative
/^cat$|^dog$/   # matches "cat" or "dog" at start/end

# WITHOUT outer group: ^ only applies to "cat"
/^cat|dog$/     # matches "cat" at start OR "dog" at end — NOT what you want

# CORRECT: group the alternatives
/^(cat|dog)$/`,
    },
    {
      title: 'Capture vs non-capture groups',
      code: `// Capturing group — result stored in match[1]
'catfish'.match(/(cat|dog)fish/)
// match[0] = 'catfish', match[1] = 'cat'

// Non-capturing group — no match[1]
'catfish'.match(/(?:cat|dog)fish/)
// match[0] = 'catfish'`,
    },
    {
      title: 'Match multiple file extensions',
      code: `// Match .jpg, .jpeg, .png, .gif
/\\.(jpg|jpeg|png|gif)$/i

# In Python
import re
re.search(r'\\.(jpg|jpeg|png|gif)$', 'image.PNG', re.IGNORECASE)`,
    },
  ],
  related: [
    { href: '/regex/character-classes/', text: 'character classes [...]' },
    { href: '/regex/non-greedy/', text: 'non-greedy matching' },
    { href: '/regex/anchors/', text: 'anchors ^ and $' },
  ],
};
