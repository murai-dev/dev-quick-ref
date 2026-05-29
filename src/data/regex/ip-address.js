export default {
  title: 'regex match IPv4 address',
  description: 'Regex pattern to match and validate IPv4 addresses (0-255 per octet). Covers simple and strict patterns in JavaScript and Python.',
  quickAnswer: `# Match any IPv4-shaped string (fast, simple)
/\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b/

# Strict — enforces 0-255 per octet
/\\b(?:(?:25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)\\b/`,
  when: {
    label: 'Usage',
    pre: 'Extract IP addresses from logs or validate that a string is a valid IPv4 address.',
  },
  details: [
    {
      title: 'Strict octet range breakdown',
      code: `25[0-5]      250-255
2[0-4]\\d     200-249
1\\d{2}       100-199
[1-9]\\d      10-99
\\d           0-9`,
    },
    {
      title: 'JavaScript — extract IPs from log',
      code: `const log = 'Connection from 192.168.1.1 and 10.0.0.255';
const ipPattern = /\\b(?:(?:25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)\\b/g;
log.match(ipPattern)
// ['192.168.1.1', '10.0.0.255']`,
    },
    {
      title: 'Python — use ipaddress module for validation',
      explanation: 'For validation, the standard library is more reliable than regex.',
      code: `import ipaddress

def is_valid_ipv4(addr):
    try:
        ipaddress.IPv4Address(addr)
        return True
    except ValueError:
        return False

is_valid_ipv4('192.168.1.1')   # True
is_valid_ipv4('999.0.0.1')     # False`,
    },
  ],
  related: [
    { href: '/regex/character-classes/', text: 'character classes \\d \\w' },
    { href: '/regex/anchors/', text: 'anchors ^ and $' },
    { href: '/regex/alternation/', text: 'alternation with |' },
  ],
};
