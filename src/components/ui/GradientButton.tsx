'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function GradientButton({ 
  children, 
  className, 
  onClick, 
  disabled,
  size = 'md'
}: GradientButtonProps) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative overflow-hidden rounded-xl font-semibold',
        'bg-gradient-to-r from-nexus-primary to-nexus-secondary',
        'text-nexus-bg transition-all duration-300',
        'hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed',
        sizes[size],
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}