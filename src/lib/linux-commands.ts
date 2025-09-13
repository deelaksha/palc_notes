export const commandsData = [
    {
        category: "File and Directory Management",
        name: "ls",
        description: "The `ls` command is like asking your computer to \"show me what's here.\" It will list all the files and folders in your current location.",
        howItWorks: ["By itself, `ls` shows a simple list of names.", "You can add extra words, called \"flags,\" to get more details.", "` -l` stands for \"long listing\" and shows a detailed view, including who owns the file, its size, and when it was made.", "` -a` stands for \"all\" and shows every file, even the secret \"hidden\" ones that start with a dot (`.`)."],
        examples: [{ code: "ls -l", text: "Shows a detailed list of all the files and folders here." }, { code: "ls -a", text: "Shows all files, including hidden ones like `.bashrc`." }],
        realWorld: "Before you start working in a new folder, you would use `ls` to see what files are already there."
    },
    {
        category: "File and Directory Management",
        name: "pwd",
        description: "The `pwd` command is like asking your computer, \"Where am I right now?\" It tells you the exact path to the folder you are in. The path is a complete address, starting from the very top of the computer's file system (`/`).",
        howItWorks: ["You simply type the command, and it gives you the full folder address."],
        examples: [{ code: "pwd", text: "If you are in your main home folder, it might show `/home/yourname`." }, { code: "cd /var/log && pwd", text: "After changing to a new folder, `pwd` would show `/var/log`." }],
        realWorld: "This is super helpful when you are deep inside a bunch of folders and forget where you are."
    },
    {
        category: "File and Directory Management",
        name: "cd",
        description: "The `cd` command is how you move from one folder to another. It's like clicking on a folder icon to go inside it. You just need to tell it the name of the folder you want to go to.",
        howItWorks: ["`cd folder_name` moves you into a folder inside your current location.", "`cd ..` moves you up one level to the parent folder.", "`cd /` moves you to the very top folder, called the root directory."],
        examples: [{ code: "cd Documents", text: "Changes your location to the `Documents` folder." }, { code: "cd ..", text: "Moves you back to the folder that contains your current one." }],
        realWorld: "You use `cd` all the time to navigate to the exact location of a file you need to work on."
    },
    {
        category: "File and Directory Management",
        name: "mkdir",
        description: "The `mkdir` command stands for \"make directory.\" It's how you create a new, empty folder.",
        howItWorks: ["You just type `mkdir` followed by the name you want to give the new folder.", "You can also create an entire path of folders at once using the `-p` flag."],
        examples: [{ code: "mkdir my_new_project", text: "Creates a new folder called `my_new_project`." }, { code: "mkdir -p school/classes/math", text: "Creates the `school` folder, and inside that, a `classes` folder, and inside that, a `math` folder." }],
        realWorld: "When you start a new school project, you can use `mkdir` to create a dedicated folder to keep everything organized."
    },
    {
        category: "File and Directory Management",
        name: "rmdir",
        description: "The `rmdir` command \"removes\" a directory. It's for deleting an empty folder. It's a bit picky, so if the folder has anything inside it, this command won't work.",
        howItWorks: ["You type `rmdir` followed by the folder's name."],
        examples: [{ code: "rmdir old_drawings", text: "Deletes the `old_drawings` folder, but only if it's completely empty." }, { code: "rmdir new_files", text: "This will give you an error if `new_files` has anything in it." }],
        realWorld: "This command is useful for cleaning up empty folders after a project is finished."
    },
    {
        category: "File and Directory Management",
        name: "touch",
        description: "The `touch` command is a quick way to create a brand new, empty file. It's like taking a blank piece of paper and giving it a name. If the file already exists, it simply updates the last time the file was \"touched.\"",
        howItWorks: ["Type `touch` followed by the name you want the new file to have."],
        examples: [{ code: "touch shopping_list.txt", text: "Creates a new, empty file named `shopping_list.txt`." }, { code: "touch my_script.sh", text: "Creates a blank script file." }],
        realWorld: "Programmers often use `touch` to create a new file to start writing code in."
    },
    {
        category: "File and Directory Management",
        name: "cp",
        description: "The `cp` command \"copies\" a file or folder. It makes a perfect duplicate and puts it in a new location or gives it a new name.",
        howItWorks: ["`cp original_file new_file`: Makes a copy of `original_file` and names the copy `new_file`.", "`cp -r original_folder new_folder`: The `-r` flag means \"recursive,\" which is necessary to copy a whole folder and everything inside it."],
        examples: [{ code: "cp report.pdf report_backup.pdf", text: "Creates a backup of your report." }, { code: "cp -r vacation_photos /home/user/photo_archive", text: "Copies the entire `vacation_photos` folder to a different location." }],
        realWorld: "This is essential for creating backups of important documents before you make big changes."
    },
    {
        category: "File and Directory Management",
        name: "mv",
        description: "The `mv` command is a two-in-one tool. It can either \"move\" a file from one place to another or \"rename\" it.",
        howItWorks: ["`mv old_name new_name`: Changes a file's name.", "`mv file_name new_location`: Moves the file to a new folder."],
        examples: [{ code: "mv shopping_list.txt grocery_list.txt", text: "Renames the file." }, { code: "mv report.pdf Documents", text: "Moves the `report.pdf` file into your `Documents` folder." }],
        realWorld: "You would use `mv` to organize your files, for example, moving a downloaded file from your \"Downloads\" folder into a \"Reports\" folder."
    },
    {
        category: "File and Directory Management",
        name: "rm",
        description: "The `rm` command \"removes\" a file. It's like throwing a piece of paper in the trash, but there's no way to get it back, so you have to be very careful!",
        howItWorks: ["`rm file_name`: Deletes the file.", "`rm -r folder_name`: The `-r` flag is used to delete a whole folder and everything inside it.", "`rm -f file_name`: The `-f` flag means \"force,\" which deletes the file without asking for confirmation."],
        examples: [{ code: "rm extra_notes.txt", text: "Deletes the file permanently." }, { code: "rm -r old_project", text: "Deletes the entire `old_project` folder and all its contents." }],
        realWorld: "You use `rm` to delete files you no longer need, which helps free up space on your computer."
    },
    {
        category: "File and Directory Management",
        name: "find",
        description: "The `find` command is like a powerful search engine for your computer's files. It can look for files based on their name, size, type, or when they were last changed.",
        howItWorks: ["You tell it where to start looking, what to look for, and what kind of thing you want to find."],
        examples: [{ code: "find . -name \"*.jpg\"", text: "This searches the current folder (`.`) and all folders inside it for any files that end with `.jpg`." }, { code: "find /home/user/documents -type f -size +1G", text: "This searches for files (`-type f`) in your `documents` folder that are bigger than 1 gigabyte (`+1G`)." }],
        realWorld: "If you saved a document but can't remember where, `find` can help you locate it very quickly."
    },
    {
        category: "File Viewing and Editing",
        name: "cat",
        description: "The `cat` command, short for \"concatenate,\" shows you everything inside a file at once. It's best for small files because it will dump the entire content onto your screen.",
        howItWorks: ["Type `cat` followed by the file's name."],
        examples: [{ code: "cat my_story.txt", text: "Shows you the entire text of `my_story.txt`." }, { code: "cat file1.txt file2.txt > combined.txt", text: "This is a trickier use. It combines the text from `file1.txt` and `file2.txt` and saves the result in a new file called `combined.txt`." }],
        realWorld: "Use `cat` to quickly read a small recipe or a shopping list file without opening a fancy text editor."
    },
    {
        category: "File Viewing and Editing",
        name: "less",
        description: "The `less` command is much better than `cat` for big files. It lets you scroll through a file one screen at a time, so it doesn't overwhelm you with information.",
        howItWorks: ["Type `less` and the file name. You can use the arrow keys to scroll.", "Press `q` to quit when you are done."],
        examples: [{ code: "less big_book.txt", text: "Opens the file so you can read it page by page." }, { code: "ls -l | less", text: "The `|` sends the output of `ls` to `less`, so you can scroll through a very long list of files." }],
        realWorld: "System administrators often use `less` to look at huge log files from a server without having to wait for the whole file to load."
    },
    {
        category: "File Viewing and Editing",
        name: "head",
        description: "The `head` command shows you just the beginning of a file. By default, it shows the first 10 lines.",
        howItWorks: ["`head file_name`: Shows the first 10 lines.", "`head -n 5 file_name`: Shows the first 5 lines."],
        examples: [{ code: "head recipes.txt", text: "Shows the first 10 recipes in your file." }, { code: "head -n 1 /etc/hosts", text: "This is useful for quickly seeing the first line of an important system file." }],
        realWorld: "Use `head` to quickly see what a file is about before you open it."
    },
    {
        category: "File Viewing and Editing",
        name: "tail",
        description: "The `tail` command is the opposite of `head`. It shows you the end of a file. This is especially useful for files that are constantly being written to, like a server's log.",
        howItWorks: ["`tail file_name`: Shows the last 10 lines.", "`tail -f file_name`: The `-f` flag means \"follow.\" This is a special mode that keeps showing new lines as they are added to the file."],
        examples: [{ code: "tail notes.txt", text: "Shows the last 10 lines of notes you wrote." }, { code: "tail -f server.log", text: "This is what you would use to watch a server's activity in real-time." }],
        realWorld: "A developer might use `tail -f` to watch for errors or messages from their program as it's running."
    },
        {
        category: "Permissions and Ownership",
        name: "chmod",
        description: "The `chmod` command \"changes the mode\" or permissions of a file. Permissions decide who can do what with a file. There are three types of permissions: **r** (read), **w** (write), and **x** (execute). Permissions are given to three groups: the **owner**, the **group**, and **others**. You can also use numbers: `4` = read, `2` = write, `1` = execute, `7` = read + write + execute.",
        howItWorks: ["`chmod 755 file_name`: A common command to make a script runnable. It gives the owner full access (7) and everyone else read and execute permissions (5).", "`chmod +x file_name`: A simpler way to just add \"execute\" permission to a file."],
        examples: [{ code: "chmod 777 my_script.sh", text: "This gives everyone (owner, group, and others) full control over the script." }, { code: "chmod 644 my_notes.txt", text: "This makes a file readable and writable by you (6) but only readable by everyone else (4)." }],
        realWorld: "When you download a program or write a script, it might not be runnable at first. You need to use `chmod +x` to tell the computer that it's okay to run it."
    },
    {
        category: "Permissions and Ownership",
        name: "chown",
        description: "The `chown` command \"changes the owner\" of a file or folder. Only a superuser or the current owner can do this.",
        howItWorks: ["`chown new_owner file_name`: Changes who owns the file.", "`chown new_owner:new_group file_name`: Changes both the owner and the group."],
        examples: [{ code: "sudo chown jack important_file.txt", text: "This uses `sudo` (which gives you superuser power) to make `jack` the new owner of `important_file.txt`." }, { code: "chown :friends file.txt", text: "This changes the group that owns the file to `friends`, without changing the owner." }],
        realWorld: "A system administrator might use `chown` to give a user ownership of files they need to edit on a shared server."
    },
    {
        category: "Process and System Management",
        name: "ps",
        description: "The `ps` command stands for \"process status.\" It shows you a snapshot of all the programs and tasks that are running on your computer right now.",
        howItWorks: ["`ps aux`: The most common way to use it. It shows all running processes (`a`), including those from other users (`u`), and shows a lot of detail (`x`)."],
        examples: [{ code: "ps aux | grep firefox", text: "This finds and shows you only the processes related to the Firefox web browser." }, { code: "ps -ef", text: "Another common way to see a detailed list of every process on the system." }],
        realWorld: "If your computer is slow, you can use `ps` to see which programs are running and maybe find one that is using up too much power."
    },
    {
        category: "Networking and Connectivity",
        name: "ping",
        description: "The `ping` command is like sending a small message to another computer on the internet to see if it's there and how fast it responds.",
        howItWorks: ["It sends a packet of data and waits for a reply. It tells you how long it took for the message to travel."],
        examples: [{ code: "ping google.com", text: "Sends a message to Google's servers to see if they are reachable." }, { code: "ping 192.168.1.1", text: "Sends a message to your home Wi-Fi router to check if your computer can talk to it." }],
        realWorld: "If you can't access a website, you can use `ping` to see if the problem is with your own internet connection or with the website itself."
    },
    {
        category: "Archiving and Compression",
        name: "tar",
        description: "The `tar` command stands for \"tape archive.\" It's used to put many files and folders into one big \"box\" or archive. This makes it easier to move or save them all together.",
        howItWorks: ["`tar -cvf new_archive.tar folder_name`: The flags mean \"create,\" \"verbose\" (show progress), and \"file.\" This command puts `folder_name` into `new_archive.tar`.", "`tar -xvf old_archive.tar`: The `-x` flag means \"extract,\" which takes all the files out of the archive."],
        examples: [{ code: "tar -cvf my_photos.tar my_photos/", text: "Puts all your photos into a single archive file." }, { code: "tar -xvf my_photos.tar", text: "Takes all the photos out of the archive and puts them back where they were." }],
        realWorld: "This is a common way to package up a whole project to back it up or send it to someone else."
    },
    {
        category: "User Management",
        name: "whoami",
        description: "The `whoami` command is like asking the computer, \"What is my username?\" It just prints the name of the user you are currently logged in as.",
        howItWorks: ["Just type the command and press enter."],
        examples: [{ code: "whoami", text: "If you are logged in as `student`, it will show `student`." }, { code: "sudo su - root && whoami", text: "This switches you to the superuser (`root`), and then `whoami` would show `root`." }],
        realWorld: "Useful for making sure you're logged in with the correct account before running a command that requires special permissions."
    },
    {
        category: "Permissions and Ownership",
        name: "umask",
        description: "The `umask` command sets the default permissions for any new files and folders you create. It's like a set of rules for your computer to follow every time you make something new.",
        howItWorks: ["It uses a special number that tells the computer what permissions to *take away* from the default settings. A common `umask` is `0022`."],
        examples: [{ code: "umask 022", text: "This is a standard setting. It makes new folders readable by everyone but writable only by you." }, { code: "umask 007", text: "This makes new files and folders very private, preventing others from reading or writing to them." }],
        realWorld: "An administrator would set the `umask` for all users on a server to ensure that files are created with the correct security from the start."
    },
    {
        category: "Process and System Management",
        name: "top",
        description: "The `top` command is an even better way to see what your computer is doing. It's an interactive, live list of all the running programs. It constantly updates and shows you which programs are using the most CPU and memory.",
        howItWorks: ["You just type `top` and it opens a live view in your terminal.", "You can press different keys to sort the list (e.g., `P` to sort by CPU usage)."],
        examples: [{ code: "top", text: "Shows the live list of all running processes." }, { code: "top -u username", text: "Filters the list to only show the processes belonging to a specific user." }],
        realWorld: "If your computer freezes, you can open a terminal and use `top` to find the program that is causing the problem and then stop it."
    },
    {
        category: "Process and System Management",
        name: "kill",
        description: "The `kill` command is used to stop a running program or task. You tell it to stop a specific process by using its special ID number, called a PID (Process ID).",
        howItWorks: ["`kill PID_number`: Sends a message to the program, asking it to stop.", "`kill -9 PID_number`: Sends a more powerful message that forces the program to stop immediately. Use this if the program is stuck and won't close normally."],
        examples: [{ code: "kill 12345", text: "Stops the program with the ID number `12345`." }, { code: "kill -9 98765", text: "Forcefully stops a program that is not responding." }],
        realWorld: "You would use `ps` or `top` to find the PID of a frozen program and then use `kill` to shut it down."
    },
    {
        category: "Process and System Management",
        name: "uptime",
        description: "The `uptime` command tells you how long your computer has been turned on and running without a reboot.",
        howItWorks: ["You simply type the command, and it shows the current time, how long the system has been up, how many people are logged in, and the \"load average\" (how busy the computer is)."],
        examples: [{ code: "uptime", text: "Shows you all the information in a single line." }, { code: "uptime -p", text: "The `-p` flag makes the output more friendly, like \"up 5 days, 3 hours.\"" }],
        realWorld: "System administrators use `uptime` to check if a server has been restarted, which can be important for diagnosing problems."
    },
    {
        category: "Process and System Management",
        name: "df",
        description: "The `df` command stands for \"disk free.\" It shows you how much space is available on your computer's hard drives.",
        howItWorks: ["`df -h`: The `-h` flag means \"human-readable,\" which shows the sizes in a way that's easy to understand, like \"10G\" instead of a big number of bytes."],
        examples: [{ code: "df -h", text: "Shows how much space is used and available on all your hard drives." }, { code: "df -h /home/user", text: "Shows the disk space usage for a specific folder." }],
        realWorld: "When your computer is running low on space, you would use `df -h` to see how much room you have left."
    },
    {
        category: "Process and System Management",
        name: "du",
        description: "The `du` command stands for \"disk usage.\" It tells you how much space a specific folder or file is using.",
        howItWorks: ["`du -h`: The `-h` flag shows the size in a human-readable format.", "`du -sh folder_name`: The `-s` flag means \"summary,\" which is useful to see the total size of a folder without listing every file inside it."],
        examples: [{ code: "du -h my_photos", text: "Shows the size of the `my_photos` folder and all the files inside it." }, { code: "du -sh my_photos", text: "Shows only the total size of the `my_photos` folder." }],
        realWorld: "If you want to know what's taking up the most space on your computer, you would use `du -sh` to check the size of large folders."
    },
    {
        category: "Process and System Management",
        name: "free",
        description: "The `free` command shows you how much of your computer's memory (RAM) is being used.",
        howItWorks: ["`free -h`: The `-h` flag shows the memory in a human-readable format like \"GB\" or \"MB.\""],
        examples: [{ code: "free -h", text: "Shows a summary of your total memory, how much is used, and how much is free." }, { code: "free", text: "Shows the memory usage in kilobytes, which is less easy to read." }],
        realWorld: "If your computer is running slow, you can use `free` to see if a program is using up all your memory."
    },
    {
        category: "Networking and Connectivity",
        name: "ifconfig",
        description: "The `ifconfig` command is a networking command-line tool that provides detailed information about your network interfaces, including your IP address.",
        howItWorks: ["You type the command, and it shows a list of your network adapters and their addresses."],
        examples: [{ code: "ifconfig", text: "Displays the network configuration for all active network interfaces." }, { code: "ifconfig eth0", text: "Displays the network configuration for a specific network interface, like `eth0`." }],
        realWorld: "If someone asks you for your computer's IP address on an older system, you can use `ifconfig` to find it."
    },
    {
        category: "Networking and Connectivity",
        name: "ip addr",
        description: "The `ip addr` command is the modern replacement for `ifconfig` and is used to see your computer's network information, like its IP address.",
        howItWorks: ["You type the command, and it shows a list of your network adapters and their addresses."],
        examples: [{ code: "ip addr", text: "Shows your computer's IP address and other network details." }, { code: "ip addr show eth0", text: "Shows the configuration for a specific network interface, like `eth0`." }],
        realWorld: "This is the go-to command for finding your IP address on most modern Linux systems."
    },
    {
        category: "Networking and Connectivity",
        name: "netstat",
        description: "The `netstat` command shows you all the connections your computer has to other computers, both on your local network and on the internet. It provides a lot of detail about active connections, including which ports are open.",
        howItWorks: ["It provides a lot of detail about active connections, including which ports are open."],
        examples: [{ code: "netstat -a", text: "Shows a list of all connections and listening ports." }, { code: "netstat -tuln", text: "A more specific command that shows TCP and UDP listening ports." }],
        realWorld: "A network administrator would use `netstat` to see what programs are communicating over the network and where those connections are going."
    },
    {
        category: "Networking and Connectivity",
        name: "scp",
        description: "The `scp` command \"securely copies\" files. It's like using `cp` to copy a file, but it sends the file to another computer on the network safely.",
        howItWorks: ["You type the file name, the username and address of the other computer, and where you want to put the file."],
        examples: [{ code: "scp my_file.txt user@192.168.1.5:/home/user/documents", text: "Copies `my_file.txt` to the `/home/user/documents` folder on another computer." }, { code: "scp user@server.com:/var/log/server.log .", text: "Copies a file from a remote server to your current location (`.`)." }],
        realWorld: "You would use `scp` to send an important file to a server securely, or to grab a file from a remote computer."
    },
    {
        category: "Networking and Connectivity",
        name: "ssh",
        description: "The `ssh` command, or \"secure shell,\" lets you safely control another computer from your own. It's like sitting right in front of that other computer.",
        howItWorks: ["You type the command with the username and address of the remote computer."],
        examples: [{ code: "ssh user@server.com", text: "Connects to `server.com` with the username `user`." }, { code: "ssh student@10.0.0.5", text: "Connects to a computer on your local network." }],
        realWorld: "A system administrator uses `ssh` to manage servers and other computers from anywhere in the world."
    },
    {
        category: "Networking and Connectivity",
        name: "wget",
        description: "The `wget` command \"gets\" files from the web. It's a simple way to download a file from a website right to your computer.",
        howItWorks: ["You just type `wget` followed by the full address of the file."],
        examples: [{ code: "wget https://example.com/file.zip", text: "Downloads the `file.zip` from that website." }, { code: "wget -r https://example.com/pictures", text: "The `-r` flag means \"recursive,\" and it will download an entire website." }],
        realWorld: "A developer might use `wget` to download a new version of a program or a library they need for their project."
    },
    {
        category: "Networking and Connectivity",
        name: "curl",
        description: "The `curl` command is a very powerful tool for sending and receiving data from web addresses. It can do a lot more than just download a file; it can get information from an API or send data to a website.",
        howItWorks: ["You type `curl` followed by a URL. You can also add flags to tell it to do different things."],
        examples: [{ code: "curl https://api.github.com/users/octocat", text: "Gets information about the user \"octocat\" from GitHub's API." }, { code: "curl -O https://example.com/big_file.zip", text: "The `-O` flag tells it to save the file with its original name." }],
        realWorld: "Developers use `curl` all the time to test web services and APIs."
    },
    {
        category: "Archiving and Compression",
        name: "gzip",
        description: "The `gzip` command \"compresses\" a file, which means it makes the file size smaller. This is useful for saving space. It usually adds a `.gz` to the end of the filename.",
        howItWorks: ["You type `gzip` followed by the file name."],
        examples: [{ code: "gzip huge_log.txt", text: "Compresses the file and renames it `huge_log.txt.gz`." }, { code: "gzip -r folder_name", text: "Compresses every file inside the folder." }],
        realWorld: "You would use `gzip` on a large text file that you want to store for a long time without it taking up too much space."
    },
    {
        category: "Archiving and Compression",
        name: "gunzip",
        description: "The `gunzip` command \"decompresses\" a file that was compressed with `gzip`. It makes the file big again so you can use it.",
        howItWorks: ["You type `gunzip` followed by the compressed file's name."],
        examples: [{ code: "gunzip huge_log.txt.gz", text: "Decompresses the file and returns it to its original name, `huge_log.txt`." }, { code: "gunzip -r folder_name", text: "Decompresses every compressed file inside the folder." }],
        realWorld: "You would use `gunzip` when you need to access a file that was previously compressed to save space."
    },
    {
        category: "Archiving and Compression",
        name: "zip",
        description: "The `zip` command is a popular way to both \"archive\" and \"compress\" files at the same time. It's a very common format that works on many different types of computers, not just Linux.",
        howItWorks: ["`zip archive_name.zip file1 file2 folder1`: Puts all the listed files and folders into a single compressed `.zip` file."],
        examples: [{ code: "zip my_project.zip my_code.py report.txt", text: "Creates a zip file containing the two files." }, { code: "zip -r my_photos.zip my_photos/", text: "Recursively zips the entire `my_photos` folder." }],
        realWorld: "You would use `zip` to package up and compress a folder to send to a friend or upload to a website."
    },
    {
        category: "Archiving and Compression",
        name: "unzip",
        description: "The `unzip` command \"extracts\" files from a `.zip` archive. It takes all the files and folders that were put into the archive and puts them back on your computer.",
        howItWorks: ["`unzip archive_name.zip`: Unzips the file and places the contents in your current folder."],
        examples: [{ code: "unzip my_project.zip", text: "Unzips all the files from `my_project.zip`." }, { code: "unzip -d /home/user/downloads software.zip", text: "The `-d` flag tells `unzip` to put the files into a specific folder (`downloads`)." }],
        realWorld: "Whenever you download a `.zip` file from the internet, you would use `unzip` to get the files out."
    },
    {
        category: "User Management",
        name: "id",
        description: "The `id` command gives you more detail about your user, not just your name. It shows your unique user ID number and the ID numbers of all the groups you belong to.",
        howItWorks: ["`id`: Shows all your user and group information.", "`id -u`: Shows just your user ID number."],
        examples: [{ code: "id", text: "Shows your user ID, your main group ID, and all the other groups you are a member of." }, { code: "id jack", text: "Shows the user and group information for a different user named `jack`." }],
        realWorld: "This is used by system administrators to quickly look up a user's ID numbers, which are important for managing permissions."
    },
    {
        category: "User Management",
        name: "who",
        description: "The `who` command tells you who else is currently logged into the computer, and from where they are connected.",
        howItWorks: ["Just type `who`. It will list each user's name, where they are connected from, and when they logged in."],
        examples: [{ code: "who", text: "Shows a list of all users on the system." }, { code: "who -H", text: "The `-H` flag adds column headers to make the list easier to read." }],
        realWorld: "On a shared server, you can use `who` to see if your friends or colleagues are also logged in."
    }
];