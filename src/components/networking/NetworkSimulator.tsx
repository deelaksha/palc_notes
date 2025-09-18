
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
  const [destinationIp, setDestinationIp] = useState('192.168.2.30');
  const [subnetMask, setSubnetMask] = useState('255.255.255.0');
  const [packetType, setPacketType] = useState('http');
  const [status, setStatus] = useState('Enter details and click "Start Simulation".');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  
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
    hostA: useRef<HTMLDivElement>(null),
    bridge1: useRef<HTMLDivElement>(null),
    router1: useRef<HTMLDivElement>(null),
    router2: useRef<HTMLDivElement>(null),
    firewall: useRef<HTMLDivElement>(null),
    bridge2: useRef<HTMLDivElement>(null),
    hostB: useRef<HTMLDivElement>(null),
    destinationHost: useRef<HTMLDivElement>(null),
  };
  
  const deviceData = {
      sourceHost: { name: 'Source Host', mac: 'AA:..:01', ip: '192.168.1.10' },
      hostA: { name: 'Host A', mac: 'AA:..:02', ip: '192.168.1.20' },
      bridge1: { name: 'Bridge 1', mac: ''},
      router1: { name: 'Router 1', mac: 'R1:..:A1', mac2: 'R1:..:B1', ip: '192.168.1.1' },
      router2: { name: 'Router 2', mac: 'R2:..:A1', mac2: 'R2:..:B1', ip: '10.0.0.1' },
      firewall: { name: 'Firewall', mac: 'F1:..:01'},
      bridge2: { name: 'Bridge 2', mac: ''},
      hostB: { name: 'Host B', mac: 'DD:..:02', ip: '192.168.2.20' },
      destinationHost: { name: 'Destination Host', mac: 'DD:..:01', ip: '192.168.2.30' },
  };

  const routingTables = {
    router1: { '10.0.0.0/8': 'router2', '0.0.0.0/0': 'router2' },
    router2: { '192.168.2.0/24': 'firewall', '0.0.0.0/0': 'firewall' },
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
  
  const addLog = (message: string) => {
    setSimulationLog(prev => [...prev, message]);
  }

  const drawLines = () => {
    const connections = [
      { from: 'sourceHost', to: 'bridge1', id: 'conn-source-bridge1' },
      { from: 'hostA', to: 'bridge1', id: 'conn-hostA-bridge1' },
      { from: 'bridge1', to: 'router1', id: 'conn-bridge1-router1' },
      { from: 'router1', to: 'router2', id: 'conn-router1-router2' },
      { from: 'router2', to: 'firewall', id: 'conn-router2-firewall' },
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
        addLog(step.log);
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
    setSimulationLog([]);
    setIsSimulating(false);
    setPacketState({ visible: false, x: 0, y: 0, sourceMac: '', destMac: '' });
    Object.values(deviceRefs).forEach(ref => ref.current?.classList.remove('pulse-animation'));
    Object.values(lineRefs.current).forEach(line => line?.classList.remove('path-active'));
    setCurrentRouterId(null);
  };

  const ipToBinary = (ip: string) => ip.split('.').map(octet => parseInt(octet, 10).toString(2).padStart(8, '0')).join('');

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
        networkBinary += (ipBinary[i] === '1' && maskBinary[i] === '1') ? '1' : '0';
    }
    return networkBinary;
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

    const sourceDeviceKey = Object.keys(deviceData).find(key => deviceData[key as keyof typeof deviceData].ip === sourceIp) || 'sourceHost';
    
    const sourcePos = getDevicePos(sourceDeviceKey as keyof typeof deviceRefs);
    setPacketState({
        visible: true,
        x: sourcePos.x - 10,
        y: sourcePos.y - 10,
        sourceMac: deviceData[sourceDeviceKey as keyof typeof deviceData].mac,
        destMac: deviceData.router1.mac,
    });
    
    const isBlocked = packetType === 'torrent';
    const sourceNetworkId = getNetworkId(sourceIp, subnetMask);
    const destNetworkId = getNetworkId(destinationIp, subnetMask);
    const isSameSubnet = sourceNetworkId === destNetworkId;

    let path;

    if (isSameSubnet) {
        const destDeviceKey = Object.keys(deviceData).find(key => deviceData[key as keyof typeof deviceData].ip === destinationIp) || 'hostA';
        path = [
            { id: sourceDeviceKey, log: '1. Source Host finds destination is on the same local network.', delay: 2000, duration: 1.5, line: 'conn-source-bridge1', sourceMac: deviceData[sourceDeviceKey as keyof typeof deviceData].mac, destMac: deviceData[destDeviceKey as keyof typeof deviceData].mac },
            { id: 'bridge1', log: '2. Bridge forwards the frame directly to the destination MAC address.', delay: 2000, duration: 1.5, line: 'conn-hostA-bridge1' },
            { id: destDeviceKey, log: '3. Packet arrives at destination on the same LAN.', delay: 2000 }
        ]
        await animatePacket(path);
    } else {
        path = [
            { id: sourceDeviceKey, log: `1. Source (${sourceIp}) determines the destination (${destinationIp}) is on a different network.`, delay: 2000, duration: 1.5, line: 'conn-source-bridge1', sourceMac: deviceData[sourceDeviceKey as keyof typeof deviceData].mac, destMac: deviceData.router1.mac },
            { id: 'bridge1', log: '2. Packet is sent to the default gateway (Router 1) via the local bridge.', delay: 2000, duration: 1.5, line: 'conn-bridge1-router1', sourceMac: deviceData[sourceDeviceKey as keyof typeof deviceData].mac, destMac: deviceData.router1.mac },
            { id: 'router1', routerId: 'router1', log: '3. Router 1 receives the packet. It strips the old MAC header, consults its routing table, and adds a new MAC header for the next hop (Router 2).', delay: 2500, duration: 1.5, line: 'conn-router1-router2', sourceMac: deviceData.router1.mac2, destMac: deviceData.router2.mac },
            { id: 'router2', routerId: 'router2', log: '4. Router 2 receives. It repeats the process: checks its routing table and forwards the packet to the next hop (Firewall), updating MAC addresses again.', delay: 2500, duration: 1.5, line: 'conn-router2-firewall', sourceMac: deviceData.router2.mac2, destMac: deviceData.firewall.mac },
            { id: 'firewall', log: `5. The Firewall inspects the packet to see if it's allowed.`, delay: 1500 }
        ];

        if (isBlocked) {
            path.push({ id: 'firewall', log: `6. FIREWALL BLOCK: ${packetType.toUpperCase()} traffic is not allowed. The packet is dropped and cannot continue.`, delay: 1500 });
            await animatePacket(path);
        } else {
             const destDeviceKey = Object.keys(deviceData).find(key => deviceData[key as keyof typeof deviceData].ip === destinationIp) || 'destinationHost';
            path.push(
                { id: 'firewall', log: `6. Firewall allows the packet through and sends it to Bridge 2.`, delay: 1500, duration: 1.5, line: 'conn-firewall-bridge2', sourceMac: deviceData.firewall.mac, destMac: deviceData.bridge2.mac },
                { id: 'bridge2', log: '7. Bridge 2 receives the packet on the destination local network and forwards it to the final host.', delay: 1500, duration: 1.5, line: 'conn-bridge2-dest', sourceMac: deviceData.firewall.mac, destMac: deviceData[destDeviceKey as keyof typeof deviceData].mac },
                { id: destDeviceKey, log: '8. Packet has arrived at the destination!', delay: 2000 }
            );
            await animatePacket(path);
        }
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
           {['conn-source-bridge1', 'conn-hostA-bridge1', 'conn-bridge1-router1', 'conn-router1-router2', 'conn-router2-firewall', 'conn-firewall-bridge2', 'conn-bridge2-hostB', 'conn-bridge2-dest'].map(id => (
              <div key={id} ref={el => lineRefs.current[id] = el} className="connection-line" />
           ))}
            <div ref={deviceRefs.sourceHost} className="device host-device" style={{ left: '10%', top: '20%' }}>
                <span className="device-icon">💻</span>
                <span className="device-label">Source Host</span>
                 <span className="device-ip">{deviceData.sourceHost.ip}</span>
            </div>
            <div ref={deviceRefs.hostA} className="device host-device" style={{ left: '10%', top: '60%' }}>
                <span className="device-icon">📱</span>
                <span className="device-label">Host A</span>
                <span className="device-ip">{deviceData.hostA.ip}</span>
            </div>
            <div ref={deviceRefs.bridge1} className="device bridge-device" style={{ left: '30%', top: '40%' }}>
                <span className="device-icon">🌉</span>
                <span className="device-label">Bridge 1</span>
            </div>
            <div ref={deviceRefs.router1} className="device router-device" style={{ left: '50%', top: '20%' }}>
                <span className="device-icon">🌐</span>
                <span className="device-label">Router 1</span>
            </div>
             <div ref={deviceRefs.router2} className="device router-device" style={{ left: '50%', top: '80%' }}>
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
            <div ref={deviceRefs.hostB} className="device host-device" style={{ right: '5%', top: '20%' }}>
                <span className="device-icon">🖨️</span>
                <span className="device-label">Host B</span>
                <span className="device-ip">{deviceData.hostB.ip}</span>
            </div>
            <div ref={deviceRefs.destinationHost} className="device host-device" style={{ right: '5%', top: '80%' }}>
                <span className="device-icon">🖥️</span>
                <span className="device-label">Dest Host</span>
                <span className="device-ip">{deviceData.destinationHost.ip}</span>
            </div>

            {packetState.visible && (
                <div className="packet" style={{ transform: `translate(${packetState.x}px, ${packetState.y}px)` }}></div>
            )}
        </div>
      </main>
      
      <div className="bg-gray-700 p-4 rounded-xl shadow-md mt-6">
        <h3 className="text-lg font-bold mb-2 text-white">Simulation Log:</h3>
        <ul id="logList" className="list-decimal list-inside space-y-1 text-gray-300 text-sm">
            {simulationLog.map((log, index) => (
                <li key={index}>{log.substring(log.indexOf('.') + 2)}</li>
            ))}
        </ul>
      </div>
        
      <div className="bg-gray-700 p-4 rounded-xl shadow-md mt-6">
          <h3 className="text-lg font-bold mb-2 text-white">Network Device Roles</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>**Host:** An end-point device on the network that sends and receives data (e.g., your computer, a server).</li>
              <li>**Bridge:** A Layer 2 device that forwards data based on hardware MAC addresses. It connects devices on the *same local network*.</li>
              <li>**Router:** A Layer 3 device that directs data packets *between different networks* based on logical IP addresses. It's the "gateway" to other networks.</li>
              <li>**Firewall:** A security device that inspects network traffic and blocks or allows it based on a set of security rules.</li>
          </ul>
      </div>

    </div>
  );
};

export default NetworkSimulator;
