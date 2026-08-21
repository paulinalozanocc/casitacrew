import Link from 'next/link';

export default function HandymanPage() {
  const faqs = [
    { q: 'What can handymen do?', a: 'Drywall repair, painting, mounting TVs, shelving, door repair, caulking, trim work, and small fixes. Not structural work or electrical.' },
    { q: 'How much does handyman work cost?', a: 'Most jobs cost $75–$200 depending on scope. First hour typically $75–$120, then $48–$60/hour after.' },
    { q: 'Can they do construction work?', a: 'Handymen handle small repairs and projects. Larger renovations need contractors. Ask what they can do first.' },
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
          <h1 style={{ color: '#F2EEE5', margin: '0 0 12px 0', fontSize: 'clamp(40px, 5vw, 60px)' }}>Handymen in Toronto</h1>
          <p style={{ maxWidth: '560px', fontSize: '18px', opacity: 0.9, margin: '0 0 32px 0' }}>Hire vetted handymen for mounting, drywall, painting, and small repairs. Transparent pricing, vetted professionals.</p>
          <Link href="/browse"><button style={{ padding: '16px 28px', backgroundColor: '#F2EEE5', color: '#1B3A6B', fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Browse handymen</button></Link>
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
