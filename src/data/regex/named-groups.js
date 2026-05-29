export default {
  title: 'regex named capture groups — (?P<name>) and (?<name>)',
  description: 'Use named capture groups in regex to extract named parts of a match. Covers Python (?P<name>), JavaScript (?<name>), and backreferences.',
  quickAnswer: `# Python — (?P<name>...)
import re
m = re.match(r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})', '2024-01-15')
print(m.group('year'))   # 2024
print(m.groupdict())     # {'year': '2024', 'month': '01', 'day': '15'}

// JavaScript — (?<name>...)
const m = '2024-01-15'.match(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/);
console.log(m.groups.year);   // 2024`,
  when: {
    label: 'Usage',
    pre: 'Named groups make regex matches self-documenting and let you access groups by name instead of index.',
  },
  details: [
    {
      title: 'Named backreference in pattern',
      code: `# Python — \\g<name> or (?P=name)
import re
# Match a word that appears twice
re.search(r'(?P<word>\\w+) (?P=word)', 'the the fox')

# JavaScript — \\k<name>
/(?<word>\\w+) \\k<word>/.test('the the fox')   // true`,
    },
    {
      title: 'Named group in replacement',
      code: `# Python — use \\g<name> in sub()
import re
result = re.sub(
  r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})',
  r'\\g<day>/\\g<month>/\\g<year>',
  '2024-01-15'
)
# result: '15/01/2024'

// JavaScript
'2024-01-15'.replace(
  /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/,
  '$<day>/$<month>/$<year>'
)
// '15/01/2024'`,
    },
    {
      title: 'PHP named groups',
      code: `preg_match('/(?P<year>\\d{4})-(?P<month>\\d{2})/', '2024-01', $m);
echo $m['year'];   // 2024`,
    },
  ],
  related: [
    { href: '/regex/lookahead-lookbehind/', text: 'lookahead and lookbehind assertions' },
    { href: '/regex/replace-capture-group/', text: 'replace with capture group backreference' },
    { href: '/regex/non-greedy/', text: 'non-greedy matching (.*?)' },
  ],
};
