export default {
  title: 'Regex basics — patterns, groups, quantifiers, boundaries, and safe matching',
  metaTitle: 'Regex basics: groups, quantifiers, boundaries, and matching',
  description: 'Understand regular expression literals, character classes, groups, quantifiers, anchors, boundaries, flags, replacement, and safe pattern testing across regex engines.',
  sections: [
    {
      label: 'What regex does',
      title: 'A regular expression describes a text-matching rule',
      paragraphs: [
        'A regular expression, usually shortened to regex, is a pattern interpreted by a regex engine. Applications use patterns to search, extract, split, replace, and validate text. The engine scans candidate positions and attempts to satisfy the pattern according to its matching rules.',
        'Regex syntax is not perfectly universal. JavaScript, Python, Java, .NET, PCRE, POSIX tools, and editors differ in supported groups, lookbehind, flags, escaping, and replacement syntax. Identify the language and engine before copying a pattern from another environment.',
      ],
    },
    {
      label: 'Literals and metacharacters',
      title: 'Most characters match themselves; metacharacters control the pattern',
      paragraphs: [
        'Letters and digits usually match the same characters in the input. Characters such as <code>.</code>, <code>*</code>, <code>+</code>, <code>?</code>, parentheses, brackets, braces, anchors, and the backslash have structural meaning. Escape a metacharacter when it must be matched literally.',
        'There may be two escaping layers: the programming-language string and the regex engine. A JavaScript regex literal <code>/\\d+/</code> contains one backslash, while the equivalent string passed to <code>new RegExp</code> needs <code>"\\\\d+"</code> so the engine receives that same backslash.',
      ],
      code: `# Pattern: match a literal dot followed by digits
\\.\\d+

# Matches
.42
.2026`,
    },
    {
      label: 'Character classes',
      title: 'Classes match one character from a defined set',
      paragraphs: [
        '<code>[abc]</code> matches one of three characters, while <code>[^abc]</code> matches one character outside that set. Ranges such as <code>[A-Z]</code> depend on character ordering and usually cover only ASCII. Shorthands such as <code>\\d</code>, <code>\\w</code>, and <code>\\s</code> can have Unicode-dependent behavior across engines.',
        'Use explicit classes when the accepted alphabet is part of a data contract. For international text, check whether the engine supports Unicode properties such as <code>\\p{L}</code> and whether the required Unicode flag is enabled.',
      ],
      code: `^[A-Z]{2}-[0-9]{4}$

# Matches an ASCII code such as:
AB-2048`,
    },
    {
      label: 'Quantifiers',
      title: 'Quantifiers repeat the preceding token or group',
      paragraphs: [
        '<code>*</code> means zero or more, <code>+</code> means one or more, and <code>?</code> means zero or one. Braces express exact or bounded counts. Quantifiers are greedy by default in many engines: they initially consume as much as possible and backtrack when the rest of the pattern cannot match.',
        'Place repeated structure inside a group. <code>ab+</code> repeats only <code>b</code>, whereas <code>(?:ab)+</code> repeats the two-character sequence. Use a noncapturing group when the grouping is structural and the substring does not need to be returned.',
      ],
      items: [
        '<code>a{3}</code> matches exactly three consecutive <code>a</code> characters.',
        '<code>a{2,4}</code> matches between two and four.',
        '<code>a+?</code> is a lazy form in engines that support lazy quantifiers.',
        '<code>(?:https?://)?</code> makes an entire protocol group optional.',
      ],
    },
    {
      label: 'Groups and captures',
      title: 'Capturing groups return meaningful parts of a match',
      paragraphs: [
        'Parentheses group pattern operations and, by default, capture the matched substring. Numbered captures are referenced by position, which becomes fragile when groups are inserted earlier in a pattern. Named groups make extraction and replacement intent clearer when the engine supports them.',
      ],
      code: `^(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})$

# Input
2026-07-19

# Captures
year=2026 month=07 day=19`,
    },
    {
      label: 'Anchors and boundaries',
      title: 'Anchors assert a position instead of consuming text',
      paragraphs: [
        '<code>^</code> and <code>$</code> commonly represent the start and end of an input, but multiline mode may make them operate at line boundaries. Some engines provide absolute input anchors with different names. A word boundary <code>\\b</code> asserts a transition between word and non-word characters and inherits the engine definition of a word character.',
        'Validation patterns normally need anchors around the entire allowed format. Without anchors, a pattern can succeed because one valid-looking substring exists inside otherwise invalid input.',
      ],
      code: `# Search: finds a date inside longer text
[0-9]{4}-[0-9]{2}-[0-9]{2}

# Shape validation: requires the entire input to have that form
^[0-9]{4}-[0-9]{2}-[0-9]{2}$`,
    },
    {
      label: 'Flags and matching mode',
      title: 'Flags change how the same pattern is interpreted',
      paragraphs: [
        'Common flags enable case-insensitive matching, global iteration, multiline anchors, dot matching across line breaks, or Unicode-aware behavior. A global flag may also change API state or return shape. Read the host-language API documentation instead of treating flags as portable suffixes.',
      ],
      items: [
        '<code>i</code>: case-insensitive matching, with engine-specific Unicode rules.',
        '<code>g</code>: find all matches in JavaScript-style APIs rather than stopping at the first.',
        '<code>m</code>: make line anchors operate across multiple lines in many engines.',
        '<code>s</code>: allow dot to match line terminators in engines with dot-all mode.',
      ],
    },
    {
      label: 'Replacement',
      title: 'Replacement syntax is a separate language',
      paragraphs: [
        'A replacement usually refers to captured groups, but the notation differs: environments may use <code>$1</code>, <code>\\1</code>, or named forms. Test the replacement API as well as the matching pattern. Escaping rules for a shell, JSON file, programming-language string, and replacement template can all apply at once.',
      ],
      code: `# Pattern
^([^,]+),\\s*([^,]+)$

# Input
Lovelace, Ada

# Replacement in a $1-style API
$2 $1`,
    },
    {
      label: 'Testing and safety',
      title: 'Test examples, near misses, and long adversarial input',
      paragraphs: [
        'A useful regex test set includes expected matches, expected failures, empty input, boundary lengths, Unicode text, and strings that almost match. Regex validates textual shape, not real-world meaning: a date-shaped string can still name an impossible calendar date, and an email-like string does not prove the mailbox exists.',
        'Ambiguous nested repetition can cause excessive backtracking and poor performance. Prefer bounded input, specific character classes, and unambiguous structure. Avoid patterns such as nested broad quantifiers when matching untrusted long text, and measure worst-case behavior in the actual engine.',
      ],
      items: [
        'Write down the accepted and rejected examples before making the pattern more compact.',
        'Anchor the pattern when validating a complete field.',
        'Use ordinary string operations when the task is a fixed prefix, suffix, or delimiter.',
        'Keep semantic validation in code when it is clearer than a large pattern.',
      ],
    },
  ],
  related: [
    { href: '/regex/anchors/', text: 'Regex anchors — start, end, and word boundaries' },
    { href: '/regex/character-classes/', text: 'Regex character classes — sets, ranges, and shorthands' },
    { href: '/regex/named-groups/', text: 'Named capture groups — extract fields clearly' },
    { href: '/regex/non-greedy/', text: 'Greedy and non-greedy quantifiers' },
    { href: '/regex/lookahead-lookbehind/', text: 'Lookahead and lookbehind — zero-width conditions' },
  ],
};
