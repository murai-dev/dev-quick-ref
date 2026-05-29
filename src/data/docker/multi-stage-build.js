export default {
  title: 'docker multi-stage build — reduce image size',
  description: 'Use Docker multi-stage builds to produce small production images by discarding build tools and dependencies in a separate builder stage.',
  quickAnswer: `# Dockerfile — multi-stage example for a Node.js app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage — only the built output
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]`,
  when: {
    label: 'When to use',
    pre: 'Your production image is larger than necessary because it contains compilers, dev dependencies, or build tools.',
  },
  details: [
    {
      title: 'Go — build a tiny static binary',
      code: `FROM golang:1.22 AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o server .

FROM scratch
COPY --from=builder /app/server /server
EXPOSE 8080
ENTRYPOINT ["/server"]`,
    },
    {
      title: 'Copy only specific files from a stage',
      code: `# Name your stages and reference them in COPY --from=
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/public /app/public`,
    },
    {
      title: 'Build a specific stage (for debugging)',
      code: `# Stop at the builder stage
docker build --target builder -t my-app:debug .`,
    },
  ],
  related: [
    { href: '/docker/build-failed-no-such-file/', text: 'docker build COPY — no such file' },
    { href: '/docker/no-space-left/', text: 'docker no space left on device' },
    { href: '/docker/prune-images/', text: 'docker image prune' },
  ],
};
