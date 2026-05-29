export default {
  title: 'bash date — format date and timestamp',
  description: 'Format dates and timestamps in bash using the date command. Covers ISO 8601, Unix epoch, arithmetic, and macOS vs Linux differences.',
  quickAnswer: `# Current date and time (ISO 8601)
date +"%Y-%m-%dT%H:%M:%S"
# 2024-01-15T09:30:00

# Date only
date +"%Y-%m-%d"
# 2024-01-15

# Unix epoch (seconds since 1970-01-01)
date +%s`,
  when: {
    label: 'Usage',
    pre: 'You need to generate timestamps for log filenames, backups, or script output.',
  },
  details: [
    {
      title: 'Common format specifiers',
      code: `%Y   four-digit year         2024
%m   month (01-12)            01
%d   day of month (01-31)     15
%H   hour (00-23)             09
%M   minute (00-59)           30
%S   second (00-59)           00
%Z   timezone                 UTC
%s   Unix epoch seconds       1705312200
%N   nanoseconds (Linux)      123456789`,
    },
    {
      title: 'Date arithmetic (GNU date / Linux)',
      code: `# 7 days ago
date -d "7 days ago" +"%Y-%m-%d"

# Tomorrow
date -d "tomorrow" +"%Y-%m-%d"

# Specific date + offset
date -d "2024-01-01 + 30 days" +"%Y-%m-%d"`,
    },
    {
      title: 'macOS date arithmetic (BSD date)',
      code: `# macOS uses -v for arithmetic
date -v-7d +"%Y-%m-%d"    # 7 days ago
date -v+1d +"%Y-%m-%d"    # tomorrow

# Install GNU coreutils for date -d on macOS
brew install coreutils
gdate -d "7 days ago" +"%Y-%m-%d"`,
    },
    {
      title: 'Timestamp in a filename',
      code: `logfile="backup_$(date +"%Y%m%d_%H%M%S").tar.gz"
echo $logfile   # backup_20240115_093000.tar.gz`,
    },
  ],
  related: [
    { href: '/bash/cron-job/', text: 'crontab syntax and schedules' },
    { href: '/bash/check-exit-code/', text: 'check exit code ($?)' },
  ],
};
