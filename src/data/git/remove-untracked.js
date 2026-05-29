export default {
  title: 'git remove all untracked files and directories',
  description: 'Remove untracked files from your working directory using git clean. Use -n for a dry run first to see what would be deleted.',
  quickAnswer: `# Preview what would be deleted (dry run — safe to run first)
git clean -nfd

# Delete untracked files and directories
git clean -fd`,
  when: {
    label: 'When to use this',
    post: 'You have build artifacts, generated files, or editor temp files cluttering your working directory that are not in <code>.gitignore</code>.',
  },
  details: [
    {
      title: 'Flag reference',
      code: `git clean -f        # delete untracked files only
git clean -fd       # delete untracked files AND directories
git clean -fdx      # also delete files ignored by .gitignore (e.g. node_modules)
git clean -fdi      # interactive mode — confirm each deletion`,
    },
    {
      title: 'Clean only a specific subdirectory',
      code: `git clean -fd src/`,
    },
  ],
  related: [
    { href: '/git/discard-unstaged-changes/', text: 'git discard all unstaged changes' },
    { href: '/git/untrack-file/', text: 'git stop tracking a file already committed' },
    { href: '/git/stash-drop/', text: 'git stash — temporarily save changes' },
  ],
};
