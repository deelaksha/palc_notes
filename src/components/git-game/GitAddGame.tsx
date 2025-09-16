
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { File, GitBranch, Inbox, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const initialFiles = [
  { id: 1, name: 'index.html', status: 'modified' },
  { id: 2, name: 'styles.css', status: 'new' },
  { id: 3, name: 'app.js', status: 'modified' },
  { id: 4, name: 'README.md', status: 'unmodified' },
];

const FileItem = ({ file, onAdd }: { file: any; onAdd: (id: number) => void }) => {
    const isUntracked = file.status !== 'unmodified';
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-between p-3 rounded-lg glass-effect border border-white/10 ${isUntracked ? 'hover:bg-accent-purple/30' : 'opacity-60'}`}
        >
            <div className="flex items-center gap-3">
                <File className={`h-5 w-5 ${file.status === 'new' ? 'text-neon-green' : 'text-neon-blue'}`} />
                <span className="font-mono text-sm">{file.name}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                    file.status === 'modified' ? 'bg-blue-500/50' : 
                    file.status === 'new' ? 'bg-green-500/50' : 'bg-gray-500/50'
                }`}>
                    {file.status}
                </span>
            </div>
            {isUntracked && (
                <Button size="sm" variant="ghost" onClick={() => onAdd(file.id)} className="text-neon-green hover:bg-neon-green/20 hover:text-white">
                    add
                </Button>
            )}
        </motion.div>
    );
};

export function GitAddGame() {
  const [workingFiles, setWorkingFiles] = useState(initialFiles);
  const [stagedFiles, setStagedFiles] = useState<any[]>([]);

  const handleAddFile = (id: number) => {
    const fileToAdd = workingFiles.find(f => f.id === id);
    if (fileToAdd) {
      setStagedFiles(prev => [...prev, { ...fileToAdd, status: 'staged' }]);
      setWorkingFiles(prev => prev.filter(f => f.id !== id));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
      {/* Working Directory */}
      <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50">
        <div className="flex items-center gap-3 mb-4">
          <Inbox className="h-6 w-6 text-neon-pink" />
          <h2 className="text-xl font-bold">Working Directory</h2>
        </div>
        <p className="text-xs text-gray-400 mb-4">Files you have modified. Use `git add` to stage them.</p>
        <div className="space-y-3">
          <AnimatePresence>
            {workingFiles.map(file => (
              <FileItem key={file.id} file={file} onAdd={handleAddFile} />
            ))}
          </AnimatePresence>
          {workingFiles.length === 0 && <p className="text-center text-gray-500 text-sm py-4">No changes to add.</p>}
        </div>
      </div>

      {/* Action */}
      <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8 lg:py-0">
         <code className="text-neon-green text-lg font-bold p-3 bg-black/30 rounded-lg">git add {'<file>'}</code>
         <ArrowRight className="h-12 w-12 text-white/50 animate-pulse" />
      </div>

      {/* Staging Area */}
      <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="h-6 w-6 text-neon-green" />
          <h2 className="text-xl font-bold">Staging Area (Index)</h2>
        </div>
         <p className="text-xs text-gray-400 mb-4">Changes that are ready to be included in the next commit.</p>
        <div className="space-y-3 min-h-[200px]">
           <AnimatePresence>
            {stagedFiles.map(file => (
               <motion.div
                    key={file.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/30"
                >
                    <File className="h-5 w-5 text-neon-green" />
                    <span className="font-mono text-sm">{file.name}</span>
                </motion.div>
            ))}
          </AnimatePresence>
          {stagedFiles.length === 0 && <p className="text-center text-gray-500 text-sm py-16">The staging area is empty.</p>}
        </div>
      </div>
    </div>
  );
}
