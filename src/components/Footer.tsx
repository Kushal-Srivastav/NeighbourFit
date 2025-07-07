'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  MapPin, 
  Star, 
  Search, 
  BookOpen, 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { name: 'Find Neighborhoods', href: '/matching', icon: MapPin },
    { name: 'Review Areas', href: '/review', icon: Star },
    { name: 'Find Places', href: '/find', icon: Search },
    { name: 'Rankings', href: '/rankings', icon: BookOpen },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/story' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
  ];

  const resourceLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'API Documentation', href: '/api' },
    { name: 'Methodology', href: '/methodology' },
    { name: 'Data Sources', href: '/data' },
    { name: 'Community', href: '/community' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Security', href: '/security' },
  ];

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/neighborfit', icon: Twitter },
    { name: 'Facebook', href: 'https://facebook.com/neighborfit', icon: Facebook },
    { name: 'Instagram', href: 'https://instagram.com/neighborfit', icon: Instagram },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/neighborfit', icon: Linkedin },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2 order-1">
            <Link href="/" className="flex items-center gap-2 mb-4 sm:mb-6 group">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white text-black group-hover:bg-gray-200 transition-colors">
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">NeighborFit</span>
            </Link>
            
            <p className="text-gray-300 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
              Empowering millions of homebuyers to find their perfect neighborhood with AI-powered insights and community-driven reviews.
            </p>
            
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Badge variant="outline" className="border-gray-600 text-gray-300 bg-transparent flex items-center gap-1 sm:gap-2 text-xs">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-current" />
                4.9/5 Rating
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 bg-transparent text-xs">
                10,000+ Happy Users
              </Badge>
            </div>
            
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white hover:border-gray-600 transition-all duration-200"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div className="order-2 sm:order-none">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Product</h3>
            <ul className="space-y-3 sm:space-y-4">
              {productLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-sm sm:text-base"
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:text-white transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company Links */}
          <div className="order-3 sm:order-none">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Company</h3>
            <ul className="space-y-3 sm:space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="order-4 sm:order-none">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Resources</h3>
            <ul className="space-y-3 sm:space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-white">Stay in the loop</h3>
              <p className="text-gray-400 text-sm sm:text-base">Get the latest neighborhood insights and housing market trends.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full max-w-md lg:max-w-sm xl:max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-colors text-sm sm:text-base"
              />
              <Button className="px-4 py-2.5 sm:px-6 sm:py-3 bg-white text-black hover:bg-gray-200 text-sm sm:text-base whitespace-nowrap">
                Subscribe
                <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-4 sm:py-6 flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <span className="text-center sm:text-left">© {currentYear} NeighborFit Inc. All rights reserved.</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 fill-current" />
              <span>in San Francisco</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-end gap-3 sm:gap-4 text-xs sm:text-sm">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
