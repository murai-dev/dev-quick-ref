export default {
  title: 'git rebase --abort — cancel a rebase in progress',
  description: 'Cancel an in-progress git rebase and restore your branch to its pre-rebase state with git rebase --abort.',
  quickAnswer: `git rebase --abort`,
  when: {
    error: `CONFLICT (content): Merge conflict in src/app.ts
error: could not apply abc1234... my commit
hint: Resolve all conflicts manually, mark them as fixed with
hint: "git add/rm <conflicted_files>", then run "git rebase --continue".`,
    post: 'The rebase hit a conflict you do not want to resolve right now. <code>--abort</code> restores your branch exactly as it was before you ran <code>git rebase</code>.',
  },
  details: [
    {
      title: 'Continue the rebase after resolving conflicts',
      code: `# Edit conflicted files, then:
git add .
git rebase --continue`,
    },
    {
      title: 'Skip a single conflicting commit',
      explanation: 'If a commit is no longer relevant (e.g., already applied upstream), you can skip it.',
      code: `git rebase --skip`,
    },
    {
      title: 'Check whether a rebase is in progress',
      code: `ls .git/rebase-merge 2>/dev/null && echo "rebase in progress" || echo "no rebase"`,
    },
    {
      title: 'Save conflict work before abandoning the rebase',
      explanation: 'Abort restores the branch to the state before the rebase. If you edited conflict markers and may need those edits later, save a patch or copy the files first.',
      code: `git diff > rebase-conflict.patch
git status
git rebase --abort`,
    },
    {
      title: 'Use --quit only when you want to keep the current files',
      explanation: '<code>git rebase --quit</code> stops the rebase bookkeeping without applying the normal abort reset. Use it only when you understand that the current index and worktree will remain as they are.',
      code: `git status
git rebase --quit
# Inspect the files, then decide whether to commit, stash, or reset`,
    },
  ],
  related: [
    { href: '/git/merge-conflict/', text: 'git merge conflict — how to resolve' },
    { href: '/git/pull-rebase-vs-merge/', text: 'git pull --rebase vs --merge' },
    { href: '/git/squash-commits/', text: 'git squash commits with interactive rebase' },
  ],
};
