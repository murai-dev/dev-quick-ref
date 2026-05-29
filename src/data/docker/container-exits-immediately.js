export default {
  title: 'docker container exits immediately — how to fix',
  description: 'Fix a Docker container that exits immediately after docker run. Common causes: no foreground process, entrypoint crash, or missing command.',
  quickAnswer: `# Run interactively to see what fails
docker run -it --rm your-image /bin/sh

# Or check the exit log
docker run --name debug your-image
docker logs debug
docker inspect debug --format '{{.State.ExitCode}}'`,
  when: {
    pre: 'You run <code>docker run your-image</code> and the container stops instantly:',
    error: `$ docker run my-app
$ docker ps
CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS    PORTS   NAMES
# (empty — container already exited)`,
    post: 'The container started, executed its command, then exited because nothing kept it running in the foreground.',
  },
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
      code: `docker run -d --restart unless-stopped your-image`,
    },
  ],
  related: [
    { href: '/docker/view-logs/', text: 'docker logs — view container output' },
    { href: '/docker/exec-container/', text: 'docker exec into a running container' },
    { href: '/docker/cannot-connect-daemon/', text: 'cannot connect to the Docker daemon' },
  ],
};
