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
            AI-Generated Breakdown for script executed on 09-16-2025.
          </p>
        </header>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Script Content</CardTitle>
                    <CardDescription>The full source code of the shell script.</CardDescription>
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
                    <p className="text-muted-foreground">This script, named "Network & System File Scrubber," is designed to perform automated cleanup on a Linux system. Its primary goals are to identify old log files and temporary files that are no longer needed, compress them for archival purposes, and optionally delete them to free up disk space. This is a common maintenance task for servers to prevent disks from filling up.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Server className="size-5" /> Key Components</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-foreground">Configuration Variables</h3>
                        <p className="text-muted-foreground">The script begins by defining key locations and thresholds, such as the log directory (`/var/log`), the temp directory (`/tmp`), and the age limit for files (`30` days). This makes the script easy to modify.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Archiving Logic</h3>
                        <p className="text-muted-foreground">It uses the `find` command to locate all files ending in `.log` that are older than 30 days. For each file found, it uses `gzip` to create a compressed version in the `/opt/archives` directory, appending the current date to the archive name.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Cleanup Logic</h3>
                        <p className="text-muted-foreground">Similarly, it uses `find` to locate and directly delete (`rm -v`) any temporary files in `/tmp` older than the specified limit. The `-v` flag makes the deletion process verbose, showing which files are being removed.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
