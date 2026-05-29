export default {
  title: 'git line ending warning (CRLF / LF) — how to fix',
  description: 'Fix git line ending warnings about CRLF and LF by configuring core.autocrlf correctly for your OS, or using a .gitattributes file.',
  quickAnswer: `# Linux / macOS — convert CRLF to LF on commit, never on checkout
git config --global core.autocrlf input

# Windows — convert LF to CRLF on checkout, back to LF on commit
git config --global core.autocrlf true`,
  when: {
    error: `warning: LF will be replaced by CRLF in src/app.ts.
The file will have its original line endings in your working directory.`,
    post: 'Git is converting line endings because <code>core.autocrlf</code> is set to <code>true</code> on a non-Windows machine, or vice versa.',
  },
  details: [
    {
      title: 'Use .gitattributes for consistent cross-platform settings',
      explanation: 'A <code>.gitattributes</code> file enforces line endings regardless of individual developer settings.',
      code: `# .gitattributes
* text=auto eol=lf
*.bat text eol=crlf`,
    },
    {
      title: 'Normalize existing files in the repository',
      code: `git add --renormalize .
git commit -m "normalize line endings"`,
    },
    {
      title: 'Disable warnings (not recommended)',
      code: `git config --global core.safecrlf false`,
    },
  ],
  related: [
    { href: '/git/untrack-file/', text: 'git stop tracking a file' },
    { href: '/git/diff-branches/', text: 'git diff — why are all lines showing as changed?' },
    { href: '/git/amend-commit-message/', text: 'git amend last commit' },
  ],
};
