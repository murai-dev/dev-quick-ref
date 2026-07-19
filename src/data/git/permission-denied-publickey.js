export default {
  title: 'GitHub / git permission denied (publickey) — how to fix',
  description: 'Fix GitHub or git permission denied (publickey) by adding your SSH key to ssh-agent and registering the public key on GitHub or GitLab. Includes macOS Keychain setup.',
  quickAnswer: `# 1. Start ssh-agent and load your key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 2. Copy your public key — paste it into GitHub / GitLab
cat ~/.ssh/id_ed25519.pub
#    GitHub  → Settings → SSH and GPG keys → New SSH key
#    GitLab  → Preferences → SSH Keys → Add new key

# 3. Verify the connection
ssh -T git@github.com
# Expected: Hi <username>! You've successfully authenticated...`,
  when: {
    pre: 'You run <code>git push</code>, <code>git pull</code>, or <code>git clone</code> over SSH and GitHub shows a publickey error such as:',
    error: `git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.`,
    post: 'Git cannot authenticate because it cannot find or use your SSH private key. This is the common GitHub "permission denied publickey" failure.',
  },
  sections: [
    {
      label: 'What the error means',
      title: 'The SSH connection reached the host but no accepted key was offered',
      paragraphs: [
        'SSH authentication happens before Git can read repository history. GitHub receives one or more public-key offers from your SSH client and accepts a connection only when a matching public key is registered to an account that can access the repository. The error can therefore come from a missing key, an unloaded key, the wrong account, the wrong host alias, or missing repository permission.',
        'Do not regenerate keys immediately. First identify the remote host and the keys your client is actually offering. Replacing a working key can break access to other repositories without fixing the real cause.',
      ],
    },
    {
      label: 'Diagnostic sequence',
      title: 'Check the remote, agent, and SSH handshake in that order',
      paragraphs: [
        'The remote URL tells you whether this repository uses SSH at all. The agent listing shows which identities are currently loaded. Verbose SSH output then shows which configuration files and identity files are selected. The diagnostic command does not push code or change the repository.',
      ],
      code: `git remote -v
ssh-add -l
ssh -vT git@github.com`,
      items: [
        'An <code>https://</code> remote does not use SSH keys; it uses HTTPS credentials instead.',
        '<code>The agent has no identities</code> means a key must be loaded with <code>ssh-add</code>.',
        '<code>Offering public key</code> in verbose output identifies the key SSH attempted.',
        'A successful GitHub test names the authenticated account, which may reveal that the wrong account is active.',
      ],
    },
    {
      label: 'Load the intended key',
      title: 'Use a key file that exists and protect its permissions',
      paragraphs: [
        'Private keys must remain on your computer. Register only the matching <code>.pub</code> file with the hosting provider. OpenSSH may ignore a private key that is readable by other users, so keep the <code>~/.ssh</code> directory and key permissions restrictive.',
      ],
      code: `ls -la ~/.ssh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh-add -l`,
    },
    {
      label: 'Multiple accounts',
      title: 'Give each GitHub account an explicit SSH host alias',
      paragraphs: [
        'When personal and work accounts use different keys, relying on whichever key the agent offers first is fragile. Define one host alias per account, bind it to a specific identity, and use that alias in the repository remote URL. <code>IdentitiesOnly yes</code> prevents SSH from trying unrelated agent keys first.',
      ],
      code: `# ~/.ssh/config
Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_work
  IdentitiesOnly yes

# Repository remote
git remote set-url origin git@github-work:company/repository.git
ssh -T git@github-work`,
    },
    {
      label: 'Repository access',
      title: 'Successful SSH authentication does not guarantee repository permission',
      paragraphs: [
        'If <code>ssh -T</code> succeeds but clone, fetch, or push still fails, verify the owner and repository path in <code>git remote -v</code>. Confirm that the authenticated account is a collaborator or organization member and that any organization single sign-on requirement has been authorized for the key. Read access may permit fetch while branch protection or role settings still block push.',
      ],
    },
    {
      label: 'Verification',
      title: 'Test authentication, remote reads, then the intended Git operation',
      paragraphs: [
        'Verify one layer at a time. A successful host test confirms the account identity. <code>git ls-remote</code> confirms that account can read this repository without altering it. Only then retry pull or push. This keeps authentication failures separate from later history errors such as non-fast-forward rejection.',
      ],
      code: `ssh -T git@github.com
git ls-remote origin HEAD
git fetch origin`,
    },
  ],
  detailsLabel: 'Other causes &amp; fixes',
  details: [
    {
      title: 'No SSH key exists yet',
      code: `# Check if you already have a key
ls ~/.ssh/id_*.pub

# If nothing is listed, generate one
ssh-keygen -t ed25519 -C "you@example.com"`,
    },
    {
      title: 'macOS: key lost after reboot',
      explanation: 'On macOS the ssh-agent resets on restart. Add this to <code>~/.ssh/config</code> to load the key automatically via Keychain:',
      code: `Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519`,
    },
    {
      title: 'Remote URL is HTTPS, not SSH',
      explanation: 'If the remote URL starts with <code>https://</code>, Git uses a password/token prompt instead of SSH keys.',
      code: `# Check current URL
git remote -v

# Switch to SSH
git remote set-url origin git@github.com:user/repo.git`,
    },
  ],
  related: [
    { href: '/git/ssl-certificate-error/', text: 'git SSL certificate problem — fix' },
    { href: '/git/remote-change-url/', text: 'git remote change URL' },
    { href: '/git/clone-specific-branch/', text: 'git clone a specific branch' },
    { href: '/git/push-rejected/', text: 'git push rejected (non-fast-forward) — fix' },
    { href: '/git/git-basics/', text: 'Git basics — repositories, remotes, and authentication layers' },
  ],
};
