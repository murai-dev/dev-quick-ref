export default {
  title: 'bash permission denied — how to fix (chmod +x)',
  description: 'Fix "bash: ./script.sh: Permission denied" by adding execute permission with chmod +x. Covers common permission issues and setuid.',
  quickAnswer: `# Add execute permission for the owner
chmod +x script.sh

# Run it
./script.sh

# Or run without changing permissions
bash script.sh`,
  when: {
    error: `bash: ./script.sh: Permission denied
# or
zsh: permission denied: ./script.sh`,
    post: 'The file does not have the execute bit set. You can either add it with chmod, or run the script by passing it to bash explicitly.',
  },
  details: [
    {
      title: 'Check current permissions',
      code: `ls -la script.sh
# -rw-r--r-- 1 user group 512 Jan 1 12:00 script.sh
#  ^^^ no x — not executable

# After chmod +x:
# -rwxr-xr-x 1 user group 512 Jan 1 12:00 script.sh`,
    },
    {
      title: 'chmod permission modes',
      code: `chmod +x script.sh          # add execute for all
chmod u+x script.sh         # add execute for owner only
chmod 755 script.sh         # rwxr-xr-x (owner:rwx, others:r-x)
chmod 700 script.sh         # rwx------ (owner only)`,
    },
    {
      title: 'File on a noexec-mounted filesystem',
      explanation: 'If the file lives on a filesystem mounted with <code>noexec</code> (common for /tmp or NFS), chmod +x will not help.',
      code: `# Check mount options
mount | grep noexec

# Copy the script to a normal filesystem first
cp /tmp/script.sh ~/script.sh && chmod +x ~/script.sh && ~/script.sh`,
    },
  ],
  related: [
    { href: '/bash/command-not-found/', text: 'bash: command not found' },
    { href: '/bash/no-such-file/', text: 'bash: no such file or directory' },
    { href: '/bash/check-exit-code/', text: 'check exit code of last command ($?)' },
  ],
};
