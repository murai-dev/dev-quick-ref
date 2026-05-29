export default {
  title: 'docker compose environment variables — how to set',
  description: 'Set environment variables in docker compose using env_file, environment key, .env file substitution, and override files.',
  quickAnswer: `# docker-compose.yml — inline values
services:
  app:
    image: my-app
    environment:
      NODE_ENV: production
      PORT: "3000"

# Or load from a file
    env_file:
      - .env`,
  when: {
    label: 'Usage',
    pre: 'You need to configure services differently per environment (dev / staging / prod) without hardcoding values in the Compose file.',
  },
  details: [
    {
      title: 'Variable substitution from .env',
      explanation: 'Compose automatically reads <code>.env</code> in the project directory for variable substitution in the YAML:',
      code: `# .env
POSTGRES_VERSION=16
DB_NAME=myapp

# docker-compose.yml
services:
  db:
    image: postgres:${'{POSTGRES_VERSION}'}
    environment:
      POSTGRES_DB: ${'{DB_NAME}'}`,
    },
    {
      title: 'Override with -e at runtime',
      code: `docker compose run -e NODE_ENV=test app npm test`,
    },
    {
      title: 'Per-environment override files',
      code: `# Base: docker-compose.yml
# Override for prod: docker-compose.prod.yml

docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`,
    },
    {
      title: 'Pass host variables into compose',
      code: `# In docker-compose.yml — no value = read from host shell
environment:
  - SECRET_KEY   # value comes from: export SECRET_KEY=... on the host`,
    },
  ],
  related: [
    { href: '/docker/env-file/', text: 'docker --env-file and -e flags' },
    { href: '/docker/volume-mount/', text: 'docker volume mount' },
    { href: '/docker/network-connect/', text: 'docker network — connect containers' },
  ],
};
