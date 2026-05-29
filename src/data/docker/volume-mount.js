export default {
  title: 'docker volume mount and bind mount — how to use',
  description: 'Mount volumes or bind directories into Docker containers using -v and --mount. Covers named volumes, bind mounts, and read-only mounts.',
  quickAnswer: `# Bind mount — map a host directory into the container
docker run -v $(pwd)/data:/app/data my-image

# Named volume — Docker manages the storage
docker run -v my-volume:/app/data my-image

# Read-only mount
docker run -v $(pwd)/config:/app/config:ro my-image`,
  when: {
    label: 'Usage',
    pre: 'You need persistent data storage, or to share files between the host and a container.',
  },
  details: [
    {
      title: 'Create and inspect named volumes',
      code: `# Create
docker volume create my-volume

# List
docker volume ls

# Inspect (shows mount path on host)
docker volume inspect my-volume`,
    },
    {
      title: '--mount syntax (more explicit)',
      code: `# Bind mount
docker run --mount type=bind,source=$(pwd)/data,target=/app/data my-image

# Named volume
docker run --mount type=volume,source=my-volume,target=/app/data my-image`,
    },
    {
      title: 'Docker Compose volumes',
      code: `# docker-compose.yml
services:
  db:
    image: postgres:16
    volumes:
      - pg-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro

volumes:
  pg-data:`,
    },
  ],
  related: [
    { href: '/docker/copy-files/', text: 'docker cp — copy files to/from container' },
    { href: '/docker/compose-env/', text: 'docker compose environment variables' },
    { href: '/docker/no-space-left/', text: 'docker no space left on device' },
  ],
};
