export default {
  title: 'regex match URL — http, https, and optional path',
  description: 'Regex patterns to match and extract URLs (http/https) from text in JavaScript and Python. Covers optional paths, query strings, and fragments.',
  quickAnswer: `# Match http/https URLs
/https?:\\/\\/[^\\s<>"{}|\\\\^\\[\\]]+/

// JavaScript — extract all URLs from text
const text = 'Visit https://example.com/path?q=1 or http://foo.io';
text.match(/https?:\\/\\/[^\\s<>"{}|\\\\^\\[\\]]+/g)
// ['https://example.com/path?q=1', 'http://foo.io']`,
  when: {
    label: 'Usage',
    pre: 'Extract hyperlinks from plain text, validate URL input, or detect URLs in user content.',
  },
  details: [
    {
      title: 'Stricter URL pattern with domain validation',
      code: `/https?:\\/\\/(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(?:\\/[^\\s]*)?/

// Matches:
//   https://example.com
//   https://sub.domain.co.uk/path/to/page?query=1#fragment
// Does not match:
//   http://localhost  (no TLD)`,
    },
    {
      title: 'Python — extract URLs',
      code: `import re

URL_RE = re.compile(r'https?://[^\\s<>"{}|\\\\^\\[\\]]+')

text = 'See https://example.com/path for details'
urls = URL_RE.findall(text)
# ['https://example.com/path']`,
    },
    {
      title: 'Validate a complete URL with named groups',
      code: `/^(?P<scheme>https?):\\/\\/(?P<host>[^\\/?#]+)(?P<path>[^?#]*)(\\?(?P<query>[^#]*))?(#(?P<fragment>.*))?$/`,
    },
    {
      title: 'Prefer URL() constructor for validation in JS',
      code: `function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
isValidUrl('https://example.com');   // true
isValidUrl('not-a-url');             // false`,
    },
  ],
  related: [
    { href: '/regex/email-pattern/', text: 'regex match email address' },
    { href: '/regex/ip-address/', text: 'regex match IP address' },
    { href: '/regex/named-groups/', text: 'regex named capture groups' },
  ],
};
