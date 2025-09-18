
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const NetworkSimulator = () => {
  const [sourceIp, setSourceIp] = useState('192.168.1.10');
  const [destinationIp, setDestinationIp] = useState('10.10.10.5');
  const [subnetMask, setSubnetMask] = useState('255.255.255.0');
  const [packetType, setPacketType] = useState('http');
  const [status, setStatus] = useState('Enter details and click "Start Simulation".');
  const [isSimulating, setIsSimulating] = useState(false);
  
  const [packetState, setPacketState] = useState({
    visible: false,
    x: 0,
    y: 0,
    sourceMac: '',
    destMac: '',
  });

  const [currentRouterId, setCurrentRouterId] = useState<string | null>(null);

  const deviceRefs = {
    sourceHost: useRef<HTMLDivElement>(null),
    bridge1: useRef<HTMLDivElement>(null),
    router1: useRef<HTMLDivElement>(null),
    router2: useRef<HTMLDivElement>(null),
    firewall: useRef<HTMLDivElement>(null),
    bridge2: useRef<HTMLDivElement>(null),
    destinationHost: useRef<HTMLDivElement>(null),
  };
  
  const deviceData = {
      sourceHost: { name: 'Source Host', mac: 'AA:..:01'},
      bridge1: { name: 'Bridge 1', mac: ''},
      router1: { name: 'Router 1', mac: 'R1:..:A1', mac2: 'R1:..:B1' },
      router2: { name: 'Router 2', mac: 'R2:..:A1', mac2: 'R2:..:B1' },
      firewall: { name: 'Firewall', mac: ''},
      bridge2: { name: 'Bridge 2', mac: ''},
      destinationHost: { name: 'Destination Host', mac: 'DD:..:01'},
  };

  const routingTables = {
    router1: { '10.10.10.0/24': 'router2' },
    router2: { '10.10.10.0/24': 'firewall' },
  };

  const lineRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const getDevicePos = (id: keyof typeof deviceRefs) => {
    const el = deviceRefs[id].current;
    if (!el) return { x: 0, y: 0 };
    const container = el.closest('.network-topology')!.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left - container.left + rect.width / 2,
      y: rect.top - container.top + rect.height / 2,
    };
  };

  const drawLines = () => {
    const connections = [
      { from: 'sourceHost', to: 'bridge1', id: 'conn-source-bridge1' },
      { from: 'bridge1', to: 'router1', id: 'conn-bridge1-router1' },
      { from: 'router1', to: 'router2', id: 'conn-router1-router2' },
      { from: 'router2', to: 'firewall', id: 'conn-router2-firewall' },
      { from: 'firewall', to: 'bridge2', id: 'conn-firewall-bridge2' },
      { from: 'bridge2', to: 'destinationHost', id: 'conn-bridge2-dest' },
    ];
    connections.forEach((conn) => {
      const line = lineRefs.current[conn.id];
      if (!line) return;

      const fromPos = getDevicePos(conn.from as keyof typeof deviceRefs);
      const toPos = getDevicePos(conn.to as keyof typeof deviceRefs);

      const dx = toPos.x - fromPos.x;
      const dy = toPos.y - fromPos.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      line.style.left = `${fromPos.x}px`;
      line.style.top = `${fromPos.y}px`;
      line.style.width = `${length}px`;
      line.style.transform = `rotate(${angle}deg)`;
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(drawLines, 100);
    window.addEventListener('resize', drawLines);
    return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', drawLines);
    }
  }, []);

  const movePacket = (targetId: keyof typeof deviceRefs, newSourceMac: string, newDestMac: string) => {
    const targetPos = getDevicePos(targetId);
    setPacketState((prev) => ({
      ...prev,
      x: targetPos.x - 10,
      y: targetPos.y - 10,
      sourceMac: newSourceMac,
      destMac: newDestMac,
    }));
  };

  const animatePacket = async (path: any[]) => {
    for (let i = 0; i < path.length; i++) {
        const step = path[i];
        setStatus(step.log);
        setCurrentRouterId(step.routerId || null);

        const currentNode = deviceRefs[step.id as keyof typeof deviceRefs].current;
        if(currentNode) currentNode.classList.add('pulse-animation');
        
        await new Promise(resolve => setTimeout(resolve, step.delay));
        if (currentNode) currentNode.classList.remove('pulse-animation');

        if (i < path.length - 1) {
            const nextStep = path[i+1];
            if (step.line) {
                const lineEl = lineRefs.current[step.line];
                if (lineEl) lineEl.classList.add('path-active');
            }
            movePacket(nextStep.id, nextStep.sourceMac, nextStep.destMac);
            await new Promise(resolve => setTimeout(resolve, step.duration * 1000));
            if (step.line) {
                const lineEl = lineRefs.current[step.line];
                if (lineEl) lineEl.classList.remove('path-active');
            }
        }
    }
  };

  const resetSimulation = () => {
    setStatus('Enter details and click "Start Simulation"');
    setIsSimulating(false);
    setPacketState({ visible: false, x: 0, y: 0, sourceMac: '', destMac: '' });
    Object.values(deviceRefs).forEach(ref => ref.current?.classList.remove('pulse-animation'));
    Object.values(lineRefs.current).forEach(line => line?.classList.remove('path-active'));
    setCurrentRouterId(null);
  };

  const startSimulation = async () => {
    const IP_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!IP_REGEX.test(sourceIp) || !IP_REGEX.test(destinationIp) || !IP_REGEX.test(subnetMask)) {
        setStatus("Error: Invalid IP or Subnet Mask format.");
        return;
    }
    resetSimulation();
    setIsSimulating(true);
    setStatus('Simulation starting...');
    
    const sourcePos = getDevicePos('sourceHost');
    setPacketState({
        visible: true,
        x: sourcePos.x - 10,
        y: sourcePos.y - 10,
        sourceMac: deviceData.sourceHost.mac,
        destMac: deviceData.router1.mac,
    });
    
    const isBlocked = packetType === 'torrent';

    const path = [
        { id: 'sourceHost', log: '1. Source Host sends packet to its default gateway (Router 1).', delay: 2000, duration: 1.5, line: 'conn-source-bridge1', sourceMac: deviceData.sourceHost.mac, destMac: deviceData.router1.mac },
        { id: 'bridge1', log: '2. Bridge forwards the packet towards the router.', delay: 2000, duration: 1.5, line: 'conn-bridge1-router1', sourceMac: deviceData.sourceHost.mac, destMac: deviceData.router1.mac },
        { id: 'router1', routerId: 'router1', log: '3. Router 1 receives. MAC changes. Forwards to Router 2.', delay: 2500, duration: 1.5, line: 'conn-router1-router2', sourceMac: deviceData.router1.mac2, destMac: deviceData.router2.mac },
        { id: 'router2', routerId: 'router2', log: '4. Router 2 receives. MAC changes. Forwards to Firewall.', delay: 2500, duration: 1.5, line: 'conn-router2-firewall', sourceMac: deviceData.router2.mac2, destMac: deviceData.firewall.mac },
        { id: 'firewall', log: `5. Firewall inspects the packet.`, delay: 1500 }
    ];

    if (isBlocked) {
        path.push({ id: 'firewall', log: `FIREWALL BLOCK: ${packetType.toUpperCase()} traffic is not allowed. Packet dropped.`, delay: 1500 });
        await animatePacket(path);
    } else {
        path.push(
            { id: 'firewall', log: `6. Firewall allows packet. Forwards to Bridge 2.`, delay: 1500, duration: 1.5, line: 'conn-firewall-bridge2', sourceMac: deviceData.router2.mac2, destMac: deviceData.bridge2.mac },
            { id: 'bridge2', log: '7. Bridge 2 forwards packet to the destination host.', delay: 1500, duration: 1.5, line: 'conn-bridge2-dest', sourceMac: deviceData.router2.mac2, destMac: deviceData.destinationHost.mac },
            { id: 'destinationHost', log: '8. Packet has arrived at the destination!', delay: 2000 }
        );
        await animatePacket(path);
    }

    setStatus('Simulation complete!');
    setIsSimulating(false);
  };

  return (
    <div className="w-full mx-auto space-y-4 md:space-y-8 p-2 md:p-4">
      <header className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-2 text-white">Advanced Network Simulator</h1>
        <p className="text-sm md:text-lg text-gray-400">
          Visualize packet flow, MAC address changes, and routing decisions.
        </p>
      </header>

      <main className="bg-gray-800 p-4 md:p-6 rounded-2xl shadow-xl space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
             <div className="space-y-2">
                <Label htmlFor="sourceIp" className="text-gray-300">Source IP</Label>
                <Input id="sourceIp" value={sourceIp} onChange={e => setSourceIp(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="destinationIp" className="text-gray-300">Destination IP</Label>
                <Input id="destinationIp" value={destinationIp} onChange={e => setDestinationIp(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="subnetMask" className="text-gray-300">Subnet Mask</Label>
                <Input id="subnetMask" value={subnetMask} onChange={e => setSubnetMask(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="packetType" className="text-gray-300">Packet Type</Label>
                <Select value={packetType} onValueChange={setPacketType}>
                    <SelectTrigger id="packetType"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="http">HTTP Request</SelectItem>
                        <SelectItem value="ping">Ping</SelectItem>
                        <SelectItem value="torrent">Torrent (P2P)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button onClick={startSimulation} disabled={isSimulating}>Start Simulation</Button>
            <Button onClick={resetSimulation} variant="secondary">Reset</Button>
        </div>

        {/* Status and Data Display */}
        <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-400 font-bold">SIMULATION STATUS</p>
                <p className="text-white font-semibold min-h-[2rem]">{status}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-400 font-bold">PACKET MAC ADDRESSES</p>
                <div className='font-mono text-xs'>
                  <p>SRC: <span className='text-amber-400'>{packetState.sourceMac || 'N/A'}</span></p>
                  <p>DST: <span className='text-amber-400'>{packetState.destMac || 'N/A'}</span></p>
                </div>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-400 font-bold">CURRENT ROUTING TABLE</p>
                 <div className='font-mono text-xs min-h-[2rem]'>
                    {currentRouterId && routingTables[currentRouterId as keyof typeof routingTables] ?
                      Object.entries(routingTables[currentRouterId as keyof typeof routingTables]).map(([dest, hop]) => (
                        <p key={dest}>{dest} -&gt; {hop}</p>
                      ))
                      : <p className='text-gray-500'>N/A</p>
                    }
                </div>
            </div>
        </div>

        {/* Network Topology */}
        <div className="network-topology mt-8 rounded-xl shadow-inner h-[400px] md:h-[500px]">
           {['conn-source-bridge1', 'conn-bridge1-router1', 'conn-router1-router2', 'conn-router2-firewall', 'conn-firewall-bridge2', 'conn-bridge2-dest'].map(id => (
              <div key={id} ref={el => lineRefs.current[id] = el} className="connection-line" />
           ))}
            <div ref={deviceRefs.sourceHost} className="device host-device" style={{ left: '10%', top: '50%' }}>
                <span className="device-icon">💻</span>
                <span className="device-label">Source Host</span>
            </div>
            <div ref={deviceRefs.bridge1} className="device bridge-device" style={{ left: '25%', top: '50%' }}>
                <span className="device-icon">🌉</span>
                <span className="device-label">Bridge 1</span>
            </div>
            <div ref={deviceRefs.router1} className="device router-device" style={{ left: '40%', top: '30%' }}>
                <span className="device-icon">🌐</span>
                <span className="device-label">Router 1</span>
            </div>
            <div ref={deviceRefs.router2} className="device router-device" style={{ left: '55%', top: '70%' }}>
                <span className="device-icon">🌐</span>
                <span className="device-label">Router 2</span>
            </div>
            <div ref={deviceRefs.firewall} className="device firewall-device" style={{ left: '70%', top: '50%' }}>
                <span className="device-icon">🔒</span>
                <span className="device-label">Firewall</span>
            </div>
            <div ref={deviceRefs.bridge2} className="device bridge-device" style={{ left: '85%', top: '50%' }}>
                <span className="device-icon">🌉</span>
                <span className="device-label">Bridge 2</span>
            </div>
            <div ref={deviceRefs.destinationHost} className="device host-device" style={{ right: '5%', top: '50%' }}>
                <span className="device-icon">🖥️</span>
                <span className="device-label">Destination</span>
            </div>

            {packetState.visible && (
                <div className="packet" style={{ transform: `translate(${packetState.x}px, ${packetState.y}px)` }}></div>
            )}
        </div>
      </main>
    </div>
  );
};

export default NetworkSimulator;

    