
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Lightbulb } from 'lucide-react';

const simulationData = {
  "task": "ARU-PALC Training Network Simulation",
  "context": "The user is working on network simulation using the ARU-PALC repository and wants to set up and run the scripts to capture and analyze network traffic. The environment variable USERNAME is set to ensure user-specific files are created.",
  "steps": [
    {
      "step": 1,
      "title": "Clone the repository",
      "commands": [
        "git clone <repository-url-for-aru-palc-training>"
      ],
      "description": "Clone the ARU-PALC Training repository to your local machine."
    },
    {
      "step": 2,
      "title": "Navigate to the example folder",
      "commands": [
        "cd aru-palc/ex1"
      ],
      "description": "Move into the 'ex1' folder where the simulation scripts are located."
    },
    {
      "step": 3,
      "title": "Set the USERNAME environment variable",
      "commands": [
        "nano ~/.nashrc",
        "export USERNAME=deelaksha"
      ],
      "description": "Add the environment variable to the .nashrc file so that files created during simulation automatically include the username."
    },
    {
      "step": 4,
      "title": "Run the capture script",
      "commands": [
        "./ns-capture.sh",
        "./ns-capture.sh deelaksha"
      ],
      "description": "Start capturing network traffic. Optionally pass your username as an argument."
    },
    {
      "step": 5,
      "title": "Run the ping script in a new terminal",
      "commands": [
        "./ns-ping.sh"
      ],
      "description": "Run this script in another terminal window to display all connected devices with their MAC and IP addresses."
    },
    {
      "step": 6,
      "title": "Analyze the captured file",
      "commands": [
        "wireshark ex1-deelaksha.pcap"
      ],
      "description": "After running both scripts, open the .pcap file in Wireshark to view detailed network traffic data."
    },
    {
      "step": 7,
      "title": "Clean up the environment",
      "commands": [
        "./ns-clean.sh"
      ],
      "description": "Stop the simulation and clean up temporary files created during the process."
    }
  ],
  "additional_notes": "Ensure that 'ns-capture.sh' is run before 'ns-ping.sh' so that traffic is properly recorded. The username helps track which files belong to which session."
};

export default function NetworkSimulationPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
          {simulationData.task}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {simulationData.context}
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-8">
        {simulationData.steps.map((step) => (
          <Card key={step.step}>
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  {step.step}
                </span>
                {step.title}
              </CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {step.commands.map((cmd, index) => (
                <CodeBlock key={index}>{cmd}</CodeBlock>
              ))}
            </CardContent>
          </Card>
        ))}
        
        <Card className="bg-card-nested border-l-4 border-l-yellow-400">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                    <Lightbulb className="size-5" />
                    Additional Notes
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{simulationData.additional_notes}</p>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
