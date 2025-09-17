
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
            "**-t (The Time-Sorter)**: Sorts the files by the last time they were touched, showing the newest ones first.",
            "**-R (The Explorer)**: Recursively lists everything in the current folder, and then everything inside those folders, and so on.",
            "Combine them for superpowers! `ls -laht` shows all files in a detailed, time-sorted, human-readable list."
        ],
        examples: [
            { code: "ls -l", text: "Shows a detailed list of all visible files and folders." }, 
            { code: "ls -a", text: "Reveals all hidden magic scrolls in your current directory." }, 
            { code: "ls -laht", text: "The pro combo: shows everything in a detailed, time-sorted, easy-to-read format. Great for seeing what you just worked on." },
            { code: "ls -R", text: "Lists all files in the current directory and all its subdirectories, giving you a full map of the area."},
            { code: "ls -lhS", text: "Lists files sorted by size, with the largest at the top. Perfect for finding what's eating your disk space!"},
            { code: "ls -ld */", text: "Lists only the directories in your current location. The `d` flag prevents `ls` from looking inside them."},
            { code: "ls -l | grep '\\.txt$'", text: "A powerful combination that lists files in long format, then uses `grep` to filter and show only the files that end with `.txt`."}
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
            { code: "cd /var/log && pwd", text: "After teleporting to a new folder, `pwd` confirms your location by printing `/var/log`." },
            { code: "CURRENT_DIRECTORY=$(pwd)", text: "A scripting spell! This saves your current location into a variable that you can use later in a script." },
            { code: "echo \"My quest starts in $(pwd)\"", text: "Uses the output of `pwd` directly within another command to print a status message."}
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
            { code: "cd ../../", text: "Jumps up two levels in the directory tree." },
            { code: "cd", text: "Instantly teleports you home, no matter how lost you are." },
            { code: "cd -", text: "If you just jumped from your `Downloads` folder to your `Projects` folder, `cd -` would zap you right back to `Downloads`."},
            { code: "cd /etc/nginx", text: "Teleports you to an absolute path, starting from the root of the filesystem."},
            { code: "cd \"My Photos\"", text: "If a folder name has spaces, you must wrap it in quotes to teleport correctly."}
        ],
        realWorld: "`cd` is your main mode of transportation in the terminal. You use it constantly to navigate to the files you need."
    },
    {
        category: "File and Directory Management",
        name: "mkdir",
        description: "The `mkdir` (Make Directory) spell creates new, empty folders to keep your quests and treasures organized.",
        howItWorks: [
            "You cast `mkdir` followed by the name of your new folder.",
            "**-p (The Path-Maker)**: This powerful flag lets you create a whole chain of nested folders at once, like building a castle with many rooms inside rooms.",
            "**-v (Verbose)**: Shows you a message for each directory it creates."
        ],
        examples: [
            { code: "mkdir my_new_quest", text: "Creates a new folder for your adventure." }, 
            { code: "mkdir docs assets images", text: "Creates three folders at the same time in your current location." },
            { code: "mkdir -p kingdom/castle/throne_room", text: "Creates the `kingdom` folder, then `castle` inside it, and finally `throne_room` inside that, all in one go!" },
            { code: "mkdir -pv project/{src,dist,test}", text: "A pro-move combining flags and brace expansion to create a standard project structure and see the output. It creates `project/src`, `project/dist`, and `project/test`."}
        ],
        realWorld: "When starting any new coding project, you'll use `mkdir` to create a dedicated folder and subfolders like `src` for code and `assets` for images."
    },
    {
        category: "File and Directory Management",
        name: "rmdir",
        description: "The `rmdir` (Remove Directory) spell is a cautious way to delete **empty** folders. If a folder has any treasures (files) inside, this spell will fail, protecting you from accidents.",
        howItWorks: ["You cast `rmdir` on a folder. It only works if the folder is completely empty."],
        examples: [
            { code: "rmdir empty_dungeon", text: "Deletes the `empty_dungeon` folder because there are no monsters or treasures inside."},
            { code: "rmdir folder1 folder2", text: "Attempts to delete two empty folders at once."},
            { code: "rmdir not_empty_folder", text: "This command will fail and show an error like 'rmdir: failed to remove 'not_empty_folder': Directory not empty'."}
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
            { code: "touch index.html style.css script.js", text: "A pro-gamer move to create three essential files for a new web project all at once." },
            { code: "touch existing_file.txt", text: "If the file already exists, this command updates its 'last modified' timestamp to the current time, without changing its content."},
            { code: "touch \"My Great American Novel.txt\"", text: "Creates a file with spaces in its name by wrapping it in quotes."}
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
            "**-r (The Replicator)**: The essential flag for copying folders. It *recursively* copies a folder and everything inside it.",
            "**-v (Verbose)**: Shows you exactly what files are being copied, step-by-step.",
            "**-i (Interactive)**: Prompts you ('interactively') before overwriting an existing file, which is a great safety feature."
        ],
        examples: [
            { code: "cp report.pdf report_backup.pdf", text: "Makes a quick backup of your report before you make big changes." }, 
            { code: "cp -r vacation_photos /home/user/photo_archive/", text: "Uses the `-r` spell to copy the entire `vacation_photos` folder and all its contents to your archive." },
            { code: "cp -iv source_folder/image.jpg destination_folder/", text: "Copies an image verbosely (so you see it happening) and will ask for confirmation if `image.jpg` already exists in the destination."},
            { code: "cp *.txt backups/", text: "Uses a wildcard (`*`) to copy all files ending in `.txt` into the `backups` folder."}
        ],
        realWorld: "You'll use `cp` daily to back up important files, duplicate project templates, or move images and assets around."
    },
    {
        category: "File and Directory Management",
        name: "mv",
        description: "The `mv` (Move) spell is a two-in-one tool: it can either move a file to a new folder, or it can simply rename it.",
        howItWorks: [
            "**To Rename**: `mv old_name new_name`.",
            "**To Move**: `mv file_name destination_folder/`.",
            "**-i (Interactive)**: Prompts you for confirmation before overwriting an existing file.",
            "**-v (Verbose)**: Shows you a confirmation of what was moved."
        ],
        examples: [
            { code: "mv draft.txt final_report.txt", text: "Renames your file from a draft to the final version." }, 
            { code: "mv secret_map.jpg ~/safe_chest/", text: "Moves your secret map into your main 'safe_chest' folder." },
            { code: "mv -i my_script.sh scripts/", text: "Moves your script into the scripts folder, but will ask 'overwrite?' if a file with the same name is already there."},
            { code: "mv -v important_file.doc archives/", text: "Moves the file and then prints a confirmation: 'renamed 'important_file.doc' -> 'archives/important_file.doc''."}
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
            { code: "rm -i sensitive_document.doc", text: "Asks for confirmation before deleting an important file. This is a much safer way to delete things!" },
            { code: "rm -r temp_project", text: "Deletes the `temp_project` folder and everything inside it." },
            { code: "rm -rf old_project", text: "Forcefully deletes the entire `old_project` folder without any prompts. VERY DANGEROUS! Double-check your spelling before using this." },
            { code: "rm *.log", text: "Deletes all files ending with `.log` in the current directory."}
        ],
        realWorld: "Used to clean up temporary files or delete old versions of a project. Always think twice before using `rm -rf`."
    },
    {
        "category": "File and Directory Management",
        "name": "find",
        "description": "The `find` spell is your magical bloodhound. It can search your entire computer for files based on name, size, type, or when they were last touched.",
        "howItWorks": [
          "The basic spell is: `find [where_to_look] [what_to_look_for] [what_to_do]`.",
          "`-name \"pattern\"`: Searches by name using shell globbing (like `*`).",
          "`-iname \"pattern\"`: Case-insensitive search by name.",
          "`-regex \"pattern\"`: Searches the full path using a more powerful regular expression.",
          "`-type f`: Searches only for files.",
          "`-type d`: Searches only for directories (folders).",
          "`-size +1G`: Finds files larger than 1 gigabyte.",
          "`-mtime -7`: Finds files modified in the last 7 days.",
          "`-exec command {} \\;`: A powerful charm that runs another command on each file that is found. The `{}` is a placeholder for the found file."
        ],
        "examples": [
          { "code": "find . -name \"*.jpg\"", "text": "Searches the current folder (`.`) for any files that end with `.jpg`." },
          { "code": "find . -iname \"report.*\"", "text": "Finds files named `report.txt`, `Report.docx`, etc., ignoring case." },
          { "code": "find . -regex \".*\\.\\(jpg\\|png\\)$\"", "text": "Uses a regular expression to find all files ending in `.jpg` or `.png`." },
          { "code": "find /home -type f -size +1G", "text": "Searches the entire `/home` directory for files (`-type f`) that are larger than 1 gigabyte (`+1G`)." },
          { "code": "find . -type f -name \"*.tmp\" -exec rm {} \\;", "text": "Finds all temporary files (`*.tmp`) and casts the `rm` spell on each one to delete them." },
          { "code": "find /var/log -name \"*.log\" -mtime +30", "text": "Finds all log files in `/var/log` that are older than 30 days."}
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
            { code: "cat chapter1.txt chapter2.txt > full_story.txt", text: "Combines two story chapters into one single file using the `>` redirection spell." },
            { code: "cat file.txt | grep 'error'", text: "Displays the file's content, then sends it through a 'grep' filter to only show lines containing the word 'error'."}
        ],
        realWorld: "Use `cat` to quickly check a small configuration file or to see the contents of a short script without opening an editor."
    },
    {
        category: "File Viewing and Editing",
        name: "grep",
        description: "The `grep` spell is your magical magnifying glass for text. It searches through files (or the output of other commands) and shows you only the lines that contain a pattern you're looking for.",
        howItWorks: [
            "The basic spell is `grep 'pattern' filename`.",
            "It can be combined with other commands using the `|` (pipe) character to filter their output.",
            "**-i (Ignore Case)**: Finds matches regardless of whether they are uppercase or lowercase.",
            "**-v (Invert Match)**: Shows you all the lines that *don't* contain the pattern.",
            "**-r (Recursive)**: Searches for the pattern in all files within a directory and its subdirectories.",
            "**-l (List Files)**: Shows only the names of the files that contain the pattern, not the matching lines themselves.",
            "**-n (Line Number)**: Shows the line number for each match."
        ],
        examples: [
            { code: "grep 'error' server.log", text: "Searches for the word 'error' inside the `server.log` file." },
            { code: "ps aux | grep 'chrome'", text: "Lists all running processes, then uses `grep` to filter and show only the lines related to the Chrome browser." },
            { code: "grep -ri 'database_password' /etc/", text: "Recursively and case-insensitively searches the entire `/etc` directory for any file containing 'database_password'. A powerful way to find secrets!"},
            { code: "grep -v '^#' config.conf", text: "Displays a configuration file, but hides all the comment lines that start with `#`."},
            { code: "grep -l 'main' *.js", text: "Searches all JavaScript files (`*.js`) in the current directory and lists the names of the ones that contain the word 'main'."}
        ],
        realWorld: "This is one of the most powerful and frequently used commands. Developers use it constantly to find where a function is being called, system admins use it to search for specific errors in log files, and you'll use it anytime you need to find specific text."
    },
    {
        category: "File Viewing and Editing",
        name: "less",
        description: "The `less` spell is a powerful viewer for huge scrolls (large files). It lets you read them page by page, so you don't get overwhelmed. 'Less is more!'.",
        howItWorks: [
            "Cast `less` on a file. Use arrow keys or Page Up/Down to scroll.",
            "`/text`: Searches forward for `text`. Press `n` for the next match.",
            "`?text`: Searches backward.",
            "`G`: Jumps to the end of the file.",
            "`g`: Jumps to the beginning of the file.",
            "`q`: Press `q` to quit and return to your terminal."
        ],
        examples: [
            { code: "less ancient_tome.log", text: "Opens a huge log file so you can read it comfortably without loading the whole thing into memory." }, 
            { code: "ls -lah /etc | less", text: "The `|` (pipe) sends the long output of `ls` into `less`, letting you scroll through a giant list of files easily." },
            { code: "less +F server.log", text: "Opens the file and immediately starts 'following' it, just like `tail -f`. Press Ctrl-C to stop following and scroll normally, then `q` to quit." }
        ],
        realWorld: "Server administrators live in `less`. They use it to examine massive log files to find errors or track down problems."
    },
    {
        category: "File Viewing and Editing",
        name: "head",
        description: "The `head` spell shows you just the 'head' or the first few lines of a scroll. By default, it shows the first 10 lines.",
        howItWorks: ["`-n <number>`: Lets you specify exactly how many lines to see from the top."],
        examples: [
            { code: "head recipe_book.txt", text: "Shows the first 10 lines of the recipe book." },
            { code: "head -n 5 recipe_book.txt", text: "Quickly shows the first 5 recipes in your book to see what's for dinner." },
            { code: "head -n 1 data.csv", text: "Shows only the very first line of a CSV file, which is usually the header row with column titles."},
            { code: "ls -t | head -n 1", text: "A powerful combination that lists files by time (`-t`) and then shows only the very first one, which is the most recently modified file in the directory." }
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
            { code: "tail -f /var/log/game_server.log", text: "Lets you watch a live game server's log, seeing player actions and errors as they happen." },
            { code: "tail -n 100 access.log | grep '404'", text: "Shows the last 100 lines of a web server log, and filters them to only show '404 Not Found' errors."},
            { code: "tail -f app.log | grep --color=auto 'ERROR'", text: "Follows a log file and highlights any lines containing 'ERROR', making them easy to spot." }
        ],
        realWorld: "A developer will always have a terminal open running `tail -f` on their app's log file to watch for issues in real time while they are coding."
    },
    {
        category: "File Viewing and Editing",
        name: "wc",
        description: "The `wc` (word count) spell is a quick way to count the number of lines, words, and characters in a file without having to read it all.",
        howItWorks: [
            "**-l (Lines)**: Counts only the number of lines.",
            "**-w (Words)**: Counts only the number of words.",
            "**-c (Bytes/Characters)**: Counts only the number of bytes (characters)."
        ],
        examples: [
            { code: "wc my_essay.txt", text: "Shows the number of lines, words, and characters in your essay." },
            { code: "wc -l my_essay.txt", text: "Quickly checks how many lines long your essay is." },
            { code: "ls -1 | wc -l", text: "A powerful combination that lists files (one per line) and pipes the output to `wc -l` to count how many files are in the current directory." }
        ],
        realWorld: "Used to quickly check the length of a log file or a data set. It's also frequently used in scripts to count items from the output of other commands."
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
            { code: "sudo nano /etc/hosts", text: "Opens a system configuration file for editing. You might need `sudo` for this." },
            { code: "nano -l my_script.sh", text: "Opens a script file with line numbers displayed, which is great for coding." }
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
            "`:w` to save (write), `:q` to quit, `:wq` to save and quit, `:q!` to force quit without saving."
        ],
        examples: [
            { code: "vim new_script.sh", text: "Opens a new script file in Vim." },
            { code: "vim +10 my_file.txt", text: "Opens the file and jumps directly to line 10." },
            { code: "vim /etc/nginx/nginx.conf", text: "A common use case for a system admin is editing a server configuration file with Vim's powerful features." },
            { code: "vim -O file1.txt file2.txt", text: "Opens two files side-by-side in a vertical split, which is great for comparing them."}
        ],
        realWorld: "Experienced developers and system administrators use Vim for everything from writing code to editing configuration files because of its speed and power. The ability to edit without using a mouse is a huge productivity boost."
    },
    {
        category: "Permissions and Ownership",
        name: "chmod",
        description: "The `chmod` (change mode) spell is the gatekeeper of permissions. Permissions decide who can **r**ead, **w**rite, and e**x**ecute a file or folder.",
        howItWorks: [
            "It uses numbers to represent permissions: `4` for read, `2` for write, `1` for execute.",
            "You give a three-digit number: the first is for the owner, the second for the group, and the third for everyone else.",
            "`chmod 755 script.sh`: `7` (4+2+1) for owner (read, write, execute), `5` (4+1) for group (read, execute), `5` for others. Perfect for programs.",
            "`chmod 644 document.txt`: `6` (4+2) for owner (read, write), `4` for everyone else (read-only). Perfect for documents.",
            "You can also use letters: `u` (user/owner), `g` (group), `o` (others), `a` (all). And `+` (add permission), `-` (remove permission)."
        ],
        examples: [
            { code: "chmod +x my_script.sh", text: "A quick way to add 'eXecute' permission, allowing you to run the script." }, 
            { code: "chmod 755 my_script.sh", text: "The numeric way to make a script executable by you, and readable/executable by others." },
            { code: "chmod 600 private_diary.txt", text: "Makes a file readable and writable *only* by you (6 for owner, 0 for group, 0 for others). Essential for private files." },
            { code: "chmod u=rwx,g=r,o=r my_app", text: "An alternative way to set permissions: gives the user read/write/execute, and the group/others only read access."},
            { code: "chmod -R 644 my_project/", text: "Recursively sets all files inside `my_project` to be read/write for you and read-only for everyone else." }
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
            { code: "sudo chown -R www-data:www-data /var/www/my_website", text: "Gives a web server's user (`www-data`) ownership of all website files so it can read them." },
            { code: "sudo chown $(whoami) my_file.txt", text: "Changes the owner of the file to be the current user. Useful in scripts."}
        ],
        realWorld: "Used by system admins to make sure programs (like a web server) have permission to access the files they need to do their job."
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
            { code: "umask 077", text: "Sets a very restrictive mask. New files and folders you create will only be accessible by you." },
            { code: "umask -S", text: "Shows the mask in a more human-readable, symbolic format (like `u=rwx,g=rx,o=rx`)."}
        ],
        realWorld: "A system admin configures the default `umask` on a shared server to enforce a security policy from the moment a file is created."
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
            "`ps -ef` is another popular combination that shows a full listing in a different format.",
            "The output shows the PID (Process ID), a unique number for each program, which you can use with `kill`."
        ],
        examples: [
            { code: "ps aux", text: "Get a detailed list of every single process running on the system." }, 
            { code: "ps -ef", text: "Another way to see all running processes, often used in scripts." },
            { code: "ps aux | grep firefox", text: "This finds and shows you only the processes related to the Firefox browser. `grep` acts as a filter." },
            { code: "ps -u myuser", text: "Shows all processes currently being run by the user `myuser`." }
        ],
        realWorld: "If your computer is suddenly slow, you'd use `ps aux` to see which program is being greedy and using up all the CPU or memory."
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
            { code: "top", text: "Opens the live dashboard of all running processes." },
            { code: "top -u username", text: "Shows a live dashboard of processes for only a specific user."},
            { code: "top -d 5", text: "Opens the dashboard and makes it refresh every 5 seconds instead of the default."}
        ],
        realWorld: "If your computer's fan is spinning like a jet engine, you open `top`, press `P`, and immediately see which program is using 100% of your CPU. It's the #1 tool for live performance diagnosis."
    },
    {
        category: "Process and System Management",
        name: "kill",
        description: "The `kill` spell is used to terminate a running program (a 'process'). You tell it which program to stop by using its unique PID (Process ID) number.",
        howItWorks: [
            "`kill PID_number`: Sends a polite request asking the program to shut down cleanly.",
            "**-9 (The Hammer)**: Sends the `SIGKILL` signal, a command that cannot be ignored and forces the process to stop immediately. This is the last resort for stuck programs.",
            "**-l**: Lists all available signals you can send."
        ],
        examples: [
            { code: "kill 12345", text: "Politely asks the program with PID `12345` to stop." }, 
            { code: "kill -9 98765", text: "Forcefully terminates a program that is frozen and won't respond." },
            { code: "pkill firefox", text: "A related spell, `pkill`, kills a program by its name instead of its PID, which can be easier!"},
            { code: "kill -HUP 12345", text: "Sends the 'hang up' signal, which many server programs interpret as a command to reload their configuration file without restarting."}
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
            "**-i**: Shows inode usage instead of block usage. Useful if you've run out of inodes (can happen if you have millions of tiny files).",
            "The `Use%` column quickly shows you which drive is getting full."
        ],
        examples: [
            { code: "df -h", text: "Shows how much space is used and available on all your hard drives in an easy-to-read format." }, 
            { code: "df -h .", text: "Shows the disk space for only the specific drive where your current folder is." },
            { code: "df -i", text: "Shows how many inodes are free, which is another way a disk can 'fill up'."}
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
            "**-a (All)**: Shows the size for every single file, as well as directories.",
            "A very common spell is `du -sh *` to see the size of all items in your current location."
        ],
        examples: [
            { code: "du -h my_document.txt", text: "Shows the size of a single file." },
            { code: "du -sh my_large_folder", text: "Shows only the total size of `my_large_folder`." }, 
            { code: "du -sh * | sort -rh", text: "A powerful combo that lists all folders and files in your current location, sorted by the largest at the top!" },
            { code: "du -ah my_folder", text: "Shows the disk usage for every file and subfolder inside `my_folder`."}
        ],
        realWorld: "After `df -h` tells you your drive is full, you cast `du -sh *` in different folders to hunt down exactly which files or projects are the biggest space hogs."
    },
    {
        category: "Process and System Management",
        name: "free",
        description: "The `free` spell gives you a snapshot of your computer's thinking power (RAM/memory).",
        howItWorks: [
            "**-h (Humanizer)**: Shows memory in a human-readable format (`G` for gigabytes, `M` for megabytes).",
            "**-s <seconds>**: Makes the command run repeatedly, refreshing every few seconds.",
            "**Important**: Don't worry if 'free' looks low. Linux is smart and uses spare memory for caching to speed things up. The 'available' column is the true measure of memory for new programs."
        ],
        examples: [
            { code: "free -h", text: "Shows a summary of your total memory, how much is used, and how much is truly available." },
            { code: "free -h -s 5", text: "Displays the memory usage and refreshes the numbers every 5 seconds. Press Ctrl-C to stop."}
        ],
        realWorld: "If your computer is acting slow, you use `free -h` to check if you've run out of available RAM and need to close some applications."
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
            { code: "ping -c 4 192.168.1.1", text: "Pings your home router exactly 4 times to test your local network." },
            { code: "ping -c 5 -W 1 8.8.8.8", text: "Pings Google's DNS server 5 times, but waits only 1 second for a reply on each ping."}
        ],
        realWorld: "If a website isn't loading, the first thing to do is `ping` it. If you get a reply, the server is online and the problem is something else."
    },
    {
        category: "Networking and Connectivity",
        name: "ip addr",
        description: "The `ip addr` spell is like asking, 'What's my computer's home address on the internet?' It's a number that lets other computers find yours.",
        howItWorks: [
            "Think of the internet as a giant city. Every house needs a unique address so mail can be delivered. An IP address is your computer's address in this city.",
            "When you run `ip addr` (or the shorter `ip a`), you get a lot of information. You're looking for a line that starts with `inet`.",
            "The number right after `inet` is your IP address! It looks something like `192.168.1.5` for your home network, or a different set of numbers for the public internet.",
            "You will see multiple 'devices' listed. `lo` is the 'loopback' device—it's like a note you write to yourself and doesn't go out to the network. Others like `eth0` or `wlan0` are your real connections (Ethernet cable or Wi-Fi)."
        ],
        examples: [
            { code: "ip a", text: "The fastest way to see all your network addresses. It's a shorter version of `ip addr show`." },
            { code: "ip addr show eth0", text: "Shows information for only your main wired connection (often called `eth0`)." },
            { code: "ip -4 addr", text: "Shows only the more common IPv4 addresses (like 192.168.1.5) and hides the longer IPv6 ones." },
            { code: "ip addr | grep 'inet '", text: "A pro move! This shows all the address information and then filters it to only show the lines with your actual IP address on them."}
        ],
        realWorld: "If you want to play a multiplayer game with a friend on the same Wi-Fi, you both need to know your computer's IP address to connect to each other. You would run `ip a` to find it."
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
            { code: "sudo netstat -tulnp", text: "The admin's favorite: see all listening TCP/UDP ports and which programs are using them." },
            { code: "netstat -tn", text: "Shows all active TCP connections numerically."},
            { code: "netstat -r", text: "Displays the system's routing table, showing how network traffic is directed."}
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
            "**-r**: Recursively copies entire folders.",
            "**-P <port>**: Specifies a port number if the remote server doesn't use the default SSH port (22)."
        ],
        examples: [
            { code: "scp my_picture.jpg friend@friends-pc:/home/friend/pictures/", text: "Sends your picture to your friend's computer." }, 
            { code: "scp -r project/ user@server:/var/www/html", text: "Recursively teleports your entire `project` folder to a web server."},
            { code: "scp -P 2222 user@server:/remote/file.txt .", text: "Downloads a file from a server that uses a custom SSH port."}
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
            "**-p <port>**: Connect to a server on a non-standard port.",
            "**-i <keyfile>**: Use a specific private key file for authentication."
        ],
        examples: [
            { code: "ssh student@school-server.edu", text: "Connects to your school's server with the username `student`." },
            { code: "ssh user@hostname 'ls -l'", text: "Runs the `ls -l` command on the remote server without starting a full interactive session."},
            { code: "ssh -p 2222 user@server", text: "Connects to a server that uses port 2222 instead of the default."},
            { code: "ssh -i ~/.ssh/work_key user@work_server", text: "Connects to your work server using a specific identity key file."}
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
            "**-c**: Resumes a partially downloaded file if your connection was interrupted.",
            "**-b**: Runs the download in the background so you can keep using your terminal."
        ],
        examples: [
            { code: "wget https://example.com/cool_game.zip", text: "Downloads `cool_game.zip` into your current folder." }, 
            { code: "wget -O awesome.html https://www.google.com", text: "Downloads Google's homepage and saves it as `awesome.html`." },
            { code: "wget -c http://releases.ubuntu.com/22.04/ubuntu-22.04.3-desktop-amd64.iso", text: "Resumes downloading a large file like an Ubuntu installer if it was interrupted." },
            { code: "wget -b https://large-file-server.com/movie.mp4", text: "Starts downloading a large file in the background and immediately gives you your terminal back."}
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
            "**-X POST**: Sends data to a URL instead of just getting data from it.",
            "**-I**: Shows only the response headers from the server."
        ],
        examples: [
            { code: "curl https://api.github.com/users/google", text: "Gets information about the 'google' user on GitHub and displays the data in the terminal." }, 
            { code: "curl -O https://example.com/important_file.zip", text: "Downloads the remote file and saves it locally." },
            { code: "curl -I https://www.google.com", text: "Shows only the headers of a web page, which is useful for debugging."},
            { code: "curl -X POST -H \"Content-Type: application/json\" -d '{\"name\":\"Sparkle\"}' https://api.example.com/items", text: "An advanced spell to send JSON data to an API to create a new item."}
        ],
        realWorld: "Developers use `curl` constantly to test if their web APIs are working correctly, sending and receiving data without needing a browser."
    },
    {
        category: "Archiving and Compression",
        name: "tar",
        description: "The `tar` (tape archive) spell is the master packer. It bundles many files and folders into one single archive file (a 'tarball'), like putting all your camping gear into one big backpack.",
        howItWorks: [
            "You combine spell flags:",
            "**-c (Create)**, **-x (Extract)**, **-v (Verbose/show files)**, **-f (File name is next)**.",
            "**-z (Gzip)**: Compresses the backpack to make it smaller (`.tar.gz`).",
            "**-j (Bzip2)**: Uses bzip2 compression, often smaller but slower (`.tar.bz2`).",
            "**-t (List)**: Lists the contents of an archive without extracting it.",
            "Memorize this: `tar -czvf archive-name.tar.gz folder-to-archive/` (Create a zipped, verbose file).",
            "And this: `tar -xzvf archive-name.tar.gz` (Extract a zipped, verbose file)."
        ],
        examples: [
            { code: "tar -czvf project.tar.gz my_project/", text: "Creates a compressed backpack named `project.tar.gz` from your `my_project` folder." },
            { code: "tar -xzvf project.tar.gz", text: "Unpacks the `project.tar.gz` backpack into your current location." },
            { code: "tar -tf my_archive.tar.gz", text: "Lists all the files inside the archive so you can see what's in it before you unpack it."},
            { code: "tar -xvf archive.tar.gz -C /path/to/destination", text: "Extracts an archive into a completely different directory."}
        ],
        realWorld: "This is the standard way to package up a project's code for sharing or backups. When you download code for a Linux program, it's almost always a `.tar.gz` file."
    },
    {
        category: "Archiving and Compression",
        name: "gzip",
        description: "The `gzip` spell compresses a file to make it much smaller, like a shrink ray. It replaces the original file with a compressed version ending in `.gz`.",
        howItWorks: [
            "Cast `gzip` on a file. The original is replaced by the `.gz` version.",
            "**-d** or `gunzip`: Decompresses the file, restoring it to normal.",
            "**-k**: Keeps the original file and creates a compressed copy."
        ],
        examples: [
            { code: "gzip huge_log_file.txt", text: "Compresses the file, which becomes `huge_log_file.txt.gz`." }, 
            { code: "gunzip huge_log_file.txt.gz", text: "Decompresses the file back to its original state." },
            { code: "gzip -k data.csv", text: "Creates a compressed `data.csv.gz` but also leaves the original `data.csv` untouched."}
        ],
        realWorld: "Used to shrink large text files or backups that you need to store for a long time but don't need to access often."
    },
    {
        category: "Archiving and Compression",
        name: "gunzip",
        description: "The `gunzip` spell is the growth potion that reverses `gzip`. It decompresses a `.gz` file, restoring it to its original form so you can use it.",
        howItWorks: [
            "Cast `gunzip` on a `.gz` file. The compressed file is replaced by the original.",
            "**-c**: This useful flag writes the uncompressed content to the screen but keeps the original compressed file.",
            "**-k**: Keeps the compressed file and creates an uncompressed copy."
        ],
        examples: [
            { code: "gunzip my_backup.sql.gz", text: "Decompresses the database backup, making it a readable `.sql` file again." }, 
            { code: "gunzip -c server_log.gz | less", text: "Lets you read a compressed log file with `less` without permanently decompressing it." },
            { code: "gunzip -k archive.gz", text: "Creates an uncompressed `archive` file but also keeps the original `archive.gz`."}
        ],
        realWorld: "You use `gunzip` whenever you need to read or process an old log file or backup that was compressed to save space."
    },
    {
        category: "Archiving and Compression",
        name: "zip",
        description: "The `zip` spell is a popular tool for bundling files and compressing them into a single `.zip` file. This format is super compatible and can be opened on almost any computer (Windows, macOS, Linux).",
        howItWorks: [
            "`zip archive_name.zip file1 file2 folder1`",
            "**-r (Recursive)**: The essential flag to include all files and subfolders within a directory.",
            "**-e**: Encrypts the zip file with a password for extra security."
        ],
        examples: [
            { code: "zip homework.zip math.docx history.pdf", text: "Creates a zip file containing two specific homework files." }, 
            { code: "zip -r vacation_pics.zip photos/", text: "Recursively zips the entire `photos` folder and all its contents." },
            { code: "zip -e secret_plans.zip plans.txt", text: "Creates a password-protected zip file containing your secret plans."}
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
        name: "whoami",
        description: "The `whoami` spell is the simplest identity check. It answers the question, 'Who am I in this magical world?' by printing your current username.",
        howItWorks: ["Just cast the spell. It has no other options."],
        examples: [
            { code: "whoami", text: "If you are logged in as `student`, it will print `student`." }, 
            { code: "sudo whoami", text: "When run with `sudo`, it will print `root`, because `sudo` makes you the all-powerful 'root' user for that one command." },
            { code: "if [ \"$(whoami)\" != \"root\" ]; then echo \"You are not the root user!\"; fi", text: "A script example checking if the current user is not the root user." }
        ],
        realWorld: "Extremely useful in scripts to verify that the script is being run by the correct hero before it attempts to do something dangerous, like modify system files."
    },
    {
        category: "User Management",
        name: "id",
        description: "The `id` spell reveals a user's true identity: their user ID (uid), their primary group (gid), and all the other secret societies (groups) they belong to.",
        howItWorks: [
            "`id`: Shows your own identity.",
            "`id <username>`: Shows information for a different user.",
            "`-u`: Shows just the numerical user ID.",
            "`-g`: Shows just the numerical group ID.",
            "`-G`: Shows all numerical group IDs.",
            "`-un`: Shows just your username (a simpler `whoami`)."
        ],
        examples: [
            { code: "id", text: "Shows your user ID, your main group, and all other groups you are a member of." }, 
            { code: "id jessica", text: "Shows the user and group information for the user `jessica`." },
            { code: "id -u", text: "Shows only your numerical user ID."},
            { code: "id -Gn", text: "Shows the names of all groups you belong to."}
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
            { code: "who -H", text: "Shows the same list but with helpful column titles like NAME and LINE." },
            { code: "who am i", text: "Shows just your own session information."}
        ],
        realWorld: "On a shared university or company server, you can use `who` to see if your friends or colleagues are also logged in and working."
    }
];
