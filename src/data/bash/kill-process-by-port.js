export default {
  title: 'bash kill process on port 3000 or 8080',
  metaTitle: 'bash kill process on port 3000 or 8080',
  description: 'Find and kill the process listening on a port such as 3000 or 8080. Commands for macOS, Linux, Ubuntu, and Git Bash on Windows.',
  quickAnswer: `# macOS / Linux — kill the process listening on port 3000
kill -9 $(lsof -t -i:3000)

# Change 3000 to 8080, 8000, 5000, or any blocked port
kill -9 $(lsof -t -i:8080)

# Linux alternative using fuser
fuser -k 8080/tcp

# Check what is on the port first
lsof -i :3000
# or
ss -tlnp | grep :3000`,
  when: {
    label: 'Usage',
    pre: 'A development server is still running from a previous session and blocking a port such as 3000, 8080, 8000, or 5000.',
  },
  details: [
    {
      title: 'Find PID without killing the process',
      explanation: 'Start here when you want to see which command owns the port before killing it.',
      code: `# Get PID(s) listening on port 3000
lsof -t -i:3000

# More detail: PID, process name, user
lsof -i :3000

# Linux: netstat alternative
ss -tlnp | grep :3000`,
    },
    {
      title: 'Kill gracefully first, then force',
      explanation: 'SIGTERM gives the process a chance to shut down cleanly. Use kill -9 only when the process ignores the normal signal.',
      code: `pid=$(lsof -t -i:8080)
kill $pid           # SIGTERM — graceful shutdown
sleep 2
kill -9 $pid 2>/dev/null || true  # SIGKILL if still running`,
    },
    {
      title: 'Kill every process using the same port',
      explanation: 'lsof can return multiple PIDs. Pipe them to xargs when a port has more than one listener or related process.',
      code: `# lsof -t returns multiple PIDs
lsof -t -i:8080 | xargs kill -9`,
    },
    {
      title: 'Git Bash on Windows: kill process by port',
      explanation: 'In Git Bash on Windows, lsof is usually not available. Use Windows netstat and taskkill from the same terminal.',
      code: `# Find the PID using port 3000
netstat -ano | findstr :3000

# Replace 12345 with the PID from the last column
taskkill //PID 12345 //F`,
    },
  ],
  related: [
    { href: '/bash/check-exit-code/', text: 'check exit code ($?)' },
    { href: '/bash/find-files/', text: 'find files by name or extension' },
    { href: '/docker/port-already-in-use/', text: 'docker port already allocated' },
  ],
};
