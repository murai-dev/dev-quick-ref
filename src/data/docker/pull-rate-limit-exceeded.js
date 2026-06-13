export default {
  title: 'docker pull rate limit exceeded — how to fix',
  description: 'Fix Docker Hub pull rate limit exceeded by logging in, using a token in CI, and mirroring or caching frequently pulled images.',
  quickAnswer: `# Authenticate to Docker Hub first
docker login

# Then retry the pull
docker pull ubuntu:24.04

# In CI, use a token-backed login instead of anonymous pulls
echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin`,
  when: {
    error: `toomanyrequests: You have reached your pull rate limit.
You may increase the limit by authenticating and upgrading:
https://www.docker.com/increase-rate-limit`,
    post: 'Docker Hub limits anonymous pulls per IP address. This happens often in CI, shared office networks, and cloud runners where many machines share one outbound IP.',
  },
  detailsLabel: 'Ways to reduce pull pressure',
  details: [
    {
      title: 'Use an authenticated pull in CI',
      code: `# GitHub Actions / CI example
echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
docker pull node:20-alpine`,
    },
    {
      title: 'Mirror images to another registry',
      explanation: 'If the same base images are pulled repeatedly, mirror them to GHCR, ECR, GCR, or your internal registry and pull from there instead.',
      code: `# Example: retag and push to another registry
docker pull node:20-alpine
docker tag node:20-alpine ghcr.io/your-org/node:20-alpine
docker push ghcr.io/your-org/node:20-alpine`,
    },
    {
      title: 'Pin exact tags and cache layers',
      code: `# Better than floating latest in CI
FROM node:20.19.2-alpine3.21

# Also enable your CI provider's Docker layer cache if available`,
    },
    {
      title: 'Shared IPs can trigger the limit faster',
      code: `# Check whether you are already logged in
docker info | grep -i username

# If blank, you are pulling anonymously`,
    },
  ],
  related: [
    { href: '/docker/image-not-found/', text: 'docker image not found / repository does not exist' },
    { href: '/docker/multi-stage-build/', text: 'docker multi-stage build — reduce image size' },
    { href: '/docker/no-space-left/', text: 'docker no space left on device' },
  ],
};