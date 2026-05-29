export default {
  title: 'regex match date — YYYY-MM-DD and common formats',
  description: 'Regex patterns to match ISO 8601 dates (YYYY-MM-DD) and other common date formats. Covers validation and extraction in JavaScript and Python.',
  quickAnswer: `# ISO 8601 — YYYY-MM-DD
/\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b/

// JavaScript — extract all ISO dates from text
const text = 'From 2024-01-15 to 2024-12-31';
text.match(/\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b/g)
// ['2024-01-15', '2024-12-31']`,
  when: {
    label: 'Usage',
    pre: 'Extract or validate dates in log files, CSV exports, or form input.',
  },
  details: [
    {
      title: 'Common date format patterns',
      code: `# YYYY-MM-DD
/\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])/

# MM/DD/YYYY or MM-DD-YYYY
/(?:0[1-9]|1[0-2])[\\/-](?:0[1-9]|[12]\\d|3[01])[\\/-]\\d{4}/

# D Month YYYY  (e.g. "15 January 2024")
/\\d{1,2} (?:January|February|March|April|May|June|July|August|September|October|November|December) \\d{4}/`,
    },
    {
      title: 'Python — parse with datetime instead of regex',
      explanation: 'For actual date validation (e.g. Feb 30 does not exist), use the datetime library.',
      code: `from datetime import datetime

def parse_date(s):
    try:
        return datetime.strptime(s, '%Y-%m-%d')
    except ValueError:
        return None

parse_date('2024-01-15')   # datetime(2024, 1, 15)
parse_date('2024-02-30')   # None — invalid date`,
    },
    {
      title: 'Extract date components with named groups',
      code: `import re
m = re.match(r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})', '2024-01-15')
m.group('year')   # '2024'`,
    },
  ],
  related: [
    { href: '/regex/named-groups/', text: 'regex named capture groups' },
    { href: '/regex/anchors/', text: 'anchors ^ and $' },
    { href: '/regex/character-classes/', text: 'character classes \\d' },
  ],
};
