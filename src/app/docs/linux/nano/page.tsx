
'use client';

import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NanoPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        <Button asChild variant="ghost" className="mb-4">
            <Link href="/docs/linux">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Commands
            </Link>
        </Button>
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2 font-headline">
          The Friendly Editor: <span className="text-primary">nano</span>
        </h1>
        <p className="text-lg text-muted-foreground">Your simple, no-fuss terminal text editor.</p>
      </header>

        <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
                What is Nano?
            </h2>
            <p className="text-muted-foreground">
                Nano is a simple, modeless text editor for the command line. Unlike Vim, it works just like a standard notepad—what you type is what you get. It's incredibly user-friendly because it always displays the most important commands at the bottom of the screen, so you never feel lost. It's perfect for beginners or for quick edits when you don't need the power of a complex editor.
            </p>
        </section>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
            The Nano Interface
        </h2>
        <div className="space-y-6">
            <p className="text-muted-foreground">
                When you open nano, you'll see a simple interface:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>A top bar showing the version and file name.</li>
                <li>The main text editing area in the middle.</li>
                <li>A list of common shortcuts at the bottom. The `^` symbol means the `Ctrl` key. For example, `^X` means `Ctrl + X`.</li>
            </ol>
             <Card className="bg-card-nested">
                <CardContent className="p-4">
                    <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">
{`  GNU nano 5.4                  new buffer                  
                                                            
^G Get Help   ^O Write Out  ^W Where Is   ^K Cut Text   ^J Justify    ^C Cur Pos
^X Exit       ^R Read File  ^\\ Replace    ^U Uncut Text ^T To Spell   ^_ Go To Line`}
                    </pre>
                </CardContent>
            </Card>
        </div>
      </section>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-secondary-accent">
          Core Commands
        </h2>
        <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold command-text mb-2">Opening and Exiting</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><code className="font-code text-keyword">nano filename.txt</code>: Opens the file. If it doesn't exist, it will be created when you save.</li>
                <li><code className="font-code text-keyword">Ctrl + X</code>: Exits the editor. It will ask you if you want to save any changes.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold command-text mb-2">Saving a File</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><code className="font-code text-keyword">Ctrl + O</code>: ("Write Out") Saves the file. You'll be prompted to confirm the filename at the bottom. Just press Enter to save.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold command-text mb-2">Cutting and Pasting</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><code className="font-code text-keyword">Ctrl + K</code>: ("Kut") Cuts the entire line your cursor is on. You can press it multiple times to cut multiple lines.</li>
                <li><code className="font-code text-keyword">Ctrl + U</code>: ("Un-cut") Pastes the text you just cut.</li>
                <li>To copy text, you first cut it with `Ctrl+K` and then immediately paste it back with `Ctrl+U`. The text remains in the buffer to be pasted elsewhere.</li>
              </ul>
            </div>
             <div>
              <h3 className="text-xl font-bold command-text mb-2">Searching for Text</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><code className="font-code text-keyword">Ctrl + W</code>: ("Where is") Opens a search prompt at the bottom. Type your search term and press Enter.</li>
                 <li><code className="font-code text-keyword">Alt + W</code>: Finds the next occurrence of your search term.</li>
              </ul>
            </div>
        </div>
      </section>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-tertiary-accent">
            Real-World Example
        </h2>
        <p className="text-muted-foreground mb-4">
            Imagine you need to quickly edit a configuration file on a remote server to change a database host.
        </p>
        <CodeBlock className="bg-code-bg text-code-text">
{`# 1. SSH into the server
ssh user@remote-server

# 2. Open the config file with nano
sudo nano /etc/app/config.ini

# 3. Search for the database host line
# Press Ctrl + W, type "db_host", press Enter.

# 4. Edit the line from "db_host = old.server.com" to "db_host = new.server.com"

# 5. Save and exit
# Press Ctrl + O, press Enter to confirm the filename.
# Press Ctrl + X to exit.
`}
        </CodeBlock>
        <div className="mt-6 p-4 rounded-xl bg-card-nested border-l-4 border-l-yellow-400">
          <p><span className="text-tips font-bold">Quest Tip:</span> Nano is the perfect tool for quick, straightforward edits like this. You don't have to remember complex modes; just open, edit, and save.</p>
        </div>
      </section>
    </div>
  );
}
