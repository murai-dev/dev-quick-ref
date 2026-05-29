export default {
  title: 'git stop tracking a file — remove from git without deleting',
  description: 'Stop tracking a file that is already committed in git using git rm --cached, then add it to .gitignore so it stays ignored going forward.',
  quickAnswer: `# Remove the file from git tracking (keeps the file on disk)
git rm --cached config/secrets.json

# Add it to .gitignore so it won't be re-added
echo "config/secrets.json" >> .gitignore

git commit -m "stop tracking secrets.json"`,
  when: {
    label: 'When to use this',
    post: 'You accidentally committed a file (like <code>.env</code> or a config with credentials) and need to remove it from the repository history without deleting the file locally.',
  },
  details: [
    {
      title: 'Untrack an entire directory',
      code: `git rm --cached -r node_modules/
echo "node_modules/" >> .gitignore
git commit -m "remove node_modules from tracking"`,
    },
    {
      title: 'Remove a sensitive file from all past commits',
      explanation: 'If credentials were committed, <code>git rm --cached</code> only stops future tracking — the file still exists in history. Use <code>git filter-repo</code> to scrub it completely.',
      code: `# Install: pip install git-filter-repo
git filter-repo --path config/secrets.json --invert-paths`,
    },
  ],
  related: [
    { href: '/git/remove-untracked/', text: 'git remove untracked files' },
    { href: '/git/discard-unstaged-changes/', text: 'git discard all unstaged changes' },
    { href: '/git/large-file-rejected/', text: 'git push rejected — large file' },
  ],
};
