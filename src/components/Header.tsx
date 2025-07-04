'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUser } from '@clerk/nextjs';

const navItems = [
  { label: "Find Your Neighborhood", href: "/matching" },
  { label: "Review Your Area", href: "/review" },
  { label: "Find Places to Live", href: "/find" },
  { label: "Rankings", href: "/rankings" },
  { label: "Home Buying Tips", href: "/tips" },
];

function UserProfileAvatar() {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn || !user || !user.imageUrl) return null;
  return (
    <Link href="/user" className="ml-2">
      <img
        src={user.imageUrl}
        alt={user.fullName || 'Profile'}
        className="w-9 h-9 rounded-full border-2 border-blue-400 shadow-sm hover:ring-2 hover:ring-blue-400 transition"
        style={{ objectFit: 'cover' }}
      />
    </Link>
  );
}

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
      className={`w-full bg-gradient-to-r from-gray-900 via-slate-800 to-blue-900/90 backdrop-blur-md sticky top-0 z-50 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ paddingBottom: '3rem' }} // Make space for the wavy border
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-8 shadow-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl font-bold tracking-tight text-white transition-colors">
            NeighborFit
          </Link>
          {/* Show user profile image if signed in */}
          <UserProfileAvatar />
        </div>
        <div className="flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-full bg-slate-800/70 text-white hover:bg-blue-900/80 hover:text-blue-200 transition font-semibold shadow-none"
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
