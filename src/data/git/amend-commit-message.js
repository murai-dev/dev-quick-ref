export default {
  title: 'git amend last commit message — rewrite without a new commit',
  description: 'Fix the last git commit message with git commit --amend -m "New message". Works only if you have not pushed the commit yet.',
  quickAnswer: `# Rewrite the last commit message
git commit --amend -m "fix: correct the login redirect URL"

# Open your editor to amend instead of inline
git commit --amend`,
  when: {
    label: 'When to use this',
    post: 'You just committed and noticed a typo in the message, or want to add more detail before pushing.',
  },
  details: [
    {
      title: 'Add a forgotten file to the last commit',
      code: `git add forgotten-file.ts
git commit --amend --no-edit     # keeps the existing message`,
    },
    {
      title: 'Amend a commit that was already pushed',
      explanation: '<strong>Avoid amending pushed commits on shared branches.</strong> If you must, force-push — but only if you are the sole user of the branch.',
      code: `git commit --amend -m "corrected message"
git push --force-with-lease origin my-branch`,
    },
  ],
  related: [
    { href: '/git/undo-last-commit/', text: 'git undo last commit' },
    { href: '/git/squash-commits/', text: 'git squash commits — rewrite multiple commits' },
    { href: '/git/push-rejected/', text: 'git push rejected after amend — fix' },
  ],
};
