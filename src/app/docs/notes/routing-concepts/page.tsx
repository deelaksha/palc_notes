
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { ArrowLeft, Lightbulb, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function RoutingConceptsPage() {
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
                    <BookOpen className="size-12 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
                    Routing Concepts Deep Dive
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                   A structured, corrected, and detailed explanation of routing, networking, and related concepts.
                </p>
            </header>

            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>1. Understanding Routing Tables</CardTitle>
                        <CardDescription>A routing table is a set of rules that determines where data packets should be directed. It contains the destination network, subnet mask, the next hop (gateway), and the interface to use.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold mb-2">Example Output: `netstat -rn`</p>
                        <CodeBlock>
{`Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         192.168.1.1    0.0.0.0         UG      0   0        0    eth0
10.3.3.0        0.0.0.0        255.255.255.0   U       0   0        0    eth1`}
                        </CodeBlock>
                         <ul className="list-disc list-inside mt-4 text-muted-foreground space-y-1">
                            <li><code className="font-mono text-sm">0.0.0.0 /0</code>: This is the default route. Any traffic not destined for a more specific route in the table will be sent to the gateway at `192.168.1.1`.</li>
                            <li><code className="font-mono text-sm">10.3.3.0/24</code>: This represents a local network. Traffic for any IP in this range is sent directly through the `eth1` interface, with no gateway needed.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>2. IP Address Format and Masking</CardTitle>
                        <CardDescription>An IP address is a 32-bit number (e.g., 10.3.3.1). A subnet mask divides it into a network portion and a host portion.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold mb-2">Example:</p>
                        <p><code className="font-mono text-sm">192.168.1.100/28</code> has a subnet mask of <code className="font-mono text-sm">255.255.255.240</code>.</p>
                         <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                            <li>**Network portion**: The first 28 bits, which corresponds to the network `192.168.1.96`.</li>
                            <li>**Host portion**: The last 4 bits, allowing for usable host addresses from `.97` to `.110`.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>3. Network Portion vs. Host Portion</CardTitle>
                        <CardDescription>The network portion identifies the network, while the host portion identifies a specific device on that network.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>IP Address</TableHead>
                                <TableHead>Subnet Mask</TableHead>
                                <TableHead>Network Portion</TableHead>
                                <TableHead>Host Portion</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>10.3.3.1/24</TableCell>
                                    <TableCell>255.255.255.0</TableCell>
                                    <TableCell>10.3.3</TableCell>
                                    <TableCell>1</TableCell>
                                </TableRow>
                                 <TableRow>
                                    <TableCell>172.16.5.25/16</TableCell>
                                    <TableCell>255.255.0.0</TableCell>
                                    <TableCell>172.16</TableCell>
                                    <TableCell>5.25</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle>4. Default Gateway (0.0.0.0)</CardTitle>
                         <CardDescription>This is the exit point for all traffic leaving the local network whose destination is not explicitly listed in the routing table.</CardDescription>
                    </CardHeader>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>5. Trace Route (traceroute)</CardTitle>
                        <CardDescription>Shows the path (each router or "hop") a packet takes to reach its destination.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CodeBlock>
{`traceroute google.com
 1  192.168.1.1  1.123 ms
 2  10.0.0.1     10.345 ms
 3  172.217.0.1  20.234 ms
 4  142.250.179.206  30.765 ms`}
                        </CodeBlock>
                        <p className="text-muted-foreground mt-2">Each line shows a hop, its IP address, and the round-trip time.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>6. Routing Scripts</CardTitle>
                        <CardDescription>When network topology changes, you can use shell scripts to automate routing table updates.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CodeBlock>
{`#!/bin/bash
# Add a route to network 10.10.0.0 via gateway 10.3.3.1
sudo ip route add 10.10.0.0/24 via 10.3.3.1 dev eth0

# Set default gateway
sudo ip route add default via 192.168.1.1 dev eth1`}
                        </CodeBlock>
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle>7. Router Data Processing</CardTitle>
                        <CardDescription>Key concepts for how routers handle packets.</CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold">TTL (Time to Live)</h4>
                            <p className="text-muted-foreground">An 8-bit value in the IP header that prevents packets from looping endlessly. It is decremented by 1 at each router hop; if it reaches zero, the packet is discarded.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold">MAC Address Changes</h4>
                            <p className="text-muted-foreground">At each hop, the packet is encapsulated in a new Layer 2 frame. The source and destination MAC addresses change to reflect the MAC of the current router and the next-hop router, respectively.</p>
                        </div>
                          <div>
                            <h4 className="font-semibold">Packet Forwarding</h4>
                            <p className="text-muted-foreground">The router reads the destination IP, looks it up in its routing table, and forwards the packet to the next hop or final destination.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  );
}
