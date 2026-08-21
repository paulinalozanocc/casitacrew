import Link from 'next/link';

export default function HowItWorksPage() {
  const faqs = [
    { q: 'Do I need an account to browse?', a: 'No. You can browse and message freely. Only create an account when you\'re ready to book.' },
    { q: 'How do I pay the pro?', a: 'Payment is between you and the pro. CasitaCrew collects $9/month from providers only, not from customers.' },
    { q: 'Can I cancel a booking?', a: 'Yes. Cancel free up to 2 hours before the scheduled time. After that, you\'ll forfeit any deposit.' },
    { q: 'What if the work isn\'t finished?', a: 'If the pro stops mid-job, contact us within 24 hours. We\'ll help resolve it or refund you.' },
    { q: 'Is messaging secure?', a: 'Yes. All messages are encrypted and stay on our platform. Phone numbers are private until both agree to share.' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      }) }} />

      {/* Hero */}
      <section style={{ backgroundColor: '#1B3A6B', color: '#F2EEE5', padding: '80px 40px 56px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <h1 style={{ color: '#F2EEE5', margin: '0 0 12px 0', fontSize: 'clamp(44px, 6vw, 76px)' }}>How it works</h1>
          <p style={{ maxWidth: '560px', fontSize: '18px', lineHeight: 1.6, opacity: 0.9, margin: 0 }}>Three steps from browsing to booking. No bidding wars, no surprise charges.</p>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: '80px 40px', backgroundColor: '#1B3A6B', color: '#F2EEE5' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            backgroundColor: '#D8D2C4',
            marginBottom: '40px',
          }}>
            {[
              {
                number: '01',
                title: 'Browse',
                description: 'Pick a trade, see who\'s free in your neighbourhood, read their bio and rating. No account needed.',
              },
              {
                number: '02',
                title: 'Message',
                description: 'Send them a message describing the job. They\'ll reply with a quote. Agree on price and time in writing.',
              },
              {
                number: '03',
                title: 'Book',
                description: 'Lock in the date and time. They\'ll text when they\'re 15 minutes away. Payment is between you and them.',
              },
            ].map(step => (
              <div key={step.number} style={{ backgroundColor: '#1B3A6B', padding: '32px 30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: '15px', color: '#1F5C7A' }}>{step.number}</div>
                <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: '22px', color: '#F2EEE5' }}>{step.title}</div>
                <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: '16px', color: '#55524A', lineHeight: 1.6 }}>{step.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding: '80px 40px', backgroundColor: '#F2EEE5' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: '#1B3A6B', margin: '0 0 40px 0', textAlign: 'center' }}>Common questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ backgroundColor: '#FBF9F4', border: '1px solid #D8D2C4', borderRadius: '6px', padding: '20px', cursor: 'pointer' }}>
                <summary style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: '#1B3A6B', fontSize: '16px', listStyle: 'none' }}>{faq.q}</summary>
                <p style={{ color: '#8A857C', marginTop: '12px', marginBottom: 0, lineHeight: 1.6 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#1B3A6B', color: '#F2EEE5', padding: '56px 40px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 16px 0' }}>Ready to get started?</h2>
        <p style={{ fontSize: '18px', margin: '0 0 24px 0', opacity: 0.9 }}>Browse trades in your neighbourhood.</p>
        <Link href="/browse"><button style={{ padding: '16px 28px', backgroundColor: '#F2EEE5', color: '#1B3A6B', fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Browse trades</button></Link>
      </section>
    </>
  );
}
