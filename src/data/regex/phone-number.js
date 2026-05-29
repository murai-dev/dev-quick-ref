export default {
  title: 'regex match phone number — international and US formats',
  description: 'Regex patterns to match phone numbers in US, international (+1-XXX), and flexible formats. Covers extraction and normalization.',
  quickAnswer: `# US phone: 123-456-7890, (123) 456-7890, 123.456.7890
/(?:\\+1[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}/

// JavaScript
const text = 'Call (555) 123-4567 or 555.987.6543';
text.match(/(?:\\+1[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}/g)
// ['(555) 123-4567', '555.987.6543']`,
  when: {
    label: 'Usage',
    pre: 'Validate or extract phone numbers from user input or documents.',
  },
  details: [
    {
      title: 'International phone numbers (E.164 format)',
      code: `# E.164: +14155552671 or +44-7911-123456
/\\+?[1-9]\\d{6,14}/

// Flexible international
/\\+?[\\d\\s().\\-]{7,20}/`,
    },
    {
      title: 'Python — extract US phone numbers',
      code: `import re

PHONE_RE = re.compile(r'(?:\\+1[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}')
text = 'Contact us at 800-555-0199 or (800) 555-0100.'
PHONE_RE.findall(text)
# ['800-555-0199', '(800) 555-0100']`,
    },
    {
      title: 'Normalize a matched phone number to digits only',
      code: `// JavaScript — strip non-digit characters
function normalize(phone) {
  return phone.replace(/\\D/g, '');
}
normalize('(555) 123-4567');  // '5551234567'`,
    },
    {
      title: 'Consider a library for production use',
      explanation: 'libphonenumber-js validates numbers against real carrier data (supports 200+ countries).',
      code: `npm install libphonenumber-js

import { parsePhoneNumberFromString } from 'libphonenumber-js';
const phone = parsePhoneNumberFromString('+1 650-253-0000', 'US');
phone?.isValid();   // true`,
    },
  ],
  related: [
    { href: '/regex/email-pattern/', text: 'regex match email address' },
    { href: '/regex/url-pattern/', text: 'regex match URL' },
    { href: '/regex/character-classes/', text: 'regex character classes \\d' },
  ],
};
