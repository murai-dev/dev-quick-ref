export default {
  title: 'docker remove all stopped containers',
  description: 'Remove all stopped Docker containers with docker container prune or docker rm. Includes filtering by status and bulk removal.',
  quickAnswer: `# Remove all stopped containers (with confirmation prompt)
docker container prune

# Remove all stopped containers without confirmation
docker container prune -f

# Or remove specific containers
docker rm container1 container2`,
  when: {
    label: 'Usage',
    pre: 'Stopped containers accumulate and waste disk space. Clean them up regularly.',
  },
  details: [
    {
      title: 'List stopped containers first',
      code: `# Show only stopped containers
docker ps -a --filter "status=exited"

# Show container IDs only (for piping)
docker ps -a -q --filter "status=exited"`,
    },
    {
      title: 'Remove all stopped containers with xargs',
      code: `docker ps -a -q --filter "status=exited" | xargs docker rm`,
    },
    {
      title: 'Remove containers AND their volumes',
      code: `docker rm -v my-container
# -v also removes anonymous volumes attached to the container`,
    },
    {
      title: 'Remove everything unused (containers, images, networks, cache)',
      code: `docker system prune -a`,
    },
  ],
  related: [
    { href: '/docker/prune-images/', text: 'docker image prune — remove unused images' },
    { href: '/docker/no-space-left/', text: 'docker no space left on device' },
    { href: '/docker/container-name-in-use/', text: 'container name already in use' },
  ],
};
