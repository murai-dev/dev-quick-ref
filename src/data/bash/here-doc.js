export default {
  title: 'bash heredoc — write multiline strings',
  description: 'Use heredoc (<<EOF) to embed multiline text in bash scripts. Covers indented heredocs (<<-), variable expansion, and writing to files.',
  quickAnswer: `# Basic heredoc
cat <<EOF
Line one
Line two with variable: $USER
EOF

# Write to a file
cat <<EOF > config.yml
database:
  host: localhost
  port: 5432
EOF`,
  when: {
    label: 'Usage',
    pre: 'You need to write a multiline string in a script without a separate template file.',
  },
  details: [
    {
      title: 'Indented heredoc (<<-)',
      explanation: '<code>&lt;&lt;-</code> strips leading tabs (not spaces) from each line, so the heredoc can be indented with the surrounding code.',
      code: `if true; then
\tcat <<-EOF
\t\tThis line has tabs stripped
\t\tSo does this one
\tEOF
fi`,
    },
    {
      title: 'Disable variable expansion (quoted delimiter)',
      code: `# Single-quote the delimiter to treat content as literal text
cat <<'EOF'
No expansion: $USER  \\n  $(date)
EOF
# prints literally: No expansion: $USER  \\n  $(date)`,
    },
    {
      title: 'Pass heredoc as stdin to a command',
      code: `# Send SQL to psql
psql -U postgres <<EOF
CREATE DATABASE myapp;
GRANT ALL PRIVILEGES ON DATABASE myapp TO appuser;
EOF

# SSH remote commands
ssh user@host <<'ENDSSH'
cd /app && git pull && npm run build
ENDSSH`,
    },
    {
      title: 'Herestring — single-line stdin',
      code: `# <<< passes a string as stdin
grep "pattern" <<< "some text with pattern here"

# Useful to avoid echo | command
base64 <<< "hello world"`,
    },
  ],
  related: [
    { href: '/bash/redirect-stderr/', text: 'redirect stderr to stdout (2>&1)' },
    { href: '/bash/syntax-error-unexpected/', text: 'bash syntax error: unexpected end of file' },
    { href: '/bash/for-loop/', text: 'bash for loop' },
  ],
};
