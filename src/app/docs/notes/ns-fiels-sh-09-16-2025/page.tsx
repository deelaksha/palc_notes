
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { ArrowLeft, FileTerminal, Settings, Archive, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NsFielsScriptPage() {
  const scriptContent = `
#!/bin/bash
# ns-fiels.sh (Network & System File Scrubber)
# Run Date: 09-16-2025
# This script scans for temporary and log files older than 30 days
# and archives them to save space.

# Configuration
LOG_DIR="/var/log"
TMP_DIR="/tmp"
ARCHIVE_DIR="/opt/archives"
DAYS_OLD=30
TIMESTAMP=$(date +"%Y-%m-%d")

# Ensure archive directory exists
mkdir -p "$ARCHIVE_DIR"

echo "Starting Network & System File Scrubber..."

# Find and archive old log files
echo "Scanning for old log files in $LOG_DIR..."
find "$LOG_DIR" -type f -name "*.log" -mtime +"$DAYS_OLD" -print0 | while IFS= read -r -d '' file; do
  echo "Archiving: $file"
  gzip -c "$file" > "$ARCHIVE_DIR/$(basename "$file")-$TIMESTAMP.gz"
  # rm "$file" # Uncomment to delete original file after archiving
done

# Find and clean old temp files
echo "Scanning for old temporary files in $TMP_DIR..."
find "$TMP_DIR" -type f -mtime +"$DAYS_OLD" -exec rm -v {} \\;

echo "Scrubbing complete."
  `.trim();

  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/docs/notes">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Notes
            </Link>
        </Button>

        <header className="text-center mb-12">
            <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                <FileTerminal className="size-12 text-primary" />
            </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-code mb-2">
            Script Breakdown: ns-fiels.sh
          </h1>
          <p className="text-lg text-muted-foreground">
            Let's break down this script step-by-step. Think of it like reading the instructions for a robot that cleans up your computer.
          </p>
        </header>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>The Full Script</CardTitle>
                    <CardDescription>Here is the full script we are about to analyze. Don't worry if it looks complicated, we'll go through it line by line.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CodeBlock>{scriptContent}</CodeBlock>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Settings className="size-5" /> Step 1: The Robot's Brain (Configuration)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">The first part of the script is like the robot's brain. It sets up all the rules before it starts working. This makes it easy for a human to change the rules without rewriting the robot's instructions.</p>
                    <ul className="list-disc pl-5 mt-4 space-y-2 text-muted-foreground">
                        <li><code className="font-code bg-code-bg text-keyword px-1 py-0.5 rounded-sm text-sm">LOG_DIR</code>: Tells the robot where to find old diaries (log files).</li>
                        <li><code className="font-code bg-code-bg text-keyword px-1 py-0.5 rounded-sm text-sm">TMP_DIR</code>: Tells the robot where to find leftover junk (temporary files).</li>
                        <li><code className="font-code bg-code-bg text-keyword px-1 py-0.5 rounded-sm text-sm">ARCHIVE_DIR</code>: Tells the robot where to put things into storage (the archive).</li>
                        <li><code className="font-code bg-code-bg text-keyword px-1 py-0.5 rounded-sm text-sm">DAYS_OLD</code>: Sets the main rule: "Only touch things that are older than 30 days."</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Archive className="size-5" /> Step 2: Boxing Up Old Diaries (Archiving Logs)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Next, the robot's first job is to find old log files and put them into storage boxes. This saves space but doesn't throw them away completely.</p>
                    <p className="text-muted-foreground mt-2">The command <code className="font-code bg-code-bg text-keyword px-1 py-0.5 rounded-sm text-sm">find</code> is like telling the robot to "go look" in the log folder for any file ending in <code className="font-code bg-code-bg text-keyword px-1 py-0.5 rounded-sm text-sm">.log</code> that is older than 30 days. For every file it finds, it uses <code className="font-code bg-code-bg text-keyword px-1 py-0.5 rounded-sm text-sm">gzip</code> to shrink it and move it to the storage box (archive).</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Trash2 className="size-5" /> Step 3: Throwing Away Old Junk (Cleaning Temp Files)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">The robot's second job is to clean up real junk. It goes to the temporary files folder and looks for anything that hasn't been touched in over 30 days.</p>
                    <p className="text-muted-foreground mt-2">This time, instead of boxing it up, the script uses the command <code className="font-code bg-code-bg text-keyword px-1 py-0.5 rounded-sm text-sm">rm</code>, which means "remove". This permanently deletes the old junk files to free up space. The <code className="font-code bg-code-bg text-keyword px-1 py-0.5 rounded-sm text-sm">-v</code> part just makes the robot say out loud which file it's deleting, so the human knows what it's doing.</p>
                </CardContent>
            </Card>

            <Card className="border-primary bg-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary"><CheckCircle className="size-5" /> Mission Complete!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">And that's it! This simple script is a great example of how automation can keep a computer clean and healthy. It regularly checks for old files, puts important ones in storage, and throws away the real junk, all without a human needing to do it manually every time.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
