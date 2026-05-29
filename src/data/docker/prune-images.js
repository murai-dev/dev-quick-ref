export default {
  title: 'docker image prune — remove unused images',
  description: 'Free disk space by removing dangling and unused Docker images with docker image prune. Includes safe vs aggressive cleanup options.',
  quickAnswer: `# Remove only dangling (untagged) images — safe
docker image prune

# Remove ALL unused images (not referenced by any container)
docker image prune -a

# Skip the confirmation prompt
docker image prune -a -f`,
  when: {
    label: 'Usage',
    pre: 'Docker images pile up after repeated builds. Use prune to reclaim disk space.',
  },
  details: [
    {
      title: 'Check disk usage before pruning',
      code: `docker system df
# TYPE            TOTAL   ACTIVE   SIZE     RECLAIMABLE
# Images          23      5        14.2GB   11.8GB (83%)
# Containers      3       2        1.2MB    600kB (50%)
# Local Volumes   8       3        2.1GB    1.5GB (71%)
# Build Cache     ...`,
    },
    {
      title: 'Remove images older than N days',
      code: `# Remove images unused for more than 48 hours
docker image prune -a --filter "until=48h"`,
    },
    {
      title: 'Delete a specific image',
      code: `docker rmi my-image:latest

# Force-remove even if a container uses it
docker rmi -f my-image:latest`,
    },
    {
      title: 'Remove all images (nuclear option)',
      code: `docker images -q | xargs docker rmi -f`,
    },
  ],
  related: [
    { href: '/docker/no-space-left/', text: 'docker no space left on device' },
    { href: '/docker/remove-all-stopped/', text: 'remove all stopped containers' },
    { href: '/docker/image-not-found/', text: 'docker image not found' },
  ],
};
