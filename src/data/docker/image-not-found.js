export default {
  title: 'docker image not found / repository does not exist — how to fix',
  metaTitle: 'docker image not found — fix registry & tag errors',
  description: 'Fix "Unable to find image" or "repository does not exist" in Docker by checking image name, tag, and registry login.',
  quickAnswer: `# Pull explicitly before running
docker pull nginx:latest

# Check available tags on Docker Hub
# https://hub.docker.com/_/nginx/tags

# Log in to a private registry
docker login registry.example.com

# Verify local images
docker images | grep nginx`,
  when: {
    error: `Unable to find image 'myapp:latest' locally
docker: Error response from daemon: pull access denied for myapp,
repository does not exist or may require 'docker login':
denied: requested access to the resource is denied.`,
    post: 'Docker could not find the image locally or on the registry. This is usually a typo in the image name/tag or a missing registry login.',
  },
  details: [
    {
      title: 'Build the image locally first',
      code: `# Build from Dockerfile in current directory
docker build -t myapp:latest .

# Then run it
docker run myapp:latest`,
    },
    {
      title: 'Specify the full registry path',
      code: `# Docker Hub (implicit)
docker pull nginx:1.27-alpine

# GitHub Container Registry
docker pull ghcr.io/owner/repo:tag

# AWS ECR
aws ecr get-login-password | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com
docker pull 123456789.dkr.ecr.us-east-1.amazonaws.com/my-repo:latest`,
    },
    {
      title: 'List all locally available images',
      code: `docker images
# or filter by name
docker images nginx`,
    },
  ],
  related: [
    { href: '/docker/build-failed-no-such-file/', text: 'docker build COPY — no such file or directory' },
    { href: '/docker/pull-rate-limit-exceeded/', text: 'docker pull rate limit exceeded' },
    { href: '/docker/prune-images/', text: 'docker image prune — remove unused images' },
    { href: '/docker/no-space-left/', text: 'docker no space left on device' },
  ],
};
