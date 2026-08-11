export default {
  title: 'git push rejected — file too large',
  description: 'Fix git push rejected because a file exceeds the size limit. Remove the large file from history with git rm --cached or migrate it to Git LFS.',
  quickAnswer: `# Remove the large file from the last commit
git rm --cached path/to/large-file.zip
echo "path/to/large-file.zip" >> .gitignore
git commit --amend --no-edit
git push origin main`,
  when: {
    error: `remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.
remote: error: Trace: abc123
remote: error: See https://gh.io/lfs for more information.
remote: error: File path/to/large-file.zip is 105.00 MB; this exceeds GitHub's file size limit of 100.00 MB.`,
    post: 'The file was committed to your local repository, but the remote (GitHub) refuses files over 100 MB.',
  },
  details: [
    {
      title: 'If the large file was committed several commits ago',
      explanation: 'Use <code>git filter-repo</code> to remove it from the full history.',
      code: `# Install: pip install git-filter-repo
git filter-repo --path path/to/large-file.zip --invert-paths
git push --force-with-lease origin main`,
    },
    {
      title: 'Track large files with Git LFS instead',
      code: `git lfs install
git lfs track "*.zip"
git add .gitattributes
git add path/to/large-file.zip
git commit -m "track zip with LFS"
git push origin main`,
    },
    {
      title: 'Check whether the file is still in the latest commit',
      explanation: 'Removing a file from the working tree is not enough if it remains in the commit being pushed. Inspect the staged diff and commit history before trying the push again.',
      code: `git status
git diff --cached --stat
git log --stat --oneline -5 -- path/to/large-file.zip

# Remove it from the index but keep the local file
git rm --cached path/to/large-file.zip`,
    },
    {
      title: 'Use force-with-lease only after rewriting history',
      explanation: 'If the large file exists in older commits, the remote still sees it until history is rewritten. Coordinate with other contributors before replacing shared history.',
      code: `git filter-repo --path path/to/large-file.zip --invert-paths
git push --force-with-lease origin <branch>`,
    },
  ],
  related: [
    { href: '/git/untrack-file/', text: 'git stop tracking a committed file' },
    { href: '/git/push-rejected/', text: 'git push rejected (non-fast-forward) — fix' },
    { href: '/git/amend-commit-message/', text: 'git amend last commit' },
  ],
};
