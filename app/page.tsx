import Link from 'next/link';
import { mockProviders } from './lib/mockProviders';

const TRADES = [
  { id: 'cleaning', name: 'Cleaning', description: 'Homes, moves, deep cleans', icon: '🧹' },
  { id: 'handyman', name: 'Handyman', description: 'Mounting, patching, small fixes', icon: '🔨' },
  { id: 'electrician', name: 'Electrician', description: 'Licensed, ESA-registered work', icon: '⚡' },
  { id: 'plumber', name: 'Plumber', description: 'Leaks, drains, fixtures', icon: '💧' },
  { id: 'snow-removal', name: 'Snow removal', description: 'Driveways, walkways, salting', icon: '❄️' },
];

const testimonials = [
  {
    name: 'John S.',
    trade: 'Plumber',
    quote: 'Fixed our kitchen sink in 30 minutes. Professional and courteous. Price was what he quoted.',
    rating: 5,
  },
  {
    name: 'Maria T.',
    trade: 'Cleaning',
    quote: 'Sarah does amazing work. Our house has never been cleaner. Highly recommend.',
    rating: 5,
  },
  {
    name: 'David K.',
    trade: 'Electrician',
    quote: 'Ahmed rewired our bathroom and kitchen. Professional, on time, and fair pricing.',
    rating: 5,
  },
];

