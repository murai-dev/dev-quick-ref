export default {
  title: 'bash kill process by port number',
  description: 'Kill the process listening on a specific port using lsof, fuser, or ss. Works on Linux and macOS.',
  quickAnswer: `# macOS / Linux — find and kill by port
kill -9 $(lsof -t -i:8080)

# Linux alternative using fuser
fuser -k 8080/tcp

# Check what is on the port first
lsof -i :8080
# or
ss -tlnp | grep 8080`,
  when: {
    label: 'Usage',
    pre: 'A development server is still running from a previous session and blocking the port.',
  },
  details: [
    {
      title: 'Find PID without killing',
      code: `# Get PID(s) listening on port 3000
lsof -t -i:3000

# More detail: PID, process name, user
lsof -i :3000

# Linux: netstat alternative
ss -tlnp | grep :3000`,
    },
    {
      title: 'Kill gracefully first, then force',
      code: `pid=$(lsof -t -i:8080)
kill $pid           # SIGTERM — graceful shutdown
sleep 2
kill -9 $pid 2>/dev/null || true  # SIGKILL if still running`,
    },
    {
      title: 'Multiple processes on the same port',
      code: `# lsof -t returns multiple PIDs
lsof -t -i:8080 | xargs kill -9`,
    },
  ],
  related: [
    { href: '/bash/check-exit-code/', text: 'check exit code ($?)' },
    { href: '/bash/find-files/', text: 'find files by name or extension' },
    { href: '/docker/port-already-in-use/', text: 'docker port already allocated' },
  ],
};
