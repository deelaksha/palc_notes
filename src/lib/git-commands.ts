
export const gitCommandsData = [
    {
        category: "Setup and Configuration",
        name: "git config",
        description: "This is the spell you cast to tell Git who you are! It sets up your hero profile so all your amazing work gets credited to you.",
        howItWorks: [
            "Git keeps your settings in special scrolls. You can have a global scroll (`--global`) for all your adventures, or a local one for just your current quest.",
            "`user.name`: Sets your hero name.",
            "`user.email`: Sets your hero email, so everyone knows who to send fan mail to!",
            "`alias.<short-name>`: Creates a magic shortcut for a long command spell."
        ],
        examples: [
            { code: 'git config --global user.name "Captain Coder"', text: "Tells Git your awesome hero name for all your future quests." },
            { code: 'git config --global user.email "captain@coder.com"', text: "Sets the email that will be attached to all your contributions." },
            { code: 'git config --global alias.co checkout', text: "Creates a super-fast spell `git co` that does the same thing as `git checkout`." }
        ],
        realWorld: "This is the very first spell you cast after installing Git. It’s like creating your character before starting a new game!",
        imageUrl: "https://picsum.photos/seed/git-config/600/400",
        imageAlt: "A diagram showing git config setting user name and email."
    },
    {
        category: "Getting & Creating Projects",
        name: "git init",
        description: "This command creates a brand new, empty treasure chest (`.git` folder) in your project. This chest will hold all the maps and save points of your code journey.",
        howItWorks: [
            "Running `git init` in your project folder officially starts your quest.",
            "It creates a hidden `.git` folder where all the Git magic happens.",
            "Your files are not in the chest yet! You still have to choose which ones to add."
        ],
        examples: [
            { code: "git init", text: "Turns your current folder into a Git-powered quest." },
            { code: "git init my-awesome-quest", text: "Creates a new folder for your quest and puts the Git treasure chest inside it." }
        ],
        realWorld: "This is the first step for any new project you want to protect with Git. It's like planting a flag and saying, 'This land is under my version control!'",
        imageUrl: "https://picsum.photos/seed/git-init/600/400",
        imageAlt: "A diagram showing an empty folder being turned into a Git repository with the git init command."
    },
    {
        category: "Getting & Creating Projects",
        name: "git clone",
        description: "This command is like a magic duplicator spell. It copies an entire project from a place like GitHub onto your own computer so you can work on it.",
        howItWorks: [
            "`git clone <url>` copies the entire history of a project from a web link.",
            "It automatically sets up a magical portal (called `origin`) back to the original project, so you can easily get updates or send your changes back.",
            "It prepares the main path (the `main` or `master` branch) for you to start walking on."
        ],
        examples: [
            { code: "git clone https://github.com/some-hero/cool-project.git", text: "Duplicates a cool project from GitHub onto your computer." },
            { code: "git clone git@github.com:me/my-quest.git my-epic-adventure", text: "Duplicates your own project and gives the folder a new, epic name." }
        ],
        realWorld: "This is how you join a team or start working on an open-source project. You clone it to get your own copy of the code.",
        imageUrl: "https://picsum.photos/seed/git-clone/600/400",
        imageAlt: "A diagram showing a remote repository being copied to a local machine with git clone."
    },
    {
        category: "Basic Snapshotting",
        name: "git add",
        description: "Think of this as packing your bag for an adventure. You choose which files (or changes) you want to save. These chosen files are put into a waiting area called the 'staging area'.",
        howItWorks: [
            "Git won't save anything until you `add` it to the staging area.",
            "This lets you make many changes but only save the ones that belong together in one 'snapshot' (commit).",
            "`git add <file>`: Puts a single item in your backpack.",
            "`git add .`: Puts all new and changed items in your current location into your backpack."
        ],
        examples: [
            { code: "git add treasure-map.txt", text: "Packs the treasure map for your next save point." },
            { code: "git add .", text: "Packs everything you've worked on in this area." }
        ],
        realWorld: "You use `git add` right before you make a `git commit`. It’s the 'get ready' step before saving your progress.",
        imageUrl: "https://picsum.photos/seed/git-add/600/400",
        imageAlt: "A diagram showing files moving from the working directory to the staging area using git add."
    },
    {
        category: "Basic Snapshotting",
        name: "git commit",
        description: "This is the 'Save Game' button! It takes everything you packed with `git add` and saves it as a permanent snapshot in your project's history with a message explaining what you did.",
        howItWorks: [
            "A commit is a 'save point' with a unique code and a message.",
            "`-m \"<message>\"`: The `-m` stands for message. You must leave a short note about what you saved. This is super important!",
            "`--amend`: This lets you fix your last save. You can change the message or add more items you forgot to pack."
        ],
        examples: [
            { code: 'git commit -m "Found the secret key!"', text: "Saves your game with a clear message about your achievement." },
            { code: 'git commit --amend -m "Found the secret key and opened the door"', text: "Corrects your last save message to be more accurate." }
        ],
        realWorld: "You commit your work every time you finish a small, complete task. It creates a clean history that's easy to look back on.",
        imageUrl: "https://picsum.photos/seed/git-commit/600/400",
        imageAlt: "A diagram showing files from the staging area being saved into the repository as a commit."
    },
    {
        category: "Basic Snapshotting",
        name: "git status",
        description: "This command is like looking at your inventory screen. It tells you what's in your backpack (staged), what you're holding but haven't packed (modified), and what's lying on the ground (untracked).",
        howItWorks: [
            "It shows which files are ready to be committed, which have changes that need to be `add`ed, and which new files Git doesn't know about yet.",
            "`-s`: A shortcut for a shorter, more compact status report."
        ],
        examples: [
            { code: "git status", text: "Gives you a full report on your current quest status." },
            { code: "git status -s", text: "Shows a quick-glance list of what's going on." }
        ],
        realWorld: "This is one of the most used commands. You'll use it all the time to check your progress and see what you need to do next.",
        imageUrl: "https://picsum.photos/seed/git-status/600/400",
        imageAlt: "A diagram illustrating the output of git status, showing modified, staged, and untracked files."
    },
    {
        category: "Branching & Merging",
        name: "git branch",
        description: "A branch is like a parallel universe! You can create a new branch to try out a risky idea without messing up your main project timeline.",
        howItWorks: [
            "`git branch`: Shows you all the parallel universes (branches) you have and which one you're in.",
            "`git branch <new-branch-name>`: Creates a new parallel universe, but you don't travel to it yet.",
            "`-d <branch-name>`: Deletes a branch after you're done with it."
        ],
        examples: [
            { code: "git branch", text: "Lists all your current timelines." },
            { code: "git branch experiment-with-potions", text: "Creates a new timeline to safely test your potions." },
            { code: "git branch -d experiment-with-potions", text: "Deletes the potion timeline after you've merged your discoveries." }
        ],
        realWorld: "Every new feature or bug fix should be done in a new branch. This keeps your main codebase clean and stable.",
        imageUrl: "https://picsum.photos/seed/git-branch/600/400",
        imageAlt: "A diagram showing the creation of a new branch from the main branch."
    },
    {
        category: "Branching & Merging",
        name: "git checkout",
        description: "This is your teleporter! It lets you jump between your different branches (parallel universes).",
        howItWorks: [
            "`git checkout <branch-name>`: Jumps to that timeline.",
            "`-b <new-branch-name>`: A super useful shortcut that creates a new branch *and* immediately teleports you to it.",
            "`git checkout -- <file>`: A safety lever! It throws away all the changes you made to a file since your last save."
        ],
        examples: [
            { code: "git checkout experiment-with-potions", text: "Teleports you to your potion-making timeline." },
            { code: 'git checkout -b fix-leaky-roof', text: "Creates a new timeline for fixing the roof and instantly takes you there." },
            { code: "git checkout -- ingredients.txt", text: "You messed up the ingredients list, so you use this to magically restore it to your last saved version." }
        ],
        realWorld: "You use `checkout` whenever you need to switch what you're working on. It's a fundamental part of the daily Git workflow.",
        imageUrl: "https://picsum.photos/seed/git-checkout/600/400",
        imageAlt: "A diagram showing HEAD moving from one commit to another after a git checkout."
    },
    {
        category: "Branching & Merging",
        name: "git merge",
        description: "This command magically combines your different timelines. When you're done with your experiment in a branch, you merge it back into your main timeline.",
        howItWorks: [
            "First, `checkout` the branch you want to bring the changes *into* (like `main`).",
            "Then, run `git merge <branch-with-cool-stuff>`.",
            "Git tries to automatically weave the stories together. If you and someone else changed the exact same line, you get a 'merge conflict' which you have to solve like a puzzle."
        ],
        examples: [
            { code: "git merge experiment-with-potions", text: "Brings all your successful potion recipes into your main project." }
        ],
        realWorld: "This is how features get added to the final product. You work in a branch, and when it's complete and tested, you merge it into the main `main` branch.",
        imageUrl: "https://picsum.photos/seed/git-merge/600/400",
        imageAlt: "A diagram illustrating how a feature branch is merged into the main branch, combining their histories."
    },
    {
        category: "Branching & Merging",
        name: "git rebase",
        description: "Rebase is like a time machine that tidies up your history. It takes your save points and neatly places them at the end of another timeline, creating a straight, clean story.",
        howItWorks: [
            "Instead of a messy merge, `rebase` makes it look like you did all your work *after* everyone else finished.",
            "It makes the project history a clean, single line, which is easier to read.",
            "`-i` (interactive): A super-powerful mode that lets you edit, combine, and reorder your past save points before showing them to others."
        ],
        examples: [
            { code: "git rebase main", text: "While on your feature branch, this updates it with the latest from the main timeline, putting your work neatly on top." },
            { code: "git rebase -i HEAD~3", text: "Lets you clean up your last 3 save points before you share your work." }
        ],
        realWorld: "Developers use rebase to keep their work clean before asking for it to be merged. **Warning:** Never use rebase on a branch that other people are also using! It rewrites history and can cause chaos.",
        imageUrl: "https://picsum.photos/seed/git-rebase/600/400",
        imageAlt: "A diagram showing commits from a feature branch being moved to the tip of the main branch."
    },
    {
        category: "Sharing & Updating Projects",
        name: "git remote",
        description: "Manages your connections to other worlds (remote repositories). A 'remote' is just a nickname for a project's URL, like a speed-dial number.",
        howItWorks: [
            "The default nickname for the server you cloned from is `origin`.",
            "`git remote -v`: Shows you all your speed-dial numbers and their full URLs.",
            "`git remote add <name> <url>`: Adds a new portal to another project."
        ],
        examples: [
            { code: "git remote -v", text: "Lists all the remote castles you're connected to." },
            { code: "git remote add upstream https://github.com/original-creator/repo.git", text: "Adds a connection to the original project you copied, so you can get updates from the original author." }
        ],
        realWorld: "This is essential when you're contributing to someone else's project. `origin` is your copy, and `upstream` is their original.",
        imageUrl: "https://picsum.photos/seed/git-remote/600/400",
        imageAlt: "A diagram showing a local repository with connections to origin and upstream remote repositories."
    },
    {
        category: "Sharing & Updating Projects",
        name: "git fetch",
        description: "This is like getting mail from another world but leaving it in the mailbox. It downloads all the new changes from a remote repository but doesn't mix them with your work yet.",
        howItWorks: [
            "It safely downloads all the new information.",
            "This gives you a chance to look at the new changes (`origin/main`) before you decide to `merge` them into your own branches."
        ],
        examples: [
            { code: "git fetch", text: "Gets all the latest news from all your connected remote worlds." },
            { code: "git fetch origin", text: "Gets all the latest news from the 'origin' castle." }
        ],
        realWorld: "This is a safe way to check for updates from your team. You `fetch` to see what they've done, then you can decide if you're ready to `merge` it.",
        imageUrl: "https://picsum.photos/seed/git-fetch/600/400",
        imageAlt: "A diagram showing new commits being downloaded from a remote repository to the local machine, but not yet integrated."
    },
    {
        category: "Sharing & Updating Projects",
        name: "git pull",
        description: "This is the 'get updates now' button! It does two things: it `fetches` the new changes from the remote world and immediately tries to `merge` them into your current timeline.",
        howItWorks: [
            "`git pull` is a shortcut for `git fetch` followed by `git merge`.",
            "`--rebase`: This is a popular alternative. It fetches and then does a `rebase` instead of a merge, keeping your history cleaner."
        ],
        examples: [
            { code: "git pull", text: "Updates your current branch with all the latest changes from the remote server." },
            { code: "git pull --rebase", text: "Updates your branch by neatly placing your work on top of the team's latest work." }
        ],
        realWorld: "This is what you do every morning when you start work to make sure you have the latest code from your team.",
        imageUrl: "https://picsum.photos/seed/git-pull/600/400",
        imageAlt: "A diagram showing git fetch and git merge happening in one git pull command."
    },
    {
        category: "Sharing & Updating Projects",
        name: "git push",
        description: "This command sends your saved-up changes from your computer up to the remote world (like GitHub) for everyone else to see.",
        howItWorks: [
            "`git push <remote> <branch>` sends your work to the right place.",
            "`-u` (set upstream): The first time you push a new branch, use this flag to link your local branch with the remote one. After that, you can just use `git push`.",
            "`--force`: A very dangerous spell! It forces your version of history onto the server, erasing whatever was there. Only use it if you're absolutely sure what you're doing."
        ],
        examples: [
            { code: "git push origin main", text: "Shares your local `main` timeline with the `origin` server." },
            { code: "git push -u origin my-new-feature", text: "Shares your new feature for the first time and links the branches." }
        ],
        realWorld: "This is how you share your work with your team. You finish a feature, push the branch, and then someone can review your code.",
        imageUrl: "https://picsum.photos/seed/git-push/600/400",
        imageAlt: "A diagram showing local commits being uploaded to a remote repository."
    },
    {
        category: "Inspection & Comparison",
        name: "git log",
        description: "This is your time-traveling history book. It shows you a list of all the 'save points' (commits) you've made, from newest to oldest.",
        howItWorks: [
            "`--oneline`: A magic spell that shrinks each save point to a single line.",
            "`--graph`: Draws cool lines to show how your different timelines (branches) have merged together.",
            "`--pretty=format:\"...\"`: Lets you design your own custom history view!"
        ],
        examples: [
            { code: "git log", text: "Shows a detailed history of every save." },
            { code: "git log --oneline --graph", text: "Shows a neat, one-line graph of your project's entire history." }
        ],
        realWorld: "You use `git log` to find out who changed a certain file, to see the progress of a project, or to find the ID of an old commit you want to revisit.",
        imageUrl: "https://picsum.photos/seed/git-log/600/400",
        imageAlt: "An illustration of the output of git log, showing a list of commits with hashes, authors, and messages."
    },
    {
        category: "Inspection & Comparison",
        name: "git diff",
        description: "This is your magic magnifying glass. It shows you the exact differences between two versions of your project. It's like a 'spot the difference' game for your code.",
        howItWorks: [
            "`git diff`: Shows what you've changed but haven't packed in your bag yet (haven't `add`ed).",
            "`--staged`: Shows what's in your bag, ready for the next save point.",
            "`git diff <branch1> <branch2>`: Shows you all the changes between two different timelines."
        ],
        examples: [
            { code: "git diff", text: "Shows all the edits you've made since your last save." },
            { code: "git diff --staged", text: "Lets you double-check what you're about to commit." },
            { code: "git diff main..my-feature", text: "Shows you all the work you did on your feature branch." }
        ],
        realWorld: "Absolutely essential for reviewing your work before you save it. It helps you catch mistakes and write better commit messages.",
        imageUrl: "https://picsum.photos/seed/git-diff/600/400",
        imageAlt: "An illustration showing the textual differences between two files, with lines added and removed."
    },
    {
        category: "Advanced",
        name: "git reset",
        description: "The 'Time-Turner'. This powerful and risky spell lets you travel back in time, changing your history. It has different levels of power.",
        howItWorks: [
            "`--soft`: You travel back, but you keep all your changes and your backpack is still packed (staged). You can make a new save from here.",
            "`--mixed` (default): You travel back, and all your changes are unpacked from your bag and are now just lying on the floor (unstaged).",
            "`--hard`: **EXTREMELY DANGEROUS!** You travel back and a tidal wave washes away all your recent work (staged and unstaged changes are destroyed forever). Only use this if you want to completely erase mistakes."
        ],
        examples: [
            { code: 'git reset HEAD~1', text: "Undoes your last commit, but leaves your changed files as-is. Good for fixing a mistaken commit." },
            { code: "git reset --hard a1b2c3d4", text: "Destroys all your current work and makes your project folder look exactly like it did at the old save point `a1b2c3d4`. Be careful!" }
        ],
        realWorld: "Mostly used to 'un-stage' a file (`git reset <file>`). `reset --hard` is for when you've made a huge mess and want to start over from your last good save point.",
        imageUrl: "https://picsum.photos/seed/git-reset/600/400",
        imageAlt: "A diagram showing the HEAD pointer moving back to a previous commit, with options for soft, mixed, and hard resets."
    },
    {
        category: "Advanced",
        name: "git revert",
        description: "The 'Safe Undo'. Instead of destroying the past, `revert` creates a *new* save point that does the exact opposite of an old one. It's a much safer way to undo changes on a team project.",
        howItWorks: [
            "It doesn't delete history. It adds to it.",
            "If an old commit added a line of code, the `revert` commit will remove that line.",
            "This is safe for shared timelines because it doesn't rewrite the history that your teammates already have."
        ],
        examples: [
            { code: "git revert HEAD", text: "Creates a new save point that undoes whatever you did in your very last one." },
            { code: "git revert a1b2c3d4", text: "Finds the old save point `a1b2c3d4` and creates a new one that reverses all its changes." }
        ],
        realWorld: "If a bug was accidentally sent to the main project, you would use `revert` to create a new commit that fixes it. The history clearly shows the mistake and the fix.",
        imageUrl: "https://picsum.photos/seed/git-revert/600/400",
        imageAlt: "A diagram showing a new commit being created that undoes the changes from a previous commit."
    },
    {
        category: "Advanced",
        name: "git stash",
        description: "The 'Pocket Dimension'. It lets you magically save your unfinished work without making a messy commit. Perfect for when you're interrupted with an urgent task.",
        howItWorks: [
            "`git stash`: Hides all your current changes in a secret pocket, leaving your project clean.",
            "You can then switch timelines, fix a bug, and make a clean save.",
            "`git stash pop`: When you return, this command pulls your work back out of the pocket dimension so you can continue where you left off."
        ],
        examples: [
            { code: 'git stash', text: "Hides your current work." },
            { code: 'git stash save "Working on the new user profile page"', text: "Hides your work with a reminder of what you were doing." },
            { code: 'git stash pop', text: "Brings your work back out of hiding." }
        ],
        realWorld: "A daily tool for every developer. You're in the middle of a big feature when a tiny bug is reported. You `stash` your work, switch branches, fix the bug, commit, switch back, and `stash pop`. Genius!",
        imageUrl: "https://picsum.photos/seed/git-stash/600/400",
        imageAlt: "A diagram showing changes from the working directory being saved to a stash, and then being reapplied later."
    },
    {
        category: "Advanced",
        name: "git tag",
        description: "The 'Bookmark'. A tag lets you put a permanent marker on a specific save point in your history, usually to mark a version release like `v1.0`.",
        howItWorks: [
            "A tag is a special pointer that doesn't move.",
            "`git tag v1.0`: Creates a simple bookmark.",
            "`git tag -a v1.0 -m \"Version 1.0 Release\"`: Creates a fancy, annotated bookmark with a message and author details. This is the best practice."
        ],
        examples: [
            { code: 'git tag -a v2.5 -m "Released version 2.5 with new features"', text: "Creates an official, annotated tag for a major release." },
            { code: 'git push origin --tags', text: "You have to push tags separately to share your bookmarks with the team." }
        ],
        realWorld: "Every time a company releases a new version of their software, they create a tag. This allows anyone to go back and see the exact state of the code for that release.",
        imageUrl: "https://picsum.photos/seed/git-tag/600/400",
        imageAlt: "A diagram showing a 'v1.0' tag pointing to a specific commit in the project history."
    },
    {
        category: "Advanced",
        name: "git cherry-pick",
        description: "The 'Commit Teleporter'. This lets you grab a single save point from one timeline and copy-paste it onto another timeline.",
        howItWorks: [
            "You find the unique ID (hash) of the commit you want from another branch (using `git log`).",
            "You `checkout` your own branch.",
            "You run `git cherry-pick <commit-hash>` to pluck that one specific change and apply it to your timeline."
        ],
        examples: [
            { code: "git cherry-pick a1b2c3d4", text: "Copies the changes from the commit `a1b2c3d4` and applies them to your current branch." }
        ],
        realWorld: "A critical bug is fixed on the main development branch, but that fix is also needed on the old, stable version of the software. You can `cherry-pick` just that one bug-fix commit over to the stable branch without bringing any other new features with it.",
        imageUrl: "https://picsum.photos/seed/git-cherry-pick/600/400",
        imageAlt: "A diagram showing a single commit from one branch being copied and applied to another branch."
    }
];
