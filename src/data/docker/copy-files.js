export default {
  title: 'docker cp — copy files between container and host',
  description: 'Use docker cp to copy files or directories between a Docker container and the host, including "docker copy file from container" cases. Works with running or stopped containers.',
  quickAnswer: `# Host → container
docker cp ./local-file.txt my-container:/app/file.txt

# Container → host
docker cp my-container:/app/logs/error.log ./error.log

# Copy a whole directory
docker cp my-container:/app/dist ./dist`,
  when: {
    label: 'Usage',
    pre: 'You need to copy config files, logs, or build artifacts between your host and a container, such as copying a file from a container to the host.',
  },
  sections: [
    {
      label: 'Command model',
      title: 'Exactly one side of docker cp must be a container path',
      paragraphs: [
        '<code>docker cp</code> follows the shape of the Unix <code>cp</code> command, but a container path is prefixed with <code>CONTAINER:</code>. The other path is resolved on the host. The container may be running or stopped because Docker reads or writes its filesystem layer directly.',
        'Use a container name instead of a short ID when the command will be documented or repeated. Quote paths that contain spaces, and use absolute container paths to avoid ambiguity. Docker interprets container paths relative to <code>/</code>, even when the leading slash is omitted.',
      ],
      code: `docker ps -a --format 'table {{.Names}}\t{{.Status}}'
docker cp "./release notes.txt" app:/tmp/release-notes.txt
docker cp app:/var/log/app.log ./artifacts/app.log`,
    },
    {
      label: 'Source and destination',
      title: 'Check whether you are copying a directory or its contents',
      paragraphs: [
        'The source suffix changes directory behavior. Copying <code>/app/dist</code> to the current directory creates or replaces a <code>dist</code> entry. Copying <code>/app/dist/.</code> copies the contents inside that directory. The destination parent must exist when Docker cannot infer where to create it.',
      ],
      items: [
        'Use <code>container:/path/directory</code> when the directory itself is the artifact.',
        'Use <code>container:/path/directory/.</code> when only its children should be merged into an existing host directory.',
        'Inspect both sides with <code>ls -la</code> before retrying a command that created an unexpected nested directory.',
      ],
    },
    {
      label: 'Ownership and permissions',
      title: 'Copied files preserve container ownership information where possible',
      paragraphs: [
        'A file copied from a Linux container can arrive with a numeric user or group ID that does not map cleanly to the host account. A file copied into a container is normally created with root ownership unless archive behavior or the environment changes it. This can make the copy appear successful while the application still cannot read or update the file.',
        'Inspect the result from both environments. If application ownership matters, fix it explicitly inside the container or copy into a writable staging path first. Avoid making files world-writable as a shortcut.',
      ],
      code: `docker cp ./config.json app:/tmp/config.json
docker exec app ls -ln /tmp/config.json
docker exec --user root app chown 1000:1000 /tmp/config.json`,
    },
    {
      label: 'Verify the copy',
      title: 'Compare size or checksum instead of trusting the exit code alone',
      paragraphs: [
        'For logs and quick inspection, checking the destination size may be enough. For release artifacts, backups, or files used in a later deployment step, calculate a checksum on both sides. A matching SHA-256 digest confirms the copied bytes are identical.',
      ],
      code: `sha256sum ./artifact.tar.gz
docker cp ./artifact.tar.gz app:/tmp/artifact.tar.gz
docker exec app sha256sum /tmp/artifact.tar.gz`,
    },
    {
      label: 'Choose the right mechanism',
      title: 'Use docker cp for one-time transfer, not ongoing synchronization',
      paragraphs: [
        '<code>docker cp</code> is useful for extracting diagnostics, injecting a temporary config during debugging, or retrieving a build artifact. It does not establish a persistent relationship between the two paths. Use a bind mount for live development files, a named volume for persistent application data, and <code>COPY</code> in a Dockerfile for files that belong in every image built from that source.',
      ],
    },
  ],
  details: [
    {
      title: 'Copy works on stopped containers too',
      code: `# Even if the container is not running
docker ps -a | grep my-container   # Exited
docker cp my-container:/app/config.json ./config.json`,
    },
    {
      title: 'Directory trailing slash behavior',
      explanation: 'Adding a trailing <code>/</code> to the source copies the directory contents (not the directory itself).',
      code: `# Copies the dist/ directory itself
docker cp my-container:/app/dist ./

# Copies the contents of dist/ into ./dist-output/
docker cp my-container:/app/dist/. ./dist-output/`,
    },
    {
      title: 'Use volumes for persistent sharing instead',
      explanation: 'A bind mount reflects later host changes in the container. It is a better fit for source code, local configuration, and other files that must stay synchronized.',
      code: `# Bind mount — changes are reflected instantly in both directions
docker run -v $(pwd)/data:/app/data my-image`,
    },
  ],
  related: [
    { href: '/docker/exec-container/', text: 'docker exec into a running container' },
    { href: '/docker/volume-mount/', text: 'docker volume mount / bind mount' },
    { href: '/docker/view-logs/', text: 'docker logs — view container output' },
  ],
};
