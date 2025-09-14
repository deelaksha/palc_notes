
export const gitCommandsData = [
    {
        category: "Setup and Configuration",
        name: "git config",
        description: "Configures your Git installation. You can set user information, preferences, and define aliases.",
        howItWorks: [
            "Git stores configuration in three different files: system, global, and local.",
            "`--global`: Applies settings to all repositories for the current user. Stored in `~/.gitconfig`.",
            "`--local`: Applies settings to the current repository only. Stored in `.git/config` within the repository. This is the default.",
            "`--system`: Applies settings to all users on the system. Stored in `/etc/gitconfig`.",
            "`user.name`: Sets the name that will be attached to your commits.",
            "`user.email`: Sets the email that will be attached to your commits.",
            "`alias.<alias-name>`: Creates a shortcut for a longer Git command."
        ],
        examples: [
            { code: 'git config --global user.name "John Doe"', text: "Sets the global username for all your projects." },
            { code: 'git config --global user.email "johndoe@example.com"', text: "Sets the global email for all your projects." },
            { code: 'git config --global alias.co checkout', text: "Creates an alias `git co` for `git checkout`." },
            { code: 'git config --local core.ignorecase false', text: "Makes filenames case-sensitive for this repository only." }
        ],
        realWorld: "This is the very first command you should run after installing Git to set up your identity. Setting global aliases for frequently used commands can significantly speed up your workflow."
    },
    {
        category: "Getting & Creating Projects",
        name: "git init",
        description: "Initializes a new, empty Git repository or reinitializes an existing one. It's like creating a new, empty photo album before you start taking pictures.",
        howItWorks: [
            "Running `git init` in a directory creates a new hidden subdirectory named `.git`.",
            "The `.git` directory contains all the necessary repository files — a Git repository skeleton.",
            "No files in your project are tracked yet. You need to use `git add` to start tracking them."
        ],
        examples: [
            { code: "git init", text: "Turns the current directory into a Git repository." },
            { code: "git init my-new-project", text: "Creates a new directory named `my-new-project` and initializes a Git repository inside it." }
        ],
        realWorld: "This is the starting point for any new project that you want to place under version control."
    },
    {
        category: "Getting & Creating Projects",
        name: "git clone",
        description: "Creates a local copy of a remote repository that already exists. It's like borrowing a book from a library to read on your own computer.",
        howItWorks: [
            "`git clone <url>`: Copies the entire history of the repository from the given URL.",
            "The URL can be HTTPS (`https://...`) or SSH (`git@...`).",
            "It automatically creates a remote connection named `origin` pointing back to the original URL, which makes it easy to pull updates and push changes.",
            "It also checks out a default branch (usually `main` or `master`) for you."
        ],
        examples: [
            { code: "git clone https://github.com/user/repo.git", text: "Clones a public repository from GitHub." },
            { code: "git clone git@github.com:user/repo.git my-app", text: "Clones a repository using SSH and renames the local folder to `my-app`." }
        ],
        realWorld: "This is the most common way to start working on a project that's already hosted on a platform like GitHub, GitLab, or Bitbucket."
    },
    {
        category: "Basic Snapshotting",
        name: "git add",
        description: "Adds file contents to the staging area (also known as the 'index') for the next commit. Think of it like putting items in a box before you ship them.",
        howItWorks: [
            "Git doesn't automatically include changes in a commit. You must first 'stage' them with `git add`.",
            "This allows you to be selective about what changes you include in each commit, leading to more organized and atomic commits.",
            "`git add <file>`: Stages a specific file.",
            "`git add .`: Stages all new and modified files in the current directory and subdirectories.",
            "`-p` or `--patch`: Allows you to interactively review and stage parts of a file (hunks) instead of the whole file."
        ],
        examples: [
            { code: "git add index.html", text: "Stages the `index.html` file." },
            { code: "git add .", text: "Stages all changes in the current directory tree." },
            { code: "git add -p style.css", text: "Begins an interactive staging session for `style.css`." }
        ],
        realWorld: "You use `git add` right before every `git commit` to prepare your snapshot of changes."
    },
    {
        category: "Basic Snapshotting",
        name: "git commit",
        description: "Records the staged changes to the repository's history. It's like taking a photo of your project at a specific moment.",
        howItWorks: [
            "A commit is a snapshot of your staged files at a point in time. Each commit has a unique ID and a message.",
            "`-m \"<message>\"`: Allows you to provide a commit message directly on the command line. This is the most common way to commit.",
            "`-a`: Automatically stages all tracked, modified files before committing. This is a shortcut for `git add` on already tracked files, but it won't stage new (untracked) files.",
            "`--amend`: Modifies the most recent commit. You can change the commit message or add more staged changes to it. Useful for fixing typos or mistakes."
        ],
        examples: [
            { code: 'git commit -m "Add user login functionality"', text: "Commits the staged changes with a descriptive message." },
            { code: 'git commit -am "Fix typo in header"', text: "Stages all modified tracked files and commits them." },
            { code: 'git commit --amend -m "A better commit message"', text: "Replaces the last commit with a new one that has a corrected message." }
        ],
        realWorld: "Committing is the core action of saving your work in Git. You do it every time you complete a logical unit of work."
    },
    {
        category: "Basic Snapshotting",
        name: "git status",
        description: "Displays the state of the working directory and the staging area. It's like asking Git, 'What's happening right now?'",
        howItWorks: [
            "It shows which files are staged, which are modified but not staged, and which are untracked.",
            "It provides helpful hints on what Git commands to use next.",
            "`-s` or `--short`: Gives a much more compact output, useful for a quick overview."
        ],
        examples: [
            { code: "git status", text: "Shows a detailed status of your repository." },
            { code: "git status -s", text: "Shows a short, two-column status output. `M` for modified, `??` for untracked, `A` for added to stage, etc." }
        ],
        realWorld: "This is one of the most frequently used Git commands. You use it constantly to check the current state of your project and see what you need to commit."
    },
    {
        category: "Branching & Merging",
        name: "git branch",
        description: "Lists, creates, or deletes branches. Think of a branch as a separate timeline for your project.",
        howItWorks: [
            "`git branch`: Lists all local branches and highlights the current one.",
            "`git branch <branch-name>`: Creates a new branch pointing to the current commit, but does not switch to it.",
            "`-d <branch-name>`: Deletes a branch. Git will prevent you from deleting a branch that has not been fully merged.",
            "`-D <branch-name>`: Forces the deletion of a branch, even if it hasn't been merged.",
            "`-a`: Lists all branches, both local and remote-tracking."
        ],
        examples: [
            { code: "git branch", text: "Shows you all your local branches." },
            { code: "git branch new-feature", text: "Creates a new branch called `new-feature`." },
            { code: "git branch -d old-feature", text: "Deletes the `old-feature` branch after it has been merged." }
        ],
        realWorld: "Branching is a core concept in Git. You create new branches to work on new features or bug fixes in isolation without disturbing the main codebase."
    },
    {
        category: "Branching & Merging",
        name: "git checkout",
        description: "Switches branches or restores working tree files. It's like changing the channel to work on a different timeline.",
        howItWorks: [
            "`git checkout <branch-name>`: Switches your working directory to the state of the specified branch.",
            "`-b <new-branch-name>`: Creates a new branch and immediately switches to it. This is a very common shortcut for `git branch <name>` followed by `git checkout <name>`.",
            "`git checkout -- <file>`: Discards changes in a specific file in your working directory, restoring it to the version from the last commit."
        ],
        examples: [
            { code: "git checkout new-feature", text: "Switches to the `new-feature` branch." },
            { code: 'git checkout -b bug-fix', text: "Creates a new branch named `bug-fix` and switches to it." },
            { code: "git checkout -- style.css", text: "Reverts any uncommitted changes you made to `style.css`." }
        ],
        realWorld: "You use `checkout` every time you need to switch contexts, whether it's to start a new feature, fix a bug, or review a colleague's work."
    },
    {
        category: "Branching & Merging",
        name: "git merge",
        description: "Joins two or more development histories (branches) together. It's like taking two different story timelines and combining them into one.",
        howItWorks: [
            "First, `checkout` the branch you want to merge changes *into* (e.g., `main`).",
            "Then run `git merge <branch-to-merge-from>` (e.g., `git merge new-feature`).",
            "Git will try to automatically combine the histories. If both branches changed the same part of the same file, it results in a 'merge conflict' that you must resolve manually.",
            "`--no-ff`: Prevents a 'fast-forward' merge. This creates a merge commit even if one is not strictly necessary, preserving the historical fact that a feature branch once existed."
        ],
        examples: [
            { code: "git merge new-feature", text: "Merges the `new-feature` branch into your current branch." },
            { code: "git merge --no-ff feature-branch", text: "Merges `feature-branch` and creates an explicit merge commit." }
        ],
        realWorld: "This is how you integrate a completed feature or bug fix from a separate branch back into your main line of development."
    },
    {
        category: "Branching & Merging",
        name: "git rebase",
        description: "Re-applies commits from one branch on top of another branch. It's like re-telling your story based on a new starting point, making the history cleaner.",
        howItWorks: [
            "Rebase rewrites the project history by creating brand new commits for each commit in the original branch.",
            "The main benefit is a cleaner, more linear project history compared to merge commits.",
            "`git rebase <base-branch>`: While on your feature branch, this command takes all your commits and re-plays them on top of the latest commit from `<base-branch>` (e.g., `main`).",
            "`-i` or `--interactive`: Allows you to edit, squash (combine), reword, or reorder commits as they are being rebased. This is extremely powerful for cleaning up a messy history before merging."
        ],
        examples: [
            { code: "git rebase main", text: "While on a feature branch, updates it with the latest changes from `main`." },
            { code: "git rebase -i HEAD~3", text: "Starts an interactive rebase session for the last 3 commits." }
        ],
        realWorld: "Often used by developers to keep their feature branches up-to-date with the main branch, resulting in a cleaner history when the feature is finally merged. **Warning:** Never rebase a branch that has already been pushed and is being used by others, as it rewrites history."
    },
    {
        category: "Sharing & Updating Projects",
        name: "git remote",
        description: "Manages the set of remote repositories whose branches you track. A 'remote' is like a nickname for a project's URL.",
        howItWorks: [
            "A 'remote' is a nickname for a URL of a repository. The default name is `origin`.",
            "`git remote`: Lists the shortnames of your remotes (e.g., `origin`).",
            "`git remote -v`: Lists the shortnames and their corresponding URLs.",
            "`git remote add <name> <url>`: Adds a new remote connection.",
            "`git remote remove <name>`: Removes a remote connection."
        ],
        examples: [
            { code: "git remote -v", text: "Shows the URLs that your local repository is connected to." },
            { code: "git remote add upstream https://github.com/original-creator/repo.git", text: "Adds a new remote named `upstream` to track the original project you forked from." }
        ],
        realWorld: "When you fork a project, you'll have an `origin` remote pointing to your fork. You would add an `upstream` remote to fetch updates from the original project and keep your fork in sync."
    },
    {
        category: "Sharing & Updating Projects",
        name: "git fetch",
        description: "Downloads commits, files, and refs from a remote repository into your local repo, but does not merge them. It's like getting the latest mail, but leaving it in the mailbox to read later.",
        howItWorks: [
            "It downloads the data from the remote repository but doesn't change your local working directory.",
            "This gives you a chance to review the changes before integrating them into your local branches.",
            "`git fetch origin`: Fetches all branches from the 'origin' remote.",
            "`--prune`: Removes any remote-tracking branches that no longer exist on the remote."
        ],
        examples: [
            { code: "git fetch", text: "Fetches all updates from all your remotes." },
            { code: "git fetch origin main", text: "Fetches only the `main` branch from the `origin` remote." }
        ],
        realWorld: "This is a safe way to see what others have been working on without having those changes automatically merged into your own branches. You can then inspect the fetched branches (e.g., `origin/main`) and decide how to integrate them."
    },
    {
        category: "Sharing & Updating Projects",
        name: "git pull",
        description: "Fetches changes from a remote repository and then automatically merges them into your current branch. It's like `git fetch` and `git merge` in one command.",
        howItWorks: [
            "`git pull` is essentially a shortcut for `git fetch` followed by `git merge FETCH_HEAD`.",
            "`git pull origin main`: Fetches from the `main` branch on the `origin` remote and merges it into your current local branch.",
            "`--rebase`: Instead of merging, it performs a rebase. `git pull --rebase` is a shortcut for `git fetch` followed by `git rebase`."
        ],
        examples: [
            { code: "git pull", text: "Updates your current local branch with changes from its remote counterpart." },
            { code: "git pull --rebase", text: "Fetches remote changes and re-applies your local commits on top of them, avoiding a merge commit." }
        ],
        realWorld: "This is the command you use every day to keep your local repository up-to-date with the latest changes from your team."
    },
    {
        category: "Sharing & Updating Projects",
        name: "git push",
        description: "Uploads your local branch commits to a remote repository. It's how you share your work with others.",
        howItWorks: [
            "`git push <remote> <branch>`: Pushes the specified branch to the specified remote.",
            "`-u` or `--set-upstream`: Sets up a tracking relationship between your local branch and the remote branch. After the first push with `-u`, you can just use `git push` from that branch.",
            "`--force`: Forces the push. This can overwrite history on the remote and should be used with extreme caution. It's sometimes necessary when you've rebased a branch you previously pushed (and you're sure no one else has pulled it).",
            "`--tags`: Pushes all of your local tags to the remote."
        ],
        examples: [
            { code: "git push origin main", text: "Pushes your local `main` branch to the `origin` remote." },
            { code: "git push -u origin feature-branch", text: "Pushes `feature-branch` to `origin` and sets it up to track the remote branch." }
        ],
        realWorld: "This is how you share your completed work with your team. You push your feature branch to the remote repository so it can be reviewed and merged."
    },
    {
        category: "Inspection & Comparison",
        name: "git log",
        description: "Shows the commit history. It's like looking through the pages of a diary to see everything that's happened.",
        howItWorks: [
            "It displays a list of commits in reverse chronological order.",
            "`--oneline`: Condenses each commit to a single line, showing the commit hash and message.",
            "`--graph`: Displays a text-based graph of the commit history, showing branches and merges.",
            "`--pretty=format:\"...\"`: Allows for custom formatting of the output.",
            "`<branch1>..<branch2>`: Shows commits that are in `branch2` but not in `branch1`."
        ],
        examples: [
            { code: "git log", text: "Shows the detailed commit history." },
            { code: "git log --oneline --graph --decorate", text: "A popular combination for a concise, graphical view of the history." },
            { code: "git log -p -2", text: "Shows the last two commits and the changes (patches) introduced in each." }
        ],
        realWorld: "Used to explore the history of a project, understand how it has evolved, and find out when specific changes were introduced."
    },
    {
        category: "Inspection & Comparison",
        name: "git diff",
        description: "Shows the differences between commits, branches, or files. It's like playing 'spot the difference' with your code.",
        howItWorks: [
            "`git diff`: Shows unstaged changes in your working directory (what you've changed but not `git add`'ed).",
            "`--staged` or `--cached`: Shows changes that are staged but not yet committed (what you've `git add`'ed).",
            "`git diff <branch1> <branch2>`: Shows the differences between the tips of two branches.",
            "`git diff <commit1> <commit2>`: Shows changes between two specific commits."
        ],
        examples: [
            { code: "git diff", text: "Shows all the modifications you have not yet staged." },
            { code: "git diff --staged", text: "Shows the changes you have staged and are ready to commit." },
            { code: "git diff main..feature-branch", text: "Shows all the changes made on `feature-branch` since it diverged from `main`." }
        ],
        realWorld: "Crucial for reviewing your own work before committing, and for comparing different versions of your code to understand what has changed."
    },
    {
        category: "Advanced",
        name: "git reset",
        description: "The 'Time Machine'. It moves the current branch pointer to a different commit, optionally changing your files to match.",
        howItWorks: [
            "This command can un-stage files, un-commit changes, or completely reset your work to a previous state. It has three main modes:",
            "`--soft`: Moves the branch pointer but does NOT touch your staged files or your working directory. Your code stays as it is, but Git now thinks you are at an older commit.",
            "`--mixed` (default): Moves the branch pointer and unstages all your changes. Your code files are NOT changed, but you'll have to `git add` them again if you want to re-commit them.",
            "`--hard`: **DANGEROUS!** Moves the branch pointer and completely changes your staged files AND your working files to match the commit you reset to. Any uncommitted work will be lost forever."
        ],
        examples: [
            { code: 'git reset HEAD~1', text: "This is a `--mixed` reset by default. It 'un-commits' your last commit but leaves the changes in your working directory." },
            { code: 'git reset --soft HEAD~1', text: "Un-commits the last commit, but keeps all your changes staged, ready to be committed again." },
            { code: "git reset --hard a1b2c3d4", text: "Destroys all current changes and makes your project folder identical to how it was at commit `a1b2c3d4`. Use with caution!" }
        ],
        realWorld: "The most common use is `git reset <file>` to unstage a file you accidentally added. The most dangerous use is `git reset --hard` to throw away a series of bad commits and start over from a known good point. If you do this by mistake, `git reflog` is your only hope!"
    },
    {
        category: "Advanced",
        name: "git revert",
        description: "Creates a new commit that undoes the changes from a previous commit. It's a safe way to undo, because it doesn't change history.",
        howItWorks: [
            "`git revert` doesn't delete commits. Instead, it looks at the changes in an old commit and creates a *new* commit that does the exact opposite.",
            "If the old commit added a line, the revert commit will remove that line.",
            "This is safer than `git reset` for shared branches because it doesn't rewrite history that others may have already pulled."
        ],
        examples: [
            { code: "git revert HEAD", text: "Creates a new commit that undoes the changes of the very last commit." },
            { code: "git revert a1b2c3d4", text: "Creates a new commit that reverses the changes made in commit `a1b2c3d4`." }
        ],
        realWorld: "Imagine a bug was introduced in a commit that was pushed to the main branch. Instead of using `reset` and rewriting history for everyone, you would use `git revert` to create a new commit that fixes the bug by undoing the bad changes. The history remains intact and the fix is clear to everyone."
    },
    {
        category: "Advanced",
        name: "git stash",
        description: "The 'Magic Pocket'. It lets you temporarily save your current uncommitted changes so you can switch to another task, without having to make a messy, unfinished commit.",
        howItWorks: [
            "Imagine you are in the middle of working on a feature, but your boss asks for an urgent bug fix.",
            "`git stash`: Takes all your changes (both staged and unstaged) and puts them in a 'magic pocket', leaving your working directory clean (back to how it was at the last commit).",
            "You can then switch branches, fix the bug, and commit your fix.",
            "`git stash pop` or `git stash apply`: When you're ready to continue your feature, this command takes the changes out of the magic pocket and applies them back to your working directory.",
            "`git stash list`: Shows you all the things you've saved in your stash."
        ],
        examples: [
            { code: 'git stash', text: "Saves your current changes away." },
            { code: 'git stash save "working on new nav bar"', text: "Saves your changes with a descriptive message." },
            { code: 'git stash pop', text: "Applies the most recently stashed changes and removes them from the stash list." },
            { code: 'git stash apply', text: "Applies the stashed changes but keeps them in the stash list in case you need them again." }
        ],
        realWorld: "This is used daily. You're coding a new feature when you notice a small, unrelated bug. You `git stash` your work, switch branches, fix the bug, commit, switch back, and `git stash pop` to continue right where you left off. It keeps your commits clean and focused on one task at a time."
    },
    {
        category: "Advanced",
        name: "git tag",
        description: "A 'Bookmark' for Important Commits. It allows you to mark specific points in your history as being important, typically used for version releases like `v1.0`.",
        howItWorks: [
            "A tag is just a pointer to a specific commit. Unlike a branch, it doesn't move.",
            "`git tag <tag-name>`: Creates a simple, 'lightweight' tag at your current commit.",
            "`git tag -a <tag-name> -m \"<message>\"`: Creates an 'annotated' tag. This is better because it's stored as a full object in Git with a message, author, and date. It's like a fancy, official bookmark.",
            "By default, `git push` does not push tags. You have to push them explicitly."
        ],
        examples: [
            { code: 'git tag v1.0.0', text: "Creates a lightweight tag at the current commit." },
            { code: 'git tag -a v1.0.1 -m "Version 1.0.1 release"', text: "Creates an official, annotated tag for a new version." },
            { code: 'git push origin --tags', text: "Pushes all your local tags to the remote server so everyone can see them." }
        ],
        realWorld: "When a company releases a new version of their software, they create a tag for that commit (e.g., `v2.5.3`). This makes it easy for anyone to check out the exact code for that specific version in the future, even if hundreds of other commits have been added since."
    },
    {
        category: "Advanced",
        name: "git cherry-pick",
        description: "The 'Copy-Paste for Commits'. It lets you pick a single commit from one branch and apply it onto another branch.",
        howItWorks: [
            "Imagine one of your friends made a really cool drawing on their branch, but you don't want all their other drawings, just that one.",
            "First, you find the unique ID (hash) of the commit you want using `git log` on their branch.",
            "Then, you switch back to your branch (`git checkout my-branch`).",
            "Finally, you run `git cherry-pick <commit-hash>` to copy that one change over."
        ],
        examples: [
            { code: "git cherry-pick a1b2c3d4", text: "Applies the commit with the hash `a1b2c3d4` to your current branch." }
        ],
        realWorld: "Imagine a bug is fixed on the main development branch (`develop`), but you need that same fix *right now* on an older, stable version of the software that's live. You can `cherry-pick` just the bug-fix commit onto the stable branch without bringing over all the other new, unfinished features."
    }
];
