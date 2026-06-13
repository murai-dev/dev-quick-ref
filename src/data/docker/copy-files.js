export default {
  title: 'docker cp — copy files between container and host',
  description: 'Use docker cp to copy files or directories between a Docker container and the host, including "docker copy file from container" cases. Works with running or stopped containers.',
  quickAnswer: `# Host → container
docker cp ./local-file.txt my-container:/app/file.txt

# Container → host
docker cp my-container:/app/logs/error.log ./error.log

# Copy a whole directory
docker cp my-container:/app/dist ./dist`,
  when: {
    label: 'Usage',
    pre: 'You need to copy config files, logs, or build artifacts between your host and a container, such as copying a file from a container to the host.',
  },
  details: [
    {
      title: 'Copy works on stopped containers too',
      code: `# Even if the container is not running
docker ps -a | grep my-container   # Exited
docker cp my-container:/app/config.json ./config.json`,
    },
    {
      title: 'Directory trailing slash behavior',
      explanation: 'Adding a trailing <code>/</code> to the source copies the directory contents (not the directory itself).',
      code: `# Copies the dist/ directory itself
docker cp my-container:/app/dist ./

# Copies the contents of dist/ into ./dist-output/
docker cp my-container:/app/dist/. ./dist-output/`,
    },
    {
      title: 'Use volumes for persistent sharing instead',
      code: `# Bind mount — changes are reflected instantly in both directions
docker run -v $(pwd)/data:/app/data my-image`,
    },
  ],
  related: [
    { href: '/docker/exec-container/', text: 'docker exec into a running container' },
    { href: '/docker/volume-mount/', text: 'docker volume mount / bind mount' },
    { href: '/docker/view-logs/', text: 'docker logs — view container output' },
  ],
};
