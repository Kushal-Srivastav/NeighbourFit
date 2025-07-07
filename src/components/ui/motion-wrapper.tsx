'use client';

import { 
  motion as framerMotion,
  AnimatePresence as FramerAnimatePresence
} from 'framer-motion';

// Re-export with named exports to avoid client boundary issues
export const motion = framerMotion;
export const AnimatePresence = FramerAnimatePresence;

export default motion; 