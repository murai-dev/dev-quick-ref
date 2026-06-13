export default {
  title: 'git force pull / overwrite local changes — how to do it safely',
  description: 'Overwrite local changes with the remote branch safely using git fetch and git reset --hard origin/main. Includes a stash step if you might need your work later.',
  quickAnswer: `# If you might need your local work, save it first
git stash push -u -m "before overwrite"

# Fetch the latest remote state
git fetch origin

# Make your current branch match the remote exactly
git reset --hard origin/main`,
  when: {
    pre: 'You want to force pull from the remote and overwrite local changes so your branch matches <code>origin/main</code> exactly.',
    error: `error: Your local changes to the following files would be overwritten by merge:
  src/app.js
Please commit your changes or stash them before you merge.
Aborting`,
    post: 'Git refuses to pull because you have local changes or commits that would be overwritten. If you truly want the remote version, fetch first and then reset hard to the remote branch.',
  },
  detailsLabel: 'Safer variants',
  details: [
    {
      title: 'Keep a backup of your local work before overwriting',
      code: `# Save tracked + untracked files
git stash push -u -m "before overwrite"

# Later, restore if needed
git stash pop`,
    },
    {
      title: 'Also remove untracked files and folders',
      explanation: 'A hard reset does not delete untracked files. If you want a completely clean tree, run <code>git clean</code> after the reset.',
      code: `git fetch origin
git reset --hard origin/main
git clean -fd`,
    },
    {
      title: 'Overwrite a branch other than main',
      code: `# Example: make your branch match origin/develop
git fetch origin
git reset --hard origin/develop`,
    },
    {
      title: 'If you already pushed your local commits',
      explanation: 'Do not reset shared history unless you really intend to rewrite it. In shared branches, use <code>git revert</code> or coordinate before force-pushing.',
      code: `# Safer for shared history
git revert <commit>

# Only if you intentionally rewrite remote history
git push --force-with-lease origin main`,
    },
  ],
  related: [
    { href: '/git/push-rejected/', text: 'failed to push some refs / git push rejected' },
    { href: '/git/pull-rebase-vs-merge/', text: 'git pull --rebase vs --merge' },
    { href: '/git/discard-unstaged-changes/', text: 'git discard all unstaged changes' },
    { href: '/git/remove-untracked/', text: 'git remove untracked files' },
  ],
};