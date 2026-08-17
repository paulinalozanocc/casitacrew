'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-cream border-b border-stone border-opacity-20">
      <nav className="container-padded py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="font-lobster text-2xl text-navy italic">Casita</div>
          <div className="font-archivo font-bold text-navy tracking-wider">CREW</div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/browse" className="text-midnight hover:text-navy font-barlow font-medium">
            Browse
          </Link>
          <Link href="/how-it-works" className="text-midnight hover:text-navy font-barlow font-medium">
            How it works
          </Link>
          <Link href="/trust-safety" className="text-midnight hover:text-navy font-barlow font-medium">
            Trust & safety
          </Link>
          <Link href="/pricing" className="btn-primary text-sm">
            Join as pro
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-navy"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy text-cream p-4 space-y-3">
          <Link href="/browse" className="block py-2 hover:text-brass">
            Browse
          </Link>
          <Link href="/how-it-works" className="block py-2 hover:text-brass">
            How it works
          </Link>
          <Link href="/trust-safety" className="block py-2 hover:text-brass">
            Trust & safety
          </Link>
          <Link href="/pricing" className="block py-2 hover:text-brass font-bold">
            Join as pro
          </Link>
        </div>
      )}
    </header>
  );
}
