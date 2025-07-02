'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";

const navItems = [
  { label: "Find Your Neighborhood", href: "/matching" },
  { label: "Review Your Area", href: "/review" },
  { label: "Find Places to Live", href: "/find" },
  { label: "Rankings", href: "/rankings" },
  { label: "Home Buying Tips", href: "/tips" },
];

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full bg-amber-50 backdrop-blur-md sticky top-0 z-50 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ paddingBottom: '3rem' }} // Make space for the wavy border
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        <Link href="/" className="text-2xl font-bold tracking-tight hover:text-amber-700 transition-colors bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-700">
          NeighborFit
        </Link>
        <div className="flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-full text-amber-700 hover:bg-amber-100 hover:text-amber-800 transition-colors font-medium text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      {/* Wavy Border SVG - More frequent downward semi-circles */}
      <svg className="absolute bottom-0 left-0 w-full h-12 fill-stone-700 z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 96" preserveAspectRatio="none">
        <path d="M0,48 Q120,96 240,48 T480,48 T720,48 T960,48 T1200,48 T1440,48 V96 H0 Z"></path>
      </svg>
    </nav>
  );
}