export default function Home() {
  const topProviders = mockProviders.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#1B3A6B',
        padding: '96px 40px 88px',
        color: '#F2EEE5',
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '64px',
          alignItems: 'start',
        }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Trust eyebrow */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(217, 164, 65, 0.5)',
              borderRadius: '4px',
              padding: '6px 12px',
              width: 'fit-content',
            }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 1 L14 3.5 V8 C14 11.4 11.4 14 8 15 C4.6 14 2 11.4 2 8 V3.5 Z" fill="#D9A441"/>
                <path d="M5.4 8 L7.2 9.8 L10.6 6.2" stroke="#1B3A6B" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#D9A441',
              }}>Every pro checked before they're listed</span>
            </div>

            {/* H1 */}
            <h1 style={{ color: '#F2EEE5', margin: 0 }}>
              Vetted trades,<br />no surprises.
            </h1>

            {/* Subheading */}
            <p style={{
              fontSize: '20px',
              lineHeight: 1.5,
              opacity: 0.82,
              maxWidth: '520px',
              margin: 0,
            }}>
              Book a cleaner, handyman, electrician, plumber or snow crew in Toronto. You see the price before anyone knocks on your door.
            </p>

            {/* CTAs */}
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
                  Browse trades
                </button>
              </Link>
              <Link href="/pricing">
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
                  Join as pro
                </button>
              </Link>
            </div>
          </div>

          {/* Right column - Live booking card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Photo slot */}
            <div style={{
              aspectRatio: '1.24',
              borderRadius: '6px',
              background: 'repeating-linear-gradient(135deg, #21447A 0px 12px, #1E3E70 12px 24px)',
            }}></div>

            {/* Live booking card */}
            <div style={{
              backgroundColor: '#16305A',
              borderRadius: '6px',
              padding: '18px 20px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'repeating-linear-gradient(135deg, #D9D4C8 0px 10px, #E4E0D5 10px 20px)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 800,
                  fontSize: '18px',
                  color: '#1B3A6B',
                }}>D</span>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    backgroundColor: '#F2EEE5',
                    borderRadius: '50%',
                  }}
                >
                  <path d="M8 1 L14 3.5 V8 C14 11.4 11.4 14 8 15 C4.6 14 2 11.4 2 8 V3.5 Z" fill="#D9A441"/>
                  <path d="M5.4 8 L7.2 9.8 L10.6 6.2" stroke="#1B3A6B" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#F2EEE5',
                }}>
                  Dave R. is booked for 2pm today
                </div>
                <div style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(242, 238, 229, 0.7)',
                }}>
                  Plumber · Roncesvalles · $120 first hour
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{
        backgroundColor: '#F2EEE5',
        borderBottom: '1px solid #D8D2C4',
        padding: '36px 40px',
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 0,
          textAlign: 'center',
        }}>
          {[
            { number: '10+', label: 'vetted pros across five trades' },
            { number: '4.8★', label: 'average rating across all jobs' },
            { number: '1,000+', label: 'Toronto homeowners served' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                borderLeft: i > 0 ? '1px solid #D8D2C4' : 'none',
                paddingLeft: i > 0 ? '40px' : '0',
              }}
            >
              <div style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 800,
                fontSize: '40px',
                color: '#1B3A6B',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}>
                {stat.number}
              </div>
              <div style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: '16px',
                color: '#8A857C',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Browse by trade */}
      <section style={{ padding: '80px 40px', backgroundColor: '#F2EEE5' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#8A857C',
              marginBottom: '12px',
            }}>
              01 · BROWSE BY TRADE
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '40px',
              flexWrap: 'wrap',
            }}>
              <h2 style={{ margin: 0, flex: 1 }}>What needs doing?</h2>
              <Link href="/browse" style={{
                fontFamily: "'Archivo', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#1B3A6B',
                borderBottom: '1.5px solid #1B3A6B',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}>
                See all pros
              </Link>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}>
            {TRADES.map(trade => (
              <Link key={trade.id} href={`/${trade.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  backgroundColor: '#1F5C7A',
                  borderRadius: '6px',
                  padding: '26px',
                  minHeight: '218px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: '#F2EEE5',
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}>
                  <div style={{ fontSize: '34px' }}>{trade.icon}</div>
                  <div>
                    <div style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '23px',
                      marginBottom: '4px',
                    }}>
                      {trade.name}
                    </div>
                    <div style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '15px',
                      opacity: 0.85,
                    }}>
                      {trade.description}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 40px', backgroundColor: '#1B3A6B', color: '#F2EEE5' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px', textAlign: 'center' }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(242, 238, 229, 0.6)',
              marginBottom: '12px',
            }}>
              02 · HOW IT WORKS
            </div>
            <h2 style={{ margin: '0 0 16px 0', color: '#F2EEE5' }}>Three steps, no phone tag.</h2>
          </div>

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
                description: 'Pick a trade, see who\'s free in your neighbourhood, and read what they charge. No account needed to look.',
              },
              {
                number: '02',
                title: 'Confirm',
                description: 'Message the pro, describe the job, agree the price in writing. If the job turns out bigger, they stop and tell you first.',
              },
              {
                number: '03',
                title: 'Book',
                description: 'Lock in a time. They text when they\'re on the way. Free to cancel up to two hours before.',
              },
            ].map(step => (
              <div
                key={step.number}
                style={{
                  backgroundColor: '#1B3A6B',
                  padding: '32px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 800,
                  fontSize: '15px',
                  color: '#1F5C7A',
                  letterSpacing: '0.025em',
                }}>
                  {step.number}
                </div>
                <div style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 800,
                  fontSize: '22px',
                  color: '#F2EEE5',
                }}>
                  {step.title}
                </div>
                <div style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '16.5px',
                  color: '#F2EEE5',
                  lineHeight: 1.6,
                }}>
                  {step.description}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/how-it-works">
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
                Learn more
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular pros */}
      <section style={{ padding: '80px 40px', backgroundColor: '#F2EEE5' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#8A857C',
              marginBottom: '12px',
            }}>
              03 · POPULAR PROS
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '40px',
              flexWrap: 'wrap',
            }}>
              <h2 style={{ margin: 0, flex: 1 }}>Booked most this month</h2>
              <Link href="/browse" style={{
                fontFamily: "'Archivo', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#1B3A6B',
                borderBottom: '1.5px solid #1B3A6B',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}>
                See all 10 pros
              </Link>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}>
            {topProviders.map(provider => (
              <Link key={provider.id} href={`/provider/${provider.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  backgroundColor: '#FBF9F4',
                  border: '1px solid #D8D2C4',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  cursor: 'pointer',
                }}>
                  {/* Photo */}
                  <div style={{
                    aspectRatio: '1.9',
                    backgroundColor: '#FBF9F4',
                    background: 'repeating-linear-gradient(135deg, #D9D4C8 0px 10px, #E4E0D5 10px 20px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      fontSize: '48px',
                      fontWeight: 800,
                      color: '#8A857C',
                      opacity: 0.3,
                    }}>
                      {provider.name.charAt(0)}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{
                    padding: '18px 20px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    flex: 1,
                  }}>
                    <div>
                      <div style={{
                        fontFamily: "'Archivo', sans-serif",
                        fontWeight: 800,
                        fontSize: '19px',
                        color: '#1B3A6B',
                      }}>
                        {provider.name}
                      </div>
                      <div style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: '14px',
                        color: '#8A857C',
                        textTransform: 'capitalize',
                      }}>
                        {provider.trade.replace('-', ' ')}
                      </div>
                    </div>

                    {/* Vetted badge */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: '#D9A441',
                      color: '#0F1C33',
                      borderRadius: '4px',
                      padding: '4px 9px',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '11px',
                      width: 'fit-content',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1 L14 3.5 V8 C14 11.4 11.4 14 8 15 C4.6 14 2 11.4 2 8 V3.5 Z" fill="currentColor"/>
                        <path d="M5.4 8 L7.2 9.8 L10.6 6.2" stroke="#1B3A6B" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Vetted
                    </div>

                    <div style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '14px',
                      color: '#8A857C',
                    }}>
                      {provider.location}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <span style={{
                        color: '#1F5C7A',
                        fontWeight: 'bold',
                        fontFamily: "'Archivo', sans-serif",
                      }}>★ {provider.rating.toFixed(1)}</span>
                      <span style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: '14px',
                        color: '#8A857C',
                      }}>
                        ({provider.reviewCount})
                      </span>
                    </div>

                    <div style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      color: '#D9A441',
                      fontSize: '15px',
                    }}>
                      {provider.priceRange}
                    </div>

                    <button style={{
                      width: '100%',
                      marginTop: '12px',
                      padding: '12px',
                      backgroundColor: '#1B3A6B',
                      color: '#F2EEE5',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '14px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}>
                      View profile
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/browse">
              <button style={{
                padding: '16px 28px',
                backgroundColor: '#1F5C7A',
                color: '#F2EEE5',
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}>
                Browse all providers
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 40px', backgroundColor: '#FBF9F4', borderTop: '1px solid #D8D2C4' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h2 style={{ margin: 0 }}>What homeowners say</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {testimonials.map((testimonial, i) => (
              <div key={i} style={{
                borderTop: '2px solid #1B3A6B',
                paddingTop: '20px',
              }}>
                <div style={{
                  marginBottom: '12px',
                  display: 'flex',
                  gap: '2px',
                  color: '#1F5C7A',
                }}>
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
                <p style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '18px',
                  fontStyle: 'italic',
                  margin: '0 0 12px 0',
                  color: '#0F1C33',
                }}>
                  "{testimonial.quote}"
                </p>
                <div>
                  <div style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800,
                    color: '#1B3A6B',
                  }}>
                    {testimonial.name}
                  </div>
                  <div style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: '14px',
                    color: '#8A857C',
                  }}>
                    {testimonial.trade}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro CTA */}
      <section style={{
        backgroundColor: '#1B3A6B',
        color: '#F2EEE5',
        padding: '76px 40px',
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '40px',
        }}>
          <div>
            <h2 style={{ margin: '0 0 12px 0', color: '#F2EEE5' }}>Ready to get steady leads?</h2>
            <p style={{
              fontSize: '18px',
              lineHeight: 1.6,
              opacity: 0.9,
              margin: 0,
            }}>
              Keep 100% of what you charge. Get paid Friday. No bidding for leads. $9 a month, cancel any time.
            </p>
          </div>
          <Link href="/pricing">
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
              whiteSpace: 'nowrap',
            }}>
              Join as provider
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
