export default {
  title: 'git merge conflict — how to resolve',
  description: 'Resolve a git merge conflict by editing the conflicted files, removing conflict markers, then running git add and git merge --continue.',
  quickAnswer: `# 1. See which files have conflicts
git status

# 2. Open each conflicted file and edit it
#    Remove <<<<<<<, =======, >>>>>>> markers and keep what you want

# 3. Mark as resolved and finish the merge
git add .
git merge --continue`,
  when: {
    error: `CONFLICT (content): Merge conflict in src/app.ts
Automatic merge failed; fix conflicts and then commit the result.`,
    post: 'Git stopped the merge because the same lines were changed on both branches. You must manually choose which version to keep.',
  },
  details: [
    {
      title: 'What the conflict markers mean',
      code: `<<<<<<< HEAD
your changes on the current branch
=======
incoming changes from the branch being merged
>>>>>>> feature-branch`,
    },
    {
      title: 'Use a visual merge tool',
      explanation: 'If you prefer a GUI, open the conflict in VS Code or run a diff tool.',
      code: `git mergetool            # opens the configured merge tool
# or open in VS Code:
code .                   # then click "Resolve in Merge Editor"`,
    },
    {
      title: 'Abort the merge and start over',
      code: `git merge --abort        # restores the state before git merge`,
    },
  ],
  related: [
    { href: '/git/rebase-abort/', text: 'git rebase --abort' },
    { href: '/git/pull-rebase-vs-merge/', text: 'git pull --rebase vs --merge' },
    { href: '/git/squash-commits/', text: 'git squash commits before merging' },
  ],
};
