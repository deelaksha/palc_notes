'use client';

import { RegexVisualizer } from '@/components/regex/RegexVisualizer';
import { useRegex } from '@/context/RegexContext';
import { motion } from 'framer-motion';

export default function RegexPracticalPage() {
    const { pattern, text, setPattern, setText } = useRegex();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col flex-1 items-center justify-center p-4 md:p-8 lg:p-12"
        >
            <RegexVisualizer
                initialPattern={pattern}
                initialText={text}
                onPatternChange={setPattern}
                onTextChange={setText}
            />
        </motion.div>
    );
}
