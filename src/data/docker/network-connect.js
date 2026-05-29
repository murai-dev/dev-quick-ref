export default {
  title: 'docker network — connect containers to each other',
  description: 'Connect Docker containers on the same user-defined network so they can communicate by container name. Covers bridge networks and docker compose networking.',
  quickAnswer: `# Create a network
docker network create my-net

# Run containers on the same network
docker run -d --name db --network my-net postgres:16
docker run -d --name app --network my-net -p 3000:3000 my-app

# Containers can now reach each other by name
# app → postgres://db:5432/mydb`,
  when: {
    label: 'Usage',
    pre: 'Containers on the default bridge network cannot resolve each other by name. User-defined networks add automatic DNS.',
  },
  details: [
    {
      title: 'Inspect a network',
      code: `docker network ls
docker network inspect my-net`,
    },
    {
      title: 'Connect a running container to a network',
      code: `docker network connect my-net existing-container`,
    },
    {
      title: 'Docker Compose — automatic networking',
      explanation: 'Compose creates a default network for each project. Services can reach each other by service name.',
      code: `# docker-compose.yml
services:
  db:
    image: postgres:16
  app:
    image: my-app
    environment:
      DATABASE_URL: postgres://db:5432/mydb
# No explicit network needed — Compose handles it`,
    },
    {
      title: 'Expose a port to the host',
      code: `# -p HOST_PORT:CONTAINER_PORT
docker run -p 8080:3000 my-app
# Access at http://localhost:8080`,
    },
  ],
  related: [
    { href: '/docker/port-already-in-use/', text: 'docker port already allocated' },
    { href: '/docker/compose-env/', text: 'docker compose environment variables' },
    { href: '/docker/container-ip/', text: 'get container IP address' },
  ],
};
