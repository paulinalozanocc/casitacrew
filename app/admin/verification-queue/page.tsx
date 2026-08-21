'use client';

import { useState, useEffect } from 'react';

// Mock data for pending providers
const mockPendingProviders = [
  {
    id: '1',
    name: 'Sarah Chen',
    trade: 'cleaning',
    email: 'sarah@example.com',
    location: 'Toronto',
    submittedAt: '2026-08-21',
    documents: {
      id: { name: 'Driver_License.pdf', verified: false },
      insurance: { name: 'Insurance_Certificate.pdf', verified: false },
    },
    requiredDocs: ['id', 'insurance'],
  },
  {
    id: '2',
    name: 'Ahmed Hassan',
    trade: 'electrician',
    email: 'ahmed@example.com',
    location: 'Mississauga',
    submittedAt: '2026-08-20',
    documents: {
      id: { name: 'ID_Card.pdf', verified: false },
      license: { name: 'ESA_License.pdf', verified: false },
      insurance: { name: 'Insurance_Proof.pdf', verified: false },
      wsib: { name: 'WSIB_Clearance.pdf', verified: false },
    },
    requiredDocs: ['id', 'license', 'insurance', 'wsib'],
  },
];

const DOCUMENT_LABELS = {
  id: 'Government Photo ID',
  license: 'Trade License / Certification',
  insurance: 'Liability Insurance',
  wsib: 'WSIB Clearance (Ontario)',
};

const TRADE_NAMES = {
  cleaning: 'Cleaning',
  handyman: 'Handyman',
  electrician: 'Electrician',
  plumber: 'Plumber',
  'snow-removal': 'Snow removal',
};

