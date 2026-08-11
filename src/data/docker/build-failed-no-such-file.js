export default {
  title: 'docker build COPY failed — no such file or directory',
  description: 'Fix "COPY failed: no such file or directory" in docker build by checking .dockerignore, build context path, and COPY source paths.',
  quickAnswer: `# The build context is the directory you pass to docker build
# Files must exist within the build context

# Run build from the directory containing your files
docker build -t my-image .

# Check what is in the build context (before Docker sees it)
# List files that would be included
cat .dockerignore`,
  when: {
    error: `COPY failed: file not found in build context or excluded by .dockerignore:
stat app/package.json: file does not exist`,
    post: 'Docker\'s COPY instruction can only reference files inside the build context. If the file is outside the context path, or listed in .dockerignore, it will not be visible.',
  },
  details: [
    {
      title: 'Check .dockerignore is not too aggressive',
      code: `# .dockerignore
node_modules
dist
.git
# Make sure you are not ignoring files you need to COPY`,
    },
    {
      title: 'Widen the build context',
      explanation: 'Pass a parent directory as the context and specify the Dockerfile location with <code>-f</code>:',
      code: `# Build context is parent dir; Dockerfile is in ./app/
docker build -f app/Dockerfile -t my-image ..`,
    },
    {
      title: 'Correct COPY paths',
      code: `# Copies ./src from the host build context to /app/src in the image
COPY src/ /app/src/

# NOT this — path must be relative to build context, not your machine
# COPY /home/user/project/src/ /app/src/   ← WRONG`,
    },
    {
      title: 'Confirm the file is inside the build context',
      explanation: 'The final path in a <code>COPY</code> instruction is resolved from the build context, not from the directory containing the Dockerfile. Check both paths before changing the Dockerfile.',
      code: `pwd
find . -maxdepth 3 -type f -name 'package.json' -o -name 'src'

# Dockerfile in ./app, context is the parent directory
docker build -f app/Dockerfile -t my-image ..`,
    },
    {
      title: 'Check .dockerignore and file name casing',
      explanation: 'A file can exist on the host but still be excluded by <code>.dockerignore</code>. Linux containers also treat <code>App</code> and <code>app</code> as different paths.',
      code: `sed -n '1,200p' .dockerignore
ls -la path/to/source

# Keep COPY paths relative to the context
COPY package.json /app/package.json`,
    },
  ],
  related: [
    { href: '/docker/image-not-found/', text: 'docker image not found' },
    { href: '/docker/no-space-left/', text: 'docker no space left on device' },
    { href: '/docker/multi-stage-build/', text: 'docker multi-stage build — reduce image size' },
  ],
};
