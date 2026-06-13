export default {
  title: 'docker permission denied socket /var/run/docker.sock — how to fix',
  description: 'Fix "docker permission denied socket" and "permission denied while trying to connect to the Docker daemon socket at /var/run/docker.sock" by adding your user to the docker group.',
  quickAnswer: `# Add your user to the docker group
sudo usermod -aG docker $USER

# Apply the new group (or log out and back in)
newgrp docker

# Verify
docker run --rm hello-world`,
  when: {
    error: `Got permission denied while trying to connect to the Docker daemon socket at
unix:///var/run/docker.sock: Post "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/create":
dial unix /var/run/docker.sock: connect: permission denied`,
    post: 'Your user does not have permission to access the Docker socket. Adding yourself to the <code>docker</code> group grants access without sudo. This is the usual "docker permission denied socket" error.',
  },
  detailsLabel: 'Other approaches',
  details: [
    {
      title: 'Run with sudo (quick but not recommended)',
      code: `sudo docker run --rm hello-world`,
    },
    {
      title: 'Check the docker group exists',
      code: `grep docker /etc/group
# If missing, create it:
sudo groupadd docker`,
    },
    {
      title: 'Rootless Docker — run Docker without root',
      explanation: 'Rootless mode runs the Docker daemon as a non-root user, improving security.',
      code: `# Install rootless Docker (Ubuntu/Debian)
dockerd-rootless-setuptool.sh install

# Add to your shell profile
export PATH=/usr/bin:$PATH
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock`,
    },
  ],
  related: [
    { href: '/docker/cannot-connect-daemon/', text: 'cannot connect to the Docker daemon' },
    { href: '/docker/container-exits-immediately/', text: 'docker container exits immediately' },
  ],
};
