export default {
  title: 'git SSL certificate problem — how to fix',
  description: 'Fix git SSL certificate errors by installing the required certificate authority and configuring Git to use the correct CA bundle.',
  quickAnswer: `# Point git to the correct CA certificate bundle
git config --global http.sslCAInfo /path/to/ca-bundle.crt

# On macOS with Homebrew — use the system keychain bundle
git config --global http.sslCAInfo /etc/ssl/cert.pem`,
  when: {
    error: `fatal: unable to access 'https://github.com/...':
SSL certificate problem: unable to get local issuer certificate`,
    post: 'Git cannot verify the HTTPS server certificate because your system\'s CA bundle is missing or the server uses a private certificate authority (common on corporate networks).',
  },
  details: [
    {
      title: 'Corporate proxy / self-signed cert — add the CA cert',
      explanation: 'Ask your IT team for the corporate CA certificate, then:',
      code: `# Debian/Ubuntu: install the CA into the managed trust store
sudo cp corp-ca.crt /usr/local/share/ca-certificates/corp-ca.crt
sudo update-ca-certificates

# Point Git to the resulting system bundle when necessary
git config --global http.sslCAInfo /etc/ssl/certs/ca-certificates.crt`,
    },
    {
      title: 'Inspect the TLS connection without disabling verification',
      explanation: 'Verbose output can reveal which CA file Git uses and whether a proxy is intercepting the connection.',
      code: `GIT_CURL_VERBOSE=1 git ls-remote https://github.com/user/repo.git`,
    },
    {
      title: 'Remove an obsolete custom CA setting',
      explanation: 'If the configured path no longer exists, remove it so Git can return to its platform default trust store.',
      code: `git config --global --get http.sslCAInfo
git config --global --unset http.sslCAInfo`,
    },
  ],
  related: [
    { href: '/git/permission-denied-publickey/', text: 'git permission denied (publickey) — fix' },
    { href: '/git/remote-change-url/', text: 'git remote change URL (HTTPS ↔ SSH)' },
    { href: '/git/clone-specific-branch/', text: 'git clone a specific branch' },
  ],
};
