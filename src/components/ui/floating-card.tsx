'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient' | 'minimal';
  hover?: boolean;
  delay?: number;
}

export function FloatingCard({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  delay = 0
}: FloatingCardProps) {
  const variants = {
    default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg',
    glass: 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-2xl',
    gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200/50 dark:border-gray-700/50 shadow-xl',
    minimal: 'bg-gray-50/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 shadow-sm'
  };

  return (
    <motion.div
      className={cn(
        'rounded-xl p-6 transition-all duration-300',
        variants[variant],
        hover && 'hover:shadow-2xl hover:-translate-y-1',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: [0.6, -0.05, 0.01, 0.99]
      }}
      whileHover={hover ? { 
        y: -4,
        transition: { duration: 0.2 }
      } : {}}
    >
      {children}
    </motion.div>
  );
} 