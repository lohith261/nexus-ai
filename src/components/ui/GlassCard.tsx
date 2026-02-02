'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'cyan' | 'purple' | 'none';
  onClick?: () => void;
}

export function GlassCard({ 
  children, 
  className, 
  hover = true, 
  glow = 'none',
  onClick 
}: GlassCardProps) {
  const glowStyles = {
    cyan: 'hover:shadow-glow hover:border-nexus-primary/30',
    purple: 'hover:shadow-purple-glow hover:border-nexus-secondary/30',
    none: '',
  };

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      className={cn(
        'glass rounded-2xl p-6 transition-all duration-500',
        glowStyles[glow],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}