
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { ArrowLeft, FileTerminal, Server, Zap } from 'lucide-react';
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
            ns-fiels.sh Analysis
          </h1>
          <p className="text-lg text-muted-foreground">
            An AI-Generated Breakdown of a System Maintenance Shell Script.
          </p>
        </header>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Script Content</CardTitle>
                    <CardDescription>The full source code of the shell script being analyzed.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CodeBlock>{scriptContent}</CodeBlock>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Zap className="size-5" /> Purpose</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">This script, named "Network & System File Scrubber," is an automated maintenance tool for a Linux environment. Its primary objective is to manage disk space by identifying and processing old log files and temporary files. This type of routine cleanup is crucial for server health, preventing disk space exhaustion and ensuring smooth operation.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Server className="size-5" /> Key Components</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-foreground">Configuration Variables</h3>
                        <p className="text-muted-foreground">The script defines variables at the top for easy modification. Key settings like the target directories (`/var/log`, `/tmp`), the archive destination (`/opt/archives`), and the file age threshold (`30` days) are centralized, allowing an administrator to adjust the script's behavior without altering its core logic.</p>
                    </div>
                     <div className="border-t pt-6">
                        <h3 className="font-semibold text-foreground">Log File Archiving</h3>
                        <p className="text-muted-foreground">The script uses the `find` command to locate all files (`-type f`) in the log directory that end with `.log` and were last modified more than 30 days ago (`-mtime +30`). Each found file is then piped to a `while` loop, where `gzip` creates a compressed archive. The original file is left untouched, but a commented-out `rm` command suggests it could be deleted after archiving.</p>
                    </div>
                    <div className="border-t pt-6">
                        <h3 className="font-semibold text-foreground">Temporary File Cleanup</h3>
                        <p className="text-muted-foreground">A second `find` command is executed on the temporary directory. It identifies any file older than 30 days and directly executes the `rm -v` command on it. The `-v` (verbose) flag ensures that the name of each deleted file is printed to the screen, providing a clear record of the cleanup process.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
