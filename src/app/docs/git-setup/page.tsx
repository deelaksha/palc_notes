
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { TableOfContents } from '@/components/toc/TableOfContents';

const gitSetupMarkdownContent = `
# 🚀 Git Setup Guide on Ubuntu

This guide explains how to install Git, configure it, generate SSH keys, and connect it to a remote repository like GitHub. Follow these steps from start to finish to get your Git environment ready.

---

## ✨ Step 1 – Install Git

First, we need to update our system's package list to make sure we get the latest version of Git. Then, we install it.

1.  **Update your packages**:
    <CodeBlock>sudo apt update</CodeBlock>
    This command synchronizes your package list with the software sources.

2.  **Install Git**:
    <CodeBlock>sudo apt install git</CodeBlock>
    This downloads and installs the Git software package.

3.  **Verify the installation**:
    <CodeBlock>git --version</CodeBlock>
    If the installation was successful, this will print the installed Git version (e.g., \`git version 2.34.1\`).

---

## ✨ Step 2 – Configure Git User

Now, you need to tell Git who you are. This information will be attached to every commit you make.

1.  **Set your name**:
    <CodeBlock>git config --global user.name "Your Name"</CodeBlock>
    Replace "Your Name" with your actual name. This is how you will be identified as the author of your commits.

2.  **Set your email**:
    <CodeBlock>git config --global user.email "your.email@example.com"</CodeBlock>
    Replace this with the email address you want to associate with your commits (ideally the same one you use for GitHub or GitLab).

3.  **Check your configuration**:
    <CodeBlock>git config --list</CodeBlock>
    This command shows all your Git configuration settings. You can scroll through to verify that your \`user.name\` and \`user.email\` are set correctly.

---

## ✨ Step 3 – Generate an SSH Key

An SSH key is like a secure, digital password that allows your computer to communicate with services like GitHub without you having to type your password every time. It's more secure and convenient.

1.  **Run the key generation command**:
    We recommend using the modern and secure **Ed25519** algorithm.
    <CodeBlock>ssh-keygen -t ed25519 -C "your.email@example.com"</CodeBlock>
    Alternatively, for older systems, you can use **RSA**:
    <CodeBlock>ssh-keygen -t rsa -b 4096 -C "your.email@example.com"</CodeBlock>

2.  **Save the key**:
    When it asks "Enter a file in which to save the key," just press **Enter** to accept the default location (\`~/.ssh/id_ed25519\`).

3.  **Set a passphrase (optional but recommended)**:
    When prompted, you can enter a secure passphrase. This adds an extra layer of security. If someone gains access to your computer, they still won't be able to use your SSH key without the passphrase.

---

## ✨ Step 4 – Add SSH Key to the SSH Agent

The SSH agent is a background program that securely holds your private key and passphrase, so you don't have to re-enter it constantly.

1.  **Start the agent**:
    <CodeBlock>eval "$(ssh-agent -s)"</CodeBlock>
    This command starts the agent if it's not already running.

2.  **Add your key to the agent**:
    <CodeBlock>ssh-add ~/.ssh/id_ed25519</CodeBlock>
    If you created an RSA key, the filename would be \`id_rsa\`. If you set a passphrase, you will be prompted to enter it here.

---

## ✨ Step 5 – Add SSH Key to Your Git Hosting Service

Now you need to give your public SSH key to your Git hosting service (like GitHub, GitLab, or Bitbucket).

1.  **Copy the public key**:
    <CodeBlock>cat ~/.ssh/id_ed25519.pub</CodeBlock>
    This command displays your public key. The output will be a long string of characters starting with \`ssh-ed25519...\`. Select and copy this entire string.

2.  **Add the key to your account**:
    - Go to your Git hosting service's website (e.g., GitHub).
    - Navigate to **Settings > SSH and GPG keys**.
    - Click **"New SSH key"** or **"Add SSH key"**.
    - Give it a descriptive title (e.g., "My Ubuntu Laptop").
    - Paste the copied key into the "Key" field and save it.

---

## ✨ Step 6 – Initialize a Git Repository

Now let's create a project and make our first commit.

1.  **Navigate to your project directory**:
    <CodeBlock>cd /path/to/your/project</CodeBlock>
    Replace this with the actual path to your project folder.

2.  **Initialize Git**:
    <CodeBlock>git init</CodeBlock>
    This turns your project folder into a Git repository.

3.  **Add files to staging**:
    <CodeBlock>git add .</CodeBlock>
    This stages all files in the current directory for the first commit.

4.  **Make the initial commit**:
    <CodeBlock>git commit -m "Initial commit"</CodeBlock>

---

## ✨ Step 7 – Connect to a Remote Repository

Now, connect your local Git repository to the remote one you created on GitHub.

1.  **Add the remote**:
    Go to your repository page on GitHub and copy the SSH URL. It will look like \`git@github.com:username/repository.git\`.
    <CodeBlock>git remote add origin git@github.com:username/repository.git</CodeBlock>
    This command creates a connection named \`origin\` pointing to your remote repository.

2.  **Push your changes**:
    <CodeBlock>git push -u origin main</CodeBlock>
    This sends your "Initial commit" to GitHub. If your default branch is named \`master\`, use \`git push -u origin master\` instead.

---

## ✨ Step 8 – Test the SSH Connection

Let's make sure your computer can successfully authenticate with GitHub.

1.  **Run the test command**:
    <CodeBlock>ssh -T git@github.com</CodeBlock>

2.  **Check the output**:
    You should see a message like: \`Hi username! You've successfully authenticated, but GitHub does not provide shell access.\` This means everything is working perfectly!

---

## 💡 Additional Tips

- **Secure Your Keys**: Your \`~/.ssh\` directory, especially your private key (\`id_ed25519\`), should be kept secret. Ensure its permissions are restrictive (\`chmod 700 ~/.ssh\` and \`chmod 600 ~/.ssh/id_ed25519\`).
- **Multiple Keys**: You can use different SSH keys for different services (e.g., one for work, one for personal projects) by creating a config file at \`~/.ssh/config\`.
- **SSH Agent on Startup**: To avoid running \`ssh-agent\` on every terminal start, you can add it to your shell's startup file (like \`~/.bashrc\` or \`~/.zshrc\`).

You are now fully set up to use Git and SSH on Ubuntu!
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
