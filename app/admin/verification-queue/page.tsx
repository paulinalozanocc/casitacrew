'use client';

import { useState } from 'react';

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
  const [providers, setProviders] = useState(mockPendingProviders);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const currentProvider = providers.find(p => p.id === selectedProvider);

  const handleApprove = (providerId: string) => {
    alert(`✓ ${providers.find(p => p.id === providerId)?.name} has been approved!`);
    setProviders(providers.filter(p => p.id !== providerId));
    setSelectedProvider(null);
  };

  const handleReject = (providerId: string) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    alert(`Rejected ${providers.find(p => p.id === providerId)?.name} with reason: ${rejectionReason}`);
    setProviders(providers.filter(p => p.id !== providerId));
    setRejectionReason('');
    setSelectedProvider(null);
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
            {providers.length} provider{providers.length !== 1 ? 's' : ''} pending approval
          </p>
        </div>

        {providers.length === 0 ? (
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
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider.id)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: 'none',
                      borderBottom: '1px solid #D8D2C4',
                      backgroundColor: selectedProvider === provider.id ? '#E8F5E9' : '#FBF9F4',
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
                    {currentProvider.requiredDocs.map(docType => {
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
                    onClick={() => handleReject(currentProvider.id)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#FBF9F4',
                      color: '#C7472F',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '14px',
                      border: '1.5px solid #C7472F',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(currentProvider.id)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#1F5C7A',
                      color: '#F2EEE5',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '14px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Approve
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
