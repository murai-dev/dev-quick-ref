export default {
  title: 'docker pass environment variables — --env-file and -e',
  description: 'Pass environment variables to Docker containers using -e for single values or --env-file for a file of KEY=VALUE pairs.',
  quickAnswer: `# Single variable
docker run -e NODE_ENV=production my-image

# Multiple variables
docker run -e NODE_ENV=production -e PORT=3000 my-image

# From a file
docker run --env-file .env my-image`,
  when: {
    label: 'Usage',
    pre: 'You need to inject configuration (API keys, database URLs, feature flags) into a container at runtime.',
  },
  details: [
    {
      title: '.env file format',
      explanation: 'The file is plain <code>KEY=VALUE</code>, one per line. Comments and blank lines are allowed.',
      code: `# .env
NODE_ENV=production
DATABASE_URL=postgres://user:pass@db:5432/mydb
SECRET_KEY=s3cr3t
# This line is a comment`,
    },
    {
      title: 'Pass a variable from the host environment',
      explanation: 'If you omit the value, Docker reads it from the host shell:',
      code: `export MY_TOKEN=abc123
docker run -e MY_TOKEN my-image
# Container sees MY_TOKEN=abc123`,
    },
    {
      title: 'Docker Compose env_file',
      code: `# docker-compose.yml
services:
  app:
    image: my-image
    env_file:
      - .env
      - .env.local`,
    },
    {
      title: 'Never bake secrets into images',
      explanation: 'Avoid <code>ENV SECRET=...</code> in Dockerfiles — it is visible in <code>docker history</code>.',
      code: `# Use --env-file or Docker secrets instead
docker run --env-file .env.production my-image`,
    },
  ],
  related: [
    { href: '/docker/compose-env/', text: 'docker compose environment variables' },
    { href: '/docker/exec-container/', text: 'docker exec into a running container' },
  ],
};
