export default {
  title: 'docker get container IP address with docker inspect',
  metaTitle: 'docker get container IP address',
  description: 'Find a Docker container IP address from the host using docker inspect. Includes named networks, all container IPs, and why container names are usually better than IPs.',
  quickAnswer: `# Get a container's IP from the host
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-container

# Get a container IP on a named network
docker inspect -f '{{(index .NetworkSettings.Networks "my-net").IPAddress}}' my-container

# List IPs for all running containers
docker inspect $(docker ps -q) --format '{{.Name}}: {{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}'`,
  when: {
    label: 'Usage',
    pre: 'You need to know the Docker container IP address for debugging, direct connection, or checking which container is attached to a network.',
  },
  details: [
    {
      title: 'Get container IP from the host by name',
      explanation: 'Use the container name or ID with docker inspect. This is the most common answer for searches like "docker get container ip" and "docker container ip address command".',
      code: `docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-container

# If you only remember part of the name:
docker ps --format '{{.Names}}'
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-container`,
    },
    {
      title: 'IP on a specific named network',
      explanation: 'A container can be attached to more than one network. Query the network name when you need the IP on a specific Docker network.',
      code: `# Replace "my-net" with your network name
docker inspect -f '{{(index .NetworkSettings.Networks "my-net").IPAddress}}' my-container`,
    },
    {
      title: 'List all IPs for all running containers',
      explanation: 'Use this when you want a quick inventory of container names and IP addresses from the host.',
      code: `docker inspect $(docker ps -q) --format '{{.Name}}: {{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}'`,
    },
    {
      title: 'Get IP from inside the container',
      explanation: 'If you are already inside the container, hostname -i or ip addr can show the container-side address.',
      code: `docker exec my-container hostname -i
# or
docker exec my-container ip addr show eth0`,
    },
    {
      title: 'Prefer container names over IP addresses',
      explanation: 'On user-defined Docker networks, containers resolve each other by name. Names are more stable than IP addresses, which can change when containers restart.',
      code: `# Use the service/container name in connection strings
DATABASE_URL=postgres://db:5432/mydb   # "db" is the container name`,
    },
  ],
  related: [
    { href: '/docker/network-connect/', text: 'docker network — connect containers' },
    { href: '/docker/exec-container/', text: 'docker exec into a running container' },
  ],
};
