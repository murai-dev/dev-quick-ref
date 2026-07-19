export default {
  title: 'docker container exits immediately — how to fix',
  description: 'Fix a Docker container that exits immediately after docker run. Common causes include no foreground process, entrypoint crash, or a missing command.',
  quickAnswer: `# Run interactively to see what fails
docker run -it --rm your-image /bin/sh

# Or check the exit log
docker run --name debug your-image
docker logs debug
docker inspect debug --format '{{.State.ExitCode}}'`,
  when: {
    pre: 'You run <code>docker run your-image</code> and the container exits immediately or stops instantly:',
    error: `$ docker run my-app
$ docker ps
CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS    PORTS   NAMES
# (empty — container already exited)`,
    post: 'The container started, executed its command, then exited because nothing kept it running in the foreground or the entrypoint failed right away.',
  },
  sections: [
    {
      label: 'Container lifecycle',
      title: 'A container exists only while its main process is running',
      paragraphs: [
        'Docker does not keep a container alive by itself. The command created from the image <code>ENTRYPOINT</code> and <code>CMD</code> becomes process ID 1 in the container. When that process exits, the container stops. A clean exit may be correct for a batch job, while a web server that exits immediately indicates a startup or foreground-process problem.',
        '<code>docker ps</code> shows only running containers. Use <code>docker ps -a</code> to find the stopped instance before creating more debug containers with different names.',
      ],
    },
    {
      label: 'Diagnostic sequence',
      title: 'Read state, logs, and the configured command before changing the image',
      paragraphs: [
        'The exit code narrows the failure class, the logs show application output, and the image configuration shows what Docker attempted to execute. Inspect the original stopped container so you do not lose its exact environment and command overrides.',
      ],
      code: `docker ps -a --latest
docker inspect debug --format 'status={{.State.Status}} exit={{.State.ExitCode}} oom={{.State.OOMKilled}} error={{.State.Error}}'
docker logs --timestamps debug
docker inspect debug --format 'entrypoint={{json .Config.Entrypoint}} cmd={{json .Config.Cmd}}'`,
      items: [
        'Exit code <code>0</code> usually means the main command completed normally.',
        'Exit code <code>126</code> commonly means the command exists but is not executable.',
        'Exit code <code>127</code> commonly means the command or interpreter was not found.',
        'Exit code <code>137</code> often means SIGKILL; check <code>OOMKilled</code> and host memory pressure.',
      ],
    },
    {
      label: 'Reproduce interactively',
      title: 'Override the entrypoint and inspect the container filesystem',
      paragraphs: [
        'Starting a shell with the image entrypoint disabled lets you check whether binaries, configuration files, interpreters, and permissions exist. This changes the startup path, so use it to inspect prerequisites and then reproduce the original command manually inside the shell.',
      ],
      code: `docker run --rm -it --entrypoint /bin/sh your-image
# Inside the container:
pwd
env | sort
ls -la
command -v your-start-command
your-start-command`,
    },
    {
      label: 'Entrypoint failures',
      title: 'Check executable bits, shebangs, and Windows line endings',
      paragraphs: [
        'Shell entrypoints frequently fail because the file lacks execute permission, names an interpreter not present in the image, or contains CRLF line endings copied from Windows. Build the permission into the image and use an interpreter that the base image actually provides. Exec-form JSON also preserves signal handling better than wrapping a server in an unnecessary shell.',
      ],
      code: `# Dockerfile
COPY docker-entrypoint.sh /usr/local/bin/
RUN sed -i 's/\\r$//' /usr/local/bin/docker-entrypoint.sh && chmod 755 /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["server", "--foreground"]`,
    },
    {
      label: 'Foreground process',
      title: 'Run the service in the foreground and replace wrapper shells with exec',
      paragraphs: [
        'Traditional service scripts may fork into the background and then let the launch command exit. Containers need the service to remain in the foreground. If an entrypoint performs setup before starting the application, finish it with <code>exec "$@"</code> so the application becomes process ID 1 and receives stop signals directly.',
      ],
      code: `#!/bin/sh
set -eu

# perform setup here
exec "$@"`,
    },
    {
      label: 'Verification',
      title: 'Confirm stable running state and graceful shutdown',
      paragraphs: [
        'After rebuilding, start a named container without an automatic restart policy. Watch its state and logs long enough to pass application startup, then stop it normally. Add a restart policy only after the underlying startup failure is fixed; otherwise it creates a rapid crash loop that hides the first useful error.',
      ],
      code: `docker run -d --name verify your-image
docker ps --filter name=verify
docker logs --follow --since 1m verify
docker stop --time 10 verify
docker inspect verify --format '{{.State.ExitCode}}'`,
    },
  ],
  detailsLabel: 'Common causes',
  details: [
    {
      title: 'No foreground process (daemon forked to background)',
      explanation: 'If your CMD starts a service that daemonizes (e.g. nginx -g "daemon off;" is missing), the container exits.',
      code: `# Dockerfile — keep nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

# For a shell-based entrypoint, end with exec "$@" or wait
CMD ["/bin/sh", "-c", "start-server && wait"]`,
    },
    {
      title: 'Keep a container alive for debugging',
      code: `# Override the command to get a shell
docker run -it --entrypoint /bin/sh your-image

# Or keep it running with tail
docker run -d your-image tail -f /dev/null`,
    },
    {
      title: 'Restart policy — auto-restart on failure',
      explanation: 'A restart policy improves recovery from later transient failures, but it does not repair a broken entrypoint. Diagnose the first exit successfully before enabling automatic restarts.',
      code: `docker run -d --restart unless-stopped your-image`,
    },
  ],
  related: [
    { href: '/docker/view-logs/', text: 'docker logs — view container output' },
    { href: '/docker/exec-container/', text: 'docker exec into a running container' },
    { href: '/docker/cannot-connect-daemon/', text: 'cannot connect to the Docker daemon' },
  ],
};
