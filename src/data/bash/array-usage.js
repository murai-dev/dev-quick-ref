export default {
  title: 'bash arrays — create, iterate, append, slice',
  description: 'Create and use bash arrays: declare, iterate with for, append elements, get length, slice, and use associative arrays.',
  quickAnswer: `# Declare an array
fruits=("apple" "banana" "cherry")

# Access elements
echo "\${fruits[0]}"        # apple
echo "\${fruits[@]}"        # all elements
echo "\${#fruits[@]}"       # length: 3

# Iterate
for item in "\${fruits[@]}"; do
  echo "$item"
done`,
  when: {
    label: 'Usage',
    pre: 'Arrays let you store lists of values and iterate over them in bash scripts.',
  },
  details: [
    {
      title: 'Append and remove elements',
      code: `# Append
fruits+=("date")

# Remove element at index 1
unset 'fruits[1]'

# Re-index after removal (gaps exist otherwise)
fruits=("\${fruits[@]}")`,
    },
    {
      title: 'Slice and subarray',
      code: `# Elements from index 1, length 2
echo "\${fruits[@]:1:2}"   # banana cherry

# Last element
echo "\${fruits[-1]}"`,
    },
    {
      title: 'Array from command output',
      code: `# Split by newline
mapfile -t files < <(find . -name "*.txt")
echo "\${#files[@]} files found"

# Split by space (word splitting)
words=($( echo "one two three" ))`,
    },
    {
      title: 'Associative arrays (bash 4+)',
      code: `declare -A config
config["host"]="localhost"
config["port"]="5432"

echo "\${config["host"]}"

for key in "\${!config[@]}"; do
  echo "$key=\${config[$key]}"
done`,
    },
  ],
  related: [
    { href: '/bash/for-loop/', text: 'bash for loop' },
    { href: '/bash/string-comparison/', text: 'bash string comparison' },
    { href: '/bash/read-file-line-by-line/', text: 'read a file line by line' },
  ],
};
