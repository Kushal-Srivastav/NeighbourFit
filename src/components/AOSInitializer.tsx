// src/components/AOSInitializer.tsx
'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS

export default function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      // You can add global settings here
          // such as duration, once, etc.
          duration: 800, // values from 0 to 3000, with step 50ms
          once: false, // whether animation should happen only once - while scrolling down
        });
  }, []);

  return null; // This component doesn't render anything itself
}