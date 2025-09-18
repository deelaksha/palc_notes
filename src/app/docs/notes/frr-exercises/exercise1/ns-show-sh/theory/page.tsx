
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const NsShowTheoryPage = () => {
    return (
        <main className="p-6">
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/docs/notes/frr-exercises/exercise1/ns-show-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to ns-show.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `ns-show.sh` Script
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This script is a powerful diagnostic tool. It loops through our virtual network namespaces (`h1` and `h2`) and runs a series of commands inside each one to give us a complete report of its network status.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Script Setup:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>#!/usr/bin/env bash</code></b>: A more portable way to specify that this is a bash script.</li>
                        <li><b className="font-mono text-keyword"><code>set -euo pipefail</code></b>: A set of safety flags. It makes the script exit immediately if a command fails (`-e`), if an unset variable is used (`-u`), or if a command in a pipeline fails (`-o pipefail`). This prevents unexpected behavior.</li>
                        <li><b className="font-mono text-keyword"><code>SFX="${'${1:-arms}'}"</code></b>: Gets the suffix for our namespaces, defaulting to 'arms'.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. The Main Loop:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>for NS in "h1-$SFX" "h2-$SFX"; do ... done</code></b>: This is a `for` loop. It runs all the commands between `do` and `done` once for `h1-arms` and then again for `h2-arms`.</li>
                        <li><b className="font-mono text-keyword"><code>echo "..."</code></b>: Prints a nice header for each namespace to keep the output organized.</li>
                        <li><b className="font-mono text-keyword"><code>if ! sudo ip netns list ...</code></b>: A check to see if the namespace actually exists before trying to run commands inside it.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. The Diagnostic Commands:</h3>
                     <p className="text-muted-foreground">Each of these commands is run inside the namespace using `sudo ip netns exec "$NS" ...`.</p>
                     <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>ip -br link</code></b>: Shows a brief list of all network links (interfaces) inside the namespace.</li>
                        <li><b className="font-mono text-keyword"><code>ip -br addr</code></b>: Shows a brief list of IP addresses assigned to the interfaces.</li>
                        <li><b className="font-mono text-keyword"><code>ip route</code></b>: Displays the IPv4 routing table.</li>
                         <li><b className="font-mono text-keyword"><code>ip -6 route</code></b>: Displays the IPv6 routing table.</li>
                        <li><b className="font-mono text-keyword"><code>ip neigh</code></b>: Shows the ARP table (neighbor cache), which maps IP addresses to MAC addresses on the local network.</li>
                        <li><b className="font-mono text-keyword"><code>ss -tunap</code></b>: A powerful command (`ss` stands for socket statistics) to show all active TCP (`t`) and UDP (`u`) network connections and listening ports (`a`), without resolving names (`n`), and shows the process (`p`) using the socket. `head -20` just limits the output.</li>
                         <li><b className="font-mono text-keyword"><code>iptables -S</code></b> / <b className="font-mono text-keyword"><code>nft list ruleset</code></b>: Tries to list any firewall rules inside the namespace. The `2>/dev/null || echo ...` part gracefully handles cases where `iptables` or `nftables` aren't configured.</li>
                         <li><b className="font-mono text-keyword"><code>ip netns pids "$NS"</code></b>: Lists the Process IDs (PIDs) of any programs running within that namespace.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-secondary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
                        <span className="text-muted-foreground">#!/usr/bin/env bash</span><br/>
                        <span className="command-text">set</span> -euo pipefail<br/>
                        <span className="text-label">SFX</span>=<span className="text-tips">"${'${1:-arms}'}"</span><br/><br/>
                        <span className="command-text">for</span> NS <span className="command-text">in</span> <span className="text-tips">"h1-$SFX"</span> <span className="text-tips">"h2-$SFX"</span>; <span className="command-text">do</span><br/>
                        {"  "}<span className="command-text">echo</span> <span className="text-tips">"====================  $NS  ===================="</span><br/>
                        {"  "}<span className="command-text">if</span> ! <span className="command-text">sudo</span> ip netns list | <span className="command-text">grep</span> -qw <span className="text-tips">"$NS"</span>; <span className="command-text">then</span><br/>
                        {"    "}<span className="command-text">echo</span> <span className="text-tips">"Namespace $NS not found"</span>; <span className="command-text">echo</span>; <span className="command-text">continue</span><br/>
                        {"  "}<span className="command-text">fi</span><br/>
                        {"  "}<span className="command-text">echo</span> <span className="text-tips">"--- LINKS (brief) ---"</span><br/>
                        {"  "}<span className="command-text">sudo</span> <span className="keyword-text">ip -n</span> <span className="text-tips">"$NS"</span> -br link || <span className="keyword-text">true</span><br/>
                        {"  "}<span className="command-text">echo</span> <span className="text-tips">"--- ADDRESSES ---"</span><br/>
                        {"  "}<span className="command-text">sudo</span> <span className="keyword-text">ip -n</span> <span className="text-tips">"$NS"</span> -br addr || <span className="keyword-text">true</span><br/>
                        {"  "}<span className="command-text">echo</span> <span className="text-tips">"--- ROUTES (v4) ---"</span><br/>
                        {"  "}<span className="command-text">sudo</span> <span className="keyword-text">ip -n</span> <span className="text-tips">"$NS"</span> route || <span className="keyword-text">true</span><br/>
                        {"  "}<span className="command-text">echo</span> <span className="text-tips">"--- ROUTES (v6) ---"</span><br/>
                        {"  "}<span className="command-text">sudo</span> <span className="keyword-text">ip -n</span> <span className="text-tips">"$NS"</span> -6 route || <span className="keyword-text">true</span><br/>
                        {"  "}<span className="command-text">echo</span> <span className="text-tips">"--- NEIGHBORS ---"</span><br/>
                        {"  "}<span className="command-text">sudo</span> <span className="keyword-text">ip -n</span> <span className="text-tips">"$NS"</span> neigh || <span className="keyword-text">true</span><br/>
                        {"  "}<span className="command-text">echo</span> <span className="text-tips">"--- SOCKETS (top few) ---"</span><br/>
                        {"  "}<span className="command-text">sudo</span> <span className="keyword-text">ip netns exec</span> <span className="text-tips">"$NS"</span> ss -tunap | <span className="command-text">head</span> -20 || <span className="keyword-text">true</span><br/>
                        {"  "}<span className="command-text">echo</span> <span className="text-tips">"--- IPTABLES (if present) ---"</span><br/>
                        {"  "}<span className="command-text">sudo</span> <span className="keyword-text">ip netns exec</span> <span className="text-tips">"$NS"</span> iptables -S 2&gt;/dev/null || <span className="command-text">echo</span> <span className="text-tips">"(no iptables)"</span><br/>
                        {"  "}<span className="command-text">echo</span> <span className="text-tips">"--- NFT RULESET (if present) ---"</span><br/>
                        {"  "}<span className="command-text">sudo</span> <span className="keyword-text">ip netns exec</span> <span className="text-tips">"$NS"</span> nft list ruleset 2&gt;/dev/null || <span className="command-text">echo</span> <span className="text-tips">"(no nftables)"</span><br/>
                        {"  "}<span className="command-text">echo</span> <span className="text-tips">"--- PIDs in $NS ---"</span><br/>
                        {"  "}<span className="command-text">sudo</span> <span className="keyword-text">ip netns pids</span> <span className="text-tips">"$NS"</span> || <span className="keyword-text">true</span><br/>
                        {"  "}<span className="command-text">echo</span><br/>
                        <span className="command-text">done</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Netns handles on disk:"</span><br/>
                        <span className="command-text">sudo</span> ls -l /var/run/netns/ || <span className="keyword-text">true</span>
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default NsShowTheoryPage;
