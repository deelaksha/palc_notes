'use client';

import { useState } from 'react';
import Link from 'next/link';
import { commandsData } from '@/lib/linux-commands';
import { Input } from '@/components/ui/input';

export default function LinuxPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCommands = commandsData.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-code mb-2">
          Linux Command Quest
        </h1>
        <p className="text-lg text-muted-foreground">
          Unlock the terminal's secrets. Click a command to begin your quest.
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
        <div
          id="command-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {filteredCommands.map((command, index) => (
            <Link
              href={`/linux/${command.name}`}
              key={command.name}
              className="command-card-container group"
            >
              <div className="bg-card rounded-xl p-6 shadow-lg border border-border hover:border-primary hover:shadow-primary/20 transition-all duration-300 h-full">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-muted-foreground/50 opacity-50 font-code">
                    {index + 1}.
                  </span>
                  <h2 className="text-3xl font-semibold text-foreground font-code mr-auto ml-4">
                    {command.name}
                  </h2>
                </div>
              </div>
            </Link>
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
