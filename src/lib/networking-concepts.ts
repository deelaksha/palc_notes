
export type NetworkingConcept = {
    name: string;
    slug: string;
    description: string;
    howItWorks: string[];
    analogy: string;
    examples: { title: string; text: string }[];
    realWorld: string;
};

export const networkingConceptsData: NetworkingConcept[] = [
    {
        name: "IP Address",
        slug: "ip-address",
        description: "An IP (Internet Protocol) address is a unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. It serves two main functions: host or network interface identification and location addressing.",
        howItWorks: [
            "Think of it as your house's mailing address. It tells the internet where to send data packets.",
            "There are two main versions: IPv4 (e.g., 192.168.1.1) and IPv6 (a much longer format).",
            "IP addresses can be public (globally unique on the internet) or private (unique only within your local network, like your home Wi-Fi).",
            "Routers use IP addresses to forward packets from one network to another until they reach their final destination."
        ],
        analogy: "An IP address is like the **mailing address on an envelope**. It doesn't care who inside the house gets the letter, only that it gets to the right house (computer) in the right city (network).",
        examples: [
            {
                title: "Public IP Address",
                text: "Your internet service provider (ISP) assigns you a public IP address. You can find yours by searching 'What is my IP address?' on Google. This is how servers on the internet send data back to you."
            },
            {
                title: "Private IP Address",
                text: "Your home router assigns private IP addresses (like 192.168.1.101) to your phone, laptop, and smart TV. These are only used within your home network."
            }
        ],
        realWorld: "When you type `google.com` into your browser, your computer sends a request packet with Google's public IP address as the destination. Google's servers then use your public IP address as the destination to send the website data back to you."
    },
    {
        name: "MAC Address",
        slug: "mac-address",
        description: "A MAC (Media Access Control) address is a unique identifier assigned to a network interface controller (NIC) for use as a network address in communications within a network segment. It's a hardware address burned into your network card.",
        howItWorks: [
            "Think of it as a device's unique serial number or fingerprint.",
            "It's a 48-bit address, typically written as six groups of two hexadecimal digits (e.g., 00:1A:2B:3C:4D:5E).",
            "MAC addresses are used for communication between devices on the *same local network* (like your home Wi-fi).",
            "A network switch, which connects devices on a local network, uses MAC addresses to forward data frames to the correct device."
        ],
        analogy: "A MAC address is like a person's **first and last name**. Within a single house (local network), you can deliver a letter directly to 'John Smith'. But to send it to another house, you first need the house's mailing address (IP address).",
        examples: [
            {
                title: "Wi-Fi Connection",
                text: "When your phone connects to your home Wi-Fi, it tells the router its MAC address. The router keeps a table of all connected devices and their MAC addresses to send data to the right place."
            },
            {
                title: "Ethernet Switch",
                text: "In an office, when one computer sends data to another, the data frame contains the destination MAC address. The office switch reads this and sends the frame only to the port connected to that specific computer."
            }
        ],
        realWorld: "MAC addresses are used by the Data Link Layer (Layer 2) of the OSI model. They ensure that data packets, once they've arrived at the correct local network via an IP address, get delivered to the specific, correct device."
    },
    {
        name: "Port Number",
        slug: "port-number",
        description: "A port number is a 16-bit number used to identify a specific process or application to which network messages should be forwarded when they arrive at a server or client. It acts like an apartment number for a computer.",
        howItWorks: [
            "A computer has one IP address, but can be running many network applications at once (web browser, email, music streaming).",
            "When data arrives at the computer's IP address, the port number tells the operating system which application to give the data to.",
            "Port numbers range from 0 to 65535.",
            "Ports 0-1023 are 'well-known ports' reserved for standard services (e.g., Port 80 for HTTP, Port 443 for HTTPS)."
        ],
        analogy: "If an IP address is the address of an apartment building, the port number is the **specific apartment number**. The mail carrier (router) gets the letter to the building (IP address), but the building manager (operating system) needs the apartment number (port) to deliver it to the right resident (application).",
        examples: [
            {
                title: "Web Browsing",
                text: "When your browser requests a secure website, it sends the request to the server's IP address on port 443 (the standard port for HTTPS)."
            },
            {
                title: "Sending Email",
                text: "An email client might send an email using the SMTP protocol, which typically uses port 25 or 587 on the mail server."
            }
        ],
        realWorld: "Port numbers are used by the Transport Layer (Layer 4) of the OSI model. They allow a single host to provide many different services simultaneously. This is why you can browse the web, check your email, and be on a video call all at the same time."
    }
];
