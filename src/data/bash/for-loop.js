export default {
  title: 'bash for loop — iterate over files, list, range',
  description: 'Use bash for loops to iterate over files, lists, arrays, ranges, and command output. Covers glob patterns, C-style loops, and while loops.',
  quickAnswer: `# Over a list of values
for name in Alice Bob Charlie; do
  echo "Hello, $name"
done

# Over files (glob)
for file in *.txt; do
  echo "Processing $file"
done

# Range (brace expansion)
for i in {1..5}; do
  echo $i
done`,
  when: {
    label: 'Usage',
    pre: 'For loops are the standard way to iterate over lists, files, or ranges in bash.',
  },
  details: [
    {
      title: 'C-style for loop',
      code: `for (( i = 0; i < 10; i++ )); do
  echo $i
done`,
    },
    {
      title: 'Iterate over an array',
      code: `items=("one" "two" "three")
for item in "\${items[@]}"; do
  echo "$item"
done

# With index
for i in "\${!items[@]}"; do
  echo "$i: \${items[$i]}"
done`,
    },
    {
      title: 'Iterate over command output (safe)',
      code: `# Process substitution — handles filenames with spaces
while IFS= read -r file; do
  echo "Found: $file"
done < <(find . -name "*.log")`,
    },
    {
      title: 'Break and continue',
      code: `for file in *.txt; do
  [[ "$file" == skip-* ]] && continue   # skip this iteration
  [[ "$file" == stop.txt ]] && break    # exit the loop
  echo "$file"
done`,
    },
  ],
  related: [
    { href: '/bash/array-usage/', text: 'bash arrays' },
    { href: '/bash/read-file-line-by-line/', text: 'read a file line by line' },
    { href: '/bash/find-files/', text: 'find files by name or extension' },
  ],
};
