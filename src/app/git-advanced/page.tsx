'use client';

import { useState } from 'react';
import Link from 'next/link';
import { gitAdvancedCommandsData } from '@/lib/git-advanced-commands';
import { Input } from '@/components/ui/input';

type GroupedCommands = {
  [key: string]: typeof gitAdvancedCommandsData;
};

export default function GitAdvancedPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCommands = gitAdvancedCommandsData.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    const { category } = command;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(command);
    return acc;
  }, {} as GroupedCommands);

  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-code mb-2">
          Advanced Git Cheatsheet
        </h1>
        <p className="text-lg text-muted-foreground">
          Unlock the next level of Git mastery. Click a command to see details.
        </p>
      </header>

      <div className="mb-8 max-w-4xl mx-auto">
        <Input
          type="text"
          id="searchInput"
          placeholder="Search commands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-3 rounded-xl bg-card text-foreground border-border focus:ring-2 focus:ring-ring"
        />
      </div>

      {filteredCommands.length > 0 ? (
        <div className="max-w-4xl mx-auto space-y-12">
          {Object.entries(groupedCommands).map(([category, commands]) => (
            <section key={category}>
              <h2 className="text-2xl font-headline font-bold mb-6 pb-2 border-b">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {commands.map((command) => (
                  <Link
                    href={`/git-advanced/${command.name.replace(/\s+/g, '-')}`}
                    key={command.name}
                    className="command-card-container group"
                  >
                    <div className="bg-card rounded-lg p-4 shadow-md border border-border hover:border-primary hover:shadow-primary/10 transition-all duration-300 h-full flex items-center justify-center">
                      <h3 className="text-xl font-semibold text-foreground font-code">
                        {command.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div id="no-results" className="text-center py-16">
          <h2 className="text-2xl font-semibold text-muted-foreground">
            No Commands Found
          </h2>
          <p className="text-muted-foreground/80 mt-2">
            Try adjusting your search query.
          </p>
        </div>
      )}
    </main>
  );
}
