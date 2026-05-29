export default {
  title: 'docker container name already in use — how to fix',
  description: 'Fix "container name is already in use" by removing the existing container or using --rm / a different name.',
  quickAnswer: `# Remove the existing container
docker rm my-container

# Or stop it first, then remove
docker stop my-container && docker rm my-container

# Auto-remove when the container exits (for one-off runs)
docker run --rm --name my-container my-image`,
  when: {
    error: `docker: Error response from daemon: Conflict. The container name "/my-container"
is already in use by container "abc123". You have to remove (or rename) that
container to be able to reuse that name.`,
    post: 'A stopped (but not removed) container is holding the name. Stopped containers persist until explicitly removed.',
  },
  details: [
    {
      title: 'List all containers including stopped ones',
      code: `docker ps -a
# CONTAINER ID   IMAGE    STATUS   NAMES
# abc123         my-image Exited   my-container  ← this one`,
    },
    {
      title: 'Rename instead of remove',
      code: `docker rename my-container my-container-old
docker run --name my-container my-image`,
    },
    {
      title: 'Remove all stopped containers',
      code: `docker container prune`,
    },
  ],
  related: [
    { href: '/docker/container-exits-immediately/', text: 'docker container exits immediately' },
    { href: '/docker/view-logs/', text: 'docker logs — view container output' },
    { href: '/docker/remove-all-stopped/', text: 'remove all stopped containers' },
  ],
};
