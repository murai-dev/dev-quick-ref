export default {
  title: 'cannot connect to the Docker daemon — how to fix',
  description: 'Fix "Cannot connect to the Docker daemon at unix:///var/run/docker.sock" by starting the Docker daemon or Desktop app.',
  quickAnswer: `# macOS / Windows: start Docker Desktop
open -a Docker          # macOS
# Or launch Docker Desktop from Applications

# Linux: start the daemon
sudo systemctl start docker
sudo systemctl enable docker   # auto-start on boot

# Verify
docker info`,
  when: {
    error: `Cannot connect to the Docker daemon at unix:///var/run/docker.sock.
Is the docker daemon running?`,
    post: 'The Docker CLI cannot reach the daemon because it is not running, or the socket path is wrong.',
  },
  details: [
    {
      title: 'Check daemon status (Linux)',
      code: `sudo systemctl status docker
# If inactive:
sudo systemctl start docker`,
    },
    {
      title: 'Custom socket or remote daemon',
      explanation: 'If the daemon uses a custom socket or TCP address, set <code>DOCKER_HOST</code>:',
      code: `export DOCKER_HOST=unix:///run/user/1000/docker.sock
# or TCP
export DOCKER_HOST=tcp://192.168.1.10:2376`,
    },
    {
      title: 'Rootless Docker socket',
      code: `# The socket lives under the user runtime directory
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock`,
    },
  ],
  related: [
    { href: '/docker/permission-denied-docker-socket/', text: 'docker permission denied /var/run/docker.sock' },
    { href: '/docker/container-exits-immediately/', text: 'docker container exits immediately' },
  ],
};
