'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

const bootLines = [
  'Initializing NEXUS AI Core...',
  'Loading neural networks...',
  'Mounting data engines...',
  'Establishing secure connection...',
  'Calibrating visualization modules...',
  'Systems operational.',
];

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= bootLines.length - 1) {
          clearInterval(interval);
          setTimeout(() => setShowLogo(true), 400);
          setTimeout(onComplete, 2500);
          return prev;
        }
        return prev + 1;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-nexus-bg flex items-center justify-center">
      <div className="w-full max-w-2xl px-8">
        {/* Terminal */}
        <div className="font-mono text-sm space-y-2 mb-12">
          {bootLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: index <= currentLine ? 1 : 0.3, x: 0 }}
              className="flex items-center gap-3"
            >
              <span className="text-nexus-secondary">{'>'}</span>
              <span className={index <= currentLine ? 'text-nexus-primary' : 'text-nexus-textMuted'}>
                {line}
              </span>
              {index === currentLine && index < bootLines.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-2 h-4 bg-nexus-primary"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Logo */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center pt-8 border-t border-white/10"
            >
              <motion.h1
                className="text-6xl font-bold mb-3"
                style={{
                  background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                NEXUS
              </motion.h1>
              <p className="text-nexus-textMuted tracking-[0.2em] text-sm uppercase">
                Conversational Intelligence
              </p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-1.5 mt-8"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-nexus-primary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}