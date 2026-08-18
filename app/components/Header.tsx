'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      backgroundColor: '#F2EEE5',
      borderBottom: '1px solid #D8D2C4',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      minHeight: '76px',
      display: 'flex',
      alignItems: 'center',
      padding: '14px 40px',
    }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1240px',
        margin: '0 auto',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'baseline', gap: '7px' }}>
          <span style={{
            fontFamily: "'Lobster Two', cursive",
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: '27px',
            color: '#1B3A6B',
            lineHeight: 1,
          }}>Casita</span>
          <span style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 900,
            fontSize: '15px',
            color: '#0F1C33',
            letterSpacing: '0.18em',
            marginLeft: '0.18em',
            lineHeight: 1,
          }}>CREW</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{
          display: 'none',
          '@media (min-width: 1024px)': {
            display: 'flex',
          },
          gap: '26px',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
        }} className="hidden lg:flex">
          <Link href="/browse" style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: '15px',
            fontWeight: 600,
            color: '#55524A',
            whiteSpace: 'nowrap',
          }}>
            Browse trades
          </Link>
          <Link href="/how-it-works" style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: '15px',
            fontWeight: 600,
            color: '#55524A',
            whiteSpace: 'nowrap',
          }}>
            How it works
          </Link>
          <Link href="/trust-safety" style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: '15px',
            fontWeight: 600,
            color: '#55524A',
            whiteSpace: 'nowrap',
          }}>
            Trust & safety
          </Link>
          <Link href="/pricing" style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: '15px',
            fontWeight: 600,
            color: '#55524A',
            whiteSpace: 'nowrap',
          }}>
            Pricing
          </Link>
          <div style={{
            width: '1px',
            height: '22px',
            backgroundColor: '#D8D2C4',
          }}></div>
          <Link href="/provider/signup" style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: '15px',
            fontWeight: 700,
            color: '#1B3A6B',
            whiteSpace: 'nowrap',
          }}>
            Join as pro
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
          }}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3A6B" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '76px',
          left: 0,
          right: 0,
          backgroundColor: '#1B3A6B',
          padding: '16px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <Link href="/browse" style={{ color: '#F2EEE5', fontFamily: "'Archivo', sans-serif", fontSize: '15px' }}>
            Browse trades
          </Link>
          <Link href="/how-it-works" style={{ color: '#F2EEE5', fontFamily: "'Archivo', sans-serif", fontSize: '15px' }}>
            How it works
          </Link>
          <Link href="/trust-safety" style={{ color: '#F2EEE5', fontFamily: "'Archivo', sans-serif", fontSize: '15px' }}>
            Trust & safety
          </Link>
          <Link href="/pricing" style={{ color: '#F2EEE5', fontFamily: "'Archivo', sans-serif", fontSize: '15px' }}>
            Pricing
          </Link>
          <Link href="/provider/signup" style={{ color: '#F2EEE5', fontFamily: "'Archivo', sans-serif", fontSize: '15px', fontWeight: 'bold' }}>
            Join as pro
          </Link>
        </div>
      )}
    </header>
  );
}
