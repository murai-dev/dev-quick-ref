export default {
  title: 'docker exec — run a command inside a running container',
  description: 'Use docker exec to open a shell or run a command inside a running Docker container. Covers interactive shell, one-off commands, and running as a specific user.',
  quickAnswer: `# Open an interactive shell
docker exec -it <container-name-or-id> /bin/bash

# If bash is not available (Alpine-based images)
docker exec -it <container> /bin/sh

# Run a one-off command
docker exec my-container ls /app`,
  when: {
    label: 'Usage',
    pre: 'You need to inspect files, run a migration, or debug a running container.',
  },
  details: [
    {
      title: 'Find the container name or ID',
      code: `docker ps
# CONTAINER ID   IMAGE    STATUS    NAMES
# d3f9a1b2c3d4   nginx    Up 5m     web`,
    },
    {
      title: 'Run as a specific user',
      code: `docker exec -it --user root my-container /bin/bash
docker exec -it --user 1000:1000 my-container /bin/sh`,
    },
    {
      title: 'Set environment variables',
      code: `docker exec -it -e DEBUG=true my-container /bin/bash`,
    },
    {
      title: 'Exec into a container by partial ID',
      code: `# You only need enough characters to be unique
docker exec -it d3f9 /bin/bash`,
    },
  ],
  related: [
    { href: '/docker/view-logs/', text: 'docker logs — view container output' },
    { href: '/docker/copy-files/', text: 'docker cp — copy files to/from container' },
    { href: '/docker/container-exits-immediately/', text: 'docker container exits immediately' },
  ],
};
