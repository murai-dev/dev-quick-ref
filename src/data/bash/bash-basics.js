export default {
  title: 'Bash basics — commands, quoting, pipes, variables, and safe scripts',
  metaTitle: 'Bash basics: commands, quoting, pipes, and safe scripts',
  description: 'Understand Bash commands, exit status, quoting, expansion, pipes, redirection, variables, and script safety. Includes a practical debugging workflow.',
  sections: [
    {
      label: 'Shell model',
      title: 'Bash reads command language and starts programs',
      paragraphs: [
        'A terminal is the interface where text is displayed and typed. A shell is the program that interprets command lines. Bash is one shell implementation; others include zsh, dash, and fish. A command that works interactively in one shell may fail in a script executed by another, so the script shebang should name the language it uses.',
        'Bash has built-in commands such as <code>cd</code>, <code>read</code>, and <code>export</code>, and it can start external programs found through <code>PATH</code>. Use <code>type command-name</code> to learn whether a name is an alias, function, builtin, or executable file.',
      ],
      code: `type cd
type printf
type grep
command -v bash
bash --version`,
    },
    {
      label: 'Commands and status',
      title: 'Every command returns an exit status',
      paragraphs: [
        'An exit status of zero means success; a nonzero status reports some form of failure. The special parameter <code>$?</code> contains the status of the most recently completed foreground command, but it changes as soon as another command runs. Prefer testing a command directly in an <code>if</code> statement when the goal is to branch on success.',
      ],
      code: `if grep -q 'ready' app.log; then
  printf '%s\n' 'application is ready'
else
  printf '%s\n' 'ready marker not found' >&2
fi`,
    },
    {
      label: 'Quoting and expansion',
      title: 'Quote variable expansions unless splitting is intentional',
      paragraphs: [
        'Bash expands parameters, command substitutions, arithmetic, and wildcard patterns before it starts the target program. Unquoted results can be split on whitespace and expanded as filename patterns. Double quotes preserve each expanded value as one argument while still allowing variables and command substitution. Single quotes preserve text literally.',
        'Use an array when several distinct arguments must be stored. A quoted scalar is one argument; an unquoted scalar is not a safe substitute for an argument list.',
      ],
      code: `file='Quarterly Report.txt'
printf '%s\n' "$file"

options=(--format json --output "build report.json")
my-command "\${options[@]}"`,
      items: [
        '<code>"$value"</code> passes one argument, even when the value is empty or contains spaces.',
        '<code>\'$value\'</code> passes the literal characters <code>$value</code>.',
        '<code>"$(command)"</code> captures output without splitting it into words.',
        '<code>"${array[@]}"</code> expands an array as one argument per element.',
      ],
    },
    {
      label: 'Pipes and redirection',
      title: 'Pipes connect processes; redirections connect file descriptors',
      paragraphs: [
        'A pipe sends the standard output of one command to the standard input of the next. Standard error remains separate unless redirected. Redirections are processed by the shell before a program starts, and their order matters because <code>2>&1</code> duplicates the destination that standard output has at that moment.',
      ],
      code: `# stdout to a file, stderr to another file
my-command >output.log 2>error.log

# both streams to one file
my-command >combined.log 2>&1

# filter stdout while preserving pipeline failure status
set -o pipefail
my-command | grep 'important'`,
    },
    {
      label: 'Variables and environment',
      title: 'Shell variables become environment variables only when exported',
      paragraphs: [
        'A Bash variable belongs to the current shell. <code>export</code> marks it for inclusion in the environment inherited by child processes. Child processes cannot modify the parent shell environment, which is why running a script cannot permanently change the caller directory or variables unless the file is sourced.',
        'Prefer lowercase names for script-local variables and reserve uppercase names for exported configuration and established environment variables. Use <code>readonly</code> for values that must not change after initialization.',
      ],
      code: `api_url='http://127.0.0.1:3000'
export APP_ENV='development'
readonly config_file='./app.conf'
env | grep '^APP_ENV='`,
    },
    {
      label: 'Script structure',
      title: 'Validate inputs and make failure behavior explicit',
      paragraphs: [
        '<code>set -u</code> catches unset variables, and <code>set -o pipefail</code> exposes failures earlier in a pipeline. <code>set -e</code> can be useful but has exceptions around conditions, lists, and subshells; it does not replace explicit checks for expected failures. Add a cleanup trap only for resources the script actually created.',
      ],
      code: `#!/usr/bin/env bash
set -u -o pipefail

usage() { printf 'Usage: %s FILE\n' "$0" >&2; }

if (( $# != 1 )); then
  usage
  exit 64
fi

input_file=$1
[[ -f $input_file ]] || { printf 'Not a file: %s\n' "$input_file" >&2; exit 66; }`,
    },
    {
      label: 'Debugging',
      title: 'Check syntax, then trace expansions and commands',
      paragraphs: [
        'Run the script with the same Bash version and environment used in production. <code>bash -n</code> parses without executing. <code>bash -x</code> prints expanded commands before execution; direct trace output to a protected file if commands may contain credentials. ShellCheck is also valuable for quoting, portability, and common logic errors.',
      ],
      code: `bash -n script.sh
BASH_XTRACEFD=3 bash -x script.sh 3>trace.log
shellcheck script.sh`,
      items: [
        'Syntax error: inspect the line before the reported location for an unclosed quote, bracket, or command substitution.',
        'Command not found: inspect spelling, <code>PATH</code>, aliases, and the script interpreter.',
        'Permission denied: inspect file mode, directory traversal permission, mount options, and the shebang interpreter.',
        'Unexpected empty value: trace where the variable is assigned and whether a subshell changed its scope.',
      ],
    },
    {
      label: 'Portability',
      title: 'Choose Bash features deliberately',
      paragraphs: [
        'Arrays, <code>[[ ]]</code>, and several expansion forms are Bash features and are not guaranteed in POSIX <code>sh</code>. Use a Bash shebang when they make the script clearer. If the script must run under <code>/bin/sh</code> across minimal systems, test with the actual shell implementation and avoid Bash-only syntax.',
      ],
    },
  ],
  related: [
    { href: '/bash/syntax-error-unexpected/', text: 'Bash syntax error near unexpected token — find parser failures' },
    { href: '/bash/command-not-found/', text: 'Bash command not found — PATH and installation checks' },
    { href: '/bash/permission-denied/', text: 'Bash permission denied — modes, mounts, and interpreters' },
    { href: '/bash/pipe-fail/', text: 'Bash pipefail and PIPESTATUS — detect pipeline failures' },
    { href: '/bash/argument-parsing/', text: 'Parse Bash arguments with getopts and positional parameters' },
  ],
};
