export default {
  title: 'bash: command not found — how to fix',
  description: 'Fix "bash: command not found" by checking PATH, installing the missing program, or using the full path to the binary.',
  quickAnswer: `# Check if the command exists anywhere on the system
which node           # shows path if found
command -v node      # POSIX-compatible version
type node            # also shows if it's an alias or function

# Check your PATH
echo $PATH

# If you just installed something, reload your shell config
source ~/.bashrc     # bash
source ~/.zshrc      # zsh`,
  when: {
    error: `bash: node: command not found
# or
zsh: command not found: python`,
    post: 'The shell cannot find the program in any directory listed in <code>$PATH</code>.',
  },
  details: [
    {
      title: 'Add a directory to PATH',
      code: `# Temporarily (current session only)
export PATH="$HOME/.local/bin:$PATH"

# Permanently — add to ~/.bashrc or ~/.zshrc
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc`,
    },
    {
      title: 'Install the missing command (Ubuntu/Debian)',
      code: `# Search for which package provides a command
apt-cache search node
sudo apt install nodejs

# Or use apt-file
sudo apt install apt-file
apt-file search bin/node`,
    },
    {
      title: 'Version manager installed but not initialised',
      explanation: 'Tools like nvm, rbenv, pyenv need to be initialized in your shell profile.',
      code: `# nvm — add to ~/.bashrc or ~/.zshrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

# Then reload
source ~/.bashrc`,
    },
  ],
  related: [
    { href: '/bash/permission-denied/', text: 'bash permission denied — chmod +x' },
    { href: '/bash/set-e-exit-on-error/', text: 'bash set -e — exit on error' },
  ],
};
