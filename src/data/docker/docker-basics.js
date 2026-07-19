export default {
  title: 'Docker basics — images, containers, ports, volumes, and debugging',
  metaTitle: 'Docker basics: images, containers, ports, and volumes',
  description: 'Understand Docker images, containers, ports, networks, and volumes. Includes a practical workflow for building, running, inspecting, and debugging containers.',
  sections: [
    {
      label: 'What Docker does',
      title: 'Docker runs an application in an isolated process environment',
      paragraphs: [
        'Docker packages an application with its runtime files and starts it as an isolated process called a container. Containers share the host kernel, so they are lighter than full virtual machines, but they still receive their own filesystem view, process namespace, network interfaces, and resource limits.',
        'The Docker CLI is a client. On Linux it normally sends API requests to the Docker daemon through a Unix socket; Docker Desktop provides a managed Linux environment on macOS and Windows. When a command fails, first decide whether the problem is client-to-daemon communication, image creation, or the process running inside a container.',
      ],
    },
    {
      label: 'Images and containers',
      title: 'An image is a template; a container is one execution of it',
      paragraphs: [
        'An image is an immutable stack of filesystem layers plus configuration such as the default command and environment. A container adds a writable layer and runtime state to an image. Removing a container does not remove its image, and rebuilding an image does not update containers that were already created from an older image.',
        'Use explicit tags rather than relying on <code>latest</code>. A tag is a movable name, while an image digest identifies exact content. For repeatable deployment, record the tag or digest that was tested.',
      ],
      code: `docker image ls
docker pull nginx:1.27-alpine
docker run --name web nginx:1.27-alpine
docker inspect web --format '{{.Image}}'`,
    },
    {
      label: 'Build workflow',
      title: 'A Dockerfile creates image layers in a defined order',
      paragraphs: [
        'A Dockerfile starts from a base image and applies instructions such as <code>WORKDIR</code>, <code>COPY</code>, and <code>RUN</code>. Put stable dependency-installation steps before frequently changing source files so Docker can reuse cached layers. Keep secrets out of build arguments and copied files because image layers can preserve their contents.',
        'Use a <code>.dockerignore</code> file to keep version-control data, local dependencies, credentials, and build output out of the build context. A smaller context improves build speed and reduces accidental data exposure.',
      ],
      code: `docker build --tag my-app:dev .
docker image inspect my-app:dev
docker history my-app:dev`,
    },
    {
      label: 'Container lifecycle',
      title: 'The container stops when its main process exits',
      paragraphs: [
        'The image entrypoint and command create process ID 1 inside the container. A server must remain in the foreground; if it daemonizes or crashes, the container stops. A stopped container still exists and can be inspected or restarted until it is removed.',
        'Names make repeated inspection easier. Add <code>--rm</code> for disposable commands, but omit it while debugging so the stopped state and logs remain available.',
      ],
      code: `docker run --name my-app -d my-app:dev
docker ps
docker logs my-app
docker inspect my-app --format 'status={{.State.Status}} exit={{.State.ExitCode}}'
docker stop my-app
docker rm my-app`,
    },
    {
      label: 'Ports and networks',
      title: 'Publishing a port connects a host port to a container port',
      paragraphs: [
        'A process listening inside a container is not automatically reachable from the host. <code>-p 8080:3000</code> publishes host port 8080 to container port 3000. The application must listen on <code>0.0.0.0</code> inside the container rather than only <code>127.0.0.1</code>.',
        'Containers on the same user-defined network can reach each other by container or service name. Inside one container, <code>localhost</code> refers to that container itself, not the host and not another service.',
      ],
      code: `docker network create app-net
docker run -d --name api --network app-net my-api:dev
docker run -d --name web --network app-net -p 8080:3000 my-web:dev
docker port web`,
    },
    {
      label: 'Persistent data',
      title: 'Use volumes or bind mounts for data that must outlive a container',
      paragraphs: [
        'Changes in a container writable layer disappear when that container is removed. A named volume is managed by Docker and is a good default for database or application state. A bind mount maps an explicit host path and is useful for source code and local configuration during development.',
        'Mounts can hide files that were present at the same path in the image. If an application suddenly cannot find built-in files, inspect its mounts before rebuilding the image.',
      ],
      code: `docker volume create app-data
docker run -d --name db -v app-data:/var/lib/postgresql/data postgres:17
docker inspect db --format '{{json .Mounts}}'`,
    },
    {
      label: 'Debugging order',
      title: 'Inspect the layer that failed before applying a cleanup command',
      paragraphs: [
        'Start with <code>docker version</code> when the daemon may be unreachable. For build failures, read the first failing Dockerfile step and rebuild with plain progress output. For runtime failures, preserve the container and inspect its state, logs, command, environment, and mounts. Entering a running container is useful only after its main process stays alive.',
      ],
      items: [
        'Daemon connection error: inspect the service, socket permissions, and active Docker context.',
        'Build error: verify build context paths, ignored files, base image, and the first nonzero command.',
        'Immediate exit: inspect exit code, logs, entrypoint, command, and memory state.',
        'Connection error: verify process bind address, published ports, network membership, and service names.',
        'Missing data: inspect mounts and confirm whether the data belongs in an image, volume, or host path.',
      ],
    },
    {
      label: 'Safe maintenance',
      title: 'List resources before pruning them',
      paragraphs: [
        'Docker can accumulate stopped containers, unused images, build cache, and volumes. Prune commands are convenient but broad. Inspect disk usage and use a dry, resource-specific cleanup approach first. Volumes can contain the only copy of application data, so never include them in cleanup without a verified backup.',
      ],
      code: `docker system df
docker ps -a
docker image ls
docker volume ls
docker container prune
docker image prune`,
    },
  ],
  related: [
    { href: '/docker/container-exits-immediately/', text: 'docker container exits immediately — inspect lifecycle failures' },
    { href: '/docker/cannot-connect-daemon/', text: 'cannot connect to the Docker daemon' },
    { href: '/docker/permission-denied-docker-socket/', text: 'Docker socket permission denied — Linux access model' },
    { href: '/docker/port-already-in-use/', text: 'Docker port already in use — find the conflicting listener' },
    { href: '/docker/volume-mount/', text: 'Docker volumes and bind mounts — persist data' },
  ],
};
