export default {
  title: 'git SSL certificate problem — how to fix',
  description: 'Fix git SSL certificate problem: unable to get local issuer certificate by configuring the correct CA bundle or temporarily disabling SSL verification.',
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
      code: `# Append the cert to the system bundle (Linux)
sudo cat corp-ca.crt >> /etc/ssl/certs/ca-certificates.crt
git config --global http.sslCAInfo /etc/ssl/certs/ca-certificates.crt`,
    },
    {
      title: 'Temporarily disable SSL verification (not recommended for production)',
      explanation: '<strong>Only use this as a short-term workaround.</strong> Disabling SSL verification exposes you to man-in-the-middle attacks.',
      code: `git config --global http.sslVerify false`,
    },
    {
      title: 'Disable verification for one specific host only',
      code: `git config --global http.https://gitlab.corp.internal.sslVerify false`,
    },
  ],
  related: [
    { href: '/git/permission-denied-publickey/', text: 'git permission denied (publickey) — fix' },
    { href: '/git/remote-change-url/', text: 'git remote change URL (HTTPS ↔ SSH)' },
    { href: '/git/clone-specific-branch/', text: 'git clone a specific branch' },
  ],
};
