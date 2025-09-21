
export type ShellCategory = {
    title: string;
    description: string;
    content: string;
};

export const slugify = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

export const shellScriptingData: ShellCategory[] = [
    {
        title: 'Basics of Linux Shell & Commands',
        description: 'Understand the terminal, essential commands, and file permissions.',
        content: `
Before writing scripts, you need to be comfortable with the command line. The shell (like \`bash\`) is the program that reads and executes your commands.

### Essential Commands
Learn these to navigate and manage your system:
- **ls**: Lists files and directories.
- **cd**: Changes your current directory.
- **pwd**: Prints the current working directory path.
- **cp**: Copies files or directories.
- **mv**: Moves or renames files or directories.
- **rm**: Removes files or directories.
- **touch**: Creates an empty file or updates its timestamp.
- **mkdir**: Creates a new directory.
- **echo**: Prints text to the terminal.
- **cat**: Displays the content of a file.

### File Permissions
Understand how \`chmod\` changes who can read, write, and execute files. This is critical for making your scripts runnable.

<CodeBlock>
# Give the owner execute permission
chmod u+x my_script.sh

# A common permission set for scripts
chmod 755 my_script.sh
</CodeBlock>

### ✅ Practice
Open your terminal. Create a folder named \`my-scripts\`, move into it with \`cd\`, create a file with \`touch\`, and view its permissions with \`ls -l\`.
        `
    },
    {
        title: 'Writing Your First Shell Script',
        description: 'Learn how to create, execute, and understand the basic structure of a .sh file.',
        content: `
A shell script is a text file containing a sequence of commands for the shell to execute.

### The Shebang
The first line of your script must be \`#!/bin/bash\` (or another shell like \`#!/bin/sh\`). This is called a "shebang" and it tells the system which interpreter to use to run the script.

### Hello, World!
1. Create a file named \`hello.sh\`.
2. Add the following content:
<CodeBlock>
#!/bin/bash
# This is a comment
echo "Hello, World!"
</CodeBlock>

3. Make it executable and run it:
<CodeBlock>
# Add execute permission for the user
chmod +x hello.sh

# Run the script
./hello.sh
</CodeBlock>

### ✅ Practice
Write a few simple scripts:
- One that prints your username (\`echo $USER\`).
- One that prints the current date and time (\`date\`).
- One that combines both.
        `
    },
    {
        title: 'Variables and User Input',
        description: 'Store data in variables, read input from the user, and use built-in environment variables.',
        content: `
### Declaring Variables
Use variables to store data. **Important:** There are no spaces around the \`=\` sign. To use a variable's value, prefix it with a \`$\`.

<CodeBlock>
#!/bin/bash

GREETING="Hello"
USER_NAME="Deelaksha"

# Use quotes to handle spaces and special characters
echo "$GREETING, $USER_NAME!"
</CodeBlock>

### Reading User Input
Use the \`read\` command to get input from the user and store it in a variable.

<CodeBlock>
#!/bin/bash

echo "Please enter your name:"
read user_name
echo "Welcome, $user_name!"
</CodeBlock>

### Environment Variables
The system has many built-in variables you can use, such as:
- **$HOME**: Your home directory.
- **$USER**: Your current username.
- **$PWD**: The current working directory.
- **$PATH**: A list of directories where the system looks for commands.

### ✅ Practice
- Write a script that asks for two numbers and prints their sum. (Hint: \`sum=$((num1 + num2))\`)
- Write a script that greets the user and then tells them their home directory.
        `
    },
    {
        title: 'Conditional Statements',
        description: 'Make decisions in your script with if, else, and elif structures.',
        content: `
Conditional statements allow your script to perform different actions based on certain conditions.

### The \`if...fi\` Structure
The basic syntax is \`if [ condition ]; then ... fi\`.

<CodeBlock>
#!/bin/bash

echo "Enter a number:"
read num

if [ "$num" -gt 10 ]; then
  echo "Your number is greater than 10."
elif [ "$num" -eq 10 ]; then
  echo "Your number is exactly 10."
else
  echo "Your number is less than 10."
fi
</CodeBlock>

### Common Test Operators
- **-eq**: equal
- **-ne**: not equal
- **-gt**: greater than
- **-lt**: less than
- **-ge**: greater than or equal to
- **-le**: less than or equal to
- **-f "file.txt"**: true if file exists and is a regular file.
- **-d "folder"**: true if directory exists.
- **-z "$VAR"**: true if the variable is empty.

### ✅ Practice
- Write a script that checks if a file named \`config.txt\` exists in the current directory.
- Write a script that asks for a number and checks if it's even or odd (\`$((num % 2)) -eq 0\`).
        `
    },
    {
        title: 'Loops (for, while, until)',
        description: 'Automate repetitive tasks by using for, while, and until loops.',
        content: `
### For Loops
A \`for\` loop is great for iterating over a known list of items.

<CodeBlock>
#!/bin/bash

# Loop over a list of strings
for fruit in apple banana cherry; do
  echo "I like $fruit"
done

# C-style for loop
for (( i=1; i<=5; i++ )); do
  echo "Number: $i"
done
</CodeBlock>

### While Loops
A \`while\` loop runs as long as its condition is true.

<CodeBlock>
#!/bin/bash

count=1
while [ $count -le 3 ]; do
  echo "Count is $count"
  count=$((count + 1))
done
</CodeBlock>

### Until Loops
An \`until\` loop is the opposite of \`while\`; it runs as long as its condition is *false*.

<CodeBlock>
#!/bin/bash

counter=5
until [ $counter -lt 1 ]; do
  echo "Counter: $counter"
  counter=$((counter - 1))
done
</CodeBlock>

### ✅ Practice
- Write a script that uses a \`for\` loop to print the numbers from 1 to 20.
- Write a script that uses a \`while\` loop to print the multiplication table for a number provided by the user.
        `
    },
    {
        title: 'Functions',
        description: 'Organize your code into reusable blocks called functions.',
        content: `
Functions help make your scripts modular, easier to read, and less repetitive.

### Defining and Calling Functions
You can define a function and then call it by its name. Arguments passed to the function can be accessed using \`$1\` (first argument), \`$2\` (second argument), and so on.

<CodeBlock>
#!/bin/bash

# A function that takes one argument
greet() {
  # Check if an argument was provided
  if [ -z "$1" ]; then
    echo "Hello, mysterious stranger!"
  else
    echo "Hello, $1!"
  fi
}

# Call the function with an argument
greet "Alice"

# Call the function without an argument
greet
</CodeBlock>

### Return Values
Functions in shell scripting don't have traditional return values. The most common way to "return" a value is to \`echo\` it and capture the output with command substitution.

<CodeBlock>
#!/bin/bash

get_sum() {
  local num1=$1
  local num2=$2
  local sum=$((num1 + num2))
  echo $sum
}

result=$(get_sum 10 20)
echo "The sum is: $result" # Prints 30
</CodeBlock>

### ✅ Practice
- Write a function that takes a directory path as an argument and lists its contents.
- Write a function to check if a number is prime and \`echo\` "true" or "false".
        `
    },
    {
        title: 'Working with Files & Redirection',
        description: 'Learn to read from and write to files using redirection and standard commands.',
        content: `
### Output Redirection
You can redirect the output of a command from the screen to a file.
- **>** (Overwrite): Redirects output, overwriting the file if it exists.
- **>>** (Append): Redirects output, adding it to the end of the file.

<CodeBlock>
# Overwrite file with the output of ls
ls -l > file_list.txt

# Append a new line to the file
echo "This is a new log entry." >> app.log
</CodeBlock>

### Input Redirection
You can use a file as the input for a command.
- **<**: Redirects the contents of a file to be the standard input for a command.

<CodeBlock>
# Read the first line from a file into a variable
read first_line < data.txt
echo "The first line is: $first_line"
</CodeBlock>

### Reading a File Line by Line
A common pattern for processing files is to use a \`while\` loop with \`read\`.

<CodeBlock>
#!/bin/bash

FILENAME="names.txt"

while read -r line; do
  echo "Processing name: $line"
done < "$FILENAME"
</CodeBlock>

### ✅ Practice
- Write a script that counts the number of lines in a file specified as an argument.
- Write a script that searches a log file for the word "ERROR" and saves all matching lines to a new file called \`error_log.txt\`.
        `
    },
    {
        title: 'Advanced Topics',
        description: 'Explore command-line arguments, case statements, cron jobs, and process management.',
        content: `
### Command-Line Arguments
Your scripts can accept arguments when they are run.
- **$1, $2, ...**: The first, second, etc., arguments.
- **$0**: The name of the script itself.
- **$#**: The total number of arguments.
- **$@**: All arguments as a list of separate strings.

<CodeBlock>
#!/bin/bash
# usage: ./myscript.sh Alice 30

echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "Number of arguments: $#"
</CodeBlock>

### Case Statement
A \`case\` statement is a cleaner alternative to complex \`if/elif\` chains for matching a variable against several patterns.

<CodeBlock>
#!/bin/bash

read -p "Enter 'start', 'stop', or 'status': " choice

case $choice in
  start)
    echo "Starting the service..."
    ;;
  stop)
    echo "Stopping the service..."
    ;;
  status)
    echo "Service is running."
    ;;
  *)
    echo "Invalid option."
    ;;
esac
</CodeBlock>

### Scheduling with Cron
Cron is a system daemon that runs scheduled tasks. You can edit your "crontab" to run your scripts automatically.
- Run \`crontab -e\` to edit your schedule.
- The format is: \`MINUTE HOUR DAY_OF_MONTH MONTH DAY_OF_WEEK /path/to/script.sh\`

<CodeBlock>
# Run a backup script every day at 2:30 AM
30 2 * * * /home/user/scripts/backup.sh
</CodeBlock>

### ✅ Practice
- Write a script that takes a filename as an argument and shows its word count.
- Create a simple script and schedule it with cron to run every minute and append the current date to a log file.
        `
    },
    {
        title: 'Debugging & Best Practices',
        description: 'Learn how to debug your scripts and write clean, reliable code.',
        content: `
### Debugging with \`-x\`
Run your script with \`bash -x\` to see every command as it is executed. This is invaluable for finding out what's going wrong.

<CodeBlock>
bash -x your_script.sh
</CodeBlock>

### Exit on Error
Start your scripts with \`set -e\`. This will cause the script to exit immediately if any command fails, preventing unexpected behavior.

<CodeBlock>
#!/bin/bash
set -e

# If this command fails, the script will stop
mkdir /nonexistent-folder/data
echo "This will not be printed."
</CodeBlock>

### Always Quote Variables
Always enclose your variables in double quotes (\`"$VAR"\`) to prevent issues with spaces or special characters.

<CodeBlock>
# BAD: This will fail if the filename has spaces
rm $filename

# GOOD: This works correctly
rm "$filename"
</CodeBlock>

### Use Meaningful Names
Use clear, descriptive names for your variables and functions (e.g., \`user_name\` instead of \`un\`).
        `
    },
    {
        title: 'Real-World Projects',
        description: 'Apply your knowledge by building practical automation scripts.',
        content: `
The best way to learn is by building. Try creating simple, useful scripts to automate your daily tasks.

### Backup Script
A script that copies a specific folder to a backup location. Bonus: name the backup archive with the current date.

<CodeBlock>
#!/bin/bash
set -e

SRC_DIR="/home/user/documents"
DEST_DIR="/mnt/backups"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
ARCHIVE_FILE="$DEST_DIR/backup-$TIMESTAMP.tar.gz"

echo "Backing up $SRC_DIR to $ARCHIVE_FILE..."
tar -czf "$ARCHIVE_FILE" "$SRC_DIR"
echo "Backup successful!"
</CodeBlock>

### System Monitor Script
A simple script that prints the current CPU usage, free RAM, and disk space. You can use commands like \`top\`, \`free -h\`, and \`df -h\` and filter their output with \`grep\` and \`awk\`.

### Log Parser
A script that reads a log file, finds all lines containing "ERROR", and saves them to a separate \`errors.log\` file for easy review.
        `
    }
];
