'use client';

import { useState } from 'react';
import Link from 'next/link';

const TRADES = [
  { id: 'cleaning', name: 'Cleaning', description: 'Home cleaning, move-in/out, deep cleans' },
  { id: 'handyman', name: 'Handyman', description: 'Drywall, mounting, small repairs' },
  { id: 'electrician', name: 'Electrician', description: 'Licensed electrical work' },
  { id: 'plumber', name: 'Plumber', description: 'Licensed plumbing work' },
  { id: 'snow-removal', name: 'Snow removal', description: 'Driveway & walkway clearing' },
];

const DOCUMENTS_BY_TRADE = {
  cleaning: ['id', 'insurance'],
  handyman: ['id', 'insurance'],
  electrician: ['id', 'license', 'insurance', 'wsib'],
  plumber: ['id', 'license', 'insurance', 'wsib'],
  'snow-removal': ['id', 'insurance'],
};

const DOCUMENT_LABELS = {
  id: 'Government Photo ID',
  license: 'Trade License / Certification',
  insurance: 'Liability Insurance',
  wsib: 'WSIB Clearance (Ontario)',
};

type SignupStep = 'account' | 'trade' | 'documents' | 'profile' | 'payment' | 'confirmation';

export default function ProviderSignup() {
  const [currentStep, setCurrentStep] = useState<SignupStep>('account');
  const [stepProgress, setStepProgress] = useState<{
    account?: boolean;
    trade?: boolean;
    documents?: boolean;
    profile?: boolean;
    payment?: boolean;
  }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    trade: '',
    location: '',
    serviceArea: '',
    name: '',
    bio: '',
    hourlyRate: '',
    priceRange: '',
    yearsExperience: '',
    documents: {} as Record<string, File | null>,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = e.target.files?.[0];
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [docType]: file || null },
    }));
  };

  const requiredDocuments = formData.trade
    ? DOCUMENTS_BY_TRADE[formData.trade as keyof typeof DOCUMENTS_BY_TRADE] || []
    : [];

  const documentsComplete = requiredDocuments.every(doc => formData.documents[doc]);

  const canProceed = {
    account: formData.email && formData.password && formData.password === formData.passwordConfirm,
    trade: formData.trade && formData.location && formData.serviceArea,
    documents: documentsComplete,
    profile: formData.name && formData.bio && formData.hourlyRate && formData.yearsExperience,
    payment: true, // Stripe handles this
  };

  const goToStep = (step: SignupStep) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const proceedToNext = () => {
    const steps: SignupStep[] = ['account', 'trade', 'documents', 'profile', 'payment'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setStepProgress(prev => ({ ...prev, [currentStep]: true }));
      goToStep(steps[currentIndex + 1]);
    }
  };

  const stepHeaders = [
    { step: 'account', number: '01', title: 'Create account' },
    { step: 'trade', number: '02', title: 'Choose your trade' },
    { step: 'documents', number: '03', title: 'Verification docs' },
    { step: 'profile', number: '04', title: 'Your profile' },
    { step: 'payment', number: '05', title: 'Subscribe ($9/mo)' },
  ];

  return (
    <>
      <div style={{
        backgroundColor: '#F2EEE5',
        minHeight: '100vh',
        paddingTop: '40px',
        paddingBottom: '80px',
      }}>
        {error && (
          <div style={{
            maxWidth: '560px',
            margin: '0 auto 20px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '16px',
            borderRadius: '6px',
            border: '1px solid #ef5350',
            fontFamily: "'Barlow', sans-serif",
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        {successMessage && (
          <div style={{
            maxWidth: '560px',
            margin: '0 auto 20px',
            backgroundColor: '#e8f5e9',
            color: '#2e7d32',
            padding: '16px',
            borderRadius: '6px',
            border: '1px solid #4caf50',
            fontFamily: "'Barlow', sans-serif",
          }}>
            <strong>Success:</strong> {successMessage}
          </div>
        )}
        {currentStep === 'confirmation' ? (
          // Confirmation screen
          <div style={{
            maxWidth: '560px',
            margin: '0 auto',
            padding: '40px',
            backgroundColor: '#FBF9F4',
            borderRadius: '6px',
            textAlign: 'center',
            border: '1px solid #D8D2C4',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#D9A441',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '28px',
            }}>
              ✓
            </div>
            <h1 style={{ color: '#1B3A6B', margin: '0 0 12px 0', fontSize: '32px' }}>
              Application received
            </h1>
            <p style={{ color: '#8A857C', fontSize: '16px', lineHeight: 1.6, margin: '0 0 24px 0' }}>
              Thanks {formData.name}! We're reviewing your documents now. You'll hear from us within 24–48 hours via email at <strong>{formData.email}</strong>.
            </p>
            <div style={{
              backgroundColor: '#1F5C7A',
              borderRadius: '6px',
              padding: '20px',
              marginBottom: '24px',
              color: '#F2EEE5',
              textAlign: 'left',
            }}>
              <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, marginBottom: '12px' }}>
                What happens next:
              </div>
              <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: 1.8 }}>
                <li>We verify your documents (ID, license, insurance, WSIB if applicable)</li>
                <li>You'll be notified via email when approved</li>
                <li>Your profile goes live and you start receiving customer inquiries</li>
                <li>Message customers to confirm details and get paid directly</li>
              </ol>
            </div>
            <p style={{ color: '#8A857C', fontSize: '14px', margin: '0 0 24px 0' }}>
              Questions? Email us at info@casitacrew.ca or text 416-555-0134.
            </p>
            <Link href="/" style={{
              padding: '12px 24px',
              backgroundColor: '#1B3A6B',
              color: '#F2EEE5',
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: '14px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
            }}>
              Back to home
            </Link>
          </div>
        ) : (
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 40px',
          }}>
            {/* Progress bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '56px',
            }}>
              {stepHeaders.map((h, i) => (
                <div key={h.step} style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                  }}>
                    <button
                      onClick={() => goToStep(h.step as SignupStep)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '2px solid',
                        borderColor: currentStep === h.step ? '#1B3A6B' : stepProgress[h.step as keyof typeof stepProgress] ? '#D9A441' : '#D8D2C4',
                        backgroundColor: currentStep === h.step ? '#1B3A6B' : stepProgress[h.step as keyof typeof stepProgress] ? '#D9A441' : 'transparent',
                        color: currentStep === h.step || stepProgress[h.step as keyof typeof stepProgress] ? '#F2EEE5' : '#8A857C',
                        fontFamily: "'Archivo', sans-serif",
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {stepProgress[h.step as keyof typeof stepProgress] ? '✓' : h.number.split('')[0]}
                    </button>
                    {i < stepHeaders.length - 1 && (
                      <div style={{
                        flex: 1,
                        height: '2px',
                        backgroundColor: stepProgress[h.step as keyof typeof stepProgress] ? '#D9A441' : '#D8D2C4',
                        marginLeft: '8px',
                      }}></div>
                    )}
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: '#8A857C',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    {h.number} {h.title}
                  </div>
                </div>
              ))}
            </div>

            {/* Step content */}
            {currentStep === 'account' && (
              <div>
                <h1 style={{ color: '#1B3A6B', margin: '0 0 12px 0', fontSize: '36px' }}>Create your account</h1>
                <p style={{ color: '#8A857C', fontSize: '16px', margin: '0 0 32px 0' }}>
                  Sign up to start receiving customer inquiries.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#1B3A6B' }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D8D2C4',
                      borderRadius: '5px',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '15px',
                      boxSizing: 'border-box',
                    }}
                    placeholder="you@example.com"
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#1B3A6B' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D8D2C4',
                      borderRadius: '5px',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '15px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#1B3A6B' }}>
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D8D2C4',
                      borderRadius: '5px',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '15px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button
                  onClick={proceedToNext}
                  disabled={!canProceed.account}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: canProceed.account ? '#1B3A6B' : '#D8D2C4',
                    color: canProceed.account ? '#F2EEE5' : '#8A857C',
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800,
                    fontSize: '15px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: canProceed.account ? 'pointer' : 'not-allowed',
                  }}
                >
                  Next step
                </button>
              </div>
            )}

            {currentStep === 'trade' && (
              <div>
                <h1 style={{ color: '#1B3A6B', margin: '0 0 12px 0', fontSize: '36px' }}>What's your trade?</h1>
                <p style={{ color: '#8A857C', fontSize: '16px', margin: '0 0 32px 0' }}>
                  Pick one trade to get started. You can add more later.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#1B3A6B' }}>
                    Trade
                  </label>
                  <select
                    name="trade"
                    value={formData.trade}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D8D2C4',
                      borderRadius: '5px',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '15px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="">Select a trade...</option>
                    {TRADES.map(trade => (
                      <option key={trade.id} value={trade.id}>
                        {trade.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#1B3A6B' }}>
                    Your location (city)
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Toronto"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D8D2C4',
                      borderRadius: '5px',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '15px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#1B3A6B' }}>
                    Service area (which areas you cover)
                  </label>
                  <input
                    type="text"
                    name="serviceArea"
                    value={formData.serviceArea}
                    onChange={handleInputChange}
                    placeholder="e.g., Toronto, Mississauga, Etobicoke"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D8D2C4',
                      borderRadius: '5px',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '15px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => goToStep('account')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#FBF9F4',
                      color: '#1B3A6B',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '15px',
                      border: '1px solid #D8D2C4',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={proceedToNext}
                    disabled={!canProceed.trade}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: canProceed.trade ? '#1B3A6B' : '#D8D2C4',
                      color: canProceed.trade ? '#F2EEE5' : '#8A857C',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '15px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: canProceed.trade ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Next step
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'documents' && (
              <div>
                <h1 style={{ color: '#1B3A6B', margin: '0 0 12px 0', fontSize: '36px' }}>Upload documents</h1>
                <p style={{ color: '#8A857C', fontSize: '16px', margin: '0 0 8px 0' }}>
                  We'll verify these within 24–48 hours.
                </p>
                <p style={{ color: '#8A857C', fontSize: '14px', margin: '0 0 32px 0' }}>
                  Max 10MB per file. PDFs, JPGs, PNGs only.
                </p>

                {requiredDocuments.map(docType => (
                  <div key={docType} style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#1B3A6B' }}>
                      {DOCUMENT_LABELS[docType as keyof typeof DOCUMENT_LABELS]}
                    </label>
                    <div style={{
                      border: '2px dashed #D8D2C4',
                      borderRadius: '5px',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: formData.documents[docType] ? '#E8F5E9' : '#FBF9F4',
                    }}>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, docType)}
                        style={{ display: 'none' }}
                        id={`file-${docType}`}
                      />
                      <label htmlFor={`file-${docType}`} style={{ cursor: 'pointer', display: 'block' }}>
                        {formData.documents[docType] ? (
                          <div style={{ color: '#1F5C7A', fontFamily: "'Archivo', sans-serif", fontWeight: 600 }}>
                            ✓ {formData.documents[docType]?.name}
                          </div>
                        ) : (
                          <div>
                            <div style={{ color: '#8A857C', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', marginBottom: '4px' }}>
                              Click to upload or drag & drop
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                ))}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => goToStep('trade')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#FBF9F4',
                      color: '#1B3A6B',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '15px',
                      border: '1px solid #D8D2C4',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={proceedToNext}
                    disabled={!canProceed.documents}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: canProceed.documents ? '#1B3A6B' : '#D8D2C4',
                      color: canProceed.documents ? '#F2EEE5' : '#8A857C',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '15px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: canProceed.documents ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Next step
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'profile' && (
              <div>
                <h1 style={{ color: '#1B3A6B', margin: '0 0 12px 0', fontSize: '36px' }}>Tell us about yourself</h1>
                <p style={{ color: '#8A857C', fontSize: '16px', margin: '0 0 32px 0' }}>
                  This shows on your profile. Be specific about what you do.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#1B3A6B' }}>
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D8D2C4',
                      borderRadius: '5px',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '15px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#1B3A6B' }}>
                    Bio (what you specialize in)
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="E.g., Licensed plumber with 15 years experience. Specializing in residential leaks, drain cleaning, and fixture installation."
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D8D2C4',
                      borderRadius: '5px',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '15px',
                      boxSizing: 'border-box',
                      minHeight: '100px',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#1B3A6B' }}>
                    Hourly rate (first hour)
                  </label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: '#8A857C', fontFamily: "'Archivo', sans-serif", fontWeight: 600 }}>$</span>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleInputChange}
                      placeholder="120"
                      style={{
                        flex: 1,
                        padding: '12px',
                        border: '1px solid #D8D2C4',
                        borderRadius: '5px',
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: '15px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#1B3A6B' }}>
                    Years of experience
                  </label>
                  <input
                    type="number"
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                    placeholder="15"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D8D2C4',
                      borderRadius: '5px',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '15px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => goToStep('documents')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#FBF9F4',
                      color: '#1B3A6B',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '15px',
                      border: '1px solid #D8D2C4',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={proceedToNext}
                    disabled={!canProceed.profile}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: canProceed.profile ? '#1B3A6B' : '#D8D2C4',
                      color: canProceed.profile ? '#F2EEE5' : '#8A857C',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '15px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: canProceed.profile ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Next step
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'payment' && (
              <div>
                <h1 style={{ color: '#1B3A6B', margin: '0 0 12px 0', fontSize: '36px' }}>Subscribe to CasitaCrew</h1>
                <p style={{ color: '#8A857C', fontSize: '16px', margin: '0 0 32px 0' }}>
                  $9/month, cancel anytime. You keep 100% of what customers pay you.
                </p>

                <div style={{
                  backgroundColor: '#FBF9F4',
                  border: '1px solid #D8D2C4',
                  borderRadius: '6px',
                  padding: '32px',
                  textAlign: 'center',
                  marginBottom: '32px',
                }}>
                  <div style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800,
                    fontSize: '48px',
                    color: '#D9A441',
                    marginBottom: '8px',
                  }}>
                    $9
                  </div>
                  <div style={{ color: '#8A857C', marginBottom: '20px' }}>
                    per month, billed monthly
                  </div>

                  <ul style={{
                    textAlign: 'left',
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 24px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}>
                    {[
                      'Active profile listing',
                      'Unlimited customer inquiries',
                      'Messaging & scheduling tools',
                      'Verified pro badge',
                      'Review system',
                      'Cancel anytime',
                    ].map(feature => (
                      <li key={feature} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#1B3A6B',
                      }}>
                        <span style={{ color: '#D9A441', fontWeight: 'bold' }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  backgroundColor: '#1F5C7A',
                  borderRadius: '6px',
                  padding: '20px',
                  marginBottom: '32px',
                  color: '#F2EEE5',
                }}>
                  <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, marginBottom: '8px' }}>
                    Payment method
                  </div>
                  <p style={{ margin: 0, fontSize: '14px' }}>
                    You'll be taken to Stripe (secure payment processor) after clicking "Subscribe". We don't store your card details.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => goToStep('profile')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#FBF9F4',
                      color: '#1B3A6B',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '15px',
                      border: '1px solid #D8D2C4',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={async () => {
                      setLoading(true);
                      setError(null);
                      try {
                        // Upload documents first
                        for (const [docType, file] of Object.entries(formData.documents)) {
                          if (file) {
                            const uploadFormData = new FormData();
                            uploadFormData.append('email', formData.email);
                            uploadFormData.append('documentType', docType);
                            uploadFormData.append('file', file);

                            const docRes = await fetch('/api/provider/upload-document', {
                              method: 'POST',
                              body: uploadFormData,
                            });

                            if (!docRes.ok) {
                              const docError = await docRes.json();
                              throw new Error(`Document upload failed: ${docError.error}`);
                            }
                          }
                        }

                        // Create provider profile
                        const signupFormData = new FormData();
                        signupFormData.append('email', formData.email);
                        signupFormData.append('password', formData.password);
                        signupFormData.append('name', formData.name);
                        signupFormData.append('trade', formData.trade);
                        signupFormData.append('location', formData.location);
                        signupFormData.append('serviceArea', formData.serviceArea);
                        signupFormData.append('bio', formData.bio);
                        signupFormData.append('hourlyRate', formData.hourlyRate);
                        signupFormData.append('yearsExperience', formData.yearsExperience);

                        const signupRes = await fetch('/api/provider/signup', {
                          method: 'POST',
                          body: signupFormData,
                        });

                        if (!signupRes.ok) {
                          const signupError = await signupRes.json();
                          throw new Error(signupError.error || 'Signup failed');
                        }

                        const signupData = await signupRes.json();
                        setSuccessMessage('Profile created successfully! Redirecting...');
                        
                        // Redirect to confirmation
                        setTimeout(() => {
                          setCurrentStep('confirmation');
                          window.scrollTo(0, 0);
                        }, 1000);
                      } catch (err) {
                        setError(err instanceof Error ? err.message : 'An error occurred');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: loading ? '#D8D2C4' : '#D9A441',
                      color: '#1B3A6B',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '15px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {loading ? 'Processing...' : 'Subscribe now'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
