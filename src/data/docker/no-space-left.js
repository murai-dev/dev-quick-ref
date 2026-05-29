export default {
  title: 'docker no space left on device — how to fix',
  description: 'Fix "no space left on device" in Docker by pruning unused images, containers, volumes, and build cache with docker system prune.',
  quickAnswer: `# See how much Docker is using
docker system df

# Remove all stopped containers, unused images, networks, build cache
docker system prune -a

# Also remove unused volumes (data loss risk — check first)
docker system prune -a --volumes`,
  when: {
    error: `ERROR: failed to solve: failed to prepare ...:
write /var/lib/docker/tmp/...: no space left on device`,
    post: 'Docker has exhausted disk space. Unused images, stopped containers, and build cache accumulate over time.',
  },
  details: [
    {
      title: 'Prune selectively (safer)',
      code: `# Only dangling (untagged) images
docker image prune

# Only stopped containers
docker container prune

# Only build cache
docker builder prune

# Only unused volumes
docker volume prune`,
    },
    {
      title: 'Find large images',
      code: `docker images --format "{{.Repository}}:{{.Tag}}\\t{{.Size}}" | sort -k2 -h -r | head -20`,
    },
    {
      title: 'Move Docker data directory (Linux)',
      explanation: 'If the root partition is small, move Docker data to a larger disk.',
      code: `# /etc/docker/daemon.json
{
  "data-root": "/mnt/docker-data"
}
# Then: sudo systemctl restart docker`,
    },
  ],
  related: [
    { href: '/docker/prune-images/', text: 'docker image prune — remove unused images' },
    { href: '/docker/build-failed-no-such-file/', text: 'docker build failed — COPY no such file' },
  ],
};
