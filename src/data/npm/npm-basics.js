export default {
  title: 'npm basics — package.json, dependencies, scripts, and reproducible installs',
  metaTitle: 'npm basics: package.json, dependencies, scripts, and installs',
  description: 'Understand package.json, package-lock.json, node_modules, dependency types, semantic versions, npm scripts, npm install, and reproducible npm ci workflows.',
  sections: [
    {
      label: 'What npm does',
      title: 'npm coordinates packages for a Node.js project',
      paragraphs: [
        'Node.js runs JavaScript outside the browser. npm is a package manager distributed with Node.js, and the public npm registry is a service that publishes package metadata and archives. The <code>npm</code> command reads project metadata, resolves compatible package versions, downloads packages, and runs named project scripts.',
        'These are separate layers. A Node.js version problem is not automatically an npm registry problem, and a package install can succeed while the application later fails because its runtime API is incompatible.',
      ],
    },
    {
      label: 'Project files',
      title: 'package.json declares intent; package-lock.json records a resolution',
      paragraphs: [
        '<code>package.json</code> describes the project, scripts, supported runtimes, and direct dependency ranges. <code>package-lock.json</code> records the exact dependency graph npm resolved, including transitive packages and integrity hashes. Commit both files for an application so collaborators and CI can reproduce the reviewed graph.',
        '<code>node_modules</code> is an installed working directory derived from the manifest and lockfile. It is normally excluded from version control. Deleting it can clear a broken local installation, but it is a diagnostic reset rather than a substitute for fixing an invalid dependency declaration.',
      ],
      code: `npm init -y
npm pkg get name version scripts
npm install
npm ls --depth=0`,
    },
    {
      label: 'Dependency types',
      title: 'Declare packages according to who needs them and when',
      paragraphs: [
        '<code>dependencies</code> are required when the project runs. <code>devDependencies</code> support development, testing, or building. A peer dependency says that the consuming project must provide a compatible package, which allows plugins to share one host library instead of installing private copies.',
        'Optional dependencies may fail to install without failing the whole installation. Platform-specific packages can also be skipped legitimately. Read the package documentation before moving a dependency between sections merely to silence a warning.',
      ],
      code: `npm install express
npm install --save-dev vitest
npm pkg get dependencies devDependencies peerDependencies`,
    },
    {
      label: 'Version ranges',
      title: 'Semantic versions describe compatibility expectations, not guarantees',
      paragraphs: [
        'A semantic version has major, minor, and patch numbers. A caret range such as <code>^2.3.1</code> normally permits later minor and patch releases before version 3. A tilde range such as <code>~2.3.1</code> normally permits later patch releases before 2.4. Exact versions permit only one published version.',
        'The lockfile chooses exact versions inside those ranges. <code>npm install</code> may update the lockfile when declarations change; <code>npm update</code> deliberately searches for newer compatible versions. Review dependency and test changes rather than assuming every range-compatible release is behaviorally safe.',
      ],
      code: `npm outdated
npm view package-name version
npm view package-name versions --json`,
    },
    {
      label: 'Install workflows',
      title: 'Use npm install for development and npm ci for a locked build',
      paragraphs: [
        '<code>npm install</code> reconciles <code>package.json</code>, the lockfile, and the existing installation. <code>npm ci</code> requires the manifest and lockfile to agree, removes the existing <code>node_modules</code>, and installs the locked graph without rewriting it. That behavior makes <code>npm ci</code> the stronger default for continuous integration and deployment.',
      ],
      code: `# Local dependency work
npm install
git diff -- package.json package-lock.json

# CI or clean verification
npm ci
npm test`,
    },
    {
      label: 'Scripts',
      title: 'npm scripts provide project-local commands with local binaries on PATH',
      paragraphs: [
        'Scripts under <code>package.json</code> create a shared command interface for development, tests, builds, and maintenance. When npm runs a script, executables from <code>node_modules/.bin</code> are placed on <code>PATH</code>, so the project uses its pinned tool version without requiring a global installation.',
        'Arguments after <code>--</code> are forwarded to the underlying script. Lifecycle names such as <code>pretest</code> and <code>posttest</code> run automatically around the matching script, so inspect them when a command performs unexpected extra work.',
      ],
      code: `npm run
npm run build
npm test -- --runInBand
npm pkg get scripts`,
    },
    {
      label: 'Diagnose installs',
      title: 'Read the first dependency conflict and verify the active environment',
      paragraphs: [
        'Start with the Node.js and npm versions, registry, and project root. An ERESOLVE report describes packages that request incompatible peer ranges. ENOENT often identifies a missing path or manifest. A module-not-found error can occur at install time or runtime, so note which command produced it before clearing caches.',
      ],
      code: `node --version
npm --version
npm config get registry
npm prefix
npm doctor
npm ls`,
      items: [
        'Do not use <code>--force</code> or <code>--legacy-peer-deps</code> before understanding which peer ranges conflict.',
        'Check whether the repository expects a particular Node.js version through <code>engines</code>, <code>.nvmrc</code>, or tool configuration.',
        'Compare manifest and lockfile changes after every dependency command.',
        'Use <code>npm cache verify</code> before deleting the cache; cache corruption is less common than declaration or environment problems.',
      ],
    },
    {
      label: 'Security and maintenance',
      title: 'Treat audit output as a dependency decision, not an automatic command',
      paragraphs: [
        '<code>npm audit</code> maps known advisories onto the installed dependency graph. Confirm whether the vulnerable code is reachable and whether an update changes major versions. Review the proposed lockfile diff and run the project test suite. Avoid <code>npm audit fix --force</code> unless the breaking upgrades have been evaluated.',
      ],
      code: `npm audit
npm explain vulnerable-package
npm audit fix --dry-run
npm test`,
    },
  ],
  related: [
    { href: '/npm/eresolve-peer-deps/', text: 'npm ERESOLVE — diagnose peer dependency conflicts' },
    { href: '/npm/enoent-no-such-file/', text: 'npm ENOENT — identify the missing file or directory' },
    { href: '/npm/module-not-found/', text: 'Cannot find module — install and runtime diagnosis' },
    { href: '/npm/lock-file-conflict/', text: 'Resolve package-lock.json conflicts safely' },
    { href: '/npm/audit-fix/', text: 'npm audit fix — review security updates before applying' },
  ],
};
