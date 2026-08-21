import Link from 'next/link';

const tradeData = {
  id: 'cleaning',
  name: 'Cleaning',
  heading: 'Professional cleaning in Toronto',
  description: 'Book a vetted cleaner for your home. No surprises, transparent pricing, quick turnaround.',
  icon: '🧹',
  avgPrice: '$80–200 per job',
  avgRating: '4.7★',
  whyChoose: [
    { title: 'Vetted professionals', description: 'Background checked and fully insured' },
    { title: 'Transparent pricing', description: 'See the rate before they arrive' },
    { title: 'Flexible scheduling', description: 'Book same-day or weeks in advance' },
    { title: '100% money back', description: 'Not satisfied? Full refund within 24 hours' },
  ],
  services: [
    'One-time home cleaning',
    'Bi-weekly or monthly recurring',
    'Move-in/move-out cleaning',
    'Deep cleaning',
    'Post-renovation cleaning',
  ],
  faqs: [
    {
      question: 'How much does home cleaning cost?',
      answer: 'Most cleaners on CasitaCrew charge $80–$200 for a full home clean, depending on size. You see the exact rate before booking. They may charge less for smaller apartments or more for larger homes.'
    },
    {
      question: 'How do I book a cleaner?',
      answer: 'Browse cleaners on our site, message one you like, agree on the price and time, and book. No bidding wars. The cleaner will text you when they\'re on the way.'
    },
    {
      question: 'Can I request a specific cleaner?',
      answer: 'Yes. If you\'ve worked with someone before and liked them, you can message them directly to rebook. Many regulars arrange recurring weekly or bi-weekly cleans.'
    },
    {
      question: 'What if I\'m not happy with the cleaning?',
      answer: 'Text the cleaner to fix anything while they\'re still there, or contact us within 24 hours. We\'ll help resolve it or refund your money.'
    },
    {
      question: 'Do cleaners bring their own supplies?',
      answer: 'Most do, but confirm in your message. Some prefer you provide eco-friendly products if you have preferences. Always agree in advance.'
    },
    {
      question: 'Is it safe to let a stranger clean my home?',
      answer: 'All cleaners on CasitaCrew have passed ID, background, and reference checks. You also get in-app messaging to confirm details before they arrive.'
    },
  ],
};

export default function CleaningPage() {
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
                Browse cleaners
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
            Types of cleaning we offer
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
            Questions about cleaning
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
            Ready to find a cleaner?
          </h2>
          <p style={{
            fontSize: '18px',
            lineHeight: 1.6,
            opacity: 0.9,
            margin: '0 0 24px 0',
          }}>
            Browse our vetted cleaners, message one, confirm the price, and book. No surprises.
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
              Browse cleaners
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
