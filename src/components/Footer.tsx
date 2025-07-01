'use client';
import React from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--background)] text-[var(--foreground)] py-4 border-t border-[var(--accent-light)]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* General Links */}
        <ul className="flex flex-wrap gap-4 text-sm">
          <li><a href="#" className="hover:text-[var(--accent)] transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Methodology</a></li>
          <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Terms of Use</a></li>
          <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Contact Us</a></li>
        </ul>
        {/* Social Icons */}
        <div className="flex space-x-3 text-xl">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors"><FaInstagram /></a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors"><FaFacebook /></a>
        </div>
        {/* Copyright */}
        <div className="text-xs text-[var(--accent-light)] text-center md:text-right">
          &copy; NeighborFit Inc 2025-{currentYear}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
