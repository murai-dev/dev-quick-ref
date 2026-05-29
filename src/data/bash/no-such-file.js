export default {
  title: 'bash: no such file or directory — how to fix',
  description: 'Fix "bash: no such file or directory" caused by wrong path, missing file, Windows line endings (CRLF), or a missing interpreter.',
  quickAnswer: `# Verify the file exists and check the exact path
ls -la script.sh

# Check for Windows line endings (CRLF) in the shebang line
file script.sh
# If it says "CRLF line terminators", convert:
sed -i 's/\r//' script.sh
# or
dos2unix script.sh`,
  when: {
    error: `-bash: ./script.sh: /bin/bash^M: bad interpreter: No such file or directory
# or simply
bash: ./script.sh: No such file or directory`,
    post: 'The <code>^M</code> (carriage return) means the file was created on Windows. The shebang interpreter path is <code>/bin/bash\r</code> which does not exist.',
  },
  details: [
    {
      title: 'File really does not exist',
      code: `# Show exact path and check for typos
pwd
ls -la
# Check hidden files
ls -la | grep script`,
    },
    {
      title: 'Shebang points to wrong interpreter',
      code: `# Check what interpreter is being used
head -1 script.sh
# #!/usr/bin/env bash   ← correct, portable
# #!/bin/bash           ← works on most Linux systems

# Find where bash actually is
which bash
# /usr/bin/bash   (not /bin/bash on some systems)`,
    },
    {
      title: 'Wrong architecture binary',
      explanation: 'If you run a binary compiled for a different CPU architecture (e.g. arm64 on x86), you get this error.',
      code: `file ./my-binary
# ELF 64-bit LSB executable, ARM aarch64 ← wrong arch for x86-64`,
    },
  ],
  related: [
    { href: '/bash/permission-denied/', text: 'bash permission denied — chmod +x' },
    { href: '/bash/command-not-found/', text: 'bash: command not found' },
  ],
};
