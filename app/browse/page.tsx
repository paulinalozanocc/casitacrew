'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockProviders } from '../lib/mockProviders';

const TRADES = ['cleaning', 'handyman', 'electrician', 'plumber', 'snow-removal'];
const LOCATIONS = ['Toronto', 'Scarborough', 'Mississauga', 'Markham', 'York', 'Brampton', 'Oakville', 'East York'];

export default function BrowsePage() {
  const [selectedTrade, setSelectedTrade] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rating' | 'newest'>('rating');

  // Filter providers
  let filtered = mockProviders;

  if (selectedTrade) {
    filtered = filtered.filter(p => p.trade === selectedTrade);
  }

  if (selectedLocation) {
    filtered = filtered.filter(p => p.serviceArea.includes(selectedLocation));
  }

  // Sort
  if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  const getTradeName = (trade: string) => {
    const names: { [key: string]: string } = {
      'cleaning': 'Cleaning',
      'handyman': 'Handyman',
      'electrician': 'Electrician',
      'plumber': 'Plumber',
      'snow-removal': 'Snow removal',
    };
    return names[trade] || trade;
  };

  return (
    <>
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#1F5C7A',
        padding: '60px 40px 56px',
        color: '#F2EEE5',
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <Link href="/" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'rgba(242, 238, 229, 0.65)',
            textDecoration: 'none',
            marginBottom: '16px',
            display: 'inline-block',
          }}>
            ← Home
          </Link>

          <h1 style={{
            color: '#F2EEE5',
            margin: '0 0 16px 0',
            fontSize: 'clamp(40px, 5vw, 50px)',
            letterSpacing: '-0.028em',
          }}>
            Find a pro in Toronto
          </h1>

          <p style={{
            maxWidth: '560px',
            fontSize: '18.5px',
            lineHeight: 1.5,
            opacity: 0.9,
            margin: 0,
          }}>
            Everyone here has cleared ID, licence, insurance and a background check. Filter down and message whoever fits.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        alignItems: 'flex-start',
        padding: '40px 40px 88px',
        backgroundColor: '#F2EEE5',
        maxWidth: '1240px',
        margin: '0 auto',
      }}>
        {/* Sidebar Filters */}
        <aside style={{
          flex: '0 1 264px',
          position: 'sticky',
          top: '100px',
        }}>
          <div style={{
            backgroundColor: '#FBF9F4',
            border: '1px solid #D8D2C4',
            borderRadius: '6px',
            padding: '20px',
          }}>
            {/* Filter header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '1px solid #D8D2C4',
            }}>
              <div style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                color: '#1B3A6B',
              }}>
                Filters
              </div>
              <button
                onClick={() => {
                  setSelectedTrade('');
                  setSelectedLocation('');
                  setSortBy('rating');
                }}
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontSize: '12px',
                  color: '#1B3A6B',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Clear
              </button>
            </div>

            {/* Trade section */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#8A857C',
                marginBottom: '12px',
              }}>
                Trade
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['', ...TRADES].map(trade => (
                  <label
                    key={trade || 'all'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '15.5px',
                      fontWeight: selectedTrade === trade ? 600 : 400,
                      color: selectedTrade === trade ? '#1B3A6B' : '#55524A',
                    }}
                  >
                    <input
                      type="radio"
                      name="trade"
                      value={trade}
                      checked={selectedTrade === trade}
                      onChange={() => setSelectedTrade(trade)}
                      style={{
                        width: '17px',
                        height: '17px',
                        cursor: 'pointer',
                        accentColor: '#1B3A6B',
                      }}
                    />
                    <span>{trade ? getTradeName(trade) : 'All trades'}</span>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      color: '#8A857C',
                      marginLeft: 'auto',
                    }}>
                      ({mockProviders.filter(p => !trade || p.trade === trade).length})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ borderBottom: '1px solid #D8D2C4', marginBottom: '20px' }}></div>

            {/* Location section */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#8A857C',
                marginBottom: '12px',
              }}>
                Location
              </div>
              <select
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 13px',
                  border: '1px solid #D8D2C4',
                  borderRadius: '5px',
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '15px',
                  backgroundColor: '#FBF9F4',
                  cursor: 'pointer',
                }}
              >
                <option value="">All locations</option>
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ borderBottom: '1px solid #D8D2C4', marginBottom: '20px' }}></div>

            {/* Sort section */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#8A857C',
                marginBottom: '12px',
              }}>
                Sort by
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { value: 'rating' as const, label: 'Rating (high to low)' },
                  { value: 'newest' as const, label: 'Newest first' },
                ].map(option => (
                  <label
                    key={option.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '15.5px',
                      fontWeight: sortBy === option.value ? 600 : 400,
                      color: sortBy === option.value ? '#1B3A6B' : '#55524A',
                    }}
                  >
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={sortBy === option.value}
                      onChange={() => setSortBy(option.value)}
                      style={{
                        width: '17px',
                        height: '17px',
                        cursor: 'pointer',
                        accentColor: '#1B3A6B',
                      }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div style={{ flex: '1 1 520px', minWidth: 0 }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 700,
              fontSize: '18px',
              color: '#1B3A6B',
              marginBottom: '8px',
            }}>
              {filtered.length} provider{filtered.length !== 1 ? 's' : ''} found
            </div>
            {selectedTrade || selectedLocation ? (
              <div style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: '14px',
                color: '#8A857C',
              }}>
                {selectedTrade && <span>{getTradeName(selectedTrade)}</span>}
                {selectedTrade && selectedLocation && <span> · </span>}
                {selectedLocation && <span>{selectedLocation}</span>}
                {!selectedTrade && !selectedLocation && <span>All of Toronto · sorted by rating</span>}
              </div>
            ) : (
              <div style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: '14px',
                color: '#8A857C',
              }}>
                All of Toronto · sorted by rating
              </div>
            )}
          </div>

          {filtered.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '20px',
            }}>
              {filtered.map(provider => (
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
                      aspectRatio: '1.75',
                      backgroundColor: '#FBF9F4',
                      background: 'repeating-linear-gradient(135deg, #D9D4C8 0px 10px, #E4E0D5 10px 20px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      <div style={{
                        fontSize: '48px',
                        fontWeight: 800,
                        color: '#8A857C',
                        opacity: 0.3,
                      }}>
                        {provider.name.charAt(0)}
                      </div>
                      {/* Availability chip */}
                      <div style={{
                        position: 'absolute',
                        left: '12px',
                        top: '12px',
                        backgroundColor: '#F2EEE5',
                        border: '1px solid #D8D2C4',
                        borderRadius: '4px',
                        padding: '6px 10px',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10.5px',
                        color: '#8A857C',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}>
                        Available
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
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
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
                        {/* Verified badge - just shield */}
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M8 1 L14 3.5 V8 C14 11.4 11.4 14 8 15 C4.6 14 2 11.4 2 8 V3.5 Z" fill="#D9A441"/>
                          <path d="M5.4 8 L7.2 9.8 L10.6 6.2" stroke="#1B3A6B" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      <div style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: '14px',
                        color: '#8A857C',
                      }}>
                        {provider.location}
                      </div>

                      {provider.distance && (
                        <div style={{
                          fontFamily: "'Barlow', sans-serif",
                          fontSize: '13px',
                          color: '#8A857C',
                          opacity: 0.75,
                        }}>
                          {provider.distance}
                        </div>
                      )}

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
                        marginTop: '8px',
                        padding: '12px',
                        border: '1.5px solid #1B3A6B',
                        color: '#1B3A6B',
                        backgroundColor: 'transparent',
                        fontFamily: "'Archivo', sans-serif",
                        fontWeight: 800,
                        fontSize: '14px',
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
          ) : (
            <div style={{
              border: '1px dashed #C9C2B2',
              borderRadius: '6px',
              padding: '56px 32px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 800,
                fontSize: '18px',
                color: '#1B3A6B',
                marginBottom: '8px',
              }}>
                Nobody free in that trade yet
              </div>
              <div style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: '15px',
                color: '#8A857C',
                marginBottom: '20px',
              }}>
                We're still vetting pros in this category. Clear the filter to see everyone, or tell us what you need and we'll call you back.
              </div>
              <button
                onClick={() => {
                  setSelectedTrade('');
                  setSelectedLocation('');
                  setSortBy('rating');
                }}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#1B3A6B',
                  color: '#F2EEE5',
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 800,
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Show all pros
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
