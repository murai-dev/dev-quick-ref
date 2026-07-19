export default {
  title: 'Git basics — commits, branches, remotes, and safe recovery',
  metaTitle: 'Git basics: commits, branches, remotes, and recovery',
  description: 'Understand the Git working tree, staging area, commits, branches, HEAD, and remotes. Includes a practical daily workflow and safe recovery commands.',
  sections: [
    {
      label: 'What Git does',
      title: 'Git records snapshots of a project',
      paragraphs: [
        'Git is a distributed version control system. It records named snapshots of a project so you can compare changes, return to an earlier state, and combine work from different branches. A Git repository contains the project files you can see plus a hidden <code>.git</code> directory that stores commits, branch references, configuration, and recovery history.',
        'Git and GitHub are not the same thing. Git is the version control software that runs on your computer. GitHub, GitLab, and Bitbucket host Git repositories and add collaboration features such as pull requests, issue tracking, and access control. You can use Git without any hosting service, and the same Git commands work with different hosts.',
      ],
    },
    {
      label: 'Core model',
      title: 'Working tree, staging area, and repository',
      paragraphs: [
        'Most everyday Git operations move changes through three places. The <strong>working tree</strong> is the files currently checked out on disk. The <strong>staging area</strong>, also called the index, is the exact set of changes prepared for the next commit. The <strong>repository</strong> is the permanent commit history stored under <code>.git</code>.',
        'This separation is useful because you can edit several files but commit only the related changes. Run <code>git status</code> before and after each operation: it tells you which branch is checked out, which files are staged, and which changes are still only in the working tree.',
      ],
      items: [
        '<code>git diff</code> shows unstaged changes in the working tree.',
        '<code>git diff --staged</code> shows what the next commit will contain.',
        '<code>git add path</code> copies the selected change into the staging area.',
        '<code>git commit</code> records the staged snapshot and points the current branch at it.',
      ],
    },
    {
      label: 'Daily workflow',
      title: 'A small, inspectable commit cycle',
      paragraphs: [
        'A reliable workflow is to inspect, stage, inspect again, then commit. Avoid starting with <code>git add .</code> when the working tree contains unrelated edits: stage paths intentionally so each commit describes one change. The final <code>git status</code> confirms whether anything was left behind.',
      ],
      code: `git status
git diff
git add src/app.js tests/app.test.js
git diff --staged
git commit -m "Handle empty API responses"
git status`,
    },
    {
      label: 'Branches and HEAD',
      title: 'Branches are movable names for commits',
      paragraphs: [
        'A commit has an identifier and points to its parent commit. A branch such as <code>main</code> is a movable name that normally points to the newest commit in one line of development. <code>HEAD</code> identifies what is currently checked out. In normal work, HEAD points to a branch; when it points directly to a commit, Git reports a <em>detached HEAD</em>.',
        'Creating a branch does not copy the whole project. Git creates another lightweight reference to a commit. New commits move only the checked-out branch. Switching branches updates the working tree to match the selected commit, so commit or stash work that would be overwritten before switching.',
      ],
      code: `git switch -c fix/api-timeout
# edit, test, stage, and commit
git switch main
git merge fix/api-timeout`,
    },
    {
      label: 'Remotes',
      title: 'fetch, pull, and push move information between repositories',
      paragraphs: [
        'A remote is a saved name and URL for another Git repository. The conventional name <code>origin</code> has no special network behavior; it is simply the default name created by <code>git clone</code>. Remote-tracking names such as <code>origin/main</code> record the last remote state your local repository has fetched.',
        '<code>git fetch</code> downloads commits and updates remote-tracking names without changing your working branch. <code>git pull</code> fetches and then integrates the upstream branch by merge or rebase. <code>git push</code> asks the remote to move one of its branch names to a commit you have locally. A non-fast-forward rejection protects remote commits that your local branch has not integrated.',
      ],
      code: `git remote -v
git fetch origin
git log --oneline --decorate --graph --all -n 15
git pull --rebase origin main
git push origin main`,
    },
    {
      label: 'Safe recovery',
      title: 'Inspect before rewriting or deleting',
      paragraphs: [
        'Git retains more recovery information than the visible branch list suggests. Before using <code>reset --hard</code>, <code>clean</code>, or force push, create a temporary branch or stash if the current work may matter. Prefer <code>git restore</code> for a file, <code>git revert</code> for a shared commit, and <code>--force-with-lease</code> instead of plain <code>--force</code> when rewriting a branch is genuinely required.',
        'The reflog records recent movements of local references and HEAD. It can often recover a commit after an accidental reset, rebase, or branch deletion. Reflog is local to one repository and is eventually expired, so create a branch at the recovered commit as soon as you find it.',
      ],
      code: `git status
git branch backup-before-recovery
git reflog --date=local
git switch -c recovered-work <commit-id>`,
    },
    {
      label: 'Troubleshooting order',
      title: 'Identify the layer before applying a fix',
      paragraphs: [
        'Start with the exact error text and <code>git status</code>. Authentication errors occur before repository history can be exchanged; fix the remote URL, account, or SSH key first. Non-fast-forward errors mean authentication succeeded but histories differ. Merge conflicts mean Git downloaded both histories but could not combine particular lines automatically.',
      ],
      items: [
        'Cannot read from remote or publickey error: inspect <code>git remote -v</code> and test host authentication.',
        'Push rejected as non-fast-forward: fetch, compare the histories, then rebase or merge.',
        'Conflict during merge or rebase: resolve the marked files, stage them, and continue or abort.',
        'Commit or branch appears lost: stop rewriting history and inspect <code>git reflog</code>.',
      ],
    },
  ],
  related: [
    { href: '/git/push-rejected/', text: 'git push rejected (non-fast-forward) — diagnose and fix' },
    { href: '/git/permission-denied-publickey/', text: 'GitHub permission denied (publickey) — diagnose SSH' },
    { href: '/git/merge-conflict/', text: 'git merge conflict — resolve safely' },
    { href: '/git/detached-head/', text: 'git detached HEAD — save the current commit' },
    { href: '/git/recover-deleted-branch/', text: 'recover a deleted branch with reflog' },
  ],
};
