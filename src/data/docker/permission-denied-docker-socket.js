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
  sections: [
    {
      label: 'What is being denied',
      title: 'The Docker client cannot open the daemon control socket',
      paragraphs: [
        'On a typical Linux installation, the Docker CLI sends API requests to the daemon through <code>/var/run/docker.sock</code>. The socket is usually owned by <code>root:docker</code> and permits members of the <code>docker</code> group to connect. This error occurs before Docker evaluates an image or container command.',
        'Membership in the <code>docker</code> group is effectively root-level access: a user who can control the daemon can mount the host filesystem or start privileged containers. Add only trusted accounts, and prefer rootless Docker on shared or security-sensitive machines.',
      ],
    },
    {
      label: 'Diagnose first',
      title: 'Check the daemon, socket ownership, and current group session',
      paragraphs: [
        'A missing or inactive daemon can produce a similar connection failure, so confirm the service before changing permissions. The <code>id</code> output reflects groups active in the current login session; editing <code>/etc/group</code> does not update an already-running shell automatically.',
      ],
      code: `systemctl is-active docker
ls -l /var/run/docker.sock
id
getent group docker
docker context show`,
      items: [
        'If the service is inactive, start or troubleshoot the daemon instead of changing the socket mode.',
        'If your username appears in <code>getent group docker</code> but not in <code>id</code>, start a new login session or use <code>newgrp docker</code>.',
        'If the active Docker context is not the local default, inspect its endpoint with <code>docker context inspect</code>.',
      ],
    },
    {
      label: 'Apply the group change',
      title: 'Refresh the login session, then test a disposable container',
      paragraphs: [
        'After <code>usermod</code>, logging out and back in is the most predictable way to refresh all desktop and terminal processes. <code>newgrp docker</code> starts a subshell with the new primary group and is useful for an immediate terminal test, but other open applications keep their old group list.',
      ],
      code: `sudo usermod -aG docker "$USER"
newgrp docker
id
docker run --rm hello-world`,
    },
    {
      label: 'Unsafe workaround',
      title: 'Do not chmod the Docker socket to 666',
      paragraphs: [
        'Making <code>/var/run/docker.sock</code> writable by every local user exposes full daemon control and is usually reverted when Docker restarts. It treats the symptom while removing the access boundary. Restore normal ownership through the service configuration, then use the group or rootless mode deliberately.',
      ],
      code: `# Avoid this insecure workaround
# sudo chmod 666 /var/run/docker.sock

# Typical socket ownership
sudo chown root:docker /var/run/docker.sock
sudo chmod 660 /var/run/docker.sock`,
    },
    {
      label: 'Environment differences',
      title: 'Docker Desktop and rootless Docker use different endpoints',
      paragraphs: [
        'Docker Desktop on macOS and Windows does not use Linux host group membership in the same way. Confirm that Docker Desktop is running and that the selected context points to its managed socket. Rootless Docker uses a user-owned socket under <code>$XDG_RUNTIME_DIR</code>; set or select the endpoint created by the rootless setup rather than modifying <code>/var/run/docker.sock</code>.',
      ],
    },
  ],
  detailsLabel: 'Other approaches',
  details: [
    {
      title: 'Run with sudo (quick but not recommended)',
      explanation: 'Using sudo can confirm that the daemon is reachable, but it may create root-owned files in bind mounts and in <code>~/.docker</code>. Treat it as a diagnostic step rather than the permanent fix.',
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
