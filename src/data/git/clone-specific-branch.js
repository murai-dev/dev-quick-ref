export default {
  title: 'git clone a specific branch',
  description: 'Clone one Git branch with git clone --branch, verify the remote branch name, and fix invalid reference or missing master branch errors.',
  quickAnswer: `# Check the branch name before cloning
git ls-remote --heads https://github.com/user/repo.git

# Clone one existing branch
git clone --branch feature/login --single-branch https://github.com/user/repo.git`,
  when: {
    label: 'When to use this',
    error: `fatal: Remote branch master not found in upstream origin
fatal: invalid reference: master
fatal: reference is not a tree: origin/master`,
    post: 'You only need one branch of a large repository, or you want to clone a non-default branch directly.',
  },
  sections: [
    {
      label: 'Branch names',
      title: 'Check the remote ref instead of guessing main or master',
      paragraphs: [
        'The default branch is not always named <code>main</code> or <code>master</code>. An invalid reference error means that Git cannot resolve the name you supplied to a branch, tag, or commit in the current repository.',
        'List the remote heads before choosing the branch. This also catches spelling and case differences in names such as <code>feature/Login</code> and <code>feature/login</code>.',
      ],
      code: `# Before cloning
git ls-remote --heads https://github.com/user/repo.git

# After a remote already exists
git remote -v
git fetch origin
git branch --remote`,
    },
    {
      label: 'Clone',
      title: 'Clone an existing branch and verify the checkout',
      paragraphs: [
        'Pass the exact branch name to <code>--branch</code>. Add <code>--single-branch</code> when the repository does not need other remote branches, such as a focused CI checkout.',
      ],
      code: `git clone --branch feature/login --single-branch https://github.com/user/repo.git
cd repo
git branch --show-current
git log -1 --oneline`,
    },
    {
      label: 'Existing clone',
      title: 'Create a local branch from a remote branch',
      paragraphs: [
        'If the repository is already cloned, fetch the remote ref and create a local tracking branch. Do not run <code>git switch master</code> until <code>origin/master</code> appears in the remote branch list.',
      ],
      code: `git fetch origin
git branch --remote

git switch --track -c feature/login origin/feature/login`,
    },
    {
      label: 'History',
      title: 'Fetch more history when the object is missing',
      paragraphs: [
        'A valid branch name can still point to an object that a shallow clone does not have locally. If the failure involves an older commit, fetch more history or convert the clone before retrying.',
      ],
      code: `git rev-parse --is-shallow-repository
git fetch --deepen=100 origin

# If the full history is required
git fetch --unshallow origin`,
    },
  ],
  details: [
    {
      title: 'Clone with only the latest commit (shallow + single branch)',
      explanation: 'Fastest option for CI/CD — downloads only the tip of one branch.',
      code: `git clone --depth 1 --branch feature/login --single-branch https://github.com/user/repo.git`,
    },
    {
      title: 'Switch to a different branch after cloning',
      explanation: 'Fetch the remote branch first, then create a local branch that tracks it. If the fetch reports that the branch does not exist, verify the exact remote name with git branch --remote.',
      code: `git fetch origin other-branch
git switch --track -c other-branch origin/other-branch`,
    },
    {
      title: 'Clone a specific tag',
      explanation: 'Checking out a tag leaves the repository in detached HEAD state. Create a branch before committing changes.',
      code: `git clone --branch v2.1.0 --single-branch https://github.com/user/repo.git
cd repo
git switch -c work-from-v2.1.0`,
    },
  ],
  related: [
    { href: '/git/shallow-to-full-clone/', text: 'git convert shallow clone to full history' },
    { href: '/git/remote-change-url/', text: 'git remote change URL' },
    { href: '/git/permission-denied-publickey/', text: 'git permission denied (publickey) — fix' },
  ],
};
