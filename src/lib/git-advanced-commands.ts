
export const gitAdvancedCommandsData = [
    {
        category: "History Manipulation",
        name: "git rebase -i",
        description: "The 'Time-Traveling Editor'. It lets you rewrite your recent commit history, allowing you to combine, edit, or reorder commits before sharing them.",
        howItWorks: [
            "Think of your commits as a stack of drawings. `rebase -i` (interactive) lets you look at the last few drawings and decide what to do with them.",
            "You run `git rebase -i HEAD~3` to edit the last 3 commits.",
            "An editor opens with a list of commits and actions you can perform on each one:",
            "`pick`: Use the commit as is.",
            "`reword`: Change the commit's message.",
            "`squash`: Combine this commit with the one before it into a single commit. You get to write a new message for the combined commit.",
            "`fixup`: Like `squash`, but it discards this commit's message entirely.",
            "`edit`: Stop at this commit to make changes, like splitting it into multiple commits.",
            "You change the words in the file, save it, and Git does the rest!"
        ],
        examples: [
            { code: 'git rebase -i HEAD~3', text: "Opens an interactive session to edit the last 3 commits." },
            { code: '# In the interactive editor, change `pick` to `squash` for a commit', text: "This will combine the commit with the one above it." }
        ],
        realWorld: "Before you finish a feature, your history might be messy with commits like 'oops, typo' and 'trying something'. You use interactive rebase to clean it all up into a few logical commits like 'Add user login feature' and 'Style login page'. This makes your work much easier for others to understand."
    },
    {
        category: "History Manipulation",
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
    },
    {
        category: "Recovery and Inspection",
        name: "git reflog",
        description: "Your 'Safety Net'. It shows a log of everywhere `HEAD` (your current position) has been. It's a lifesaver if you think you've lost work or a commit.",
        howItWorks: [
            "Git secretly keeps a private diary of all your moves: every commit, every checkout, every rebase.",
            "Unlike `git log`, which shows the public history, `reflog` shows your personal journey.",
            "If you accidentally delete a branch or mess up a rebase, the commits aren't truly gone. They are just 'orphaned'.",
            "`git reflog` shows you the history of these orphans, and you can find the commit hash from before you made the mistake and restore it using `git branch <new-branch-name> <hash>` or `git reset --hard <hash>`."
        ],
        examples: [
            { code: "git reflog", text: "Shows a detailed list of all your recent actions." },
            { code: "git reset --hard HEAD@{2}", text: "Turns back the clock to whatever your state was two moves ago, as shown in the reflog." }
        ],
        realWorld: "You run `git reset --hard` and accidentally wipe out your last three commits. You panic! But then you remember `git reflog`. You run it, find the hash of the commit you were on just before the reset, and run `git reset --hard <commit-hash>` to get all your work back. It's a true 'undo' button for Git disasters."
    },
    {
        category: "Recovery and Inspection",
        name: "git bisect",
        description: "The 'Automated Bug Detective'. It helps you find the exact commit that introduced a bug by performing an automatic binary search through your commit history.",
        howItWorks: [
            "You tell Git, 'The bug is here now, but it wasn't here back at this old commit.'",
            "1. Start the detective work: `git bisect start`",
            "2. Tell it about a commit where the bug exists: `git bisect bad` (usually the current commit, `HEAD`).",
            "3. Tell it about a commit where everything was fine: `git bisect good <commit-hash-or-tag>`.",
            "Git will then automatically jump to a commit in the middle. You test for the bug. If the bug is there, you type `git bisect bad`. If it's not, you type `git bisect good`.",
            "Git keeps jumping to the middle of the remaining range, cutting the search in half each time, until it pinpoints the exact commit where the bug first appeared."
        ],
        examples: [
            { code: "git bisect start", text: "Starts the bisect process." },
            { code: "git bisect bad HEAD", text: "Marks the current commit as having the bug." },
            { code: "git bisect good v1.2.0", text: "Marks version `1.2.0` as being bug-free." },
            { code: "git bisect reset", text: "Ends the bisect session and returns you to your original branch." }
        ],
        realWorld: "Your website was working perfectly last week, but today you find a major bug. You have hundreds of commits between then and now. Instead of checking them one by one, you use `git bisect` to find the culprit in just a handful of steps, saving hours of tedious work."
    },
    {
        category: "Working Directory Management",
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
        category: "Tagging and Releasing",
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
    }
];