export default function VerificationQueue() {
  const [providers, setProviders] = useState<any[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch pending providers on mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/pending-providers');
        if (!res.ok) {
          throw new Error('Failed to fetch providers');
        }
        const data = await res.json();
        // Map database format to UI format
        const mapped = data.providers.map((p: any) => ({
          id: p.id,
          name: p.name,
          trade: p.trade,
          email: p.user_email,
          location: p.location,
          submittedAt: new Date(p.created_at).toISOString().split('T')[0],
          documents: p.documents.reduce((acc: any, doc: any) => {
            acc[doc.document_type] = { name: doc.file_name, url: doc.file_url, verified: true };
            return acc;
          }, {}),
          requiredDocs: getRequiredDocs(p.trade),
        }));
        setProviders(mapped);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load providers');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const getRequiredDocs = (trade: string) => {
    const docsByTrade: Record<string, string[]> = {
      cleaning: ['id', 'insurance'],
      handyman: ['id', 'insurance'],
      electrician: ['id', 'license', 'insurance', 'wsib'],
      plumber: ['id', 'license', 'insurance', 'wsib'],
      'snow-removal': ['id', 'insurance'],
    };
    return docsByTrade[trade] || [];
  };

  const currentProvider = providers.find(p => p.email === selectedProvider);

  const handleApprove = async (providerEmail: string) => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/approve-provider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerEmail, notes: '' }),
      });
      if (!res.ok) throw new Error('Approval failed');
      setProviders(providers.filter(p => p.email !== providerEmail));
      setSelectedProvider(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Approval failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (providerEmail: string) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/reject-provider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerEmail, reason: rejectionReason, notes: '' }),
      });
      if (!res.ok) throw new Error('Rejection failed');
      setProviders(providers.filter(p => p.email !== providerEmail));
      setRejectionReason('');
      setSelectedProvider(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Rejection failed');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#F2EEE5',
      minHeight: '100vh',
      padding: '40px',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ color: '#1B3A6B', margin: '0 0 8px 0', fontSize: '36px' }}>
            Verification queue
          </h1>
          <p style={{ color: '#8A857C', margin: 0, fontSize: '15px' }}>
            {loading ? 'Loading...' : `${providers.length} provider${providers.length !== 1 ? 's' : ''} pending approval`}
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '16px',
            borderRadius: '6px',
            border: '1px solid #ef5350',
            marginBottom: '20px',
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 40px',
            backgroundColor: '#FBF9F4',
            borderRadius: '6px',
            border: '1px solid #D8D2C4',
          }}>
            <p style={{ color: '#8A857C' }}>Loading providers...</p>
          </div>
        ) : providers.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 40px',
            backgroundColor: '#FBF9F4',
            borderRadius: '6px',
            border: '1px solid #D8D2C4',
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px',
            }}>
              ✓
            </div>
            <h2 style={{ color: '#1B3A6B', margin: '0 0 8px 0' }}>All caught up!</h2>
            <p style={{ color: '#8A857C', margin: 0 }}>
              No pending applications. New submissions will appear here.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
          }}>
            {/* Queue list */}
            <div style={{
              backgroundColor: '#FBF9F4',
              border: '1px solid #D8D2C4',
              borderRadius: '6px',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid #D8D2C4',
                backgroundColor: '#F2EEE5',
              }}>
                <h2 style={{
                  color: '#1B3A6B',
                  margin: 0,
                  fontSize: '16px',
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 800,
                }}>
                  Pending providers
                </h2>
              </div>

              <div>
                {providers.map(provider => (
                  <button
                    key={provider.email}
                    onClick={() => setSelectedProvider(provider.email)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: 'none',
                      borderBottom: '1px solid #D8D2C4',
                      backgroundColor: selectedProvider === provider.email ? '#E8F5E9' : '#FBF9F4',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 200ms',
                    }}
                  >
                    <div style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      color: '#1B3A6B',
                      marginBottom: '4px',
                    }}>
                      {provider.name}
                    </div>
                    <div style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '13px',
                      color: '#8A857C',
                      marginBottom: '4px',
                    }}>
                      {TRADE_NAMES[provider.trade as keyof typeof TRADE_NAMES]} · {provider.location}
                    </div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      color: '#8A857C',
                    }}>
                      {provider.submittedAt}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Detail view */}
            {currentProvider && (
              <div style={{
                backgroundColor: '#FBF9F4',
                border: '1px solid #D8D2C4',
                borderRadius: '6px',
                padding: '24px',
              }}>
                <h2 style={{
                  color: '#1B3A6B',
                  margin: '0 0 20px 0',
                  fontSize: '20px',
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 800,
                }}>
                  {currentProvider.name}
                </h2>

                {/* Info */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      color: '#8A857C',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginBottom: '4px',
                    }}>
                      Trade
                    </div>
                    <div style={{ color: '#1B3A6B', fontFamily: "'Archivo', sans-serif", fontWeight: 600 }}>
                      {TRADE_NAMES[currentProvider.trade as keyof typeof TRADE_NAMES]}
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      color: '#8A857C',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginBottom: '4px',
                    }}>
                      Email
                    </div>
                    <div style={{ color: '#1B3A6B' }}>
                      {currentProvider.email}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      color: '#8A857C',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginBottom: '4px',
                    }}>
                      Location
                    </div>
                    <div style={{ color: '#1B3A6B' }}>
                      {currentProvider.location}
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800,
                    color: '#1B3A6B',
                    marginBottom: '12px',
                    fontSize: '15px',
                  }}>
                    Documents
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {currentProvider.requiredDocs.map((docType: string) => {
                      const doc = currentProvider.documents[docType as keyof typeof currentProvider.documents];
                      return (
                        <div key={docType} style={{
                          padding: '12px',
                          backgroundColor: '#E8F5E9',
                          borderRadius: '4px',
                          border: '1px solid #C8E6C9',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                          <div>
                            <div style={{
                              fontFamily: "'Barlow', sans-serif",
                              fontWeight: 600,
                              color: '#1B3A6B',
                              marginBottom: '2px',
                            }}>
                              {DOCUMENT_LABELS[docType as keyof typeof DOCUMENT_LABELS]}
                            </div>
                            {doc && (
                              <div style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '12px',
                                color: '#8A857C',
                              }}>
                                {doc.name}
                              </div>
                            )}
                          </div>
                          <a href="#" style={{
                            color: '#1F5C7A',
                            fontFamily: "'Archivo', sans-serif",
                            fontWeight: 600,
                            fontSize: '13px',
                            textDecoration: 'none',
                          }}>
                            View
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Rejection reason (if rejecting) */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800,
                    color: '#1B3A6B',
                    marginBottom: '8px',
                    fontSize: '15px',
                  }}>
                    Rejection note (if applicable)
                  </div>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="E.g., License expired, Insurance not current, etc."
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D8D2C4',
                      borderRadius: '5px',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '14px',
                      minHeight: '80px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => handleReject(currentProvider.email)}
                    disabled={actionLoading}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: actionLoading ? '#D8D2C4' : '#FBF9F4',
                      color: actionLoading ? '#8A857C' : '#C7472F',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '14px',
                      border: actionLoading ? '1.5px solid #D8D2C4' : '1.5px solid #C7472F',
                      borderRadius: '5px',
                      cursor: actionLoading ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {actionLoading ? 'Processing...' : 'Reject'}
                  </button>
                  <button
                    onClick={() => handleApprove(currentProvider.email)}
                    disabled={actionLoading}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: actionLoading ? '#D8D2C4' : '#1F5C7A',
                      color: actionLoading ? '#8A857C' : '#F2EEE5',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '14px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: actionLoading ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {actionLoading ? 'Processing...' : 'Approve'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
