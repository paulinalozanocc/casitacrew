import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <section style={{ backgroundColor: '#1B3A6B', color: '#F2EEE5', padding: '80px 40px 56px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <h1 style={{ color: '#F2EEE5', margin: '0 0 12px 0', fontSize: 'clamp(44px, 6vw, 76px)' }}>About CasitaCrew</h1>
          <p style={{ maxWidth: '560px', fontSize: '18px', lineHeight: 1.6, opacity: 0.9, margin: 0 }}>We're building a better way to hire trades in Canada.</p>
        </div>
      </section>

      <section style={{ padding: '80px 40px', backgroundColor: '#F2EEE5' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: '#1B3A6B', marginBottom: '20px' }}>Our mission</h2>
          <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#55524A', marginBottom: '40px' }}>Trades are hard to find. They're often cash-only, hard to reach, and full of surprise charges. CasitaCrew changes that. We vet every pro, show transparent pricing upfront, and make booking as easy as ordering food.</p>
          
          <h2 style={{ color: '#1B3A6B', marginBottom: '20px' }}>Why we exist</h2>
          <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#55524A', marginBottom: '40px' }}>A leaky pipe shouldn't require 10 phone calls. A light fixture shouldn't be a guessing game on price. We're fixing that, one neighbourhood at a time.</p>

          <h2 style={{ color: '#1B3A6B', marginBottom: '20px' }}>Right now</h2>
          <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#55524A' }}>We're launching in Ontario with cleaning, handyman, electrician, plumber, and snow removal. If you're a pro, join us at $9/month. If you need a trade, browse our vetted list. Questions? We read every message.</p>
        </div>
      </section>

      <section style={{ backgroundColor: '#1B3A6B', color: '#F2EEE5', padding: '56px 40px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 16px 0' }}>Get in touch</h2>
        <Link href="/contact"><button style={{ padding: '16px 28px', backgroundColor: '#F2EEE5', color: '#1B3A6B', fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Contact us</button></Link>
      </section>
    </>
  );
}
