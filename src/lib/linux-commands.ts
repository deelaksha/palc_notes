
export const commandsData = [
    {
        category: "File and Directory Management",
        name: "ls",
        description: "The `ls` spell is like shouting 'Lumos!' in a dark room. It instantly lists all the files and folders (directories) in your current location so you can see what's there.",
        howItWorks: [
            "`ls` by itself gives you a simple list of names.", 
            "Add 'Power-Up' flags for more detail:",
            "**-l (The Magnifying Glass)**: Shows a detailed 'long' list with permissions, owner, size, and last-touched date.",
            "**-a (The Secret-Detector)**: Reveals *all* files, including hidden ones that start with a dot (`.`), like secret configuration scrolls.",
            "**-h (The Humanizer)**: Used with `-l`, this makes file sizes easy to read (e.g., `4K`, `1.2M`) instead of giant numbers.",
            "Combine them for superpowers! `ls -lah` shows all files in a detailed, human-readable list."
        ],
        examples: [
            { code: "ls -l", text: "Shows a detailed list of all visible files and folders." }, 
            { code: "ls -a", text: "Reveals all hidden magic scrolls in your current directory." }, 
            { code: "ls -lah", text: "The classic combo: shows everything in a detailed, easy-to-read format."}
        ],
        realWorld: "Whenever you teleport to a new directory, `ls -lah` is the first spell you'll cast to get your bearings and see what you can work with."
    },
    {
        category: "File and Directory Management",
        name: "pwd",
        description: "The `pwd` (Print Working Directory) spell is like asking your magic map, 'Where am I right now?' It tells you the exact, full path to the folder you're currently in.",
        howItWorks: [
            "You just cast the spell (`pwd`), and it prints your current location, starting from the very top of the filesystem, the 'root' (`/`).",
            "This helps you know your exact coordinates in the vast world of your computer."
        ],
        examples: [
            { code: "pwd", text: "If you are in your hero's home folder, it might print `/home/yourname`." }, 
            { code: "cd /var/log && pwd", text: "After teleporting to a new folder, `pwd` confirms your location by printing `/var/log`." }
        ],
        realWorld: "This is super helpful when you get lost deep inside a project. It's also essential in magic scripts that need to know their own location to find other enchanted items (files)."
    },
    {
        category: "File and Directory Management",
        name: "cd",
        description: "The `cd` (Change Directory) spell is your personal teleporter. It's how you move from one folder to another.",
        howItWorks: [
            "**cd folder_name**: Teleports you into that folder.",
            "**cd ..**: Moves you 'up' one level to the folder that contains your current one. `..` is a universal shortcut for 'parent directory'.",
            "**cd ~** or just **cd**: Instantly teleports you back to your home castle (your home directory) from anywhere.",
            "**cd -**: A time-turner spell! It teleports you back to the *exact last directory you were in*."
        ],
        examples: [
            { code: "cd Documents", text: "Teleports you into your `Documents` folder." }, 
            { code: "cd ..", text: "Moves you up one level. If you're in `/home/user/docs`, this takes you to `/home/user`." }, 
            { code: "cd", text: "Instantly teleports you home, no matter how lost you are." },
            { code: "cd -", text: "If you just jumped from your `Downloads` folder to your `Projects` folder, `cd -` would zap you right back to `Downloads`."}
        ],
        realWorld: "`cd` is your main mode of transportation in the terminal. You use it constantly to navigate to the files you need."
    },
    {
        category: "File and Directory Management",
        name: "mkdir",
        description: "The `mkdir` (Make Directory) spell creates new, empty folders to keep your quests and treasures organized.",
        howItWorks: [
            "You cast `mkdir` followed by the name of your new folder.",
            "**-p (The Path-Maker)**: This powerful flag lets you create a whole chain of nested folders at once, like building a castle with many rooms inside rooms."
        ],
        examples: [
            { code: "mkdir my_new_quest", text: "Creates a new folder for your adventure." }, 
            { code: "mkdir -p kingdom/castle/throne_room", text: "Creates the `kingdom` folder, then `castle` inside it, and finally `throne_room` inside that, all in one go!" }
        ],
        realWorld: "When starting any new coding project, you'll use `mkdir` to create a dedicated folder and subfolders like `src` for code and `assets` for images."
    },
    {
        category: "File and Directory Management",
        name: "rmdir",
        description: "The `rmdir` (Remove Directory) spell is a cautious way to delete **empty** folders. If a folder has any treasures (files) inside, this spell will fail, protecting you from accidents.",
        howItWorks: ["You cast `rmdir` on a folder. It only works if the folder is completely empty."],
        examples: [
            { code: "rmdir empty_dungeon", text: "Deletes the `empty_dungeon` folder because there are no monsters or treasures inside."}
        ],
        realWorld: "Useful for cleanup scripts where you want to safely remove temporary directories only after you're sure they are empty."
    },
    {
        category: "File and Directory Management",
        name: "touch",
        description: "The `touch` spell instantly creates a new, blank scroll (an empty file). If you cast it on a scroll that already exists, it just updates the 'last modified' date, as if you just 'touched' it.",
        howItWorks: [
            "Cast `touch` followed by the name of the new file you want.",
            "You can create many files at once by listing their names."
        ],
        examples: [
            { code: "touch shopping_list.txt", text: "Creates a new, empty file, ready for you to add your shopping list." }, 
            { code: "touch index.html style.css script.js", text: "A pro-gamer move to create three essential files for a new web project all at once." }
        ],
        realWorld: "Developers use `touch` constantly to create new files for their code. It's also used in scripts to create 'lock' files to signal that a process is running."
    },
    {
        category: "File and Directory Management",
        name: "cp",
        description: "The `cp` (Copy) command is your magical cloning machine. It creates an exact duplicate of a file or folder.",
        howItWorks: [
            "`cp source_file destination_file`: Copies a file and can give the copy a new name.",
            "`cp source_file destination_folder/`: Copies the file into a folder, keeping its name.",
            "**-r (The Replicator)**: The essential flag for copying folders. It *recursively* copies a folder and everything inside it."
        ],
        examples: [
            { code: "cp report.pdf report_backup.pdf", text: "Makes a quick backup of your report before you make big changes." }, 
            { code: "cp -r vacation_photos /home/user/photo_archive/", text: "Uses the `-r` spell to copy the entire `vacation_photos` folder and all its contents to your archive." }
        ],
        realWorld: "You'll use `cp` daily to back up important files, duplicate project templates, or move images and assets around."
    },
    {
        category: "File and Directory Management",
        name: "mv",
        description: "The `mv` (Move) spell is a two-in-one tool: it can either move a file to a new folder, or it can simply rename it.",
        howItWorks: [
            "**To Rename**: `mv old_name new_name`.",
            "**To Move**: `mv file_name destination_folder/`."
        ],
        examples: [
            { code: "mv draft.txt final_report.txt", text: "Renames your file from a draft to the final version." }, 
            { code: "mv secret_map.jpg ~/safe_chest/", text: "Moves your secret map into your main 'safe_chest' folder." }
        ],
        realWorld: "You use `mv` constantly to organize your files, like moving a downloaded file from 'Downloads' to your 'Projects' folder, or to fix a typo in a filename."
    },
    {
        category: "File and Directory Management",
        name: "rm",
        description: "The `rm` (Remove) spell is like a magical incinerator. It permanently deletes files and folders. Be very careful—there's no undo button!",
        howItWorks: [
            "`rm file_name`: Deletes a file.",
            "**-r (The Recursor)**: The flag needed to delete a folder and everything inside it.",
            "**-f (The Force)**: This powerful and dangerous flag forces deletion without asking. It's like saying 'I'm absolutely sure!' **Use with extreme caution.**",
            "**-i (The Interrogator)**: A much safer flag that asks for confirmation ('Are you sure?') before deleting anything."
        ],
        examples: [
            { code: "rm old_idea.txt", text: "Deletes the file permanently." }, 
            { code: "rm -i sensitive_document.doc", text: "Asks for confirmation before deleting an important file." },
            { code: "rm -r temp_project", text: "Deletes the `temp_project` folder and everything inside it." },
            { code: "rm -rf old_project", text: "Forcefully deletes the entire `old_project` folder without any prompts. VERY DANGEROUS! Double-check your spelling before using this." }
        ],
        realWorld: "Used to clean up temporary files or delete old versions of a project. Always think twice before using `rm -rf`."
    },
    {
        "category": "File and Directory Management",
        "name": "find",
        "description": "The `find` spell is your magical bloodhound. It can search your entire computer for files based on name, size, type, or when they were last touched.",
        "howItWorks": [
          "The basic spell is: `find [where_to_look] [what_to_look_for] [what_to_do]`.",
          "`-name \"pattern\"`: Searches by name. Use wildcards like `*` (matches anything) in quotes.",
          "`-type f`: Searches only for files.",
          "`-type d`: Searches only for directories (folders).",
          "`-size +1G`: Finds files larger than 1 gigabyte.",
          "`-mtime -7`: Finds files modified in the last 7 days.",
          "`-exec command {} \\;`: A powerful charm that runs another command on each file that is found. The `{}` is a placeholder for the found file."
        ],
        "examples": [
          { "code": "find . -name \"*.jpg\"", "text": "Searches the current folder (`.`) for any files that end with `.jpg`." },
          { "code": "find /home -type f -size +1G", "text": "Searches the entire `/home` directory for files (`-type f`) that are larger than 1 gigabyte (`+1G`)." },
          { "code": "find . -type f -name \"*.tmp\" -exec rm {} \\;", "text": "Finds all temporary files (`*.tmp`) and casts the `rm` spell on each one to delete them." }
        ],
        "realWorld": "A system admin uses `find` to hunt down large, old log files that are eating up disk space and delete them."
      },      
    {
        category: "File Viewing and Editing",
        name: "cat",
        description: "The `cat` spell (short for 'concatenate') instantly reads a scroll (a file) and displays its entire contents on your screen. It's great for quickly peeking at short files.",
        howItWorks: [
            "Cast `cat` followed by the file's name.",
            "`-n`: Adds line numbers to the output, making it easier to read code.",
            "You can also use it to combine multiple scrolls into one!"
        ],
        examples: [
            { code: "cat instructions.txt", text: "Shows the entire text of `instructions.txt`." }, 
            { code: "cat -n magic_script.sh", text: "Displays your script with line numbers, useful for finding errors." }, 
            { code: "cat chapter1.txt chapter2.txt > full_story.txt", text: "Combines two story chapters into one single file." }
        ],
        realWorld: "Use `cat` to quickly check a small configuration file or to see the contents of a short script without opening an editor."
    },
    {
        category: "File Viewing and Editing",
        name: "less",
        description: "The `less` spell is a powerful viewer for huge scrolls (large files). It lets you read them page by page, so you don't get overwhelmed. 'Less is more!'.",
        howItWorks: [
            "Cast `less` on a file. Use arrow keys or Page Up/Down to scroll.",
            "`/text`: Searches forward for `text`. Press `n` for the next match.",
            "`?text`: Searches backward.",
            "`q`: Press `q` to quit and return to your terminal."
        ],
        examples: [
            { code: "less ancient_tome.log", text: "Opens a huge log file so you can read it comfortably without loading the whole thing into memory." }, 
            { code: "ls -lah /etc | less", text: "The `|` (pipe) sends the long output of `ls` into `less`, letting you scroll through a giant list of files easily." }
        ],
        realWorld: "Server administrators live in `less`. They use it to examine massive log files to find errors or track down problems."
    },
    {
        category: "File Viewing and Editing",
        name: "head",
        description: "The `head` spell shows you just the 'head' or the first few lines of a scroll. By default, it shows the first 10 lines.",
        howItWorks: ["`-n <number>`: Lets you specify exactly how many lines to see from the top."],
        examples: [
            { code: "head -n 5 recipe_book.txt", text: "Quickly shows the first 5 recipes in your book to see what's for dinner." }
        ],
        realWorld: "Essential for peeking at the first few lines of a huge CSV data file to understand its column headers before you write a script to process it."
    },
    {
        category: "File Viewing and Editing",
        name: "tail",
        description: "The `tail` spell is the opposite of `head`. It shows you the 'tail' or the last few lines of a file. This is incredibly useful for scrolls that are constantly growing, like logs.",
        howItWorks: [
            "`-n <number>`: Shows a specific number of lines from the end.",
            "**-f (The Follower)**: This is the magic flag. It keeps watching the file and shows you new lines in real-time as they are written!"
        ],
        examples: [
            { code: "tail -n 20 notes.txt", text: "Shows the last 20 lines of notes you wrote." }, 
            { code: "tail -f /var/log/game_server.log", text: "Lets you watch a live game server's log, seeing player actions and errors as they happen." }
        ],
        realWorld: "A developer will always have a terminal open running `tail -f` on their app's log file to watch for issues in real time while they are coding."
    },
    {
        category: "Permissions and Ownership",
        name: "chmod",
        description: "The `chmod` (change mode) spell is the gatekeeper of permissions. Permissions decide who can **r**ead, **w**rite, and e**x**ecute a file or folder.",
        howItWorks: [
            "It uses numbers to represent permissions: `4` for read, `2` for write, `1` for execute.",
            "You give a three-digit number: the first is for the owner, the second for the group, and the third for everyone else.",
            "`chmod 755 script.sh`: `7` (4+2+1) for owner (read, write, execute), `5` (4+1) for group (read, execute), `5` for others. Perfect for programs.",
            "`chmod 644 document.txt`: `6` (4+2) for owner (read, write), `4` for everyone else (read-only). Perfect for documents."
        ],
        examples: [
            { code: "chmod +x my_script.sh", text: "A quick way to add 'eXecute' permission, allowing you to run the script." }, 
            { code: "chmod 600 private_diary.txt", text: "Makes a file readable and writable *only* by you (6 for owner, 0 for group, 0 for others). Essential for private files." }
        ],
        realWorld: "When you download a program or write a script, you almost always need to cast `chmod +x` on it to make it runnable."
    },
    {
        category: "Permissions and Ownership",
        name: "chown",
        description: "The `chown` (change owner) spell changes who owns a file or folder. You usually need superuser (`sudo`) powers to give files away.",
        howItWorks: [
            "`chown new_owner file_name`: Changes the user who owns the file.",
            "`chown new_owner:new_group file_name`: Changes both the user and the group at the same time.",
            "**-R (Recursive)**: Applies the ownership change to a folder and everything inside it."
        ],
        examples: [
            { code: "sudo chown jessica treasure_map.txt", text: "Makes the user `jessica` the new owner of the treasure map." }, 
            { code: "sudo chown -R www-data:www-data /var/www/my_website", text: "Gives a web server's user (`www-data`) ownership of all website files so it can read them." }
        ],
        realWorld: "Used by system admins to make sure programs (like a web server) have permission to access the files they need to do their job."
    },
    {
        category: "Process and System Management",
        name: "ps",
        description: "The `ps` (process status) spell takes a snapshot of all the programs and tasks currently running on your computer, like seeing all the ghosts in a haunted house.",
        howItWorks: [
            "`ps aux` is the classic spell combo to see everything:",
            "**a**: Show processes for all users.",
            "**u**: Display detailed, user-friendly info.",
            "**x**: Show processes not attached to a terminal (background ghosts).",
            "The output shows the PID (Process ID), a unique number for each program, which you can use with `kill`."
        ],
        examples: [
            { code: "ps aux", text: "Get a detailed list of every single process running on the system." }, 
            { code: "ps aux | grep firefox", text: "This finds and shows you only the processes related to the Firefox browser. `grep` acts as a filter." }
        ],
        realWorld: "If your computer is suddenly slow, you'd use `ps aux` to see which program is being greedy and using up all the CPU or memory."
    },
    {
        category: "Networking and Connectivity",
        name: "ping",
        description: "The `ping` spell is like shouting 'Marco!' across the internet and waiting for another computer to reply 'Polo!'. It checks if a server is online and how fast the connection is.",
        howItWorks: [
            "It sends a small magic packet and measures the time it takes to get a reply in milliseconds. Lower time is better!",
            "Press `Ctrl + C` to stop pinging.",
            "**-c <count>**: Pings a specific number of times and then stops."
        ],
        examples: [
            { code: "ping google.com", text: "Sends pings to Google to check your internet connection." }, 
            { code: "ping -c 4 192.168.1.1", text: "Pings your home router exactly 4 times to test your local network." }
        ],
        realWorld: "If a website isn't loading, the first thing to do is `ping` it. If you get a reply, the server is online and the problem is something else."
    },
    {
        category: "Archiving and Compression",
        name: "tar",
        description: "The `tar` (tape archive) spell is the master packer. It bundles many files and folders into one single archive file (a 'tarball'), like putting all your camping gear into one big backpack.",
        howItWorks: [
            "You combine spell flags:",
            "**-c (Create)**, **-x (Extract)**, **-v (Verbose/show files)**, **-f (File name is next)**.",
            "**-z (Gzip)**: Compresses the backpack to make it smaller (`.tar.gz`).",
            "Memorize this: `tar -czvf archive-name.tar.gz folder-to-archive/` (Create a zipped, verbose file).",
            "And this: `tar -xzvf archive-name.tar.gz` (Extract a zipped, verbose file)."
        ],
        examples: [
            { code: "tar -czvf project.tar.gz my_project/", text: "Creates a compressed backpack named `project.tar.gz` from your `my_project` folder." },
            { code: "tar -xzvf project.tar.gz", text: "Unpacks the `project.tar.gz` backpack into your current location." }
        ],
        realWorld: "This is the standard way to package up a project's code for sharing or backups. When you download code for a Linux program, it's almost always a `.tar.gz` file."
    },
    {
        category: "User Management",
        name: "whoami",
        description: "The `whoami` spell is the simplest identity check. It answers the question, 'Who am I in this magical world?' by printing your current username.",
        howItWorks: ["Just cast the spell. It has no other options."],
        examples: [
            { code: "whoami", text: "If you are logged in as `student`, it will print `student`." }, 
            { code: "sudo whoami", text: "When run with `sudo`, it will print `root`, because `sudo` makes you the all-powerful 'root' user for that one command." }
        ],
        realWorld: "Extremely useful in scripts to verify that the script is being run by the correct hero before it attempts to do something dangerous, like modify system files."
    },
    {
        category: "Permissions and Ownership",
        name: "umask",
        description: "The `umask` spell sets the default magic shield (permissions) for any new files and folders you create. It 'masks' or blocks certain permissions from being set automatically for safety.",
        howItWorks: [
            "It uses a number that is 'subtracted' from the system defaults (`777` for folders, `666` for files).",
            "A common `umask` is `022`. For new folders, the permission is `777 - 022 = 755`. For new files, it's `666 - 022 = 644`.",
            "This is great for security because it ensures new files aren't writable by other users by default."
        ],
        examples: [
            { code: "umask", text: "Shows your current default permission mask (e.g., `0022`)." }, 
            { code: "umask 077", text: "Sets a very restrictive mask. New files and folders you create will only be accessible by you." }
        ],
        realWorld: "A system admin configures the default `umask` on a shared server to enforce a security policy from the moment a file is created."
    },
    {
        category: "Process and System Management",
        name: "top",
        description: "The `top` spell is a live, real-time crystal ball showing all running programs. It constantly updates and shows you which programs are being greedy and hogging the most CPU and memory.",
        howItWorks: [
            "Just cast `top` to open the interactive, full-screen view.",
            "Inside, you can press keys:",
            "**P** (uppercase): Sorts by CPU usage.",
            "**M** (uppercase): Sorts by Memory usage.",
            "**k**: Lets you 'kill' a process. It will ask for the PID to terminate.",
            "**q**: Quits the `top` program."
        ],
        examples: [
            { code: "top", text: "Opens the live dashboard of all running processes." }
        ],
        realWorld: "If your computer's fan is spinning like a jet engine, you open `top`, press `P`, and immediately see which program is using 100% of your CPU. It's the #1 tool for live performance diagnosis."
    },
    {
        category: "Process and System Management",
        name: "kill",
        description: "The `kill` spell is used to terminate a running program (a 'process'). You tell it which program to stop by using its unique PID (Process ID) number.",
        howItWorks: [
            "`kill PID_number`: Sends a polite request asking the program to shut down cleanly.",
            "**-9 (The Hammer)**: Sends the `SIGKILL` signal, a command that cannot be ignored and forces the process to stop immediately. This is the last resort for stuck programs."
        ],
        examples: [
            { code: "kill 12345", text: "Politely asks the program with PID `12345` to stop." }, 
            { code: "kill -9 98765", text: "Forcefully terminates a program that is frozen and won't respond." }
        ],
        realWorld: "You use `ps` or `top` to find the PID of a frozen application, and then you use `kill` (or `kill -9` if it's really stuck) to shut it down."
    },
    {
        category: "Process and System Management",
        name: "uptime",
        description: "The `uptime` spell quickly tells you how long your computer has been on a single adventure without needing a rest (a reboot).",
        howItWorks: [
            "It shows the current time, how long the system has been running, and the 'load average' (CPU busyness over the last 1, 5, and 15 minutes).",
            "**-p (Pretty)**: Makes the output much friendlier, like 'up 5 days, 3 hours'."
        ],
        examples: [
            { code: "uptime", text: "Shows all the system uptime information in one line." }, 
            { code: "uptime -p", text: "Shows just the uptime in a simple, human-readable sentence." }
        ],
        realWorld: "System admins use `uptime` to prove their servers are super stable and haven't rebooted unexpectedly. A long uptime is a badge of honor!"
    },
    {
        category: "Process and System Management",
        name: "df",
        description: "The `df` (disk free) spell reports how much space is free in your magic bag of holding (your hard drive).",
        howItWorks: [
            "**-h (Humanizer)**: The most important flag! It shows sizes in human-readable format (`K` for kilobytes, `M` for megabytes, `G` for gigabytes).",
            "The `Use%` column quickly shows you which drive is getting full."
        ],
        examples: [
            { code: "df -h", text: "Shows how much space is used and available on all your hard drives in an easy-to-read format." }, 
            { code: "df -h .", text: "Shows the disk space for only the specific drive where your current folder is." }
        ],
        realWorld: "When you get a 'disk space low' warning, `df -h` is the first spell you cast to see which drive is full and needs cleaning."
    },
    {
        category: "Process and System Management",
        name: "du",
        description: "The `du` (disk usage) spell estimates how much space a specific folder or file is using. It helps you find what's taking up all the room in your bag of holding.",
        howItWorks: [
            "**-h (Humanizer)**: Shows sizes in `K`, `M`, `G`.",
            "**-s (Summarizer)**: This is crucial. It shows only the grand total for the directory, not for every single sub-folder.",
            "A very common spell is `du -sh *` to see the size of all items in your current location."
        ],
        examples: [
            { code: "du -sh my_large_folder", text: "Shows only the total size of `my_large_folder`." }, 
            { code: "du -sh * | sort -rh", text: "A powerful combo that lists all folders and files in your current location, sorted by the largest at the top!" }
        ],
        realWorld: "After `df -h` tells you your drive is full, you cast `du -sh *` in different folders to hunt down exactly which files or projects are the biggest space hogs."
    },
    {
        category: "Process and System Management",
        name: "free",
        description: "The `free` spell gives you a snapshot of your computer's thinking power (RAM/memory).",
        howItWorks: [
            "**-h (Humanizer)**: Shows memory in a human-readable format (`G` for gigabytes, `M` for megabytes).",
            "**Important**: Don't worry if 'free' looks low. Linux is smart and uses spare memory for caching to speed things up. The 'available' column is the true measure of memory for new programs."
        ],
        examples: [
            { code: "free -h", text: "Shows a summary of your total memory, how much is used, and how much is truly available." }
        ],
        realWorld: "If your computer is acting slow, you use `free -h` to check if you've run out of available RAM and need to close some applications."
    },
    {
        category: "Networking and Connectivity",
        name: "ip addr",
        description: "The `ip addr` spell is the modern way to ask, 'What's my address in the digital world?'. It shows your network information, including your IP address.",
        howItWorks: [
            "`ip addr show` is the full command, but everyone uses the shortcut `ip a`.",
            "**inet**: This shows your IPv4 address (the most common type, e.g., `192.168.1.100`)."
        ],
        examples: [
            { code: "ip a", text: "A common and much shorter alias for `ip addr show`, displaying detailed info about all your network connections." }
        ],
        realWorld: "This is the standard, go-to command for finding your IP address on any modern Linux system, which you need to connect to games or other computers."
    },
    {
        category: "Networking and Connectivity",
        name: "netstat",
        description: "The `netstat` spell shows all the secret doors (network ports) on your computer, which ones are open, and what programs are listening at them.",
        howItWorks: [
            "`netstat -tulnp` is the master spell:",
            "**-t**: TCP doors. **-u**: UDP doors.",
            "**-l**: Show only 'listening' doors.",
            "**-n**: Show numbers instead of names (faster).",
            "**-p**: Show the program using the door (requires `sudo`)."
        ],
        examples: [
            { code: "sudo netstat -tulnp", text: "The admin's favorite: see all listening TCP/UDP ports and which programs are using them." }
        ],
        realWorld: "Used to check that a new game server is correctly 'listening' on its port, or to find out what program is blocking a port you want to use."
    },
    {
        category: "Networking and Connectivity",
        name: "scp",
        description: "The `scp` (secure copy) spell lets you securely copy files to and from other computers over the network. It's like `cp`, but for teleporting files across the world.",
        howItWorks: [
            "**To Upload**: `scp local_file.txt user@remote_server:/path/`",
            "**To Download**: `scp user@remote_server:/path/to/file.txt .` (The `.` at the end means 'copy here').",
            "**-r**: Recursively copies entire folders."
        ],
        examples: [
            { code: "scp my_picture.jpg friend@friends-pc:/home/friend/pictures/", text: "Sends your picture to your friend's computer." }, 
            { code: "scp -r project/ user@server:/var/www/html", text: "Recursively teleports your entire `project` folder to a web server."}
        ],
        realWorld: "Used to quickly upload a website to a server or download a log file from a remote machine for analysis."
    },
    {
        category: "Networking and Connectivity",
        name: "ssh",
        description: "The `ssh` (secure shell) spell is your encrypted portal to other computers. It lets you safely log in and run commands on a remote machine as if you were sitting right there.",
        howItWorks: [
            "The basic spell is `ssh user@hostname`.",
            "It will ask for the password for the remote user account (unless you set up magic keys).",
            "Once you're in, you can run any command on the remote machine."
        ],
        examples: [
            { code: "ssh student@school-server.edu", text: "Connects to your school's server with the username `student`." }
        ],
        realWorld: "A system administrator uses `ssh` all day to manage remote servers across the globe. It's the #1 tool for remote server management."
    },
    {
        category: "Networking and Connectivity",
        name: "wget",
        description: "The `wget` spell is a simple, no-fuss downloader for the terminal. You give it a link, and it 'gets' the file for you.",
        howItWorks: [
            "Just cast `wget` followed by the full URL of the file.",
            "**-O <filename>**: Saves the downloaded file with a different name.",
            "**-c**: Resumes a partially downloaded file if your connection was interrupted."
        ],
        examples: [
            { code: "wget https://example.com/cool_game.zip", text: "Downloads `cool_game.zip` into your current folder." }, 
            { code: "wget -O awesome.html https://www.google.com", text: "Downloads Google's homepage and saves it as `awesome.html`." }
        ],
        realWorld: "You can use `wget` in a script to automatically download a daily data file from a website for processing."
    },
    {
        category: "Networking and Connectivity",
        name: "curl",
        description: "The `curl` spell is a data transfer Swiss Army knife. It's used for downloading files, testing web APIs, and interacting with almost any web service.",
        howItWorks: [
            "By default, `curl URL` displays the content directly in your terminal.",
            "**-O**: Saves the content to a file with its original name.",
            "**-o <filename>**: Saves the content to a specific file you name.",
            "**-X POST**: Sends data to a URL instead of just getting data from it."
        ],
        examples: [
            { code: "curl https://api.github.com/users/google", text: "Gets information about the 'google' user on GitHub and displays the data in the terminal." }, 
            { code: "curl -O https://example.com/important_file.zip", text: "Downloads the remote file and saves it locally." }
        ],
        realWorld: "Developers use `curl` constantly to test if their web APIs are working correctly, sending and receiving data without needing a browser."
    },
    {
        category: "Archiving and Compression",
        name: "gzip",
        description: "The `gzip` spell compresses a file to make it much smaller, like a shrink ray. It replaces the original file with a compressed version ending in `.gz`.",
        howItWorks: [
            "Cast `gzip` on a file. The original is replaced by the `.gz` version.",
            "**-d** or `gunzip`: Decompresses the file, restoring it to normal."
        ],
        examples: [
            { code: "gzip huge_log_file.txt", text: "Compresses the file, which becomes `huge_log_file.txt.gz`." }, 
            { code: "gunzip huge_log_file.txt.gz", text: "Decompresses the file back to its original state." }
        ],
        realWorld: "Used to shrink large text files or backups that you need to store for a long time but don't need to access often."
    },
    {
        category: "Archiving and Compression",
        name: "gunzip",
        description: "The `gunzip` spell is the growth potion that reverses `gzip`. It decompresses a `.gz` file, restoring it to its original form so you can use it.",
        howItWorks: [
            "Cast `gunzip` on a `.gz` file. The compressed file is replaced by the original.",
            "**-c**: This useful flag writes the uncompressed content to the screen but keeps the original compressed file."
        ],
        examples: [
            { code: "gunzip my_backup.sql.gz", text: "Decompresses the database backup, making it a readable `.sql` file again." }, 
            { code: "gunzip -c server_log.gz | less", text: "Lets you read a compressed log file with `less` without permanently decompressing it." }
        ],
        realWorld: "You use `gunzip` whenever you need to read or process an old log file or backup that was compressed to save space."
    },
    {
        category: "Archiving and Compression",
        name: "zip",
        description: "The `zip` spell is a popular tool for bundling files and compressing them into a single `.zip` file. This format is super compatible and can be opened on almost any computer (Windows, macOS, Linux).",
        howItWorks: [
            "`zip archive_name.zip file1 file2 folder1`",
            "**-r (Recursive)**: The essential flag to include all files and subfolders within a directory."
        ],
        examples: [
            { code: "zip homework.zip math.docx history.pdf", text: "Creates a zip file containing two specific homework files." }, 
            { code: "zip -r vacation_pics.zip photos/", text: "Recursively zips the entire `photos` folder and all its contents." }
        ],
        realWorld: "Perfect for packaging up a folder of documents or photos to send to someone in an email, knowing they'll be able to open it."
    },
    {
        category: "Archiving and Compression",
        name: "unzip",
        description: "The `unzip` spell extracts all the files from a `.zip` archive, bringing them back to your computer.",
        howItWorks: [
            "`unzip archive_name.zip`: Unzips the file into your current folder.",
            "**-d <directory>**: Extracts the files into a different, specific folder.",
            "**-l**: Lists the contents of the zip file without extracting them."
        ],
        examples: [
            { code: "unzip project_files.zip", text: "Unzips all the files into the current directory." }, 
            { code: "unzip software.zip -d /tmp/test", text: "Extracts the contents into a specific temporary directory for inspection." },
            { code: "unzip -l archive.zip", text: "Shows you a list of all files inside the archive before you extract it."}
        ],
        realWorld: "When you download a `.zip` file from the internet, you use `unzip` to get the contents out so you can use them."
    },
    {
        category: "User Management",
        name: "id",
        description: "The `id` spell reveals a user's true identity: their user ID (uid), their primary group (gid), and all the other secret societies (groups) they belong to.",
        howItWorks: [
            "`id`: Shows your own identity.",
            "`id <username>`: Shows information for a different user.",
            "`-un`: Shows just your username (a simpler `whoami`)."
        ],
        examples: [
            { code: "id", text: "Shows your user ID, your main group, and all other groups you are a member of." }, 
            { code: "id jessica", text: "Shows the user and group information for the user `jessica`." }
        ],
        realWorld: "System admins use this to quickly check if a user is in the correct group to have permission to access a certain file or program."
    },
    {
        category: "User Management",
        name: "who",
        description: "The `who` spell is like a Marauder's Map. It tells you who else is currently logged into the same computer.",
        howItWorks: [
            "Just cast `who`. It lists each user's name, their terminal, and when they logged in.",
            "**-H (Headers)**: Adds titles to the columns to make the output easier to read.",
            "**`who am i`**: A special version that shows only information about you."
        ],
        examples: [
            { code: "who", text: "Shows a list of all users currently on the system." }, 
            { code: "who am i", text: "Shows just your own session information."}
        ],
        realWorld: "On a shared university or company server, you can use `who` to see if your friends or colleagues are also logged in and working."
    },
    {
        category: "File Viewing and Editing",
        name: "nano",
        description: "Nano is a simple, beginner-friendly text editor that runs inside your terminal. It's like a basic notebook where you can easily write and edit text or code.",
        howItWorks: [
            "Open or create a file by typing `nano filename.txt`.",
            "A list of the most important commands is always shown at the bottom of the screen.",
            "`Ctrl + O`: 'Write Out' (Save the file).",
            "`Ctrl + X`: Exit the editor. It will ask if you want to save your changes if you haven't.",
            "`Ctrl + W`: 'Where is' (Find text).",
            "`Ctrl + K`: 'Kut' (Cut a line of text).",
            "`Ctrl + U`: 'Unkut' (Paste a line of text)."
        ],
        examples: [
            { code: "nano my_story.txt", text: "Opens `my_story.txt` in the nano editor, ready for you to write." },
            { code: "sudo nano /etc/hosts", text: "Opens a system configuration file for editing. You might need `sudo` for this." }
        ],
        realWorld: "Perfect for quickly editing a configuration file on a remote server or for beginners who find Vim too complex. It provides a straightforward editing experience without a steep learning curve."
    },
    {
        category: "File Viewing and Editing",
        name: "vim",
        description: "Vim is a legendary and powerful text editor. It has different 'modes' for navigating and editing, making it incredibly fast once you learn the basics. It's the choice of many coding wizards.",
        howItWorks: [
            "Vim starts in **Normal Mode**, where keys are commands (e.g., `j` to move down, `x` to delete a character).",
            "Press `i` to enter **Insert Mode** to type text normally.",
            "Press `Esc` to return to Normal Mode.",
            "In Normal Mode, type `:` to enter **Command-Line Mode** at the bottom of the screen.",
            "`:w` to save (write), `:q` to quit, `:wq` to save and quit."
        ],
        examples: [
            { code: "vim new_script.sh", text: "Opens a new script file in Vim." },
            { code: "vim /etc/nginx/nginx.conf", text: "A common use case for a system admin is editing a server configuration file with Vim's powerful features." }
        ],
        realWorld: "Experienced developers and system administrators use Vim for everything from writing code to editing configuration files because of its speed and power. The ability to edit without using a mouse is a huge productivity boost."
    }
];
