'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';

export default function NsCreateTheoryPage() {
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
echo "h2-\${SUFFIX}: 10.0.0.2/24"`;

    return (
    <main className="p-6">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/docs/notes/frr-exercises/exercise1/ns-create-sh">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to ns-create.sh
            </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
            A Webpage Explaining Linux Network Namespaces
        </h1>

        <div className="prose dark:prose-invert prose-lg max-w-none">
            <p className="text-lg text-muted-foreground">
                This page explains a bash script that sets up a simple, virtual network environment using Linux tools. It's like creating two separate, isolated computers inside your single machine and connecting them with a virtual cable. This is useful for testing network configurations without affecting your real network.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                Simple, Line-by-Line Explanation
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. The Setup:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li><b className="font-mono text-keyword"><code>#!/bin/bash</code></b>: This is the first line of almost every bash script. It's like telling the computer, &quot;Hey! This is a list of instructions for a type of computer called a 'bash shell'. You need to use that to read this.&quot;</li>
                <li><b className="font-mono text-keyword"><code>SUFFIX=&quot;${'${1:-${USERNAME:-arms}}'}&quot;</code></b>: This is a way to create a special nickname for our virtual computers. It checks if you gave it a nickname when you started the script. If you didn't, it checks your computer's name for a nickname. If that's not there either, it just uses the nickname &quot;arms.&quot; This makes sure our virtual computers always have a unique name.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Creating Two Virtual Computers:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li><b className="font-mono text-keyword"><code>echo &quot;Creating namespaces h1-${'${SUFFIX}'} and h2-${'${SUFFIX}'}...&quot;</code></b>: This line just shows a message on the screen so you know the script is starting to work.</li>
                <li><b className="font-mono text-keyword"><code>sudo ip netns add h1-${'${SUFFIX}'}</code></b>: This is a really important command!
                    <ul className="list-disc list-inside ml-6 mt-2">
                        <li><b className="font-mono text-command"><code>sudo</code></b>: This is like asking for permission from a grown-up. It lets the script do something that normal users aren't allowed to do, like creating a new network.</li>
                        <li><b className="font-mono text-command"><code>ip netns add</code></b>: This is the command to create a brand new, empty virtual computer. It's a &quot;network namespace.&quot; Think of it as a clean, empty room with no cables or Wi-Fi yet.</li>
                        <li><b className="font-mono text-label"><code>h1-${'${SUFFIX}'}</code></b>: This is the name we're giving to our first virtual computer.</li>
                    </ul>
                </li>
                <li><b className="font-mono text-keyword"><code>sudo ip netns add h2-${'${SUFFIX}'}</code></b>: This does the exact same thing, but creates a second virtual computer with its own empty room, named `h2-arms` (or whatever your nickname is).</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Connecting Them with a Cable:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li><b className="font-mono text-keyword"><code>echo &quot;Creating veth pair...&quot;</code></b>: Another message for you.</li>
                <li><b className="font-mono text-keyword"><code>sudo ip link add v1-${'${SUFFIX}'} type veth peer name v2-${'${SUFFIX}'}</code></b>: This command creates a &quot;magic twin cable.&quot; It's a special virtual cable that has two ends. One end is named `v1-arms` and the other is `v2-arms`. Anything that goes into one end instantly comes out the other.</li>
                <li><b className="font-mono text-keyword"><code>sudo ip link set v1-${'${SUFFIX}'} netns h1-${'${SUFFIX}'}</code></b>: This is like taking one end of our magic cable (`v1-arms`) and putting it into the empty room of our first virtual computer (`h1-arms`).</li>
                <li><b className="font-mono text-keyword"><code>sudo ip link set v2-${'${SUFFIX}'} netns h2-${'${SUFFIX}'}</code></b>: This takes the other end of the cable (`v2-arms`) and puts it into the room of our second virtual computer (`h2-arms`). Now, the two virtual computers are connected!</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">4. Giving Them a Phone Number:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li><b className="font-mono text-keyword"><code>echo &quot;Assigning IP addresses...&quot;</code></b>: Message.</li>
                <li><b className="font-mono text-keyword"><code>sudo ip -n h1-${'${SUFFIX}'} addr add 10.0.0.1/24 dev v1-${'${SUFFIX}'}</code></b>: This is how we give our first virtual computer a &quot;phone number&quot; so the other computer can call it.
                    <ul className="list-disc list-inside ml-6 mt-2">
                        <li><b className="font-mono text-command"><code>ip -n h1-${'${SUFFIX}'}</code></b>: This is a special instruction that means &quot;go inside the `h1-arms` virtual computer and do something.&quot;</li>
                        <li><b className="font-mono text-command"><code>addr add 10.0.0.1/24</code></b>: This is the phone number we're giving it.</li>
                        <li><b className="font-mono text-label"><code>dev v1-${'${SUFFIX}'}</code></b>: This is like saying, &quot;put this phone number on the end of the cable that is in this room.&quot;</li>
                    </ul>
                </li>
                <li><b className="font-mono text-keyword"><code>sudo ip -n h2-${'${SUFFIX}'} addr add 10.0.0.2/24 dev v2-${'${SUFFIX}'}</code></b>: We do the same thing for the second virtual computer, but we give it a different phone number (`10.0.0.2`).</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">5. Turning Them On:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li><b className="font-mono text-keyword"><code>echo &quot;Bringing up interfaces...&quot;</code></b>: Message.</li>
                <li><b className="font-mono text-keyword"><code>sudo ip -n h1-${'${SUFFIX}'} link set lo up</code></b>: This is like turning on a special connection that lets our virtual computer talk to itself. It's a normal step to get a computer ready.</li>
                <li><b className="font-mono text-keyword"><code>sudo ip -n h2-${'${SUFFIX}'} link set lo up</code></b>: Same thing for the second computer.</li>
                <li><b className="font-mono text-keyword"><code>sudo ip -n h1-${'${SUFFIX}'} link set v1-${'${SUFFIX}'} up</code></b>: This is like plugging in the power cord for the cable in the first room. It &quot;brings it up&quot; and makes it ready.</li>
                <li><b className="font-mono text-keyword"><code>sudo ip -n h2-${'${SUFFIX}'} link set v2-${'${SUFFIX}'} up</code></b>: We do the same for the second computer's cable.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">6. Done!</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>The last `echo` commands just show you a message on the screen that says &quot;all done!&quot; and shows you the phone numbers of your two virtual computers.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-secondary-accent pb-2">
                The Full Script
            </h2>
            <CodeBlock>{scriptContent}</CodeBlock>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                Real-World Uses of Network Namespaces
            </h2>
            <p className="text-lg text-muted-foreground">
                While this script is simple, the underlying technology—network namespaces—is a fundamental part of modern Linux systems. Here are some of its most common and important real-world applications:
            </p>
            <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                <li>
                    <b className="text-foreground">Containerization (Docker, Podman)</b>: This is the most prevalent use case. When you run a Docker container, the container is given its own isolated network namespace. This means that each container has its own network stack, interfaces, and IP addresses, completely separate from the host machine and other containers. It allows you to run multiple services on the same server without them interfering with each other's network configurations.
                </li>
                <li>
                    <b className="text-foreground">Network Simulation and Testing</b>: Engineers and developers use network namespaces to create isolated, virtual networks for testing. They can set up complex network topologies with routers, firewalls, and multiple subnets to test configurations or software without needing a separate physical lab. This allows for safe and repeatable testing.
                </li>
                <li>
                    <b className="text-foreground">Network Security</b>: Namespaces can be used to isolate sensitive services. For example, a web server could run in its own namespace with a restrictive firewall, making it harder for an attacker to compromise other services on the same machine, even if they gain access to the web server.
                </li>
                <li>
                    <b className="text-foreground">VPN Tunnelling for Specific Applications</b>: You can place an application inside its own network namespace and configure that namespace to route all its traffic through a VPN. This ensures that only that specific application's traffic uses the VPN, while the rest of the host system's traffic remains on the normal network. This is useful for privacy or bypassing geo-restrictions for a single application.
                </li>
            </ul>
        </div>
      </div>
    </main>
  );
}
