
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const scriptContent = `#!/bin/bash

# Get suffix from argument or USERNAME env var, default to 'arms'
SUFFIX="\${1:-\${USERNAME:-arms}}"

# Create namespaces
echo "Creating namespaces h1-\${SUFFIX} and h2-\${SUFFIX}..."
sudo ip netns add h1-\${SUFFIX} #creating host1
sudo ip netns add h2-\${SUFFIX} #creating host2

# Create veth pair and move to namespaces
echo "Creating veth pair..."
sudo ip link add v1-\${SUFFIX} type veth peer name v2-\${SUFFIX}
sudo ip link set v1-\${SUFFIX} netns h1-\${SUFFIX} #attaching v1 - h1
sudo ip link set v2-\${SUFFIX} netns h2-\${SUFFIX}

# Assign IP addresses
echo "Assigning IP addresses..."
sudo ip -n h1-\${SUFFIX} addr add 10.0.0.1/24 dev v1-\${SUFFIX}
sudo ip -n h2-\${SUFFIX} addr add 10.0.0.2/24 dev v2-\${SUFFIX}

# Bring up loopback and veth interfaces
echo "Bringing up interfaces..."
sudo ip -n h1-\${SUFFIX} link set lo up
sudo ip -n h2-\${SUFFIX} link set lo up
sudo ip -n h1-\${SUFFIX} link set v1-\${SUFFIX} up
sudo ip -n h2-\${SUFFIX} link set v2-\${SUFFIX} up

echo "Network namespaces created successfully!"
echo "h1-\${SUFFIX}: 10.0.0.1/24"
echo "h2-\${SUFFIX}: 10.0.0.2/24"
`;

export default function NsCreateTheoryPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/docs/notes/frr-exercises/exercise1/ns-create-sh">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to ns-create.sh
          </Link>
        </Button>
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline mb-2">
            Theory: ns-create.sh
          </h1>
          <p className="text-lg text-muted-foreground">
            A detailed breakdown of the network namespace creation script.
          </p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>The Script</CardTitle>
            <CardDescription>
              This script sets up two isolated network environments (namespaces)
              and connects them with a virtual Ethernet cable.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock>{scriptContent}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Line-by-Line Explanation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 font-mono text-sm">
            <div>
              <h3 className="font-bold text-primary">Line 1: `#!/bin/bash`</h3>
              <p className="text-muted-foreground">
                This is the "shebang". It tells the operating system to execute
                this script using the Bash interpreter. `#!` must be the very
                first two characters of the file.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-primary">Line 4: `SUFFIX="\${1:-\${USERNAME:-arms}}"`</h3>
              <p className="text-muted-foreground">
                This line sets a variable named `SUFFIX`. It's a clever way to
                prioritize inputs:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>`\${1...}`: Tries to use the first command-line argument passed to the script (e.g., `./ns-create.sh myname`).</li>
                <li>`:-`: If the first argument (`$1`) is not provided, it uses what's next.</li>
                <li>`\${USERNAME...}`: Tries to use the value of the `USERNAME` environment variable.</li>
                <li>`:-arms`: If `USERNAME` is also not set, it defaults to the string 'arms'.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-primary">Lines 7-9: `sudo ip netns add ...`</h3>
              <p className="text-muted-foreground">
                Here, we create two isolated network namespaces.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>`sudo`: Executes the command with superuser (root) privileges, which is required for network configuration.</li>
                <li>`ip netns add`: The command to add a new network namespace.</li>
                <li>`h1-\${SUFFIX}`: The name of the new namespace, using the suffix defined earlier.</li>
              </ul>
            </div>
             <div>
              <h3 className="font-bold text-primary">Lines 12-14: `sudo ip link ...`</h3>
              <p className="text-muted-foreground">
                This creates a virtual Ethernet cable (`veth` pair) to connect the two namespaces.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>`ip link add v1-\${SUFFIX} type veth peer name v2-\${SUFFIX}`: Creates a pair of connected virtual interfaces named `v1-suffix` and `v2-suffix`.</li>
                <li>`ip link set v1-\${SUFFIX} netns h1-\${SUFFIX}`: Moves one end of the "cable" (`v1`) into the `h1` namespace.</li>
                <li>`ip link set v2-\${SUFFIX} netns h2-\${SUFFIX}`: Moves the other end (`v2`) into the `h2` namespace.</li>
              </ul>
            </div>
             <div>
              <h3 className="font-bold text-primary">Lines 17-19: `sudo ip -n ... addr add ...`</h3>
              <p className="text-muted-foreground">
                This section assigns IP addresses to the virtual interfaces inside their respective namespaces.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>`ip -n h1-\${SUFFIX}`: Specifies that the next `ip` command should run *inside* the `h1` namespace.</li>
                <li>`addr add 10.0.0.1/24`: Adds the IP address 10.0.0.1 with a 24-bit subnet mask.</li>
                <li>`dev v1-\${SUFFIX}`: Assigns this address to the `v1` interface.</li>
              </ul>
            </div>
             <div>
              <h3 className="font-bold text-primary">Lines 22-25: `sudo ip -n ... link set ... up`</h3>
              <p className="text-muted-foreground">
                This "activates" or "turns on" the network interfaces.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>`link set lo up`: Brings up the loopback interface, which is good practice.</li>
                <li>`link set v1-\${SUFFIX} up`: Activates the `v1` virtual interface so it can send and receive traffic.</li>
              </ul>
            </div>
             <div>
              <h3 className="font-bold text-primary">Lines 27-29: `echo ...`</h3>
              <p className="text-muted-foreground">
                These lines print informational messages to the screen to confirm that the script has finished and to show the IP addresses that were assigned.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
