import Link from 'next/link';

export default function PlumberPage() {
  const faqs = [
    { q: 'How much does plumbing cost?', a: 'Most plumbing jobs cost $150–$400. Simple fixture swap $150. Full bathroom repipe $2000+. Always get a quote first.' },
    { q: 'Are plumbers licensed?', a: 'Yes. All plumbers on CasitaCrew hold a provincial license and WSIB clearance with background checks passed.' },
    { q: 'Do you offer emergency service?', a: 'Yes. Many plumbers offer same-day or after-hours service for burst pipes and major leaks.' },
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
          <h1 style={{ color: '#F2EEE5', margin: '0 0 12px 0', fontSize: 'clamp(40px, 5vw, 60px)' }}>Licensed plumbers in Toronto</h1>
          <p style={{ maxWidth: '560px', fontSize: '18px', opacity: 0.9, margin: '0 0 32px 0' }}>Hire vetted, licensed plumbers. All work guaranteed, transparent pricing, same-day available.</p>
          <Link href="/browse"><button style={{ padding: '16px 28px', backgroundColor: '#F2EEE5', color: '#1B3A6B', fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Browse plumbers</button></Link>
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
