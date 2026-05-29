export default {
  title: 'git push rejected (non-fast-forward) — how to fix',
  description: 'Fix git push rejected non-fast-forward by running git pull --rebase before pushing. The remote has commits your local branch does not have.',
  quickAnswer: `git pull --rebase origin main
git push origin main`,
  when: {
    error: `! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'github.com:user/repo.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.`,
    post: 'Someone else pushed new commits to the remote branch since your last pull. You must integrate their changes first.',
  },
  details: [
    {
      title: 'Alternative: pull with merge commit instead of rebase',
      code: `git pull origin main        # creates a merge commit
git push origin main`,
    },
    {
      title: 'Force push — last resort, never on shared branches',
      explanation: '<code>--force-with-lease</code> is safer than <code>--force</code>: it fails if someone pushed since your last fetch.',
      code: `git push --force-with-lease origin main`,
    },
  ],
  related: [
    { href: '/git/pull-rebase-vs-merge/', text: 'git pull --rebase vs --merge' },
    { href: '/git/merge-conflict/', text: 'git merge conflict — how to resolve' },
    { href: '/git/permission-denied-publickey/', text: 'git permission denied (publickey) — fix' },
  ],
};
