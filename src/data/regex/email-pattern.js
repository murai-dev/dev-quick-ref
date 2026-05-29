export default {
  title: 'regex email pattern — validate and extract email addresses',
  description: 'Regex pattern to validate or extract email addresses. Covers basic validation, RFC 5322, and practical patterns for JavaScript and Python.',
  quickAnswer: `# Practical email validation pattern
/^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$/

// JavaScript
function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$/.test(email);
}

# Python
import re
def is_valid_email(email):
    return bool(re.match(r'^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$', email))`,
  when: {
    label: 'Usage',
    pre: 'Validate user-entered email addresses or extract emails from text.',
  },
  details: [
    {
      title: 'Extract all emails from text',
      code: `// JavaScript
const text = 'Contact alice@example.com or bob@test.org for help';
text.match(/[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}/g)
// ['alice@example.com', 'bob@test.org']

# Python
import re
re.findall(r'[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}', text)`,
    },
    {
      title: 'Pattern breakdown',
      code: `^                   start of string
[a-zA-Z0-9._%+\\-]+  local part (before @)
@                   literal @
[a-zA-Z0-9.\\-]+     domain name
\\.                  literal dot
[a-zA-Z]{2,}        TLD (2+ letters)
$                   end of string`,
    },
    {
      title: 'Note: perfect email validation is impossible with regex',
      explanation: 'For production use, send a verification email rather than relying solely on regex. The full RFC 5322 spec allows characters that most simple patterns reject.',
      code: `// HTML5 built-in validation (recommended for forms)
<input type="email" required />`,
    },
  ],
  related: [
    { href: '/regex/anchors/', text: 'anchors ^ and $' },
    { href: '/regex/character-classes/', text: 'character classes [...]' },
    { href: '/regex/alternation/', text: 'alternation with |' },
  ],
};
