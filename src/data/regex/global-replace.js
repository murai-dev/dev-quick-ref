export default {
  title: 'regex global replace — replace all matches in JavaScript, Python, sed',
  description: 'Replace all regex matches in a string using the global flag in JavaScript, re.sub() in Python, or sed s///g. Covers case-insensitive and multiline replacements.',
  quickAnswer: `// JavaScript — /g flag
'foo foo foo'.replace(/foo/g, 'bar')
// 'bar bar bar'

# Python — re.sub replaces all by default
import re
re.sub(r'foo', 'bar', 'foo foo foo')
# 'bar bar bar'

# sed — s/old/new/g
echo "foo foo foo" | sed 's/foo/bar/g'`,
  when: {
    label: 'Usage',
    pre: 'Without the global flag, most regex replace functions only replace the first match.',
  },
  details: [
    {
      title: 'JavaScript — String.replaceAll() (ES2021)',
      code: `// replaceAll with a string pattern (no regex needed)
'foo foo foo'.replaceAll('foo', 'bar')
// 'bar bar bar'

// replaceAll requires /g when using regex
'foo foo foo'.replaceAll(/foo/g, 'bar')`,
    },
    {
      title: 'Python — limit number of replacements',
      code: `import re
# Only replace first 2 occurrences
re.sub(r'foo', 'bar', 'foo foo foo', count=2)
# 'bar bar foo'`,
    },
    {
      title: 'Case-insensitive global replace',
      code: `// JavaScript
'Foo FOO foo'.replace(/foo/gi, 'bar')
// 'bar bar bar'

# Python
re.sub(r'foo', 'bar', 'Foo FOO foo', flags=re.IGNORECASE)
# 'bar bar bar'

# sed (case-insensitive + global)
echo "Foo FOO foo" | sed 's/foo/bar/gI'`,
    },
    {
      title: 'Dynamic replacement with a function (JavaScript)',
      code: `'hello world'.replace(/(\\w+)/g, (match) => match.toUpperCase())
// 'HELLO WORLD'`,
    },
  ],
  related: [
    { href: '/regex/replace-capture-group/', text: 'replace with capture group' },
    { href: '/regex/multiline-flag/', text: 'multiline flag' },
    { href: '/regex/word-boundary/', text: 'word boundary \\b' },
  ],
};
