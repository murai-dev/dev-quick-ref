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
  ],
};
