
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { TableOfContents } from '@/components/toc/TableOfContents';

const gitSetupMarkdownContent = `
# 🚀 Git Setup: Your Coding Time Machine!

Welcome, adventurer! This guide will help you set up Git, a powerful time machine for your code. It lets you save your progress, go back to previous versions, and work with others without messing up anyone's work. Let's get your time machine powered up!

---

## ✨ Step 1 – Install the Time Machine (Git)

First, we need to install the Git software on your computer.

1.  **Update Your Computer's App Store List**:
    <CodeBlock>sudo apt update</CodeBlock>
    This command tells your computer to get the latest list of available software, like updating an app store catalog.

2.  **Install Git**:
    <CodeBlock>sudo apt install git</CodeBlock>
    This downloads and installs the Git program.

3.  **Check if it Worked**:
    <CodeBlock>git --version</CodeBlock>
    If you see something like \`git version 2.34.1\`, it means your time machine is installed and ready!

---

## ✨ Step 2 – Create Your Time Traveler ID

Every time you save your work (a "commit"), Git stamps your name on it. You need to tell Git who you are.

1.  **Set Your Name**:
    <CodeBlock>git config --global user.name "Your Name"</CodeBlock>
    Replace "Your Name" with your actual name. This is your official Time Traveler name.

2.  **Set Your Email**:
    <CodeBlock>git config --global user.email "your.email@example.com"</CodeBlock>
    Replace this with your email. This is how others can contact you about your work.

3.  **Check Your ID Card**:
    <CodeBlock>git config --list</CodeBlock>
    This shows your Git settings. Make sure your name and email are correct!

---

## ✨ Step 3 – Get Your Secret Key (SSH)

An SSH key is like a secret, unbreakable key to your online code castles (like GitHub). It proves you are who you say you are, so you don't have to type your password every time.

1.  **Create the Key**: We'll use a modern, super-secure key type.
    <CodeBlock>ssh-keygen -t ed25519 -C "your.email@example.com"</CodeBlock>

2.  **Where to Save It?**: The computer will ask where to save the key. Just press **Enter** to accept the default spot. It will be hidden in a folder called \`.ssh\`.

3.  **Create a Password for Your Key (Optional)**:
    It will ask for a "passphrase." This is a password for your secret key itself. It's an extra layer of security. It's a good idea to add one!

---

## ✨ Step 4 – Put the Key in Your Keychain (SSH Agent)

The SSH agent is a little helper program that holds onto your secret key so you don't have to enter your passphrase all the time.

1.  **Start the Keychain Helper**:
    <CodeBlock>eval "$(ssh-agent -s)"</CodeBlock>
    This command wakes up the agent.

2.  **Add Your Key to the Keychain**:
    <CodeBlock>ssh-add ~/.ssh/id_ed25519</CodeBlock>
    This adds your newly created secret key to the agent. If you set a passphrase, it will ask you for it now.

---

## ✨ Step 5 – Give Your Public Key to GitHub

Your secret key has two parts: a private key (which you NEVER share) and a public key (which you give to websites like GitHub).

1.  **Copy Your Public Key**:
    <CodeBlock>cat ~/.ssh/id_ed25519.pub</CodeBlock>
    This command displays your public key. It's a long string of random-looking characters. Copy the entire thing.

2.  **Add it to GitHub**:
    - Go to GitHub.com.
    - Click your profile picture in the top-right, then go to **Settings**.
    - In the menu on the left, click **"SSH and GPG keys"**.
    - Click **"New SSH key"**.
    - Give it a **Title** (like "My Laptop").
    - Paste your copied public key into the big "Key" box and click **"Add SSH key"**.

---

## ✨ Step 6 – Create Your First Time Capsule (Repository)

Let's start a new project and save our first moment in time.

1.  **Go to Your Project Folder**:
    <CodeBlock>cd /path/to/your/project</CodeBlock>

2.  **Turn on the Time Machine**:
    <CodeBlock>git init</CodeBlock>
    This creates a hidden \`.git\` folder where all the time travel magic happens.

3.  **Pack Your Bags (Add Files)**:
    <CodeBlock>git add .</CodeBlock>
    This tells Git, "Get ready to save everything in this folder."

4.  **Take the Snapshot (Commit)**:
    <CodeBlock>git commit -m "Initial commit"</CodeBlock>
    This saves your first snapshot with a message describing what you did.

---

## ✨ Step 7 – Connect to Your Online Castle (Remote)

Now, let's connect your local project to the one on GitHub.

1.  **Tell Git Where Your Castle Is**:
    On your GitHub repository page, click the "Code" button and copy the SSH URL. It will look like \`git@github.com:username/repository.git\`.
    <CodeBlock>git remote add origin git@github.com:username/repository.git</CodeBlock>
    This creates a shortcut named \`origin\` that points to your online repository.

2.  **Send Your First Snapshot Up**:
    <CodeBlock>git push -u origin main</CodeBlock>
    This "pushes" your saved changes up to GitHub for the first time.

---

## ✨ Step 8 – Test Your Secret Key Connection

Let's make sure your computer can talk to GitHub securely.

1.  **Run the Test**:
    <CodeBlock>ssh -T git@github.com</CodeBlock>

2.  **Check the Message**:
    You should see a message like: \`Hi username! You've successfully authenticated...\` This means your secret key is working perfectly!

---

## 💡 Pro Tips

- **Keep Your Keys Safe**: Never, ever share your private key (\`id_ed25519\`). It's the key to all your code castles!
- **One Key, Many Castles**: You can use the same SSH key for GitHub, GitLab, and other services.
- **Automate the Agent**: You can configure your computer to start the \`ssh-agent\` automatically every time you open a terminal, so you don't have to do it manually.

You are now a certified Git Time Traveler, ready to code without fear!
`;

export default function GitSetupPage() {
    return (
        <div className="flex">
            <main className="flex-1 py-8 px-4 md:px-8 lg:px-12 markdown-content">
                <MarkdownRenderer markdown={gitSetupMarkdownContent} />
            </main>
            <aside className="hidden lg:block w-80 p-8">
                <div className="sticky top-20">
                    <TableOfContents content={gitSetupMarkdownContent} />
                </div>
            </aside>
        </div>
    );
}
