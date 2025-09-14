
import { CodeBlock } from '@/components/markdown/CodeBlock';

export default function GitSetupPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2 font-headline">
          The Git Quest
        </h1>
        <p className="text-lg text-muted-foreground">
          Your path to becoming a code champion!
        </p>
      </header>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
          Chapter 1: Forging Your Identity
        </h2>
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Before you can embark on your quest, you must introduce yourself to
            the Git world. This is like creating your hero's profile!
          </p>
          <ol className="list-none space-y-8">
            <li>
              <h3 className="text-2xl font-bold command-text mb-2">
                1. Set Your Hero's Name
              </h3>
              <p className="text-muted-foreground mb-4">
                This tells Git your name so all your achievements are properly
                credited.
              </p>
              <CodeBlock className="bg-code-bg text-code-text">
                <span className="command-text">git config</span>{' '}
                <span className="keyword-text">--global</span> <span className="command-text">user.name</span>{' '}
                <span className="label-text">"Your Name"</span>
              </CodeBlock>
              <div className="mt-4 p-4 rounded-xl bg-card-nested border-l-4 border-l-blue-400">
                <h4 className="text-xl font-bold text-foreground mb-2">
                  Breaking Down the Spell
                </h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    <span className="command-text font-bold">git config</span>:
                    The main spell. It lets you change your Git settings.
                  </li>
                  <li>
                    <span className="keyword-text font-bold">--global</span>: A
                    powerful tag. This tells Git to apply this setting to{' '}
                    <span className="italic">all</span> of your projects, not just
                    the current one.
                  </li>
                  <li>
                    <span className="label-text font-bold">"Your Name"</span>:
                    The value of the spell. This is the information you are
                    giving to Git.
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <h3 className="text-2xl font-bold command-text mb-2">
                2. Set Your Hero's Email
              </h3>
              <p className="text-muted-foreground mb-4">
                Your email is a unique identifier, like your hero ID, that Git
                uses to link your actions to your account.
              </p>
              <CodeBlock className="bg-code-bg text-code-text">
                <span className="command-text">git config --global user.email</span>{' '}
                <span className="label-text">"your.email@example.com"</span>
              </CodeBlock>
            </li>
          </ol>
          <div className="p-4 rounded-xl bg-card-nested border-l-4 border-l-yellow-400">
            <p>
              <span className="text-tips font-bold">Tips:</span> Always use the
              name and email you plan to use on platforms like GitHub to keep
              your profile consistent.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
          Chapter 2: Crafting Your Master Key (SSH)
        </h2>
        <div className="space-y-6">
          <p className="text-muted-foreground">
            This is your most important item! An SSH key is like a secret magic
            key that lets you connect to places like GitHub without needing a
            password every single time.
          </p>
          <ol className="list-decimal pl-5 space-y-8">
             <li>
                <h3 className="text-2xl font-bold command-text mb-2">Check for an Existing Key</h3>
                <p className="text-muted-foreground mb-4">Before forging a new key, check if you already have one! This command lists all the items in your magic <code>~/.ssh</code> bag.</p>
                <CodeBlock className="bg-code-bg text-code-text">
                    <span className="command-text">ls</span> <span className="keyword-text">-al</span> <span className="label-text">~/.ssh</span>
                </CodeBlock>
                <div className="mt-4 p-4 rounded-xl bg-card-nested border-l-4 border-l-blue-400">
                    <h4 className="text-xl font-bold text-foreground mb-2">Breaking Down the Spell</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li><span className="command-text font-bold">ls</span>: The <span className="keyword-text">list</span> command. This is the main action, telling your computer to show you all the items in a folder.</li>
                        <li><span className="keyword-text">-a</span>: The <span className="keyword-text">all</span> tag. This tells the command to show <strong>all</strong> files, including the hidden ones. Hidden files have names that start with a period, like <code>.ssh</code>, and they are usually kept secret from a normal view.</li>
                        <li><span className="keyword-text">-l</span>: The <span className="keyword-text">long</span> tag. This asks for a detailed, long-form list. Instead of just a list of names, you'll see extra information like file permissions, size, and creation date.</li>
                        <li><span className="label-text">~/.ssh</span>: This is the location of the magic bag you are looking inside. The <span className="keyword-text">~</span> is a shortcut for your hero's home directory.</li>
                    </ul>
                </div>
                <p className="text-muted-foreground mt-2">Look for files named <code className="font-code bg-code-bg keyword-text px-1 py-0.5 rounded-sm text-sm">id_ed25519.pub</code> or <code className="font-code bg-code-bg keyword-text px-1 py-0.5 rounded-sm text-sm">id_rsa.pub</code>. If you see one, you can skip to step 3!</p>
            </li>
            <li>
              <h3 className="text-2xl font-bold command-text mb-2">
                Generate the Master Key
              </h3>
              <p className="text-muted-foreground mb-4">
                Run this spell in your terminal. It will create a key pair: a private key (for you) and a public key (for others to know you by).
              </p>
              <CodeBlock className="bg-code-bg text-code-text">
                <span className="command-text">ssh-keygen</span>{' '}
                <span className="keyword-text">-t</span> <span className="label-text">ed25519</span>{' '}
                <span className="keyword-text">-C</span>{' '}
                <span className="label-text">"your.email@example.com"</span>
              </CodeBlock>
               <div className="mt-4 p-4 rounded-xl bg-card-nested border-l-4 border-l-blue-400">
                  <h4 className="text-xl font-bold text-white mb-2">Breaking Down the Spell</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li><span className="command-text font-bold">ssh-keygen</span>: The main spell. It's the command that creates your master SSH key.</li>
                      <li><span className="keyword-text font-bold">-t</span>: The <span className="keyword-text">type</span> tag. This tells the spell what kind of key to create. We use `ed25519` because it's a strong and secure type of key.</li>
                      <li><span className="keyword-text font-bold">-C</span>: The <span className="keyword-text">comment</span> tag. This lets you add a helpful note to your key, usually your email address, to remind you who it belongs to.</li>
                  </ul>
              </div>
            </li>
            <li>
              <h3 className="text-2xl font-bold command-text mb-2">
                Add the Key to GitHub
              </h3>
              <p className="text-muted-foreground mb-4">
                Now, you must deliver the public part of your key to the GitHub Citadel so it recognizes you.
              </p>
              <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                <li>
                  First, reveal your public key's contents with this command:
                  <CodeBlock className="bg-code-bg text-code-text mt-2">
                    <span className="command-text">cat</span>{' '}
                    <span className="label-text">~/.ssh/id_ed25519.pub</span>
                  </CodeBlock>
                   <div className="mt-4 p-4 rounded-xl bg-card-nested border-l-4 border-l-blue-400">
                        <h4 className="text-xl font-bold text-white mb-2">Breaking Down the Spell</h4>
                        <p className="text-muted-foreground"><span className="command-text font-bold">cat</span>: This is a powerful spell that will display the contents of a file directly in your terminal. We use it to view the public part of your new key so you can copy it.</p>
                    </div>
                </li>
                <li>
                  Next, copy the entire key that appears in your terminal.
                </li>
                <li>
                  Go to your GitHub <span className="keyword-text">Settings</span> {'>'}{' '}
                  <span className="keyword-text">SSH and GPG keys</span>, and click on{' '}
                  <span className="keyword-text">New SSH key</span>.
                </li>
                <li>
                  Paste your public key into the box and give it a title (like
                  "My Gaming PC"). Click <span className="keyword-text">Add SSH key</span>.
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
