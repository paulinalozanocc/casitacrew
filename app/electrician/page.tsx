import Link from 'next/link';

const tradeData = {
  id: 'electrician',
  name: 'Electrician',
  heading: 'Licensed electricians in Toronto',
  description: 'Hire a vetted, ESA-registered electrician. All work guaranteed, transparent pricing, fast turnaround.',
  icon: '⚡',
  avgPrice: '$120–300 per job',
  avgRating: '4.9★',
  whyChoose: [
    { title: 'ESA-registered', description: 'Licensed electricians with current certifications' },
    { title: 'Full warranty', description: 'All work covered by warranty and insurance' },
    { title: 'Code-compliant', description: 'Meets Ontario electrical code standards' },
    { title: 'Emergency service', description: 'Same-day available for urgent issues' },
  ],
  services: [
    'Outlet & switch installation',
    'Rewiring (kitchens, bathrooms, renovations)',
    'Panel upgrades',
    'Lighting installation',
    'Emergency electrical repair',
  ],
  faqs: [
    {
      question: 'How much does electrical work cost?',
      answer: 'Electricians on CasitaCrew charge $120–$300 per job depending on scope. Some charge hourly rates. You see the estimate before work begins. Complex jobs may cost more — always confirm in advance.'
    },
    {
      question: 'Are all electricians ESA-registered?',
      answer: 'Yes. Every electrician on CasitaCrew holds a current ESA (Electrical Safety Authority) license and has passed background and reference checks.'
    },
    {
      question: 'Do I need a permit for electrical work?',
      answer: 'It depends on the scope. Your electrician will advise. Some work requires a permit; they can help arrange it. Always ask before they start.'
    },
    {
      question: 'What if something goes wrong?',
      answer: 'All work is warranted and insured. If there\'s an issue, contact the electrician within 48 hours. We\'ll ensure they fix it or issue a refund.'
    },
    {
      question: 'Can I get emergency electrical service?',
      answer: 'Yes. Many electricians offer same-day emergency calls for urgent issues like power outages or dangerous faults. Message them to check availability.'
    },
    {
      question: 'How long does electrical work typically take?',
      answer: 'A simple outlet installation might take 30 minutes. A bathroom rewire could take 8–16 hours over multiple days. Always get an estimate from your electrician first.'
    },
  ],
};

export default function ElectricianPage() {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tradeData.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />

      {/* Hero */}
      <section style={{
        backgroundColor: '#1B3A6B',
        color: '#F2EEE5',
        padding: '80px 40px 56px',
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px',
          }}>
            {tradeData.icon}
          </div>
          <h1 style={{
            color: '#F2EEE5',
            margin: '0 0 12px 0',
            fontSize: 'clamp(40px, 5vw, 60px)',
            letterSpacing: '-0.03em',
          }}>
            {tradeData.heading}
          </h1>
          <p style={{
            maxWidth: '560px',
            fontSize: '18px',
            lineHeight: 1.6,
            opacity: 0.9,
            margin: '0 0 32px 0',
          }}>
            {tradeData.description}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/browse">
              <button style={{
                padding: '16px 28px',
                backgroundColor: '#F2EEE5',
                color: '#1B3A6B',
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}>
                Browse electricians
              </button>
            </Link>
            <Link href="/how-it-works">
              <button style={{
                padding: '16px 28px',
                backgroundColor: 'transparent',
                color: '#F2EEE5',
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                border: '1.5px solid rgba(242, 238, 229, 0.5)',
                borderRadius: '5px',
                cursor: 'pointer',
              }}>
                How it works
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key stats */}
      <section style={{
        backgroundColor: '#F2EEE5',
        padding: '40px',
        borderBottom: '1px solid #D8D2C4',
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 0,
          textAlign: 'center',
        }}>
          <div style={{ borderRight: '1px solid #D8D2C4', paddingRight: '40px' }}>
            <div style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: '32px',
              color: '#1B3A6B',
              marginBottom: '4px',
            }}>
              {tradeData.avgPrice}
            </div>
            <div style={{ color: '#8A857C', fontSize: '14px' }}>average price</div>
          </div>
          <div style={{ paddingLeft: '40px' }}>
            <div style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: '32px',
              color: '#1B3A6B',
              marginBottom: '4px',
            }}>
              {tradeData.avgRating}
            </div>
            <div style={{ color: '#8A857C', fontSize: '14px' }}>average rating</div>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section style={{
        padding: '80px 40px',
        backgroundColor: '#F2EEE5',
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <h2 style={{
            color: '#1B3A6B',
            margin: '0 0 40px 0',
            textAlign: 'center',
          }}>
            Why choose CasitaCrew?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {tradeData.whyChoose.map((item, i) => (
              <div key={i} style={{
                backgroundColor: '#FBF9F4',
                border: '1px solid #D8D2C4',
                borderRadius: '6px',
                padding: '24px',
              }}>
                <h3 style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 800,
                  color: '#1B3A6B',
                  margin: '0 0 8px 0',
                  fontSize: '18px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: '#8A857C',
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{
        padding: '80px 40px',
        backgroundColor: '#1B3A6B',
        color: '#F2EEE5',
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <h2 style={{
            color: '#F2EEE5',
            margin: '0 0 32px 0',
          }}>
            Types of electrical work we offer
          </h2>

          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
          }}>
            {tradeData.services.map((service, i) => (
              <li key={i} style={{
                padding: '16px 20px',
                backgroundColor: 'rgba(242, 238, 229, 0.08)',
                borderRadius: '5px',
                border: '1px solid rgba(242, 238, 229, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <span style={{ fontSize: '20px' }}>✓</span>
                {service}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section style={{
        padding: '80px 40px',
        backgroundColor: '#F2EEE5',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            color: '#1B3A6B',
            margin: '0 0 40px 0',
            textAlign: 'center',
          }}>
            Questions about electrical work
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {tradeData.faqs.map((faq, i) => (
              <details key={i} style={{
                backgroundColor: '#FBF9F4',
                border: '1px solid #D8D2C4',
                borderRadius: '6px',
                padding: '20px',
                cursor: 'pointer',
              }}>
                <summary style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 800,
                  color: '#1B3A6B',
                  fontSize: '16px',
                  listStyle: 'none',
                }}>
                  {faq.question}
                </summary>
                <p style={{
                  color: '#8A857C',
                  marginTop: '12px',
                  marginBottom: 0,
                  lineHeight: 1.6,
                }}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        backgroundColor: '#1B3A6B',
        color: '#F2EEE5',
        padding: '56px 40px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 16px 0', color: '#F2EEE5' }}>
            Need an electrician?
          </h2>
          <p style={{
            fontSize: '18px',
            lineHeight: 1.6,
            opacity: 0.9,
            margin: '0 0 24px 0',
          }}>
            Browse our vetted, ESA-registered electricians. See the price upfront. Same-day available.
          </p>
          <Link href="/browse">
            <button style={{
              padding: '16px 28px',
              backgroundColor: '#F2EEE5',
              color: '#1B3A6B',
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: '16px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>
              Browse electricians
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
