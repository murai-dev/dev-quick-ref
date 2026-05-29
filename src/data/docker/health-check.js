export default {
  title: 'docker HEALTHCHECK — add container health check',
  description: 'Add a HEALTHCHECK instruction to your Dockerfile so Docker monitors container health and restarts unhealthy containers automatically.',
  quickAnswer: `# Dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1`,
  when: {
    label: 'Usage',
    pre: 'You want Docker (or an orchestrator like Compose/Kubernetes) to detect when a container is no longer serving traffic correctly.',
  },
  details: [
    {
      title: 'HEALTHCHECK options explained',
      code: `HEALTHCHECK \\
  --interval=30s   \\ # how often to check (default 30s)
  --timeout=5s     \\ # time limit per check (default 30s)
  --start-period=10s \\ # grace period after start (default 0s)
  --retries=3      \\ # failures before "unhealthy" (default 3)
  CMD curl -f http://localhost/health || exit 1`,
    },
    {
      title: 'Check health status',
      code: `docker inspect --format '{{.State.Health.Status}}' my-container
# healthy | unhealthy | starting

# Show last few health log entries
docker inspect --format '{{range .State.Health.Log}}{{.Output}}{{end}}' my-container`,
    },
    {
      title: 'Docker Compose healthcheck',
      code: `# docker-compose.yml
services:
  app:
    image: my-app
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s`,
    },
    {
      title: 'Disable an inherited healthcheck',
      code: `# In a child image or Compose override
HEALTHCHECK NONE`,
    },
  ],
  related: [
    { href: '/docker/container-exits-immediately/', text: 'docker container exits immediately' },
    { href: '/docker/view-logs/', text: 'docker logs — view container output' },
    { href: '/docker/compose-env/', text: 'docker compose environment variables' },
  ],
};
