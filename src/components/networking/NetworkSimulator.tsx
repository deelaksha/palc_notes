
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

const NetworkSimulator = () => {
  const [sourceIp, setSourceIp] = useState('192.168.1.10');
  const [destinationIp, setDestinationIp] = useState('192.168.1.20');
  const [subnetMask, setSubnetMask] = useState('255.255.255.0');
  const [packetType, setPacketType] = useState('http');
  const [status, setStatus] = useState('Enter details and click "Start Simulation".');
  const [logs, setLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [packetState, setPacketState] = useState({
    visible: false,
    x: 0,
    y: 0,
    type: 'unicast',
  });
  const [broadcastPackets, setBroadcastPackets] = useState<any[]>([]);

  const deviceRefs = {
    sourceHost: useRef<HTMLDivElement>(null),
    hostA: useRef<HTMLDivElement>(null),
    bridge1: useRef<HTMLDivElement>(null),
    router: useRef<HTMLDivElement>(null),
    firewall: useRef<HTMLDivElement>(null),
    bridge2: useRef<HTMLDivElement>(null),
    hostB: useRef<HTMLDivElement>(null),
    destinationHost: useRef<HTMLDivElement>(null),
  };

  const lineRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const logStep = (message: string) => {
    setLogs((prev) => [...prev, message]);
  };

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
      { from: 'hostA', to: 'bridge1', id: 'conn-hostA-bridge1' },
      { from: 'bridge1', to: 'router', id: 'conn-bridge1-router' },
      { from: 'router', to: 'firewall', id: 'conn-router-firewall' },
      { from: 'firewall', to: 'bridge2', id: 'conn-firewall-bridge2' },
      { from: 'bridge2', to: 'hostB', id: 'conn-bridge2-hostB' },
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
    // A small delay to ensure DOM is ready for calculations
    const timeoutId = setTimeout(drawLines, 100);
    window.addEventListener('resize', drawLines);
    return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', drawLines);
    }
  }, []);

  const ipToBinary = (ip: string) => {
    return ip
      .split('.')
      .map((octet) => parseInt(octet, 10).toString(2).padStart(8, '0'))
      .join('');
  };

  const getNetworkId = (ip: string, mask: string) => {
    let maskBinary;
    if (mask.startsWith('/')) {
      const cidr = parseInt(mask.substring(1), 10);
      maskBinary = '1'.repeat(cidr).padEnd(32, '0');
    } else {
      maskBinary = ipToBinary(mask);
    }
    const ipBinary = ipToBinary(ip);
    let networkBinary = '';
    for (let i = 0; i < 32; i++) {
      networkBinary += ipBinary[i] === '1' && maskBinary[i] === '1' ? '1' : '0';
    }
    return networkBinary;
  };
  
  const movePacket = (targetId: keyof typeof deviceRefs) => {
    const targetPos = getDevicePos(targetId);
    setPacketState((prev) => ({ ...prev, x: targetPos.x - 10, y: targetPos.y - 10 }));
  };

  const animatePacket = async (path: any[]) => {
    for (let i = 0; i < path.length; i++) {
        const step = path[i];
        logStep(step.log);
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
            movePacket(nextStep.id);
            await new Promise(resolve => setTimeout(resolve, step.duration * 1000));
            if (step.line) {
                const lineEl = lineRefs.current[step.line];
                if (lineEl) lineEl.classList.remove('path-active');
            }
        }
    }
  };

  const resetSimulation = () => {
    setLogs([]);
    setStatus('Enter details and click "Start Simulation"');
    setIsSimulating(false);
    setPacketState({ visible: false, x: 0, y: 0, type: 'unicast' });
    setBroadcastPackets([]);
    Object.values(deviceRefs).forEach(ref => ref.current?.classList.remove('pulse-animation'));
    Object.values(lineRefs.current).forEach(line => line?.classList.remove('path-active'));
  };

  const startSimulation = async () => {
     const IP_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!IP_REGEX.test(sourceIp) || !IP_REGEX.test(destinationIp) || !IP_REGEX.test(subnetMask)) {
        setStatus("Error: Invalid IP or Subnet Mask format.");
        return;
    }
    resetSimulation();
    setIsSimulating(true);
    setStatus('Simulation running...');
    
    const sourcePos = getDevicePos('sourceHost');
    setPacketState({ visible: true, x: sourcePos.x - 10, y: sourcePos.y - 10, type: 'unicast' });

    const sourceNetworkId = getNetworkId(sourceIp, subnetMask);
    const destNetworkId = getNetworkId(destinationIp, subnetMask);

    const isBlocked = packetType === 'torrent';

    const sameSubnetPath = [
        { id: 'sourceHost', log: `1. Source (${sourceIp}) compares Network IDs and finds destination is on the same local network.`, delay: 2000, duration: 1.5, line: 'conn-source-bridge1' },
        { id: 'bridge1', log: `2. Bridge forwards the packet directly to the destination host based on its MAC address table.`, delay: 2000, duration: 1.5, line: 'conn-hostA-bridge1' },
        { id: 'hostA', log: `3. Packet arrived at local destination!`, delay: 1500 }
    ];

    const differentSubnetPath = [
        { id: 'sourceHost', log: `1. Source (${sourceIp}) determines the destination is on a different network.`, delay: 2000, duration: 1.5, line: 'conn-source-bridge1' },
        { id: 'bridge1', log: `2. Packet is sent to the default gateway (Router).`, delay: 2000, duration: 1.5, line: 'conn-bridge1-router' },
        { id: 'router', log: `3. Router checks its routing table and forwards the packet towards the destination network.`, delay: 2000, duration: 1.5, line: 'conn-router-firewall' },
        { id: 'firewall', log: `4. Firewall inspects the packet.`, delay: 1500 }
    ];

    if (isBlocked) {
        differentSubnetPath.push({ id: 'firewall', log: `5. FIREWALL BLOCK: ${packetType.toUpperCase()} traffic is not allowed. Packet dropped.`, delay: 1500 });
        await animatePacket(differentSubnetPath);
    } else if (sourceNetworkId === destNetworkId) {
        await animatePacket(sameSubnetPath);
    } else {
        differentSubnetPath.push(
            { id: 'firewall', log: `5. Firewall allows the packet. Forwarding continues.`, delay: 1500, duration: 1.5, line: 'conn-firewall-bridge2' },
            { id: 'bridge2', log: `6. Packet arrives at the destination network's bridge.`, delay: 1500, duration: 1.5, line: 'conn-bridge2-dest' },
            { id: 'destinationHost', log: `7. Packet arrived at the remote destination!`, delay: 1500 }
        );
        await animatePacket(differentSubnetPath);
    }

    setStatus('Simulation complete!');
    setIsSimulating(false);
  };


  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Network & Subnetting Simulator</h1>
        <p className="text-md md:text-lg text-gray-400">
          Watch a data packet travel across a network.
        </p>
      </header>

      <main className="bg-gray-800 p-4 md:p-6 rounded-2xl shadow-xl space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label htmlFor="sourceIp" className="text-gray-300">Source IP Address</Label>
                <Input id="sourceIp" value={sourceIp} onChange={e => setSourceIp(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="destinationIp" className="text-gray-300">Destination IP Address</Label>
                <Input id="destinationIp" value={destinationIp} onChange={e => setDestinationIp(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="subnetMask" className="text-gray-300">Subnet Mask</Label>
                <Input id="subnetMask" value={subnetMask} onChange={e => setSubnetMask(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="packetType" className="text-gray-300">Packet Type</Label>
                <Select value={packetType} onValueChange={setPacketType}>
                    <SelectTrigger id="packetType">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="http">HTTP Request</SelectItem>
                        <SelectItem value="ping">Ping</SelectItem>
                        <SelectItem value="torrent">Torrent (P2P)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          <div className="flex flex-col justify-center items-center space-y-4 col-span-1 lg:col-span-2">
            <div className="flex space-x-4">
              <Button onClick={startSimulation} disabled={isSimulating}>
                Start Simulation
              </Button>
              <Button onClick={resetSimulation} variant="secondary">
                Reset
              </Button>
            </div>
            <div className="text-center text-gray-300 min-h-[4rem]">{status}</div>
          </div>
        </div>

        <div className="network-topology mt-8 rounded-xl shadow-inner h-[300px] md:h-[500px]">
           {['conn-source-bridge1', 'conn-hostA-bridge1', 'conn-bridge1-router', 'conn-router-firewall', 'conn-firewall-bridge2', 'conn-bridge2-hostB', 'conn-bridge2-dest'].map(id => (
              <div key={id} ref={el => lineRefs.current[id] = el} className="connection-line" />
           ))}
            <div ref={deviceRefs.sourceHost} id="sourceHost" className="device host-device" style={{ left: '10%', top: '20%' }}>
                <span className="device-icon">💻</span>
                <span className="device-label">Source Host</span>
                <span className="device-ip">{sourceIp}</span>
            </div>
            <div ref={deviceRefs.hostA} id="hostA" className="device host-device" style={{ left: '10%', top: '60%' }}>
                <span className="device-icon">📱</span>
                <span className="device-label">Host A</span>
                <span className="device-ip">192.168.1.20</span>
            </div>
            <div ref={deviceRefs.bridge1} id="bridge1" className="device bridge-device" style={{ left: '30%', top: '40%' }}>
                <span className="device-icon">🌉</span>
                <span className="device-label">Bridge 1</span>
            </div>
            <div ref={deviceRefs.router} id="router" className="device router-device" style={{ left: '50%', top: '20%' }}>
                <span className="device-icon">🌐</span>
                <span className="device-label">Router</span>
            </div>
            <div ref={deviceRefs.firewall} id="firewall" className="device firewall-device" style={{ left: '70%', top: '20%' }}>
                <span className="device-icon">🔒</span>
                <span className="device-label">Firewall</span>
            </div>
            <div ref={deviceRefs.bridge2} id="bridge2" className="device bridge-device" style={{ left: '70%', top: '60%' }}>
                <span className="device-icon">🌉</span>
                <span className="device-label">Bridge 2</span>
            </div>
            <div ref={deviceRefs.hostB} id="hostB" className="device host-device" style={{ right: '10%', top: '50%' }}>
                <span className="device-icon">🖨️</span>
                <span className="device-label">Host B</span>
                <span className="device-ip">192.168.2.20</span>
            </div>
            <div ref={deviceRefs.destinationHost} id="destinationHost" className="device host-device" style={{ right: '10%', top: '80%' }}>
                <span className="device-icon">🖥️</span>
                <span className="device-label">Destination</span>
                <span className="device-ip">{destinationIp}</span>
            </div>

            <div id="internet" className="absolute inset-0 border-2 border-dashed border-gray-500 rounded-xl" style={{ left: '75%', top: '5%', width: '20%', height: '90%', zIndex: 1 }}>
                <p className="text-sm font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-500">The Internet</p>
            </div>
            {packetState.visible && (
                <div className="packet" style={{ transform: `translate(${packetState.x}px, ${packetState.y}px)` }}></div>
            )}
        </div>

        <div className="bg-gray-700 p-4 rounded-xl shadow-md mt-6">
          <h3 className="text-lg font-bold mb-2 text-white">Simulation Log:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            {logs.map((log, i) => <li key={i}>{log}</li>)}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default NetworkSimulator;
