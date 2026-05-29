export default {
  title: 'crontab syntax and common schedules',
  description: 'Crontab syntax reference with common schedule examples. Covers the five time fields, special strings (@daily, @reboot), and editing cron jobs.',
  quickAnswer: `# Edit your crontab
crontab -e

# Format: minute hour day-of-month month day-of-week command
# *       *    *            *       *
# 0-59  0-23  1-31        1-12    0-7 (0 and 7 = Sunday)

# Examples:
# Run every day at 2:30 AM
30 2 * * * /home/user/backup.sh

# Run every 5 minutes
*/5 * * * * /usr/local/bin/check-health.sh`,
  when: {
    label: 'Usage',
    pre: 'Schedule recurring tasks to run automatically on Linux/macOS servers.',
  },
  details: [
    {
      title: 'Common schedule examples',
      code: `# Every minute
* * * * * command

# Every hour at :00
0 * * * * command

# Daily at midnight
0 0 * * * command

# Monday to Friday at 9 AM
0 9 * * 1-5 command

# First day of every month
0 0 1 * * command

# Every 15 minutes
*/15 * * * * command`,
    },
    {
      title: 'Special strings',
      code: `@reboot   command   # run once at startup
@daily    command   # same as 0 0 * * *
@weekly   command   # same as 0 0 * * 0
@monthly  command   # same as 0 0 1 * *
@hourly   command   # same as 0 * * * *`,
    },
    {
      title: 'Capture cron output / errors',
      code: `# Redirect output to a log file
0 2 * * * /home/user/backup.sh >> /var/log/backup.log 2>&1

# Or use MAILTO to send errors by email
MAILTO="admin@example.com"
0 2 * * * /home/user/backup.sh`,
    },
    {
      title: 'Manage crontab',
      code: `crontab -l   # list your cron jobs
crontab -e   # edit
crontab -r   # remove all (careful!)
crontab -l > crontab.bak  # backup first`,
    },
  ],
  related: [
    { href: '/bash/redirect-stderr/', text: 'redirect stderr to stdout (2>&1)' },
    { href: '/bash/date-format/', text: 'bash date format and timestamp' },
    { href: '/bash/here-doc/', text: 'bash heredoc' },
  ],
};
