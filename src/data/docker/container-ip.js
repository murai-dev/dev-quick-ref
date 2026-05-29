export default {
  title: 'docker get container IP address',
  description: 'Get the IP address of a running Docker container using docker inspect, or find the gateway and container IPs on a network.',
  quickAnswer: `# Get a container's IP on the default bridge
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-container

# Shorter alias
docker inspect my-container | grep -i ipaddress`,
  when: {
    label: 'Usage',
    pre: 'You need to know the IP address of a container for debugging or direct connection.',
  },
  details: [
    {
      title: 'IP on a specific named network',
      code: `# Replace "my-net" with your network name
docker inspect -f '{{(index .NetworkSettings.Networks "my-net").IPAddress}}' my-container`,
    },
    {
      title: 'List all IPs for all running containers',
      code: `docker inspect $(docker ps -q) --format '{{.Name}}: {{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}'`,
    },
    {
      title: 'Get IP from inside the container',
      code: `docker exec my-container hostname -i
# or
docker exec my-container ip addr show eth0`,
    },
    {
      title: 'Prefer container names over IPs',
      explanation: 'On user-defined networks, containers resolve each other by name — more reliable than IP.',
      code: `# Use the service/container name in connection strings
DATABASE_URL=postgres://db:5432/mydb   # "db" is the container name`,
    },
  ],
  related: [
    { href: '/docker/network-connect/', text: 'docker network — connect containers' },
    { href: '/docker/exec-container/', text: 'docker exec into a running container' },
  ],
};
