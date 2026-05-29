export default {
  title: 'docker port already allocated — how to fix',
  description: 'Fix "Bind for 0.0.0.0:PORT failed: port is already allocated" in Docker by finding and stopping the process using that port.',
  quickAnswer: `# Find what is using the port (e.g. 8080)
sudo lsof -i :8080
# or
ss -tlnp | grep 8080

# Stop the conflicting container
docker ps | grep 8080
docker stop <container-id>

# Or kill the non-Docker process
sudo kill -9 <PID>`,
  when: {
    error: `Error response from daemon: driver failed programming external connectivity on endpoint my-app:
Bind for 0.0.0.0:8080 failed: port is already allocated`,
    post: 'Another process or Docker container is already listening on the same host port.',
  },
  details: [
    {
      title: 'Use a different host port',
      explanation: 'Map a different host port to the same container port:',
      code: `# Map host port 8081 → container port 8080
docker run -p 8081:8080 my-image`,
    },
    {
      title: 'Stop all containers on a given port',
      code: `docker ps --filter "publish=8080" -q | xargs docker stop`,
    },
    {
      title: 'On macOS: AirPlay Receiver uses port 5000 / 7000',
      explanation: 'Disable AirPlay Receiver in System Settings → General → AirDrop & Handoff.',
      code: `# Verify
sudo lsof -iTCP:5000 -sTCP:LISTEN`,
    },
  ],
  related: [
    { href: '/docker/cannot-connect-daemon/', text: 'cannot connect to the Docker daemon' },
    { href: '/docker/container-name-in-use/', text: 'container name is already in use' },
    { href: '/docker/network-connect/', text: 'connect containers on the same network' },
  ],
};
