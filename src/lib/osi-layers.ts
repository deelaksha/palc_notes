
export type OsiLayerData = {
    layerNumber: number;
    name: 'Application' | 'Presentation' | 'Session' | 'Transport' | 'Network' | 'Data Link' | 'Physical';
    slug: string;
    summary: string;
    color: string;
    responsibilities: string[];
    protocols: string[];
    realWorldExample: string;
};

export const osiLayersData: OsiLayerData[] = [
  { 
    layerNumber: 7,
    name: 'Application', 
    slug: 'application',
    color: 'bg-red-500', 
    summary: 'Provides network services directly to end-user applications.',
    responsibilities: [
        'Identifying communication partners.',
        'Determining resource availability.',
        'Synchronizing communication.'
    ],
    protocols: ['HTTP', 'FTP', 'SMTP', 'DNS', 'Telnet'],
    realWorldExample: 'When you type "google.com" into your web browser, the browser (an application) uses the HTTP protocol at this layer to request the webpage.'
  },
  { 
    layerNumber: 6,
    name: 'Presentation', 
    slug: 'presentation',
    color: 'bg-orange-500', 
    summary: 'Translates, encrypts, and compresses data.',
    responsibilities: [
        'Data translation (e.g., from ASCII to EBCDIC).',
        'Data encryption and decryption for security.',
        'Data compression to reduce the number of bits to be transmitted.'
    ],
    protocols: ['SSL', 'TLS', 'JPEG', 'MPEG', 'ASCII'],
    realWorldExample: 'When you securely connect to your bank\'s website (HTTPS), the Presentation layer handles the SSL/TLS encryption and decryption of your login credentials.'
  },
  { 
    layerNumber: 5,
    name: 'Session',
    slug: 'session',
    color: 'bg-yellow-500', 
    summary: 'Manages sessions between applications.',
    responsibilities: [
        'Establishing, managing, and terminating connections (sessions).',
        'Synchronization of data transfer with checkpoints.',
        'Dialogue control (determining which side transmits, when, for how long).'
    ],
    protocols: ['NetBIOS', 'PPTP', 'RPC', 'PAP'],
    realWorldExample: 'When you are on a video conference call, the Session layer ensures the audio and video streams are synchronized and the connection between you and the other participants is maintained.'
  },
  { 
    layerNumber: 4,
    name: 'Transport', 
    slug: 'transport',
    color: 'bg-green-500', 
    summary: 'Provides reliable data transfer, flow control, and error correction.',
    responsibilities: [
        'Segmenting data from the Session layer.',
        'Ensuring reliable end-to-end communication (TCP).',
        'Providing connectionless, best-effort delivery (UDP).',
        'Flow control to avoid overwhelming the receiver.'
    ],
    protocols: ['TCP', 'UDP'],
    realWorldExample: 'When you download a large file, TCP at the Transport layer breaks the file into numbered segments and ensures every single one arrives correctly and in order. If a segment is lost, TCP requests it again.'
  },
  { 
    layerNumber: 3,
    name: 'Network',
    slug: 'network',
    color: 'bg-blue-500', 
    summary: 'Handles logical addressing, routing, and packet forwarding.',
    responsibilities: [
        'Assigning logical addresses (IP addresses) to devices.',
        'Routing packets from source to destination across multiple networks.',
        'Controlling traffic congestion.'
    ],
    protocols: ['IP', 'ICMP', 'IGMP', 'ARP'],
    realWorldExample: 'When you send an email, a router uses the IP address on the data packet at the Network layer to determine the best path to send it across the internet to the destination mail server.'
  },
  { 
    layerNumber: 2,
    name: 'Data Link', 
    slug: 'data-link',
    color: 'bg-indigo-500', 
    summary: 'Manages physical addressing, error detection, and framing.',
    responsibilities: [
        'Framing: packaging bits into frames.',
        'Physical addressing (MAC addresses).',
        'Error detection and correction within a single network segment.',
        'Flow control on the physical medium.'
    ],
    protocols: ['Ethernet', 'PPP', 'HDLC', 'VLAN'],
    realWorldExample: 'Your computer\'s network card has a unique MAC address. The Data Link layer uses this address to send data frames directly to another device on your local Wi-Fi or wired network.'
  },
  { 
    layerNumber: 1,
    name: 'Physical', 
    slug: 'physical',
    color: 'bg-purple-500', 
    summary: 'Transmits raw bits over a physical medium.',
    responsibilities: [
        'Defining physical characteristics of the network (cables, connectors, voltages).',
        'Transmitting raw bits as electrical, light, or radio signals.',
        'Defining the bit rate and synchronization.'
    ],
    protocols: ['Ethernet (cables)', 'RS-232', 'USB', 'Bluetooth (radio)'],
    realWorldExample: 'An Ethernet cable carrying electrical signals, or Wi-Fi transmitting radio waves, are operating at the Physical layer. This layer is all about the actual hardware that moves the 1s and 0s.'
  },
];
