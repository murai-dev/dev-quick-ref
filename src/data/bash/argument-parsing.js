export default {
  title: 'bash parse arguments with getopts and $@',
  description: 'Parse command-line arguments in bash scripts using getopts for flags, positional parameters ($1, $2), and shift for more control.',
  quickAnswer: `#!/usr/bin/env bash
# Positional args: $1, $2, $3...
echo "First arg: $1"
echo "All args:  $@"
echo "Arg count: $#"`,
  when: {
    label: 'Usage',
    pre: 'You need to handle flags (-v, -o filename) or positional arguments in a bash script.',
  },
  details: [
    {
      title: 'Parse flags with getopts',
      code: `#!/usr/bin/env bash
while getopts "vo:h" opt; do
  case $opt in
    v) verbose=1 ;;
    o) output="$OPTARG" ;;
    h) echo "Usage: $0 [-v] [-o output] args"; exit 0 ;;
    *) echo "Unknown option: $opt"; exit 1 ;;
  esac
done
shift $((OPTIND - 1))   # remove parsed flags, $@ now has remaining args
echo "Remaining args: $@"`,
    },
    {
      title: 'Parse long options with --',
      explanation: 'getopts does not support long options (--flag). Use a case statement with shift instead.',
      code: `#!/usr/bin/env bash
while [[ $# -gt 0 ]]; do
  case $1 in
    --verbose|-v) verbose=1; shift ;;
    --output|-o)  output="$2"; shift 2 ;;
    --help|-h)    echo "Usage: ..."; exit 0 ;;
    --)           shift; break ;;
    *)            positional+=("$1"); shift ;;
  esac
done`,
    },
    {
      title: 'Default values for arguments',
      code: 'name="\${1:-world}"     # default to "world" if $1 is empty\necho "Hello, $name!"',
    },
  ],
  related: [
    { href: '/bash/check-exit-code/', text: 'bash check exit code $?' },
    { href: '/bash/string-comparison/', text: 'bash string comparison' },
    { href: '/bash/set-e-exit-on-error/', text: 'bash set -e — exit on error' },
  ],
};
