import Link from 'next/link';

export default function SnowRemovalPage() {
  const faqs = [
    { q: 'How much does snow removal cost?', a: 'Most snow removal costs $75–$150 per visit for driveways and walkways. Salting extra. Seasonal contracts available at discounts.' },
    { q: 'Do you remove salt after winter?', a: 'Most crews offer spring clean-up to remove excess salt and sand. Confirm this in advance.' },
    { q: 'How quickly can they respond?', a: 'Many offer same-day or next-day service during snowstorms. Urgent calls may cost more. Ask availability upfront.' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } }))
      }) }} />

      <section style={{ backgroundColor: '#1B3A6B', color: '#F2EEE5', padding: '80px 40px 56px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <h1 style={{ color: '#F2EEE5', margin: '0 0 12px 0', fontSize: 'clamp(40px, 5vw, 60px)' }}>Snow removal in Toronto</h1>
          <p style={{ maxWidth: '560px', fontSize: '18px', opacity: 0.9, margin: '0 0 32px 0' }}>Hire vetted snow removal crews. Fast response, clear driveways, salting available, competitive pricing.</p>
          <Link href="/browse"><button style={{ padding: '16px 28px', backgroundColor: '#F2EEE5', color: '#1B3A6B', fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Browse snow crews</button></Link>
        </div>
      </section>

      <section style={{ padding: '80px 40px', backgroundColor: '#F2EEE5' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: '#1B3A6B', margin: '0 0 40px 0', textAlign: 'center' }}>Common questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ backgroundColor: '#FBF9F4', border: '1px solid #D8D2C4', borderRadius: '6px', padding: '20px', cursor: 'pointer' }}>
                <summary style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: '#1B3A6B', fontSize: '16px', listStyle: 'none' }}>{faq.q}</summary>
                <p style={{ color: '#8A857C', marginTop: '12px', marginBottom: 0 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
