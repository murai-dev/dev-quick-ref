export default {
  title: 'docker logs — view container output',
  description: 'Use docker logs to view stdout/stderr output from a Docker container. Includes tail, follow, timestamps, and since options.',
  quickAnswer: `# View all logs
docker logs my-container

# Follow (stream) live logs
docker logs -f my-container

# Last 100 lines only
docker logs --tail 100 my-container

# With timestamps
docker logs -t my-container`,
  when: {
    label: 'Usage',
    pre: 'You need to see what a container printed to stdout/stderr — for debugging crashes, startup errors, or request logs.',
  },
  details: [
    {
      title: 'Logs since a time or duration',
      code: `# Logs from the last 30 minutes
docker logs --since 30m my-container

# Since an absolute timestamp
docker logs --since "2024-01-15T10:00:00" my-container

# Between two times
docker logs --since "2024-01-15T09:00:00" --until "2024-01-15T10:00:00" my-container`,
    },
    {
      title: 'Logs from a stopped container',
      code: `# Works the same way — container does not need to be running
docker ps -a   # find the container ID
docker logs <container-id>`,
    },
    {
      title: 'Configure log driver and size limit',
      explanation: 'By default Docker uses the <code>json-file</code> driver. Limit size to avoid disk exhaustion:',
      code: `# docker run
docker run --log-opt max-size=10m --log-opt max-file=3 my-image

# daemon-wide default in /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" }
}`,
    },
  ],
  related: [
    { href: '/docker/exec-container/', text: 'docker exec into a running container' },
    { href: '/docker/container-exits-immediately/', text: 'docker container exits immediately' },
    { href: '/docker/no-space-left/', text: 'docker no space left on device' },
  ],
};
