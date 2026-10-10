export default {
  title: 'bash: no such file or directory — how to fix',
  description: 'Fix "bash: no such file or directory" by separating a missing path from a broken shebang, CRLF line endings, or an incompatible binary.',
  quickAnswer: `# Check the path, first line, and file type
target=./script.sh
pwd
ls -la "$target"
head -n 1 "$target"
file "$target"

# If the shebang contains CRLF, remove the carriage return
perl -pi -e 's/\r$//' "$target"`,
  when: {
    error: `-bash: ./script.sh: /bin/bash^M: bad interpreter: No such file or directory
# or simply
bash: ./script.sh: No such file or directory`,
    post: 'The message does not identify one single cause. The target path may be wrong, the first line may name an unavailable interpreter, or the file may contain a carriage return in its shebang. Check the exact file before changing permissions.',
  },
  sections: [
    {
      label: 'Diagnosis',
      title: 'Classify the missing path error',
      paragraphs: [
        'If <code>ls</code> cannot find the target, fix the path or filename first. If the file exists but running <code>./script.sh</code> fails, inspect its first line. The kernel uses the shebang to choose the interpreter, so a wrong path there produces the same "No such file or directory" wording.',
        'The <code>^M</code> marker means that a Windows carriage return became part of the interpreter path. That is different from a script that simply lacks execute permission, which normally produces "Permission denied".',
      ],
      code: `target=./script.sh
pwd
ls -la "$target"
head -n 1 "$target"
file "$target"`,
    },
    {
      label: 'Shebang',
      title: 'Use an interpreter that exists on the machine',
      paragraphs: [
        'Prefer <code>#!/usr/bin/env bash</code> when the script should use the first <code>bash</code> on <code>PATH</code>. If the script requires a specific interpreter location, verify that location with <code>command -v</code> before running it.',
      ],
      code: `head -n 1 script.sh
command -v bash
command -v env

# Run through bash while diagnosing the shebang
bash script.sh`,
    },
    {
      label: 'Line endings',
      title: 'Convert CRLF without changing the script logic',
      paragraphs: [
        'When <code>file script.sh</code> reports CRLF line terminators, convert the file and inspect the first line again. Configure the editor or repository to preserve LF line endings so the problem does not return.',
      ],
      code: `# One file
perl -pi -e 's/\r$//' script.sh

# Or use dos2unix when it is installed
dos2unix script.sh

head -n 1 script.sh
file script.sh`,
    },
    {
      label: 'Binary files',
      title: 'Check architecture and dynamic loader for binaries',
      paragraphs: [
        'A compiled binary can also report "No such file or directory" when its interpreter or dynamic loader is unavailable. In that case, checking the file type is more useful than changing the shell script permissions.',
      ],
      code: `file ./my-binary
ldd ./my-binary 2>&1 | head

# On macOS
otool -L ./my-binary`,
    },
  ],
  details: [
    {
      title: 'File really does not exist',
      explanation: 'Resolve relative paths from the current working directory. A script path that worked in an IDE or parent shell may fail when a task runner starts in a different directory.',
      code: `# Show exact path and check for typos
pwd
ls -la
# Check hidden files and similar names
find . -maxdepth 2 -name 'script.sh' -print`,
    },
    {
      title: 'Shebang points to wrong interpreter',
      explanation: 'The interpreter named after #! must exist and be executable. /usr/bin/env bash is usually more portable than hard-coding /bin/bash, but it still requires bash to be available on PATH.',
      code: `# Check what interpreter is being used
head -1 script.sh
# #!/usr/bin/env bash
# #!/bin/bash

# Find where bash actually is
command -v bash`,
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
