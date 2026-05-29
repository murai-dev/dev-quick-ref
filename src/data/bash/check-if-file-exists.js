export default {
  title: 'bash check if file or directory exists',
  description: 'Test if a file, directory, or symlink exists in bash using [ -f ], [ -d ], [ -e ], and [ -L ] in an if statement or inline.',
  quickAnswer: `# File exists and is a regular file
if [ -f "/path/to/file.txt" ]; then
  echo "file exists"
fi

# Directory exists
if [ -d "/path/to/dir" ]; then
  echo "directory exists"
fi

# Any file/dir/symlink exists
[ -e "/path/to/thing" ] && echo "exists"`,
  when: {
    label: 'Usage',
    pre: 'You need to check if a file or directory exists before reading, writing, or deleting it.',
  },
  details: [
    {
      title: 'All file test operators',
      code: `[ -e file ]   # exists (file, dir, symlink)
[ -f file ]   # exists and is a regular file
[ -d file ]   # exists and is a directory
[ -L file ]   # exists and is a symbolic link
[ -r file ]   # exists and is readable
[ -w file ]   # exists and is writable
[ -x file ]   # exists and is executable
[ -s file ]   # exists and has size > 0
[ -z file ]   # string is empty (different — for variables)`,
    },
    {
      title: 'File does not exist',
      code: `if [ ! -f "config.json" ]; then
  echo "config.json missing — creating default"
  cp config.example.json config.json
fi`,
    },
    {
      title: 'Combine conditions',
      code: `# File exists AND is readable
if [ -f "$file" ] && [ -r "$file" ]; then
  cat "$file"
fi`,
    },
    {
      title: 'Use [[ ]] for safer tests',
      code: `# [[ ]] handles empty variables gracefully
file=""
if [[ -f "$file" ]]; then   # safe — no word splitting issue
  echo "exists"
fi
# [ -f $file ] would fail if $file is empty`,
    },
  ],
  related: [
    { href: '/bash/permission-denied/', text: 'bash permission denied — chmod +x' },
    { href: '/bash/no-such-file/', text: 'bash: no such file or directory' },
    { href: '/bash/string-comparison/', text: 'bash string comparison' },
  ],
};
