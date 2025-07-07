'use client';

import { useState, useEffect } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { href: '/find', label: 'Find Homes' },
    { href: '/matching', label: 'Matching' },
    { href: '/review', label: 'Reviews' }
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-zinc-800' 
          : 'bg-black/80 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between h-12 sm:h-14">
          {/* Logo - Responsive */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <motion.div 
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Home className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.div>
            <motion.span 
              className="font-bold text-lg sm:text-xl text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              NeighborFit
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item, index) => (
              <motion.div key={item.href} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Link href={item.href} className="relative">
                  <motion.span
                    className={`font-medium text-sm lg:text-base transition-colors ${
                      pathname === item.href 
                        ? 'text-blue-500' 
                        : 'text-zinc-300 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                  {pathname === item.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Auth Section - Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {isSignedIn ? (
              <motion.div 
                className="flex items-center space-x-2 lg:space-x-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.span 
                  className="text-sm text-zinc-400 hidden xl:inline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Welcome, {user?.firstName}!
                </motion.span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8 sm:w-9 sm:h-9"
                      }
                    }}
                  />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link href="/sign-in">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white hover:bg-zinc-800 text-sm px-3 lg:px-4">
                      Sign In
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/sign-up">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="sm" 
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 lg:px-4"
                    >
                      <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                      <span className="hidden lg:inline">Get Started</span>
                      <span className="lg:hidden">Start</span>
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation - Enhanced */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 py-4 border-t border-zinc-800"
            >
              <nav className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={item.href}
                      className={`block py-3 px-4 rounded-lg transition-colors text-base ${
                        pathname === item.href 
                          ? 'text-blue-500 bg-zinc-800/50' 
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Auth Section */}
                {isSignedIn ? (
                  <motion.div 
                    className="pt-4 border-t border-zinc-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center space-x-3 px-4 py-3">
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: "w-10 h-10"
                          }
                        }}
                      />
                      <div>
                        <p className="text-white font-medium">Welcome back!</p>
                        <p className="text-zinc-400 text-sm">{user?.firstName}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="flex flex-col space-y-3 pt-4 border-t border-zinc-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="default" className="w-full text-zinc-300 hover:text-white hover:bg-zinc-800 justify-start text-base py-3">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                      <Button size="default" className="w-full bg-blue-500 hover:bg-blue-600 text-white justify-start text-base py-3">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Get Started
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
