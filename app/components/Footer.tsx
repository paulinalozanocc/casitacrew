import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1B3A6B',
      color: '#F2EEE5',
      borderTop: '1px solid rgba(242, 238, 229, 0.1)',
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '60px 40px 40px',
      }}>
        {/* Top section: Logo + Description */}
        <div style={{
          marginBottom: '56px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '7px',
            marginBottom: '16px',
          }}>
            <span style={{
              fontFamily: "'Lobster Two', cursive",
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: '24px',
              color: '#F2EEE5',
              lineHeight: 1,
            }}>Casita</span>
            <span style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 900,
              fontSize: '14px',
              color: '#F2EEE5',
              letterSpacing: '0.18em',
              lineHeight: 1,
            }}>CREW</span>
          </div>
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: '16px',
            color: 'rgba(242, 238, 229, 0.8)',
            margin: 0,
            lineHeight: 1.5,
            maxWidth: '280px',
          }}>
            Vetted trades, no surprises.
          </p>
        </div>

        {/* Link sections grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}>
          {/* For customers */}
          <div>
            <h3 style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: '16px',
              color: '#F2EEE5',
              marginBottom: '12px',
              margin: '0 0 12px 0',
            }}>For customers</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              <li>
                <Link href="/browse" style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '15px',
                  color: 'rgba(242, 238, 229, 0.85)',
                  textDecoration: 'none',
                }}>
                  Browse trades
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '15px',
                  color: 'rgba(242, 238, 229, 0.85)',
                  textDecoration: 'none',
                }}>
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/trust-safety" style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '15px',
                  color: 'rgba(242, 238, 229, 0.85)',
                  textDecoration: 'none',
                }}>
                  Trust & safety
                </Link>
              </li>
            </ul>
          </div>

          {/* For providers */}
          <div>
            <h3 style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: '16px',
              color: '#F2EEE5',
              margin: '0 0 12px 0',
            }}>For providers</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              <li>
                <Link href="/pricing" style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '15px',
                  color: 'rgba(242, 238, 229, 0.85)',
                  textDecoration: 'none',
                }}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/provider/signup" style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '15px',
                  color: 'rgba(242, 238, 229, 0.85)',
                  textDecoration: 'none',
                }}>
                  Join as pro
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '15px',
                  color: 'rgba(242, 238, 229, 0.85)',
                  textDecoration: 'none',
                }}>
                  Provider guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: '16px',
              color: '#F2EEE5',
              margin: '0 0 12px 0',
            }}>Legal</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              <li>
                <Link href="/privacy" style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '15px',
                  color: 'rgba(242, 238, 229, 0.85)',
                  textDecoration: 'none',
                }}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '15px',
                  color: 'rgba(242, 238, 229, 0.85)',
                  textDecoration: 'none',
                }}>
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '15px',
                  color: 'rgba(242, 238, 229, 0.85)',
                  textDecoration: 'none',
                }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div style={{
          borderTop: '1px solid rgba(242, 238, 229, 0.1)',
          paddingTop: '24px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: '14px',
            color: 'rgba(242, 238, 229, 0.6)',
            margin: 0,
          }}>
            &copy; 2026 CasitaCrew. All rights reserved.
          </p>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: 'rgba(242, 238, 229, 0.5)',
            marginTop: '8px',
            margin: '8px 0 0 0',
          }}>
            casitacrew.ca | casitacrew.com | info@casitacrew.ca
          </p>
        </div>
      </div>
    </footer>
  );
}
