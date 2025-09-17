
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

const apiResponse = `{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz"
}`;

const CurlGame = () => {
    const [output, setOutput] = useState('');
    const [showHeaders, setShowHeaders] = useState(false);

    const handleCurl = (headersOnly: boolean) => {
        setShowHeaders(headersOnly);
        if (headersOnly) {
            setOutput(`HTTP/1.1 200 OK
Date: ${new Date().toUTCString()}
Content-Type: application/json; charset=utf-8`);
        } else {
            setOutput(apiResponse);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><Cloud/> `curl` Controls</h2>
                <p className="text-xs text-gray-400">Simulate fetching data from a JSON API.</p>
                <Button onClick={() => handleCurl(false)} className="w-full">curl .../users/1</Button>
                <Button onClick={() => handleCurl(true)} className="w-full">curl -I .../users/1</Button>
            </div>
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                 <h2 className="text-xl font-bold text-neon-blue mb-4 flex items-center gap-2"><Terminal/> Output</h2>
                <div className="bg-dark-primary p-4 rounded-lg font-mono text-xs min-h-[200px]">
                    <AnimatePresence>
                        <motion.pre
                             key={output}
                             initial={{opacity: 0}}
                             animate={{opacity: 1}}
                             className={`whitespace-pre-wrap ${showHeaders ? 'text-amber-400' : 'text-neon-green'}`}
                        >
                            {output}
                        </motion.pre>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export { CurlGame };
