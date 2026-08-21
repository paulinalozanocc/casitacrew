import Link from 'next/link';

export default function TrustSafetyPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: '#1B3A6B', color: '#F2EEE5', padding: '80px 40px 56px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <h1 style={{ color: '#F2EEE5', margin: '0 0 12px 0', fontSize: 'clamp(44px, 6vw, 76px)' }}>Trust & safety</h1>
          <p style={{ maxWidth: '560px', fontSize: '18px', lineHeight: 1.6, opacity: 0.9, margin: 0 }}>Every pro on CasitaCrew is vetted. Here's how we keep you protected.</p>
        </div>
      </section>

      {/* Verification process */}
      <section style={{ padding: '80px 40px', backgroundColor: '#F2EEE5' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <h2 style={{ color: '#1B3A6B', margin: '0 0 40px 0', textAlign: 'center' }}>Our verification process</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {[
              { icon: '🆔', title: 'ID verification', desc: 'Government photo ID checked and verified' },
              { icon: '📋', title: 'Background check', desc: 'Criminal record check (no major offences)' },
              { icon: '✓', title: 'Trade licenses', desc: 'Electricians & plumbers must be licensed' },
              { icon: '🛡️', title: 'Insurance', desc: 'All pros carry liability insurance' },
              { icon: '⭐', title: 'Reviews', desc: 'Real customer ratings after each job' },
              { icon: '📲', title: 'Communication', desc: 'In-app messaging with full audit trail' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#FBF9F4', border: '1px solid #D8D2C4', borderRadius: '6px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: '#1B3A6B', margin: '0 0 8px 0' }}>{item.title}</h3>
                <p style={{ color: '#8A857C', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protections */}
      <section style={{ padding: '80px 40px', backgroundColor: '#1B3A6B', color: '#F2EEE5' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <h2 style={{ color: '#F2EEE5', margin: '0 0 40px 0', textAlign: 'center' }}>Your protections</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Verified professionals only', text: 'No one works on CasitaCrew without passing ID, background, insurance, and license checks.' },
              { title: 'Message audit trail', text: 'All messages are stored. If there\'s a dispute, we have a record of what was agreed.' },
              { title: 'Transparent pricing', text: 'You see the rate upfront. No surprise charges. If scope changes, the pro must ask permission first.' },
              { title: 'Dispute resolution', text: 'Not happy? Contact us within 24 hours. We help mediate or issue refunds.' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(242, 238, 229, 0.08)', border: '1px solid rgba(242, 238, 229, 0.1)', borderRadius: '6px', padding: '24px' }}>
                <h3 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: '#F2EEE5', margin: '0 0 8px 0' }}>{item.title}</h3>
                <p style={{ color: '#55524A', margin: 0, lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#F2EEE5', padding: '56px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <h2 style={{ color: '#1B3A6B', margin: '0 0 16px 0' }}>Safe, vetted, no surprises.</h2>
          <p style={{ fontSize: '18px', color: '#8A857C', margin: '0 0 24px 0' }}>Browse our vetted pros today.</p>
          <Link href="/browse"><button style={{ padding: '16px 28px', backgroundColor: '#1B3A6B', color: '#F2EEE5', fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Browse trades</button></Link>
        </div>
      </section>
    </>
  );
}
