
export const commandsData = [
    {
        category: "File and Directory Management",
        name: "ls",
        description: "The `ls` command is like asking your computer to \"show me what's here.\" It will list all the files and folders in your current location.",
        howItWorks: [
            "By itself, `ls` shows a simple list of names.", 
            "Flags can be added for more detail. Flags are like special instructions that modify how a command works.",
            "`-l` (long listing): Provides a detailed, multi-column output including permissions, owner, size, and modification date.",
            "`-a` (all): Shows every file, including hidden 'dotfiles' (files starting with a `.`).",
            "`-t` (time): Sorts the files by their last modification time, with the newest files appearing first.",
            "`-r` (reverse): Reverses the order of the sort. For example, `ls -ltr` will list the oldest files last.",
            "`-h` (human-readable): When used with `-l`, this flag prints file sizes in an easy-to-read format (e.g., `4.0K`, `1.2M`) instead of just bytes.",
            "Flags can be combined. A very common combination is `ls -lart`, which lists all files (`a`) in a detailed long format (`l`), sorted by modification time (`t`), with the oldest appearing last (`r`)."
        ],
        examples: [{ code: "ls -l", text: "Shows a detailed list of all visible files and folders." }, { code: "ls -a", text: "Shows all files, including hidden ones like `.bashrc`." }, { code: "ls -lart", text: "Lists all files, including hidden ones, in a detailed format, sorted by the oldest modification date last."}],
        realWorld: "Before you start working in a new folder, you would use `ls -l` to check the existing files. If you want to see the most recently changed files, you'd use `ls -lt`."
    },
    {
        category: "File and Directory Management",
        name: "pwd",
        description: "The `pwd` command is like asking your computer, \"Where am I right now?\" It tells you the exact path to the folder you are in. The path is a complete address, starting from the very top of the computer's file system (`/`).",
        howItWorks: [
            "You simply type the command, and it prints the full path of your current working directory to the screen.",
            "The `/` at the beginning of the output represents the 'root' directory, the top-level directory of the filesystem.",
            "`-L` (Logical): Prints the logical current working directory, which can be different from the physical directory if you have followed symbolic links. This is usually the default.",
            "`-P` (Physical): Prints the physical directory, resolving any symbolic links to show the 'real' path."
        ],
        examples: [{ code: "pwd", text: "If you are in your main home folder, it might show `/home/yourname`." }, { code: "cd /var/log && pwd", text: "After changing to a new folder, `pwd` would show `/var/log`." }],
        realWorld: "This is super helpful when you are deep inside a bunch of folders and forget where you are, or when writing a script that needs to know its current location."
    },
    {
        category: "File and Directory Management",
        name: "cd",
        description: "The `cd` command is how you move from one folder to another. It's like clicking on a folder icon to go inside it. You just need to tell it the name of the folder you want to go to.",
        howItWorks: [
            "`cd folder_name`: Moves you into a folder inside your current location.",
            "`cd ..`: Moves you up one level to the parent folder. The `..` is a special shortcut that always means 'the directory above the current one'.",
            "`cd /`: Moves you to the very top folder, called the root directory.",
            "`cd ~` or just `cd` by itself will take you back to your home directory from anywhere.",
            "`cd -`: A very useful shortcut that takes you back to the last directory you were in."
        ],
        examples: [{ code: "cd Documents", text: "Changes your location to the `Documents` folder." }, { code: "cd ..", text: "Moves you back to the folder that contains your current one." }, { code: "cd -", text: "If you were in `/home/user/docs` and then did `cd /etc`, `cd -` would take you back to `/home/user/docs`."}],
        realWorld: "You use `cd` all the time to navigate to the exact location of a file you need to work on."
    },
    {
        category: "File and Directory Management",
        name: "mkdir",
        description: "The `mkdir` command stands for \"make directory.\" It's how you create a new, empty folder.",
        howItWorks: [
            "You just type `mkdir` followed by the name you want to give the new folder.",
            "`-p` (parents): This powerful flag lets you create a nested hierarchy of directories all at once. If any of the parent directories in the path don't exist, `mkdir -p` will create them for you.",
            "`-v` (verbose): Prints a message for each directory created, so you can see what's happening."
        ],
        examples: [{ code: "mkdir my_new_project", text: "Creates a new folder called `my_new_project`." }, { code: "mkdir -p school/classes/math", text: "Creates the `school` folder, then `classes` inside `school`, and finally `math` inside `classes`." }],
        realWorld: "When you start a new school project, you can use `mkdir` to create a dedicated folder to keep everything organized."
    },
    {
        category: "File and Directory Management",
        name: "rmdir",
        description: "The `rmdir` command \"removes\" a directory. It's for deleting an empty folder. It's a bit picky, so if the folder has anything inside it, this command won't work.",
        howItWorks: ["You type `rmdir` followed by the folder's name. It's a safe way to delete directories because it forces you to empty them first.", "`-p` (parents): Removes the specified directory and also its parent directories if they become empty after the child is removed."],
        examples: [{ code: "rmdir old_drawings", text: "Deletes the `old_drawings` folder, but only if it's completely empty." }, { code: "rmdir -p project/build/assets", text: "Deletes `assets`, then `build` if it becomes empty, then `project` if it becomes empty." }],
        realWorld: "This command is useful for cleaning up empty folders after a project is finished, ensuring you don't accidentally delete something important."
    },
    {
        category: "File and Directory Management",
        name: "touch",
        description: "The `touch` command is a quick way to create a brand new, empty file. It's like taking a blank piece of paper and giving it a name. If the file already exists, it simply updates the last time the file was \"touched.\"",
        howItWorks: ["Type `touch` followed by the name you want the new file to have. You can create multiple files at once by listing their names separated by spaces.", "`-a`: Changes the access time only.", "`-m`: Changes the modification time only."],
        examples: [{ code: "touch shopping_list.txt", text: "Creates a new, empty file named `shopping_list.txt`." }, { code: "touch my_script.sh", text: "Creates a blank script file, ready for you to add commands." }],
        realWorld: "Programmers often use `touch` to create a new file to start writing code in, or to update a file's timestamp to trigger a build process."
    },
    {
        category: "File and Directory Management",
        name: "cp",
        description: "The `cp` command \"copies\" a file or folder. It makes a perfect duplicate and puts it in a new location or gives it a new name.",
        howItWorks: [
            "`cp source_file destination_file`: Copies `source_file` to a new file called `destination_file`.",
            "`cp source_file destination_folder/`: Copies `source_file` into the `destination_folder`, keeping the original name.",
            "`-r` (recursive): This flag is essential for copying directories. It tells `cp` to copy the folder and everything inside it, including all sub-folders and files.",
            "`-i` (interactive): Prompts for confirmation before overwriting an existing file.",
            "`-v` (verbose): Shows what is being copied.",
            "`-p` (preserve): Preserves the original file's attributes like owner, group, permissions, and timestamps."
        ],
        examples: [{ code: "cp report.pdf report_backup.pdf", text: "Creates a backup of your report in the same directory." }, { code: "cp -r vacation_photos /home/user/photo_archive", text: "Copies the entire `vacation_photos` folder to a different location." }, { code: "cp -iv file.txt /backups", text: "Copies `file.txt` to the backups folder, printing the action and asking before overwriting."}],
        realWorld: "This is essential for creating backups of important documents before you make big changes."
    },
    {
        category: "File and Directory Management",
        name: "mv",
        description: "The `mv` command is a two-in-one tool. It can either \"move\" a file from one place to another or \"rename\" it.",
        howItWorks: [
            "`mv old_name new_name`: Renames `old_name` to `new_name`. This happens if the source and destination are in the same directory.",
            "`mv file_name destination_folder/`: Moves `file_name` into the `destination_folder`.",
            "`-i` (interactive): Prompts before overwriting an existing file.",
            "`-v` (verbose): Shows what is being moved."
        ],
        examples: [{ code: "mv shopping_list.txt grocery_list.txt", text: "Renames the file." }, { code: "mv report.pdf Documents/", text: "Moves the `report.pdf` file into your `Documents` folder." }, {"code": "mv -iv old.txt new_location/", "text": "Moves `old.txt`, showing progress and asking before overwriting a file with the same name."}],
        realWorld: "You would use `mv` to organize your files, for example, moving a downloaded file from your \"Downloads\" folder into a \"Reports\" folder."
    },
    {
        category: "File and Directory Management",
        name: "rm",
        description: "The `rm` command \"removes\" a file. It's like throwing a piece of paper in the trash, but there's no way to get it back, so you have to be very careful!",
        howItWorks: [
            "`rm file_name`: Deletes the specified file permanently.",
            "`-r` (recursive): This flag is used to delete a directory and all of its contents. Without this flag, `rm` won't delete directories.",
            "`-f` (force): This flag forces the deletion without asking for confirmation. It's dangerous and can lead to accidental data loss. Use with extreme caution, especially with `-r` (`rm -rf`).",
            "`-i` (interactive): This flag prompts for confirmation before every deletion, which is much safer."
        ],
        examples: [{ code: "rm extra_notes.txt", text: "Deletes the file permanently." }, { code: "rm -i old_file.txt", text: "Asks for confirmation before deleting." }, { code: "rm -rf old_project", text: "Forcefully deletes the entire `old_project` folder and all its contents without any prompts. VERY DANGEROUS!" }],
        realWorld: "You use `rm` to delete files you no longer need, which helps free up space on your computer."
    },
    {
        category: "File and Directory Management",
        name: "find",
        description: "The `find` command is like a powerful search engine for your computer's files. It can look for files based on their name, size, type, or when they were last changed.",
        howItWorks: [
            "The basic syntax is `find [path] [expression]`. The `path` tells `find` where to start looking (e.g., `.` for the current directory).",
            "`-name \"pattern\"`: Searches for files based on their name. You can use wildcards like `*` (matches anything). The pattern should be in quotes.",
            "`-iname \"pattern\"`: Same as `-name` but the search is case-insensitive.",
            "`-type`: Searches for a specific type. `f` for regular files, `d` for directories.",
            "`-size`: Searches for files of a certain size. `+1G` means larger than 1 gigabyte, `-100M` means smaller than 100 megabytes.",
            "`-mtime -N`: Finds files modified within the last `N` days. For example, `-mtime -7` finds files changed in the last week.",
            "`-exec command {} \\;`: This allows you to run another command on each file that is found. The `{}` is replaced by the found file name."
        ],
        examples: [{ code: "find . -name \"*.jpg\"", text: "Searches the current folder (`.`) and all subfolders for any files that end with `.jpg`." }, { code: "find /home -type f -size +1G", text: "Searches for files (`-type f`) in the entire `/home` directory that are bigger than 1 gigabyte (`+1G`)." }, { code: "find . -type f -name \"*.tmp\" -exec rm {} \\;", text: "Finds all files ending in `.tmp` in the current directory and its subdirectories and deletes them."}],
        realWorld: "If you saved a document but can't remember where, `find /home -iname \"*report*.pdf\"` can help you locate it very quickly, regardless of capitalization."
    },
    {
        category: "File Viewing and Editing",
        name: "cat",
        description: "The `cat` command, short for \"concatenate,\" shows you everything inside a file at once. It's best for small files because it will dump the entire content onto your screen.",
        howItWorks: [
            "Type `cat` followed by the file's name.",
            "`-n`: Displays the output with line numbers.",
            "The `>` character is a 'redirect'. It takes the output of a command and sends it somewhere else. In the example, it sends the combined text of two files into a new file."
        ],
        examples: [{ code: "cat my_story.txt", text: "Shows you the entire text of `my_story.txt`." }, { code: "cat -n script.sh", text: "Displays the script file with line numbers, which is useful for debugging." }, { code: "cat file1.txt file2.txt > combined.txt", text: "This combines the text from `file1.txt` and `file2.txt` and saves the result in a new file called `combined.txt`." }],
        realWorld: "Use `cat` to quickly read a small configuration file or a shopping list without opening a text editor."
    },
    {
        category: "File Viewing and Editing",
        name: "less",
        description: "The `less` command is much better than `cat` for big files. It lets you scroll through a file one screen at a time, so it doesn't overwhelm you with information.",
        howItWorks: [
            "Type `less` and the file name. Use the arrow keys, Page Up/Down to scroll.",
            "`/text`: Searches forward for `text` in the file. `n` goes to the next match, `N` to the previous.",
            "`?text`: Searches backward for `text`.",
            "Press `q` to quit and return to the command line.",
            "`-N`: Displays line numbers, which is very helpful for navigating large files.",
            "The `|` character is a 'pipe'. It takes the output of the command on its left and 'pipes' it as the input to the command on its right."
        ],
        examples: [{ code: "less big_book.txt", text: "Opens the file so you can read it page by page." }, { code: "ls -l /etc | less", text: "The `|` sends the long output of `ls` to `less`, so you can scroll through a very long list of files." }],
        realWorld: "System administrators often use `less` to look at huge log files from a server without having to wait for the whole file to load."
    },
    {
        category: "File Viewing and Editing",
        name: "head",
        description: "The `head` command shows you just the beginning of a file. By default, it shows the first 10 lines.",
        howItWorks: [
            "`head file_name`: Shows the first 10 lines.",
            "`-n <number>`: This flag specifies the number of lines to show. For example, `head -n 5` shows the first 5 lines."
        ],
        examples: [{ code: "head recipes.txt", text: "Shows the first 10 recipes in your file." }, { code: "head -n 3 /etc/hosts", text: "Quickly shows the first 3 lines of an important system file." }],
        realWorld: "Use `head` to quickly peek at the structure or headers of a large data file before processing it."
    },
    {
        category: "File Viewing and Editing",
        name: "tail",
        description: "The `tail` command is the opposite of `head`. It shows you the end of a file. This is especially useful for files that are constantly being written to, like a server's log.",
        howItWorks: [
            "`tail file_name`: Shows the last 10 lines.",
            "`-n <number>`: Specifies the number of lines to show from the end.",
            "`-f` (follow): This is a special mode that keeps the file open and shows new lines as they are added to the file in real-time."
        ],
        examples: [{ code: "tail -n 20 notes.txt", text: "Shows the last 20 lines of notes you wrote." }, { code: "tail -f /var/log/syslog", text: "This is what you would use to watch a system's activity in real-time." }],
        realWorld: "A developer might use `tail -f` to watch for errors or messages from their program as it's running."
    },
    {
        category: "Permissions and Ownership",
        name: "chmod",
        description: "The `chmod` command \"changes the mode\" or permissions of a file. Permissions decide who can do what with a file. There are three types of permissions: **r** (read), **w** (write), and **x** (execute). Permissions are given to three groups: the **owner** (u), the **group** (g), and **others** (o).",
        howItWorks: [
            "Symbolic method: Uses letters to add (`+`), remove (`-`), or set (`=`) permissions. `chmod u+x file` adds execute permission for the user. `chmod g-w file` removes write permission for the group. `chmod o=r` sets permissions for others to read-only.",
            "Numeric (octal) method: This is more common. Each permission has a number: `4` for read, `2` for write, `1` for execute. You add them up for each group (owner, group, others). For example, `7` (4+2+1) is full permission (rwx). `6` (4+2) is read/write (rw-). `5` (4+1) is read/execute (r-x).",
            "`chmod 755 file`: Owner gets rwx (7), group gets r-x (5), others get r-x (5). This is very common for scripts and programs that need to be run by anyone.",
            "`chmod 644 file`: Owner gets rw- (6), group gets r-- (4), others get r-- (4). This is very common for text files and documents that should be readable by everyone but only changed by the owner.",
            "`-R` (Recursive): Applies the permission changes to a directory and all files and subdirectories inside it."
        ],
        examples: [{ code: "chmod +x my_script.sh", text: "Adds execute permission for everyone, allowing you to run the script." }, { code: "chmod 600 private.key", text: "Makes a file readable and writable *only* by you, and no one else. This is important for sensitive files like SSH keys." }, { code: "chmod -R 755 public_html", text: "Recursively sets permissions for a web directory, making all folders browsable and all files executable." }],
        realWorld: "When you download a program or write a script, you almost always need to use `chmod +x` to make it runnable. Setting correct permissions is a fundamental part of system security."
    },
    {
        category: "Permissions and Ownership",
        name: "chown",
        description: "The `chown` command \"changes the owner\" of a file or folder. You usually need superuser (`sudo`) privileges to do this for files you don't own.",
        howItWorks: [
            "`chown new_owner file_name`: Changes who owns the file.",
            "`chown new_owner:new_group file_name`: The colon `:` is used to change both the owner and the group at the same time.",
            "`-R` (Recursive): This flag applies the ownership change to a directory and all files and subdirectories within it."
        ],
        examples: [{ code: "sudo chown jack important_file.txt", text: "This uses `sudo` (superuser do) to make `jack` the new owner of `important_file.txt`." }, { code: "sudo chown -R www-data:www-data /var/www/html", text: "A common command to give a web server user ownership of all website files." }],
        realWorld: "A system administrator might use `chown` to give a user ownership of files they need to edit on a shared server."
    },
    {
        category: "Process and System Management",
        name: "ps",
        description: "The `ps` command stands for \"process status.\" It shows you a snapshot of all the programs and tasks that are running on your computer right now.",
        howItWorks: [
            "`ps aux` is a common combination of flags:",
            "`a`: Show processes for all users.",
            "`u`: Display the process's user/owner and other details.",
            "`x`: Also show processes not attached to a terminal (like background services).",
            "The output shows the PID (Process ID), which you can use with other commands like `kill`.",
            "`ps -ef`: Another popular combination, similar to `aux`, that shows a full listing in a standard format."
        ],
        examples: [{ code: "ps aux", text: "Get a detailed list of every process running on the system." }, { code: "ps aux | grep firefox", text: "This finds and shows you only the processes related to the Firefox web browser. `grep` filters the output." }],
        realWorld: "If your computer is slow, you can use `ps aux` to see which programs are running and how much memory and CPU they are using."
    },
    {
        category: "Networking and Connectivity",
        name: "ping",
        description: "The `ping` command is like sending a small message to another computer on the internet to see if it's there and how fast it responds.",
        howItWorks: [
            "It sends a special network packet (an ICMP echo request) and waits for a reply.",
            "The `time=` value in the output tells you the round-trip time in milliseconds. A lower time means a faster, better connection.",
            "Press `Ctrl + C` to stop pinging.",
            "`-c <count>`: Specifies the number of pings to send before stopping."
        ],
        examples: [{ code: "ping google.com", text: "Sends a message to Google's servers to see if they are reachable." }, { code: "ping -c 4 192.168.1.1", text: "The `-c 4` flag tells it to send exactly 4 packets and then stop automatically." }],
        realWorld: "If you can't access a website, you can use `ping` to see if the problem is with your own internet connection or with the website itself."
    },
    {
        category: "Archiving and Compression",
        name: "tar",
        description: "The `tar` command stands for \"tape archive.\" It's used to put many files and folders into one big \"box\" or archive file (a .tar file, or 'tarball'). This makes it easier to move or save them all together. Note that `tar` by itself does not compress.",
        howItWorks: [
            "Flags control what `tar` does:",
            "`-c` (create): Creates a new archive.",
            "`-x` (extract): Extracts files from an archive.",
            "`-v` (verbose): Shows a list of the files being processed, so you can see the progress.",
            "`-f` (file): Tells `tar` that the next argument is the name of the archive file. This flag is almost always required.",
            "`-z` (gzip): This flag tells `tar` to also compress the archive with gzip, creating a `.tar.gz` file. This is very common.",
            "`-j` (bzip2): Compresses the archive with bzip2 (`.tar.bz2`), which is slower but can result in a smaller file size.",
            "`-t`: Lists the contents of an archive without extracting it."
        ],
        examples: [{ code: "tar -cvf my_photos.tar my_photos/", text: "Puts all your photos into a single archive file." }, { code: "tar -xvf my_photos.tar", text: "Takes all the photos out of the archive." }, { code: "tar -czvf project.tar.gz project_folder/", text: "Creates a compressed gzip archive of a folder."}],
        realWorld: "This is a standard way to package up source code or project files to back them up or send them to someone else."
    },
    {
        category: "User Management",
        name: "whoami",
        description: "The `whoami` command is like asking the computer, \"What is my username?\" It just prints the name of the user you are currently logged in as.",
        howItWorks: ["Just type the command and press enter. It's simple and has no options."],
        examples: [{ code: "whoami", text: "If you are logged in as `student`, it will show `student`." }, { code: "sudo whoami", text: "When run with `sudo`, it will print `root`, because `sudo` makes you the superuser for that command." }],
        realWorld: "Useful in scripts to verify the script is being run by the correct user before performing sensitive operations."
    },
    {
        category: "Permissions and Ownership",
        name: "umask",
        description: "The `umask` command sets the default permissions for any new files and folders you create. It's a 'mask' that removes permissions.",
        howItWorks: [
            "It uses a number that is subtracted from the default permissions. The default for directories is `777` and for files is `666`.",
            "A `umask` of `022` means: For directories, `777 - 022 = 755` (rwxr-xr-x). For files, `666 - 022 = 644` (rw-r--r--).",
            "This ensures that new files you create are not writable by other users by default, which is a good security practice.",
            "`-S`: Shows the mask in symbolic format (e.g., u=rwx,g=rx,o=rx) which can be easier to read."
        ],
        examples: [{ code: "umask", text: "Shows the current umask value (e.g., `0022`)." }, { code: "umask 077", text: "Sets a very restrictive mask. New files/folders will only be accessible by you." }],
        realWorld: "An administrator would set the `umask` for all users on a server to ensure that files are created with the correct security from the start."
    },
    {
        category: "Process and System Management",
        name: "top",
        description: "The `top` command is an interactive, live list of all the running programs. It constantly updates and shows you which programs are using the most CPU and memory.",
        howItWorks: [
            "You just type `top` and it opens a live view. The list is updated every few seconds.",
            "Inside `top`, you can press keys to interact: `P` to sort by CPU usage, `M` to sort by memory usage, `k` to kill a process (it will ask for the PID), and `q` to quit."
        ],
        examples: [{ code: "top", text: "Shows the live list of all running processes." }, { code: "top -u username", text: "Filters the list to only show the processes belonging to a specific user." }],
        realWorld: "If your computer fan is loud and things are slow, open `top` to find the process that is using 100% CPU and decide if you need to stop it."
    },
    {
        category: "Process and System Management",
        name: "kill",
        description: "The `kill` command is used to stop a running program or task (a 'process'). You tell it to stop a specific process by using its special ID number, called a PID (Process ID).",
        howItWorks: [
            "`kill PID_number`: Sends a standard termination signal (SIGTERM), asking the program to shut down gracefully.",
            "`kill -9 PID_number` or `kill -SIGKILL PID_number`: The `-9` sends the `SIGKILL` signal, which is a non-blockable signal that forces the process to stop immediately. Use this if the program is stuck and won't close normally.",
            "`killall <process_name>`: A related command that kills all processes with a given name, which can be easier than finding the PID."
        ],
        examples: [{ code: "kill 12345", text: "Politely asks the program with PID `12345` to stop." }, { code: "kill -9 98765", text: "Forcefully stops a program that is not responding." }, { code: "killall firefox", text: "Kills all running Firefox processes." }],
        realWorld: "You would use `ps` or `top` to find the PID of a frozen program and then use `kill` to shut it down."
    },
    {
        category: "Process and System Management",
        name: "uptime",
        description: "The `uptime` command tells you how long your computer has been turned on and running without a reboot.",
        howItWorks: [
            "It shows the current time, how long the system has been up, how many users are logged in, and the 'load average' (a measure of how busy the CPU has been over the last 1, 5, and 15 minutes).",
            "`-p` (pretty): This flag makes the output more friendly, like 'up 5 days, 3 hours'."
        ],
        examples: [{ code: "uptime", text: "Shows you all the information in a single line." }, { code: "uptime -p", text: "Shows just the uptime in a human-readable format." }],
        realWorld: "System administrators use `uptime` to check if a server has been restarted, which can be important for diagnosing problems or scheduling maintenance."
    },
    {
        category: "Process and System Management",
        name: "df",
        description: "The `df` command stands for \"disk free.\" It shows you how much space is available on your computer's storage devices (filesystems).",
        howItWorks: [
            "`-h` (human-readable): Shows the sizes in `K` (kilobytes), `M` (megabytes), and `G` (gigabytes) instead of just blocks. This makes it much easier to understand.",
            "`-T`: Shows the filesystem type (e.g., ext4, xfs).",
            "`-i`: Shows inode usage instead of block usage.",
            "The `Use%` column is very helpful to quickly see which drive is getting full."
        ],
        examples: [{ code: "df -h", text: "Shows how much space is used and available on all your hard drives." }, { code: "df -h .", text: "Shows the disk space usage for the specific filesystem where the current directory resides." }],
        realWorld: "When your computer is running low on space, you would use `df -h` to see which partition is full."
    },
    {
        category: "Process and System Management",
        name: "du",
        description: "The `du` command stands for \"disk usage.\" It tells you how much space a specific folder or file is using.",
        howItWorks: [
            "`-h` (human-readable): Shows sizes in `K`, `M`, `G`.",
            "`-s` (summary): This shows only the grand total for the specified directory, rather than listing the size for every single subdirectory.",
            "`-d <depth>` or `--max-depth=<depth>`: Specifies how many levels of subdirectories to report on.",
            "A common pattern is `du -sh *` to see the size of all items in the current directory."
        ],
        examples: [{ code: "du -h my_photos", text: "Shows the size of the `my_photos` folder and every subdirectory inside it." }, { code: "du -sh my_photos", text: "Shows only the total size of the `my_photos` folder. This is very common." }, { code: "du -h --max-depth=1", text: "Shows the disk usage for the current directory and items one level deep." }],
        realWorld: "If `df` shows a drive is full, you can use `du -sh *` in the root directory of that drive to find which folders are taking up the most space."
    },
    {
        category: "Process and System Management",
        name: "free",
        description: "The `free` command shows you how much of your computer's memory (RAM) is being used.",
        howItWorks: [
            "`-h` (human-readable): Shows the memory in a human-readable format like `G` (gigabytes) or `M` (megabytes).",
            "`-g` for gigabytes, `-m` for megabytes.",
            "`-s <seconds>`: Continuously displays the memory usage every N seconds.",
            "The output shows total, used, and free memory. Don't be alarmed if 'free' is low. Linux uses available memory for caching ('buff/cache') to speed things up. The 'available' column is a better estimate of memory available for new applications."
        ],
        examples: [{ code: "free -h", text: "Shows a summary of your total memory, how much is used, and how much is free." }, { code: "free -g", text: "Shows the memory usage in gigabytes." }],
        realWorld: "If your computer is running slow, you can use `free -h` to see if a program is using up all your memory."
    },
    {
        category: "Networking and Connectivity",
        name: "ifconfig",
        description: "The `ifconfig` command is a classic networking tool to show or configure network interfaces. It is considered deprecated and has been replaced by `ip` on most modern systems, but is still found on many.",
        howItWorks: [
            "Typing `ifconfig` shows a list of your network adapters (like `eth0` for ethernet or `wlan0` for wireless) and their details.",
            "`inet`: This field shows the IPv4 address (the most common type of IP address).",
            "`ether`: This field shows the MAC address, a unique hardware identifier for your network card.",
            "You can also use it to bring interfaces up or down: `ifconfig eth0 up` or `ifconfig eth0 down`."
        ],
        examples: [{ code: "ifconfig", text: "Displays the network configuration for all active network interfaces." }, { code: "ifconfig eth0", text: "Displays the network configuration for a specific network interface, like `eth0`." }],
        realWorld: "On older systems or some network appliances, this may be the only tool available to find the device's IP address."
    },
    {
        category: "Networking and Connectivity",
        name: "ip addr",
        description: "The `ip addr` command is the modern replacement for `ifconfig` and is used to see or manipulate network information, like IP addresses.",
        howItWorks: [
            "`ip addr show`: This is the full command, but `ip a` is a common shortcut. It lists your network interfaces.",
            "Look for `inet` to find the IPv4 address and `inet6` for the IPv6 address.",
            "The `ip` command can do much more, like adding/deleting addresses, and is very powerful."
        ],
        examples: [{ code: "ip addr", text: "Shows your computer's IP address and other network details." }, { code: "ip a", text: "A common and much shorter alias for `ip addr`." }],
        realWorld: "This is the standard, go-to command for finding your IP address on any modern Linux system."
    },
    {
        category: "Networking and Connectivity",
        name: "netstat",
        description: "The `netstat` command shows network connections, routing tables, and interface statistics. It's very useful for seeing what ports are open and what connections are active.",
        howItWorks: [
            "Flags are combined to get the needed info:",
            "`-t`: Show TCP connections.",
            "`-u`: Show UDP connections.",
            "`-l`: Show only listening ports (ports waiting for a connection).",
            "`-n`: Show numerical addresses instead of trying to resolve hostnames, which is faster.",
            "`-p`: Show the PID and name of the program that owns the socket (requires `sudo`).",
            "`netstat -tulnp` is a very common combination for system administrators."
        ],
        examples: [{ code: "netstat -a", text: "Shows a list of all connections and listening ports." }, { code: "sudo netstat -tulnp", text: "A common command to see all TCP and UDP ports that are currently listening for connections, and which programs are using them." }],
        realWorld: "A network administrator would use `netstat -tulnp` to check if a web server is correctly listening on port 80 or 443."
    },
    {
        category: "Networking and Connectivity",
        name: "scp",
        description: "The `scp` command \"securely copies\" files over the network using the SSH protocol. It's like using `cp` to copy a file, but for remote computers.",
        howItWorks: [
            "The syntax is `scp [options] user@source_host:source_file user@dest_host:dest_file`.",
            "To copy from your machine to a remote one: `scp local_file.txt user@remote:/home/user/`",
            "To copy from a remote machine to yours: `scp user@remote:/path/to/file.txt .` (The `.` means 'the current directory').",
            "`-r`: Recursively copy entire directories.",
            "`-P <port>`: (Note the capital P) Use if the remote SSH server is on a non-standard port."
        ],
        examples: [{ code: "scp my_file.txt user@192.168.1.5:/home/user/documents", text: "Copies `my_file.txt` to the `/home/user/documents` folder on another computer." }, { code: "scp user@server.com:/var/log/server.log .", text: "Copies a log file from a remote server to your current location (`.`)." }, {"code": "scp -r project/ user@server:/var/www/html", "text": "Recursively copies the entire `project` directory to the web server."}],
        realWorld: "You would use `scp` to quickly upload a file to a web server or download a backup file from a remote machine."
    },
    {
        category: "Networking and Connectivity",
        name: "ssh",
        description: "The `ssh` command, or \"secure shell,\" lets you safely log into and control another computer from your own. It creates an encrypted connection so your commands and passwords are secure.",
        howItWorks: [
            "The basic syntax is `ssh user@hostname`.",
            "The first time you connect, it will ask you to verify the remote host's 'fingerprint'. This is a security feature.",
            "You will then be prompted for the password for the remote user account.",
            "`-p <port>`: Use if the remote SSH server is not on the default port 22.",
            "`-i <path_to_key>`: Use a specific private key file for authentication instead of a password."
        ],
        examples: [{ code: "ssh user@server.com", text: "Connects to `server.com` with the username `user`." }, { code: "ssh -p 2222 student@10.0.0.5", text: "The `-p 2222` flag is used to connect to a server that is using a non-standard port." }],
        realWorld: "A system administrator uses `ssh` every day to manage servers and other computers from anywhere in the world."
    },
    {
        category: "Networking and Connectivity",
        name: "wget",
        description: "The `wget` command \"gets\" files from the web. It's a simple, command-line way to download a file from a URL.",
        howItWorks: [
            "You just type `wget` followed by the full address of the file.",
            "`-O <filename>`: Saves the downloaded file with a different name.",
            "`-c`: Continues a partially downloaded file.",
            "`-r`: Downloads recursively (can download an entire website).",
            "`--no-check-certificate`: Skips certificate validation, useful for self-signed certs (use with caution)."
        ],
        examples: [{ code: "wget https://example.com/file.zip", text: "Downloads the `file.zip` from that website." }, { code: "wget -O linux.html https://www.kernel.org/", text: "Downloads the kernel.org homepage and saves it as `linux.html`." }],
        realWorld: "A developer might use `wget` in a script to automatically download the latest version of a software package."
    },
    {
        category: "Networking and Connectivity",
        name: "curl",
        description: "The `curl` command is a very powerful tool for transferring data with URLs. It can do much more than just download a file; it's a key tool for testing APIs and web services.",
        howItWorks: [
            "By default, `curl URL` will display the content of the URL directly in your terminal.",
            "`-O`: Saves the content to a file with the same name as the remote file.",
            "`-o <filename>`: Saves the content to a specific file you name.",
            "`-X <METHOD>`: Allows you to specify the HTTP method (e.g., `POST`, `PUT`, `DELETE`).",
            "`-H <header>`: Adds a custom header to the request (e.g., `-H \"Content-Type: application/json\"`).",
            "`-d <data>`: Sends data in a POST request."
        ],
        examples: [{ code: "curl https://api.github.com/users/octocat", text: "Gets information about the user \"octocat\" from GitHub's API and displays it as text." }, { code: "curl -O https://example.com/big_file.zip", text: "Downloads the remote file and saves it with its original name." }, { "code": "curl -X POST -H \"Content-Type: application/json\" -d '{\"name\":\"test\"}' https://api.example.com/items", "text": "Sends a JSON object to create a new item via an API."}],
        realWorld: "Developers use `curl` constantly to test if their web APIs are working correctly, sending and receiving data in JSON format."
    },
    {
        category: "Archiving and Compression",
        name: "gzip",
        description: "The `gzip` command \"compresses\" a file to make it smaller, which is useful for saving space. It replaces the original file with a compressed version ending in `.gz`.",
        howItWorks: [
            "You type `gzip` followed by the file name.",
            "`-d` or `gunzip`: This is how you decompress the file.",
            "`-k`: Keeps the original file after compression, which is not the default behavior.",
            "`-r`: Recursively compresses all files in a directory."
        ],
        examples: [{ code: "gzip huge_log.txt", text: "Compresses the file and renames it `huge_log.txt.gz`." }, { code: "gzip -k data.csv", text: "Compresses `data.csv` to `data.csv.gz` but also keeps the original `data.csv`." }],
        realWorld: "You would use `gzip` on large, plain-text log files or backups that you want to store for a long time without them taking up too much space."
    },
    {
        category: "Archiving and Compression",
        name: "gunzip",
        description: "The `gunzip` command \"decompresses\" a file that was compressed with `gzip`. It restores the file to its original form so you can use it.",
        howItWorks: ["You type `gunzip` followed by the compressed file's name (with the `.gz` extension). It will remove the `.gz` file and replace it with the original, uncompressed file.", "`-c`: Writes the output to standard output (the screen), keeping the original compressed file. This can be redirected (`>`) to a new file."],
        examples: [{ code: "gunzip huge_log.txt.gz", text: "Decompresses the file and returns it to its original name, `huge_log.txt`." }, { code: "gunzip -c backup.sql.gz > backup.sql", text: "The `-c` flag writes the output to the screen, which can be redirected (`>`) to a new file, keeping the compressed original." }],
        realWorld: "You would use `gunzip` when you need to read or process an old log file or backup that was compressed to save space."
    },
    {
        category: "Archiving and Compression",
        name: "zip",
        description: "The `zip` command is a popular way to both \"archive\" (bundle) and \"compress\" files at the same time. It's a very common format that works on many different types of computers, not just Linux.",
        howItWorks: [
            "`zip archive_name.zip file1 file2 folder1`: Puts all the listed files and folders into a single compressed `.zip` file.",
            "`-r`: This flag is used to 'recurse' into directories, ensuring that a folder and all its contents are included in the zip file."
        ],
        examples: [{ code: "zip my_project.zip my_code.py report.txt", text: "Creates a zip file containing the two files." }, { code: "zip -r my_photos.zip my_photos/", text: "Recursively zips the entire `my_photos` folder and its contents." }],
        realWorld: "You would use `zip` to package up and compress a folder of documents to send to a colleague via email."
    },
    {
        category: "Archiving and Compression",
        name: "unzip",
        description: "The `unzip` command \"extracts\" files from a `.zip` archive. It takes all the files and folders that were put into the archive and puts them back on your computer.",
        howItWorks: [
            "`unzip archive_name.zip`: Unzips the file and places the contents in your current folder.",
            "`-d <directory>`: This flag allows you to specify a different directory to extract the files into.",
            "`-l`: Lists the contents of the zip file without actually extracting them."
        ],
        examples: [{ code: "unzip my_project.zip", text: "Unzips all the files from `my_project.zip` into the current directory." }, { code: "unzip software.zip -d /tmp/test", text: "Extracts the contents of `software.zip` into the `/tmp/test` directory." }],
        realWorld: "Whenever you download a `.zip` file from the internet, you would use `unzip` to get the files out."
    },
    {
        category: "User Management",
        name: "id",
        description: "The `id` command gives you more detail about a user account, not just the name. It shows the unique user ID number (uid), the primary group ID (gid), and all the other groups the user belongs to.",
        howItWorks: [
            "`id`: Shows information for your own user account.",
            "`id <username>`: Shows information for a different user.",
            "`-u`: Shows just the user ID number.",
            "`-g`: Shows just the primary group ID.",
            "`-G`: Shows all group IDs.",
            "`-n`: Shows the name instead of the number (used with -u, -g, -G)."
        ],
        examples: [{ code: "id", text: "Shows your user ID, your main group ID, and all the other groups you are a member of." }, { code: "id jack", text: "Shows the user and group information for a different user named `jack`." }, { code: "id -un", text: "Shows just your username."}],
        realWorld: "This is used by system administrators to quickly look up a user's ID numbers, which are important for managing file permissions and access control."
    },
    {
        category: "User Management",
        name: "who",
        description: "The `who` command tells you who else is currently logged into the computer.",
        howItWorks: [
            "Just type `who`. It will list each user's name, the terminal they are connected to (`tty`), the date and time they logged in, and where they are connected from (if remote).",
            "`-H`: Adds column headers to make the list easier to read.",
            "`-b`: Shows the time of the last system boot."
        ],
        examples: [{ code: "who", text: "Shows a list of all users currently on the system." }, { code: "who -H", text: "Shows the same list but with helpful headers for each column." }],
        realWorld: "On a shared university or company server, you can use `who` to see if your friends or colleagues are also logged in."
    }
];
