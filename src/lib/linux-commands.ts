
export const commandsData = [
    {
        category: "File and Directory Management",
        name: "ls",
        description: "The `ls` command is like asking your computer to \"show me what's in this room.\" It lists all the files and folders in your current location.",
        howItWorks: [
            "By itself, `ls` shows a simple list of names.", 
            "You can add special 'Power-Up' flags to get more details:",
            "**-l (The Magnifying Glass)**: Shows a detailed 'long' list with permissions, owner, size, and modification date.",
            "**-a (The Secret-Detector)**: Shows *all* files, including hidden 'dotfiles' (files starting with a `.`) like secret settings.",
            "**-t (The Time-Sorter)**: Sorts the files by their last modification time, showing the newest files first.",
            "**-r (The Reverser)**: Flips the order of the sort. `ls -ltr` is a classic combo to see the oldest files at the bottom of the list.",
            "**-h (The Humanizer)**: When used with `-l`, this makes file sizes easy to read (e.g., `4K`, `1.2M`) instead of giant numbers.",
            "Combine them for superpowers! `ls -lart` lists everything (`a`), in detail (`l`), sorted by time (`t`), with the oldest at the bottom (`r`)."
        ],
        examples: [
            { code: "ls -l", text: "Shows a detailed list of all visible files and folders." }, 
            { code: "ls -a", text: "Reveals all files, including hidden ones like `.bashrc`." }, 
            { code: "ls -lt", text: "Shows the most recently modified files at the top." },
            { code: "ls -lart", text: "Lists all files, including hidden ones, in a detailed format, sorted by the oldest modification date last."}
        ],
        realWorld: "Whenever you enter a new directory, you'll use `ls -l` to get your bearings and see what files you're working with. If you just edited a file and want to find it quickly, `ls -lt` is your best friend."
    },
    {
        category: "File and Directory Management",
        name: "pwd",
        description: "The `pwd` (Print Working Directory) command is like asking your GPS, \"Where am I right now?\" It tells you the exact, full path to the folder you are currently in.",
        howItWorks: [
            "You simply type the command, and it prints the full path to the screen, starting from the very top of the computer's file system (`/`).",
            "The `/` at the beginning of the output is the 'root' directory—the main trunk of the file tree.",
            "**-L (Logical Path)**: Shows the path you used to get there, even if it involves shortcuts (symbolic links). This is the default.",
            "**-P (Physical Path)**: Ignores shortcuts and shows you the 'real,' physical path on the hard drive."
        ],
        examples: [
            { code: "pwd", text: "If you are in your main home folder, it might print `/home/yourname`." }, 
            { code: "cd /var/log && pwd", text: "After changing to a new folder, `pwd` confirms your new location by printing `/var/log`." }
        ],
        realWorld: "This is super helpful when you're navigating deep inside a project and forget your exact location. It's also essential in scripts that need to know where they are running from to find other files."
    },
    {
        category: "File and Directory Management",
        name: "cd",
        description: "The `cd` (Change Directory) command is your teleportation device. It's how you move from one folder to another, like clicking on a folder icon to go inside it.",
        howItWorks: [
            "**cd folder_name**: Teleports you into a folder inside your current location.",
            "**cd ..**: Moves you up one level to the parent folder. `..` is a universal shortcut for 'the directory above'.",
            "**cd /**: Takes you to the absolute top of the file system, the root directory.",
            "**cd ~** or just **cd**: Instantly returns you to your home directory from anywhere.",
            "**cd -**: A magical shortcut that teleports you back to the *exact last directory you were in*."
        ],
        examples: [
            { code: "cd Documents", text: "Changes your location to the `Documents` folder." }, 
            { code: "cd ..", text: "Moves you back to the folder that contains your current one." }, 
            { code: "cd", text: "Instantly teleports you back to your home folder, no matter how lost you are." },
            { code: "cd -", text: "If you were in `/home/user/docs` and then did `cd /etc`, typing `cd -` would zap you right back to `/home/user/docs`."}
        ],
        realWorld: "You use `cd` constantly. It's the primary way you navigate your file system to get to the code, documents, or photos you want to work with."
    },
    {
        category: "File and Directory Management",
        name: "mkdir",
        description: "The `mkdir` command stands for \"make directory.\" It's your tool for creating new, empty folders to keep your projects organized.",
        howItWorks: [
            "You just type `mkdir` followed by the name you want to give the new folder.",
            "**-p (The Path-Maker)**: This powerful flag lets you create a whole chain of nested folders at once. If `school` or `classes` don't exist, `mkdir -p` will create them for you on the fly!",
            "**-v (The Announcer)**: Makes `mkdir` 'verbose', meaning it announces each directory it creates, so you get confirmation."
        ],
        examples: [
            { code: "mkdir my_new_project", text: "Creates a new folder called `my_new_project`." }, 
            { code: "mkdir -p school/classes/math", text: "Creates the `school` folder, then `classes` inside `school`, and finally `math` inside `classes`, all in one go." },
            { code: "mkdir -v work_files", text: "Creates the `work_files` folder and prints 'mkdir: created directory 'work_files''." }
        ],
        realWorld: "When starting any new project, you'll use `mkdir` to create a dedicated folder, and maybe subfolders like `src` for source code and `assets` for images, to keep everything tidy from the start."
    },
    {
        category: "File and Directory Management",
        name: "rmdir",
        description: "The rmdir command removes directories that are empty. It's a cautious way to clean up folders without accidentally deleting files inside. If the folder has any files or other folders, this command won't work until it's empty.",
        howItWorks: [
            "You type rmdir followed by the folder's name. It deletes the folder only if it's empty.",
            "Using the -p option allows you to delete a directory and its parent directories if they are empty after deleting the child folder."
        ],
        examples: [
            {
                code: "rmdir old_drawings",
                text: "Deletes the old_drawings folder if it is empty. Here, rmdir is the command to remove a folder. old_drawings is the name of the folder you want to delete. It will only work if the folder is empty."
            },
            {
                code: "rmdir -p project/build/assets",
                text: "Deletes `assets`. Then, if `build` becomes empty, it will delete `build`. Then, if `project` becomes empty, it will also be deleted."
            },
            {
                code: "rmdir --ignore-fail-on-non-empty test_folder",
                text: "Tries to delete test_folder but ignores the error if it's not empty. This option prevents error messages from stopping your script when the folder isn't empty. It quietly skips folders that can't be deleted."
            },
            {
                code: "rmdir -v old_logs",
                text: "Deletes the old_logs folder and shows a message about the action taken. The -v option stands for 'verbose' and tells you exactly what the command is doing, so you know which folder was deleted."
            },
            {
                code: "mkdir new_folder && rmdir new_folder",
                text: "Creates a new folder and then deletes it immediately if it's empty. Here, mkdir creates the folder new_folder, and rmdir deletes it. It's a simple way to test or quickly create and clean folders."
            },
            {
                code: "rmdir folder1 folder2 folder3",
                text: "Deletes multiple folders at once if they are all empty. You can list multiple folders after rmdir and it will try to delete each one, but only if they are empty."
            }
        ],
        realWorld: "This command helps you keep your folders tidy by safely removing empty folders. It's useful after finishing a project or organizing files to make sure you only remove unnecessary folders without deleting important content. It’s also helpful in scripts where folders need to be cleaned automatically."
    },
    
    {
        category: "File and Directory Management",
        name: "touch",
        description: "The `touch` command is a super simple way to make a brand-new, empty file. It's like taking a blank piece of paper and giving it a name. If you use it on a file that already exists, it just updates the file's 'last modified' timestamp, as if you just 'touched' it!",
        howItWorks: [
            "Type `touch` followed by the name you want your new file to have. You can even list many names with spaces in between to create multiple files at once.",
            "**-a (Access Time)**: This flag only changes the 'last accessed' time (when you last looked at the file).",
            "**-m (Modification Time)**: This flag only changes the 'last modified' time (when you last changed the file's contents)."
        ],
        examples: [
            {
                code: "touch shopping_list.txt",
                text: "This creates a new, empty file named `shopping_list.txt`. You can now open it to add your list."
            },
            {
                code: "touch my_script.sh",
                text: "This creates a blank script file, ready for you to start typing commands."
            },
            {
                code: "touch index.html style.css script.js",
                text: "This is a shortcut to create three empty files for a web project at the same time."
            },
            {
                code: "touch -m my_essay.txt",
                text: "This command updates the 'last modified' time on `my_essay.txt` to the current time, useful for triggering build tools that watch for file changes."
            }
        ],
        realWorld: "Programmers use `touch` constantly to quickly set up the file structure for a new project. It's also a key tool in scripting to create placeholder or lock files."
    },
    
    {
        category: "File and Directory Management",
        name: "cp",
        description: "The `cp` command is your 'copy machine' for files and folders. It makes an exact duplicate and puts it wherever you want, either with the same name or a new one.",
        howItWorks: [
            "`cp source_file destination_file`: The most basic form. Copies `source_file` and names the copy `destination_file`.",
            "`cp source_file destination_folder/`: Copies the file into a folder, keeping the file's original name.",
            "**-r (The Replicator)**: This is the essential 'copy all' button for folders. It copies the folder and *recursively* copies everything inside it.",
            "**-i (The Interrogator)**: This 'interactive' flag asks for permission (`'overwrite?' y/n`) before it replaces a file that already exists in the destination.",
            "**-v (The Announcer)**: This 'verbose' flag makes `cp` announce what it's copying, so you see the progress.",
            "**-p (The Preserver)**: Keeps the file's original metadata like modification date, permissions, and owner."
        ],
        examples: [
            {
                code: "cp report.pdf report_backup.pdf",
                text: "Makes a quick backup of your `report.pdf` file before you make a big change."
            },
            {
                code: "cp -r vacation_photos /home/user/photo_archive",
                text: "Uses the `-r` option to copy the entire `vacation_photos` folder and all its contents to a new `photo_archive` location."
            },
            {
                code: "cp -iv file.txt /backups",
                text: "Copies `file.txt` carefully. The `-i` flag will ask before overwriting, and the `-v` flag will print a message showing the copy in action."
            },
            {
                code: "cp file1.txt file2.txt file3.txt /dest_folder",
                text: "A shortcut to copy multiple files into the `dest_folder` at the same time."
            }
        ],
        realWorld: "You'll use `cp` daily to make backups of important files, duplicate project templates, or move assets into different folders without losing the original."
    },
    
    {
        category: "File and Directory Management",
        name: "mv",
        description: "The `mv` command is a two-in-one tool. It can either 'move' a file or folder from one place to another, or it can 'rename' it.",
        howItWorks: [
            "**To Rename**: `mv old_name new_name`. If the source and destination are in the same folder, `mv` renames the file.",
            "**To Move**: `mv file_name destination_folder/`. This moves the file into the specified folder.",
            "**-i (The Interrogator)**: Asks you for permission before overwriting an existing file in the destination.",
            "**-v (The Announcer)**: Shows you what's being moved, printing a confirmation for each operation."
        ],
        examples: [
            { code: "mv draft.txt final_report.txt", text: "Renames the file from `draft.txt` to `final_report.txt`." }, 
            { code: "mv photo.jpg ~/Pictures/", text: "Moves the `photo.jpg` file into your main Pictures folder." }, 
            { code: "mv -iv downloaded.zip /media/usb/", text: "Moves a file to a USB drive, confirming before overwriting and showing the progress."}
        ],
        realWorld: "You use `mv` constantly to organize your files, like moving a downloaded report from your 'Downloads' folder to your 'Work' folder, or to correct a typo in a filename."
    },
    {
        category: "File and Directory Management",
        name: "rm",
        description: "The `rm` command 'removes' files and folders. It's like throwing something in a shredder—once it's gone, it's gone for good, so you must be very careful!",
        howItWorks: [
            "`rm file_name`: Deletes the specified file permanently.",
            "**-r (The Recursor)**: The flag needed to remove a directory and all of its contents.",
            "**-f (The Force)**: This powerful and dangerous flag forces the deletion without asking for any confirmation. It will not stop for anything. Use with extreme caution.",
            "**-i (The Interrogator)**: This much safer flag prompts for confirmation before every single deletion."
        ],
        examples: [
            { code: "rm extra_notes.txt", text: "Deletes the file permanently." }, 
            { code: "rm -i old_file.txt", text: "Asks 'remove old_file.txt?' before deleting." },
            { code: "rm -r temp_project", text: "Deletes the `temp_project` folder and everything inside it." },
            { code: "rm -rf old_project", text: "Forcefully deletes the entire `old_project` folder and all its contents without any prompts. VERY DANGEROUS and can wipe out important data if you make a mistake." }
        ],
        realWorld: "You use `rm` to clean up temporary files or delete old versions of a project to free up space. Always double-check your command before using `rm -rf`."
    },
    {
        category: "File and Directory Management",
        name: "find",
        description: "The `find` command is your personal detective for files. It can search your entire system for files based on name, size, type, or when they were last changed.",
        howItWorks: [
            "The basic pattern is `find [where_to_look] [what_to_look_for] [what_to_do]`.",
            "**-name \"pattern\"**: Searches by name. Use wildcards like `*` (matches anything) in quotes.",
            "**-iname \"pattern\"**: Same as `-name` but ignores case (finds 'Report.pdf' and 'report.pdf').",
            "**-type**: Searches for a specific type: `f` for files, `d` for directories.",
            "**-size**: Searches by size. `+1G` for files larger than 1 gigabyte, `-100M` for smaller than 100 megabytes.",
            "**-mtime -N**: Finds files modified within the last `N` days.",
            "**-exec command {} \\;**: A powerful action that runs another command on each file that is found. The `{}` is a placeholder for the found file."
        ],
        examples: [
            { code: "find . -name \"*.jpg\"", text: "Searches the current folder (`.`) and all subfolders for any files that end with `.jpg`.  |. = current directory | | .. = parent directory | / = root directory |" }, 
            { code: "find /home -type f -size +1G", text: "Searches the entire `/home` directory for files (`-type f`) that are bigger than 1 gigabyte (`+1G`)." }, 
            { code: "find . -type f -name \"*.tmp\" -exec rm {} \\;", text: "Finds all temporary files (`.tmp`) and runs the `rm` command on each one to delete them."}
        ],
        realWorld: "If you saved an important report but can't remember where, `find ~ -iname \"*report*.pdf\"` will search your entire home directory to locate it for you."
    },
    {
        category: "File Viewing and Editing",
        name: "cat",
        description: "The `cat` command, short for \"concatenate,\" instantly displays the entire content of a file. It's great for quickly viewing small files.",
        howItWorks: [
            "Type `cat` followed by the file's name.",
            "It can also be used to combine files.",
            "**-n (The Numberer)**: Adds line numbers to the output.",
            "The `>` character is a 'redirect'. It takes the output of a command and sends it into a new file, overwriting it. `>>` appends instead of overwriting."
        ],
        examples: [
            { code: "cat my_story.txt", text: "Shows the entire text of `my_story.txt`." }, 
            { code: "cat -n script.sh", text: "Displays the script file with line numbers, useful for debugging." }, 
            { code: "cat intro.txt body.txt > full_story.txt", text: "Combines the text from `intro.txt` and `body.txt` and saves the result in a new file called `full_story.txt`." }
        ],
        realWorld: "Use `cat` to quickly check the contents of a small configuration file or to combine multiple text snippets into one."
    },
    {
        category: "File Viewing and Editing",
        name: "less",
        description: "The `less` command is a powerful pager for viewing files, especially large ones. It lets you scroll through content one screen at a time, search, and navigate comfortably.",
        howItWorks: [
            "Type `less` and the file name. Use arrow keys, Page Up/Down to scroll.",
            "**/text**: Searches forward for `text`. Press `n` for the next match, `N` for the previous.",
            "**?text**: Searches backward for `text`.",
            "**q**: Press `q` to quit and return to the terminal.",
            "**-N (The Numberer)**: Displays line numbers.",
            "The `|` (pipe) character chains commands together. It takes the output of the command on the left and uses it as the input for the command on the right."
        ],
        examples: [
            { code: "less big_log_file.log", text: "Opens a huge log file so you can read it page by page without loading it all into memory." }, 
            { code: "ls -l /etc | less", text: "The `|` sends the long output of `ls` to `less`, so you can scroll through a very long list of files easily." }
        ],
        realWorld: "System administrators live in `less`. They use it to examine massive log files from servers to find errors or track activity."
    },
    {
        category: "File Viewing and Editing",
        name: "head",
        description: "The `head` command shows you just the 'head' or beginning of a file. By default, it shows the first 10 lines.",
        howItWorks: [
            "`head file_name`: Shows the first 10 lines.",
            "**-n <number>**: This flag lets you specify exactly how many lines to show. For example, `head -n 5` shows the first 5 lines."
        ],
        examples: [
            { code: "head recipes.txt", text: "Shows the first 10 recipes in your file." }, 
            { code: "head -n 3 large_dataset.csv", text: "Quickly shows the first 3 lines of a large CSV file to check its column headers." }
        ],
        realWorld: "Essential for quickly peeking at the structure or headers of a large data file before writing a script to process it."
    },
    {
        category: "File Viewing and Editing",
        name: "tail",
        description: "The `tail` command is the opposite of `head`. It shows you the 'tail' or end of a file. This is incredibly useful for files that are constantly growing, like logs.",
        howItWorks: [
            "`tail file_name`: Shows the last 10 lines.",
            "**-n <number>**: Specifies the number of lines to show from the end.",
            "**-f (The Follower)**: This is the magic flag. It keeps the file open and shows you new lines in real-time as they are added to the file."
        ],
        examples: [
            { code: "tail -n 20 notes.txt", text: "Shows the last 20 lines of notes you wrote." }, 
            { code: "tail -f /var/log/syslog", text: "Lets you watch a system's activity log in real-time, seeing new messages as they appear." }
        ],
        realWorld: "A developer will always have a terminal open running `tail -f` on their application's log file to watch for errors and messages as they code."
    },
    {
        category: "Permissions and Ownership",
        name: "chmod",
        description: "The `chmod` (change mode) command is the gatekeeper of file permissions. Permissions decide who can **r**ead, **w**rite, and e**x**ecute a file.",
        howItWorks: [
            "There are two ways to use it: symbols or numbers.",
            "**Symbolic (Letters)**: Uses `u` (user/owner), `g` (group), `o` (others), and `a` (all) along with `+` (add), `-` (remove), and `=` (set) permissions. Example: `chmod u+x script.sh` adds execute permission for the user.",
            "**Numeric (Octal)**: This is faster and more common. Each permission is a number: `4` for read, `2` for write, `1` for execute. You add them up for each of the three groups (owner, group, others).",
            "**7 (rwx)**: 4+2+1 = read, write, execute.",
            "**6 (rw-)**: 4+2 = read, write.",
            "**5 (r-x)**: 4+1 = read, execute.",
            "**4 (r--)**: Just read.",
            "`chmod 755 file`: Full permissions for owner, read/execute for everyone else. Common for programs and scripts.",
            "`chmod 644 file`: Owner can read/write, everyone else can only read. Common for web files and documents.",
            "**-R (Recursive)**: Applies the changes to a directory and everything inside it."
        ],
        examples: [
            { code: "chmod +x my_script.sh", text: "Adds execute permission for everyone, allowing you to run the script." }, 
            { code: "chmod 600 private.key", text: "Makes a file readable and writable *only* by you. Essential for sensitive files like SSH keys." }, 
            { code: "chmod -R 755 public_html", text: "Recursively sets permissions for a web directory, making all folders browsable and all files runnable by the server." }
        ],
        realWorld: "When you download a program or write a script, you almost always need to use `chmod +x` to make it runnable. Setting correct permissions is fundamental to system security."
    },
    {
        category: "Permissions and Ownership",
        name: "chown",
        description: "The `chown` (change owner) command changes who owns a file or folder. You usually need superuser (`sudo`) powers to give away files you don't own.",
        howItWorks: [
            "`chown new_owner file_name`: Changes the user who owns the file.",
            "`chown new_owner:new_group file_name`: The colon `:` is a shortcut to change both the user owner and the group owner at the same time.",
            "**-R (Recursive)**: This flag applies the ownership change to a directory and everything inside it."
        ],
        examples: [
            { code: "sudo chown jessica report.docx", text: "Uses `sudo` (Superuser Do) to make the user `jessica` the new owner of the report." }, 
            { code: "sudo chown -R www-data:www-data /var/www/html", text: "A very common command to give a web server's user (`www-data`) ownership of all website files so it can read and write to them." }
        ],
        realWorld: "A system administrator uses `chown` when setting up a new website to make sure the web server software has permission to access the site's files."
    },
    {
        category: "Process and System Management",
        name: "ps",
        description: "The `ps` (process status) command takes a snapshot of all the programs and tasks currently running on your computer.",
        howItWorks: [
            "`ps` by itself only shows processes you started in the current terminal.",
            "To see everything, you need flags. `ps aux` is a classic combo:",
            "**a**: Show processes for all users, not just yourself.",
            "**u**: Display detailed, user-oriented information.",
            "**x**: Also show processes not attached to a terminal (like background services).",
            "The output shows the PID (Process ID), a unique number for each process, which you can use with other commands like `kill`."
        ],
        examples: [
            { code: "ps aux", text: "Get a detailed list of every single process running on the system." }, 
            { code: "ps aux | grep firefox", text: "This finds and shows you only the processes related to the Firefox web browser. `grep` acts as a filter." }
        ],
        realWorld: "If your computer is suddenly slow, you'd use `ps aux` to see which programs are running and how much memory and CPU they are consuming to find the culprit."
    },
    {
        category: "Networking and Connectivity",
        name: "ping",
        description: "The `ping` command is like shouting 'Marco!' across the internet and waiting for another computer to reply 'Polo!'. It checks if a server is online and measures how fast the connection is.",
        howItWorks: [
            "It sends a small network packet (an ICMP echo request) and measures the time it takes to get a reply.",
            "The `time=` value in the output is the round-trip time in milliseconds. A lower time is better!",
            "Press `Ctrl + C` to stop pinging.",
            "**-c <count> (The Counter)**: Pings a specific number of times and then stops automatically."
        ],
        examples: [
            { code: "ping google.com", text: "Sends pings to Google's servers to see if they are reachable and check your internet connection." }, 
            { code: "ping -c 4 192.168.1.1", text: "Pings your local router exactly 4 times to test your local network connection." }
        ],
        realWorld: "If you can't access a website, the first thing you should do is `ping` it. If you get a reply, the website's server is on, and the problem is likely something else. If not, the server might be down."
    },
    {
        category: "Archiving and Compression",
        name: "tar",
        description: "The `tar` (tape archive) command is the master packer. It bundles many files and folders into one single archive file (a 'tarball'). By itself it doesn't compress, but it can use other tools to do so.",
        howItWorks: [
            "You combine flags to tell `tar` what to do:",
            "**-c (Create)**: Creates a new archive.",
            "**-x (Extract)**: Extracts files from an archive.",
            "**-v (Verbose)**: Shows a running list of the files being processed.",
            "**-f (File)**: This is essential. It tells `tar` that the next argument is the name of the archive file.",
            "**-z (Gzip)**: A compression flag that uses `gzip` to shrink the archive. Creates a `.tar.gz` file.",
            "**-j (Bzip2)**: Another compression flag that uses `bzip2` for even smaller files (`.tar.bz2`).",
            "**-t (List)**: Lists the contents of an archive without extracting it."
        ],
        examples: [
            { code: "tar -cvf project.tar project_folder/", text: "Creates an uncompressed archive named `project.tar` from `project_folder/`." },
            { code: "tar -xvf project.tar", text: "Extracts the contents of `project.tar` into the current directory." },
            { code: "tar -czvf project.tar.gz project_folder/", text: "Creates a compressed gzip archive. This is one of the most common Linux commands." },
            { code: "tar -xzvf project.tar.gz", text: "Extracts a compressed gzip archive." }
        ],
        realWorld: "This is the standard way to package up a project's source code for sharing or for making a backup. When you download source code for a Linux program, it's almost always a `.tar.gz` file."
    },
    {
        category: "User Management",
        name: "whoami",
        description: "The `whoami` command is the simplest identity check. It prints the username of the account you are currently logged in as.",
        howItWorks: ["Just type the command and press enter. It has no other options."],
        examples: [
            { code: "whoami", text: "If you are logged in as `student`, it will print `student`." }, 
            { code: "sudo whoami", text: "When run with `sudo`, it will print `root`, because `sudo` makes you the all-powerful 'root' user for that one command." }
        ],
        realWorld: "Extremely useful in scripts to verify that the script is being run by the correct user before it attempts to do something sensitive, like modify system files."
    },
    {
        category: "Permissions and Ownership",
        name: "umask",
        description: "The `umask` command sets the default permissions for any new files and folders you create. It's a 'mask' that blocks certain permissions from being set automatically.",
        howItWorks: [
            "It uses a number that is 'subtracted' from the system defaults. For directories, the default is `777` (full access), and for files, it's `666` (no execute).",
            "A common `umask` is `022`. For new folders, the permission is `777 - 022 = 755` (rwxr-xr-x). For new files, it's `666 - 022 = 644` (rw-r--r--).",
            "This is a good security practice because it ensures that new files you create are not writable by other users by default.",
            "**-S**: Shows the mask in a more human-readable, symbolic format (e.g., u=rwx,g=rx,o=rx)."
        ],
        examples: [
            { code: "umask", text: "Shows the current umask value (e.g., `0022`)." }, 
            { code: "umask 077", text: "Sets a very restrictive mask. New files and folders you create will only be accessible by you (user gets rwx, group/others get nothing)." }
        ],
        realWorld: "A system administrator configures the default `umask` for all users on a shared server to enforce a baseline security policy from the moment a file is created."
    },
    {
        category: "Process and System Management",
        name: "top",
        description: "The `top` command is a live, real-time dashboard of all the running programs. It constantly updates and shows you which programs are hogging the most CPU and memory.",
        howItWorks: [
            "You just type `top` and it opens an interactive, full-screen view. The list refreshes every few seconds.",
            "Inside `top`, you can press keys to interact:",
            "**P** (uppercase): Sorts the list by CPU usage.",
            "**M** (uppercase): Sorts the list by Memory usage.",
            "**k**: Lets you 'kill' a process. It will ask for the PID to terminate.",
            "**q**: Quits the `top` program and returns you to the terminal."
        ],
        examples: [
            { code: "top", text: "Opens the live dashboard of all running processes." }, 
            { code: "top -u www-data", text: "Filters the list to only show the processes belonging to the `www-data` user." }
        ],
        realWorld: "If your computer's fan is spinning loudly and everything feels slow, you open `top`, press `P`, and immediately see which process is using 100% of your CPU. This is the #1 tool for real-time performance diagnosis."
    },
    {
        category: "Process and System Management",
        name: "kill",
        description: "The `kill` command is used to terminate a running program (a 'process'). You tell it which process to stop by using its unique PID (Process ID) number.",
        howItWorks: [
            "`kill PID_number`: Sends a standard, polite termination signal (SIGTERM), asking the program to shut down cleanly.",
            "**-9 (The Hammer)**: Sends the `SIGKILL` signal, which is a non-blockable, non-ignorable command that forces the process to stop immediately. This is the last resort for stuck programs.",
            "`killall <process_name>`: A related command that kills all processes matching a given name, which can be easier than finding multiple PIDs."
        ],
        examples: [
            { code: "kill 12345", text: "Politely asks the program with PID `12345` to stop." }, 
            { code: "kill -9 98765", text: "Forcefully terminates a program that is frozen and not responding." }, 
            { code: "killall firefox", text: "Kills all running Firefox processes at once." }
        ],
        realWorld: "You use `ps` or `top` to find the PID of a frozen application, and then you use `kill` (or `kill -9` if it's really stuck) to shut it down and regain control of your system."
    },
    {
        category: "Process and System Management",
        name: "uptime",
        description: "The `uptime` command quickly tells you how long your computer has been turned on without a reboot.",
        howItWorks: [
            "It shows the current time, how long the system has been running, how many users are logged in, and the 'load average' (CPU busyness over the last 1, 5, and 15 minutes).",
            "**-p (The Prettyfier)**: Makes the output much friendlier, like 'up 5 days, 3 hours'."
        ],
        examples: [
            { code: "uptime", text: "Shows all the system uptime information in a single line." }, 
            { code: "uptime -p", text: "Shows just the uptime in a simple, human-readable format." }
        ],
        realWorld: "System administrators use `uptime` to verify that a server hasn't rebooted unexpectedly. A long uptime is often a sign of a stable system."
    },
    {
        category: "Process and System Management",
        name: "df",
        description: "The `df` (disk free) command reports how much disk space is used and available on your storage devices.",
        howItWorks: [
            "`df` by itself shows sizes in confusing 'blocks'. You almost always want to use a flag.",
            "**-h (The Humanizer)**: Shows the sizes in a human-readable format (`K`, `M`, `G`). This is the most important flag.",
            "**-T**: Shows the filesystem type (e.g., ext4, xfs, apfs).",
            "**-i**: Shows information about inodes (data structures that store file info) instead of block usage.",
            "The `Use%` column is your best friend for quickly spotting which drive is getting full."
        ],
        examples: [
            { code: "df -h", text: "Shows how much space is used and available on all your hard drives in an easy-to-read format." }, 
            { code: "df -h .", text: "Shows the disk space usage for only the specific hard drive partition where your current directory is located." }
        ],
        realWorld: "When you get a 'disk space low' warning, `df -h` is the very first command you run to see which partition is full and needs cleaning up."
    },
    {
        category: "Process and System Management",
        name: "du",
        description: "The `du` (disk usage) command estimates how much space a specific folder or file is using.",
        howItWorks: [
            "`du` on a folder will list the size of every single subfolder, which can be overwhelming.",
            "**-h (The Humanizer)**: Shows sizes in `K`, `M`, `G`.",
            "**-s (The Summarizer)**: This is crucial. It shows only the grand total for the specified directory, not for every subdirectory.",
            "**-d <depth>**: Specifies how many levels of subdirectories to show.",
            "A very common and useful combination is `du -sh *` to see the size of all files and folders in the current directory."
        ],
        examples: [
            { code: "du -h my_large_folder", text: "Shows the size of `my_large_folder` and every single subdirectory inside it." }, 
            { code: "du -sh my_large_folder", text: "Shows only the total size of the `my_large_folder`. This is much more useful." }, 
            { code: "du -h -d 1", text: "Shows the disk usage for the current directory and all items just one level deep." }
        ],
        realWorld: "After `df -h` tells you your main drive is 98% full, you'll use `du -sh /home/user/*` to go hunting for the specific folders that are taking up all the space."
    },
    {
        category: "Process and System Management",
        name: "free",
        description: "The `free` command gives you a snapshot of how much memory (RAM) your computer is using.",
        howItWorks: [
            "**-h (The Humanizer)**: Shows memory in a human-readable format (`G` for gigabytes, `M` for megabytes).",
            "**-g**: Show in gigabytes. **-m**: show in megabytes.",
            "**-s <seconds>**: Continuously displays the memory usage every N seconds, like a mini `top` for memory.",
            "**Important**: Don't panic if 'free' is low. Linux uses spare memory for caching ('buff/cache') to speed things up. The 'available' column is the best estimate of memory available for new programs."
        ],
        examples: [
            { code: "free -h", text: "Shows a summary of your total memory, how much is used, and how much is truly available." }, 
            { code: "free -g", text: "Shows the memory usage rounded to the nearest gigabyte." }
        ],
        realWorld: "If your computer is acting sluggish and constantly accessing the hard drive, you'd use `free -h` to check if you've run out of available RAM."
    },
    {
        category: "Networking and Connectivity",
        name: "ifconfig",
        description: "The `ifconfig` command is a classic tool to show or configure network interfaces. It's often replaced by `ip` on modern systems but is still widely found.",
        howItWorks: [
            "Typing `ifconfig` shows your network adapters (like `eth0` for Ethernet or `wlan0` for Wi-Fi).",
            "**inet**: This field shows the IPv4 address (your computer's address on the network).",
            "**ether**: This field shows the MAC address, a unique hardware ID for your network card.",
            "You can also use it to enable or disable interfaces: `ifconfig eth0 up` or `ifconfig eth0 down`."
        ],
        examples: [
            { code: "ifconfig", text: "Displays the network configuration for all active network interfaces." }, 
            { code: "ifconfig eth0", text: "Displays details for only the `eth0` interface." }
        ],
        realWorld: "On older servers or network devices, this may be the only command available to find the device's IP address to connect to it."
    },
    {
        category: "Networking and Connectivity",
        name: "ip addr",
        description: "The `ip addr` command is the modern, more powerful replacement for `ifconfig`. It's used to view and manage network addresses and interfaces.",
        howItWorks: [
            "`ip addr show` is the full command, but everyone uses the shortcut `ip a`.",
            "Look for the interface name (e.g., `eth0`, `wlp3s0`).",
            "**inet**: This shows your IPv4 address.",
            "**inet6**: This shows your IPv6 address.",
            "The `ip` command is a suite of tools that can also manage routes, tunnels, and much more."
        ],
        examples: [
            { code: "ip addr", text: "Shows detailed information about all your network interfaces." }, 
            { code: "ip a", text: "A common and much shorter alias for `ip addr show`." },
            { code: "ip -c a", text: "Adds color to the output, making it easier to read." }
        ],
        realWorld: "This is the standard, go-to command for finding your IP address on any modern Linux system."
    },
    {
        category: "Networking and Connectivity",
        name: "netstat",
        description: "The `netstat` command shows network connections, routing tables, and interface statistics. It's a powerful tool for seeing what network ports are open and what programs are using them.",
        howItWorks: [
            "You combine flags to get the info you need. A classic combo is `netstat -tulnp`:",
            "**-t**: Show TCP connections.",
            "**-u**: Show UDP connections.",
            "**-l**: Show only 'listening' ports (ports waiting for a connection).",
            "**-n**: Show numerical addresses (it's faster than looking up hostnames).",
            "**-p**: Show the PID and name of the program that owns the port (requires `sudo`)."
        ],
        examples: [
            { code: "netstat -a", text: "Shows a list of all connections and listening ports." }, 
            { code: "sudo netstat -tulnp", text: "The sysadmin's favorite: see all listening TCP/UDP ports and which programs are using them." }
        ],
        realWorld: "A network administrator uses `netstat -tulnp` to verify that a new web server is correctly listening on port 80, or to find out which program is unexpectedly holding a port open."
    },
    {
        category: "Networking and Connectivity",
        name: "scp",
        description: "The `scp` (secure copy) command copies files over the network using the secure SSH protocol. It's like using `cp`, but for remote computers.",
        howItWorks: [
            "The syntax is `scp [options] source destination`.",
            "**To Upload**: `scp local_file.txt user@remote:/home/user/`",
            "**To Download**: `scp user@remote:/path/to/file.txt .` (The `.` at the end means 'copy to my current directory').",
            "**-r**: Recursively copies entire directories.",
            "**-P <port>** (uppercase P): Use if the remote SSH server is on a non-standard port."
        ],
        examples: [
            { code: "scp my_file.txt user@192.168.1.5:/home/user/documents", text: "Copies `my_file.txt` to the documents folder on another computer." }, 
            { code: "scp user@server.com:/var/log/server.log .", text: "Downloads a log file from a remote server to your current location (`.`)." }, 
            { code: "scp -r project/ user@server:/var/www/html", text: "Recursively copies the entire `project` directory to a web server."}
        ],
        realWorld: "You use `scp` to quickly upload a new version of your website to a server, or to download a database backup from a remote machine for analysis."
    },
    {
        category: "Networking and Connectivity",
        name: "ssh",
        description: "The `ssh` (secure shell) command is your encrypted portal to other computers. It lets you safely log in and run commands on a remote machine as if you were sitting right in front of it.",
        howItWorks: [
            "The basic syntax is `ssh user@hostname`.",
            "The first time you connect, it will ask you to verify the remote host's 'fingerprint' for security.",
            "You will then be prompted for the password for the remote user account (unless you have set up SSH keys).",
            "**-p <port>**: Use if the remote SSH server is not on the default port 22.",
            "**-i <path_to_key>**: Use a specific private key file for authentication instead of a password."
        ],
        examples: [
            { code: "ssh user@server.com", text: "Connects to `server.com` with the username `user`." }, 
            { code: "ssh -p 2222 student@10.0.0.5", text: "Connects to a server that is using a non-standard port (2222)." },
            { code: "ssh -i ~/.ssh/personal_key admin@work-server", text: "Connects using a specific key file instead of a password."}
        ],
        realWorld: "A system administrator uses `ssh` all day, every day to manage remote servers across the globe. It's the fundamental tool for remote server management."
    },
    {
        category: "Networking and Connectivity",
        name: "wget",
        description: "The `wget` command is a straightforward tool for 'getting' files from the web. It's a simple, command-line downloader.",
        howItWorks: [
            "You just type `wget` followed by the full URL of the file.",
            "**-O <filename>**: Saves the downloaded file with a different name.",
            "**-c**: Resumes a partially downloaded file.",
            "**-r**: Downloads recursively, attempting to download an entire website.",
            "**--no-check-certificate**: Skips certificate validation (use with caution)."
        ],
        examples: [
            { code: "wget https://example.com/file.zip", text: "Downloads `file.zip` into your current directory." }, 
            { code: "wget -O linux.html https://www.kernel.org/", text: "Downloads the kernel.org homepage and saves it as `linux.html`." },
            { code: "wget -c large_file.iso", text: "If a previous download of `large_file.iso` was interrupted, this command will attempt to continue from where it left off."}
        ],
        realWorld: "You might use `wget` in a script to automatically download a daily data file from a specific URL for processing."
    },
    {
        category: "Networking and Connectivity",
        name: "curl",
        description: "The `curl` command is a data transfer Swiss Army knife. It's used for downloading files, testing APIs, and interacting with almost any web service.",
        howItWorks: [
            "By default, `curl URL` displays the content of the URL directly in your terminal.",
            "**-O**: Saves the content to a file with the same name as the remote file.",
            "**-o <filename>**: Saves the content to a specific file you name.",
            "**-X <METHOD>**: Specifies the HTTP method (e.g., `POST`, `PUT`, `DELETE`).",
            "**-H <header>**: Adds a custom header to the request (e.g., `-H \"Content-Type: application/json\"`).",
            "**-d <data>**: Sends data in a POST request."
        ],
        examples: [
            { code: "curl https://api.github.com/users/octocat", text: "Gets information about the GitHub user 'octocat' and displays the JSON data in the terminal." }, 
            { code: "curl -O https://example.com/big_file.zip", text: "Downloads the remote file and saves it locally with its original name." }, 
            { code: "curl -X POST -H \"Content-Type: application/json\" -d '{\"name\":\"test\"}' https://api.example.com/items", text: "Sends a JSON object to an API to create a new item."}
        ],
        realWorld: "Developers use `curl` constantly to test if their web APIs are working correctly, sending and receiving data without needing a browser or a full application."
    },
    {
        category: "Archiving and Compression",
        name: "gzip",
        description: "The `gzip` command compresses a file to make it smaller, replacing the original with a compressed version ending in `.gz`.",
        howItWorks: [
            "You type `gzip` followed by the file name.",
            "**-d** or its own command, **gunzip**: Decompresses the file.",
            "**-k (Keep)**: Keeps the original file after compression, which is not the default behavior.",
            "**-r**: Recursively compresses all files in a directory."
        ],
        examples: [
            { code: "gzip huge_log.txt", text: "Compresses the file, which becomes `huge_log.txt.gz`. The original is removed." }, 
            { code: "gzip -k data.csv", text: "Compresses `data.csv` to `data.csv.gz` but also keeps the original `data.csv`." },
            { code: "gunzip huge_log.txt.gz", text: "Decompresses the file back to its original state." }
        ],
        realWorld: "You would use `gzip` on large, plain-text log files or database backups that you need to store for a long time without them taking up too much disk space."
    },
    {
        category: "Archiving and Compression",
        name: "gunzip",
        description: "The `gunzip` command decompresses a `.gz` file, restoring it to its original form so you can use it.",
        howItWorks: [
            "You type `gunzip` followed by the compressed file's name.",
            "**-c (to Standard Out)**: Writes the uncompressed output to the screen (standard output) while keeping the original compressed file. You can then redirect this output.",
            "**-k (Keep)**: Keeps the original `.gz` file after decompressing."
        ],
        examples: [
            { code: "gunzip huge_log.txt.gz", text: "Decompresses the file, which becomes `huge_log.txt`. The `.gz` file is removed." }, 
            { code: "gunzip -c backup.sql.gz > backup.sql", text: "Uncompresses `backup.sql.gz` and writes the contents to a new file `backup.sql`, keeping the original compressed file intact." }
        ],
        realWorld: "You use `gunzip` whenever you need to read or process an old log file or backup that was compressed with `gzip` to save space."
    },
    {
        category: "Archiving and Compression",
        name: "zip",
        description: "The `zip` command is a popular tool for both bundling files (archiving) and compressing them. It creates `.zip` files, a format that is universally compatible across Windows, macOS, and Linux.",
        howItWorks: [
            "`zip archive_name.zip file1 file2 folder1`: Puts the listed files and folders into a single compressed `.zip` file.",
            "**-r (Recursive)**: This is the essential flag to make `zip` go into directories and include all their contents.",
            "**-e**: Encrypts the contents of the zip file with a password."
        ],
        examples: [
            { code: "zip my_project.zip my_code.py report.txt", text: "Creates a zip file containing two specific files." }, 
            { code: "zip -r my_website.zip public_html/", text: "Recursively zips the entire `public_html` folder and all its contents." },
            { code: "zip -er private.zip sensitive_folder/", text: "Creates a password-protected, encrypted zip of a sensitive folder." }
        ],
        realWorld: "You would use `zip` to package up a folder of documents to send to a colleague via email, knowing they'll be able to open it on any computer."
    },
    {
        category: "Archiving and Compression",
        name: "unzip",
        description: "The `unzip` command extracts files from a `.zip` archive, restoring them to your computer.",
        howItWorks: [
            "`unzip archive_name.zip`: Unzips the file into your current folder.",
            "**-d <directory> (Destination)**: Extracts the files into a different, specified directory.",
            "**-l (List)**: Lists the contents of the zip file without actually extracting them."
        ],
        examples: [
            { code: "unzip my_project.zip", text: "Unzips all the files from `my_project.zip` into the current directory." }, 
            { code: "unzip software.zip -d /tmp/test", text: "Extracts the contents of `software.zip` into a specific temporary directory for inspection." },
            { code: "unzip -l archive.zip", text: "Shows you a list of all files inside `archive.zip` before you decide to extract it."}
        ],
        realWorld: "Whenever you download a `.zip` file from the internet containing a program or project files, you use `unzip` to get the contents out."
    },
    {
        category: "User Management",
        name: "id",
        description: "The `id` command shows the identity of a user account: their user ID (uid), primary group ID (gid), and all the other groups they belong to.",
        howItWorks: [
            "`id`: Shows information for your own user account.",
            "`id <username>`: Shows information for a different user.",
            "**-u (User ID)**: Shows just the user ID number.",
            "**-g (Group ID)**: Shows just the primary group ID number.",
            "**-G (All Groups)**: Shows the IDs of all groups the user is in.",
            "**-n (Name)**: Shows the name instead of the number when used with the flags above."
        ],
        examples: [
            { code: "id", text: "Shows your user ID, your main group, and all other groups you are a member of." }, 
            { code: "id jessica", text: "Shows the user and group information for a different user named `jessica`." }, 
            { code: "id -un", text: "Shows just your username (a simpler `whoami`)."}
        ],
        realWorld: "System administrators use this to quickly verify a user's group memberships, which is critical for troubleshooting file permission issues."
    },
    {
        category: "User Management",
        name: "who",
        description: "The `who` command tells you who else is currently logged into the same computer.",
        howItWorks: [
            "Just type `who`. It lists each user's name, their terminal (`tty`), when they logged in, and where they connected from (if remote).",
            "**-H (Headers)**: Adds column headers to make the output easier to read.",
            "**-b (Boot Time)**: Shows the time of the last system boot."
        ],
        examples: [
            { code: "who", text: "Shows a list of all users currently on the system." }, 
            { code: "who -H", text: "Shows the same list but with helpful headers for each column." },
            { code: "who am i", text: "A special invocation that shows only information about your own terminal session."}
        ],
        realWorld: "On a shared university or company server, you can use `who` to see if your friends or colleagues are also logged in and working."
    }
];
