export default {
  title: 'bash find files by name, extension, or age',
  description: 'Use the find command to locate files by name, extension, size, modification date, or content. Includes -exec, -mtime, and -type options.',
  quickAnswer: `# Find by name (case-sensitive)
find . -name "config.js"

# Find by extension
find . -name "*.log"

# Find and execute a command on each result
find . -name "*.tmp" -exec rm {} \\;`,
  when: {
    label: 'Usage',
    pre: 'You need to locate files matching certain criteria across a directory tree.',
  },
  details: [
    {
      title: 'Find by modification time',
      code: `# Modified in the last 7 days
find . -mtime -7

# Modified more than 30 days ago
find . -mtime +30

# Modified today
find . -mtime 0`,
    },
    {
      title: 'Find by type',
      code: `find . -type f    # files only
find . -type d    # directories only
find . -type l    # symlinks only`,
    },
    {
      title: 'Find by size',
      code: `find . -size +100M    # larger than 100 MB
find . -size -1k      # smaller than 1 KB`,
    },
    {
      title: 'Exclude directories',
      code: `find . -name "*.js" -not -path "*/node_modules/*"`,
    },
    {
      title: 'Use -exec efficiently with + instead of ;',
      code: `# + batches results into one command call (faster)
find . -name "*.log" -exec gzip {} +

# Equivalent with xargs
find . -name "*.log" | xargs gzip`,
    },
  ],
  related: [
    { href: '/bash/xargs/', text: 'xargs — run command for each input' },
    { href: '/bash/for-loop/', text: 'bash for loop over files' },
    { href: '/bash/permission-denied/', text: 'bash permission denied' },
  ],
};
