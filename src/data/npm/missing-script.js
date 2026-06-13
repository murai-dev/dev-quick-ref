export default {
  title: 'npm ERR! missing script — how to fix',
  description: 'Fix npm ERR! missing script by checking the script name, package.json location, workspace target, and whether the script exists under the scripts field.',
  quickAnswer: `# See which scripts actually exist
npm run

# Open package.json and check the exact script name
# Example: use "build", not "Build"
npm run build

# If the script does not exist, add it under "scripts"
{
  "scripts": {
    "build": "vite build"
  }
}`,
  when: {
    error: `npm ERR! Missing script: "build"
npm ERR!
npm ERR! To see a list of scripts, run:
npm ERR!   npm run`,
    post: 'npm could not find the script name you asked to run. This usually means the script is missing from package.json, the name is misspelled, or you are in the wrong package directory.',
  },
  detailsLabel: 'Common causes',
  details: [
    {
      title: 'List available scripts first',
      code: `npm run
# Shows every script under package.json -> scripts`,
    },
    {
      title: 'Wrong directory or wrong workspace package',
      explanation: 'In a monorepo, the root package may not define the same scripts as the app package you intended to run.',
      code: `# Run from the correct package
cd apps/web
npm run build

# Or target a workspace explicitly
npm run build --workspace web`,
    },
    {
      title: 'Script name is case-sensitive',
      code: `# package.json
{
  "scripts": {
    "build": "vite build"
  }
}

# Correct
npm run build

# Wrong
npm run Build`,
    },
    {
      title: 'Add the script if it does not exist yet',
      code: `{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run"
  }
}`,
    },
  ],
  related: [
    { href: '/npm/run-scripts/', text: 'npm scripts — define and run custom commands' },
    { href: '/npm/engines-field/', text: 'npm engines — require Node.js version' },
    { href: '/npm/module-not-found/', text: 'cannot find module / npm module not found' },
  ],
};