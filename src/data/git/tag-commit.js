export default {
  title: 'git tag a specific commit — create and push tags',
  description: 'Tag a specific git commit with git tag and push it to the remote. Covers annotated tags, listing tags, and deleting tags.',
  quickAnswer: `# Tag the current HEAD (most common)
git tag v1.0.0

# Tag a specific commit by hash
git tag v1.0.0 abc1234

# Push the tag to remote
git push origin v1.0.0

# Push all local tags at once
git push origin --tags`,
  when: {
    label: 'When to use this',
    post: 'You want to mark a release point in history, so you can easily reference it later with <code>git checkout v1.0.0</code>.',
  },
  details: [
    {
      title: 'Annotated tag (recommended for releases)',
      explanation: 'Annotated tags store the tagger name, date, and message — unlike lightweight tags.',
      code: `git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0`,
    },
    {
      title: 'List all tags',
      code: `git tag -l
git tag -l "v1.*"    # filter by pattern`,
    },
    {
      title: 'Delete a tag locally and on the remote',
      code: `git tag -d v1.0.0                        # delete local
git push origin --delete v1.0.0          # delete remote`,
    },
  ],
  related: [
    { href: '/git/cherry-pick/', text: 'git cherry-pick a specific commit' },
    { href: '/git/show-file-at-commit/', text: 'git show file at a specific commit' },
    { href: '/git/push-rejected/', text: 'git push rejected — fix' },
  ],
};
