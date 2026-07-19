export default {
  title: 'failed to push some refs / git push rejected (non-fast-forward) — how to fix',
  description: 'Fix "failed to push some refs" and git push rejected non-fast-forward by running git pull --rebase before pushing. The remote branch has commits your local branch does not have.',
  quickAnswer: `git pull --rebase origin main
git push origin main`,
  when: {
    error: `! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'github.com:user/repo.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.`,
    post: 'Someone else pushed new commits to the remote branch since your last pull. This is the usual cause of "failed to push some refs" and the non-fast-forward error.',
  },
  sections: [
    {
      label: 'Why Git rejects the push',
      title: 'The remote branch contains history you do not have locally',
      paragraphs: [
        'A normal push is allowed only when the remote branch can move forward to your commit without losing any commits. If <code>origin/main</code> has commit B while your local <code>main</code> was created from the earlier commit A, moving the remote directly to your commit would hide B. Git rejects that update as non-fast-forward.',
        'This message means the remote connection and authentication usually worked. It is a history-integration problem, not an SSH-key or access-token problem. Fetch the current remote state before deciding whether to rebase, merge, or intentionally replace it.',
      ],
    },
    {
      label: 'Diagnose first',
      title: 'Confirm the branch and compare both histories',
      paragraphs: [
        'Do not start with a force push. First verify the checked-out branch and its upstream, then fetch without modifying your working branch. The final command shows commits that exist only locally on the left and only remotely on the right.',
      ],
      code: `git status
git branch -vv
git remote -v
git fetch origin
git log --oneline --left-right --graph HEAD...origin/main`,
      items: [
        'Lines beginning with <code>&lt;</code> are commits reachable only from your current branch.',
        'Lines beginning with <code>&gt;</code> are commits reachable only from <code>origin/main</code>.',
        'If the target branch is not <code>main</code>, replace it consistently in every command.',
      ],
    },
    {
      label: 'Recommended fix',
      title: 'Replay your local commits on the updated remote branch',
      paragraphs: [
        'Rebase keeps the branch linear by temporarily removing your local-only commits, advancing to <code>origin/main</code>, and replaying those commits. This is appropriate for unpublished local commits. It changes their commit IDs, so avoid rebasing commits that teammates already use.',
      ],
      code: `git fetch origin
git rebase origin/main
git push origin main`,
    },
    {
      label: 'Conflict handling',
      title: 'Resolve each conflicted commit or abort cleanly',
      paragraphs: [
        'If rebase stops, <code>git status</code> lists the conflicted files. Edit each file, remove the conflict markers, run the relevant tests, stage the resolved files, and continue. Repeat until every local commit has been replayed. If the situation is unclear, aborting returns the branch to its pre-rebase state.',
      ],
      code: `git status
# edit and test each conflicted file
git add path/to/resolved-file
git rebase --continue

# Return to the state before rebase if needed
git rebase --abort`,
    },
    {
      label: 'Merge alternative',
      title: 'Use a merge when preserving published history matters',
      paragraphs: [
        'A merge combines both histories without rewriting existing commits. It may create a merge commit, but it is often the safer choice on a shared branch or when local commits have already been published. Check the repository policy before choosing between merge and rebase.',
      ],
      code: `git fetch origin
git merge origin/main
git push origin main`,
    },
    {
      label: 'Verification',
      title: 'Confirm local and remote now point to the expected history',
      paragraphs: [
        'After the push, fetch once more and compare the branch tips. An empty diff and identical commit IDs confirm that the remote accepted the intended history. Also check the repository host to make sure the expected commits and checks appear on the branch.',
      ],
      code: `git fetch origin
git rev-parse HEAD
git rev-parse origin/main
git diff --stat HEAD origin/main`,
    },
  ],
  details: [
    {
      title: 'The remote branch name is different',
      explanation: 'Use <code>git branch -r</code> to list remote branches. A repository may use <code>master</code>, a release branch, or a feature branch instead of <code>main</code>. Push the branch you actually intend to update.',
      code: `git branch -r
git push -u origin your-branch`,
    },
    {
      title: 'Force push — last resort, never on shared branches',
      explanation: 'Force push intentionally replaces remote history. Use it only when the branch is yours to rewrite and the remote-only commits are known to be unwanted. <code>--force-with-lease</code> is safer than <code>--force</code> because it fails if the remote changed since your last fetch.',
      code: `git push --force-with-lease origin main`,
    },
  ],
  related: [
    { href: '/git/pull-rebase-vs-merge/', text: 'git pull --rebase vs --merge' },
    { href: '/git/merge-conflict/', text: 'git merge conflict — how to resolve' },
    { href: '/git/force-pull-overwrite-local-changes/', text: 'git force pull / overwrite local changes' },
    { href: '/git/permission-denied-publickey/', text: 'git permission denied (publickey) — fix' },
    { href: '/git/git-basics/', text: 'Git basics — branches, remotes, fetch, pull, and push' },
  ],
};
