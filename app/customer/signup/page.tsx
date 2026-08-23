'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CustomerSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "That doesn't look like an email address.";
    }

    if (!formData.password) {
      newErrors.password = 'Enter a password.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Passwords need at least 8 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Type your password again.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "The two passwords don't match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      // Call customer signup API
      const response = await fetch('/api/customer/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ form: data.error || 'Signup failed. Please try again.' });
        return;
      }

      setSubmitted(true);
      setErrors({});
    } catch (error) {
      setErrors({ form: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#F2EEE5', color: '#0F1C33', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #D8D2C4' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '14px 40px', minHeight: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'baseline', gap: '7px', whiteSpace: 'nowrap', textDecoration: 'none' }}>
            <div style={{ fontFamily: "'Lobster Two', cursive", fontStyle: 'italic', fontWeight: 700, fontSize: '27px', color: '#1B3A6B', lineHeight: 1 }}>Casita</div>
            <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: '15px', letterSpacing: '0.14em', color: '#0F1C33' }}>CREW</div>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '15px', color: '#55524A', whiteSpace: 'nowrap' }}>Already have an account?</div>
            <Link href="/customer/login" style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '15px', color: '#1F5C7A', whiteSpace: 'nowrap', textDecoration: 'none' }}>Log in</Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '72px 24px 96px' }}>
        <div style={{ width: '100%', maxWidth: '468px', display: 'flex', flexDirection: 'column', gap: '36px' }}>
          
          {/* Header Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', alignSelf: 'flex-start', border: '1px solid rgba(217,164,65,0.6)', padding: '6px 12px', borderRadius: '4px' }}>
              <svg width="14" height="14" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                <path d="M8 1 L14 3.5 V8 C14 11.4 11.4 14 8 15 C4.6 14 2 11.4 2 8 V3.5 Z" fill="#D9A441" />
                <path d="M5.4 8 L7.2 9.8 L10.6 6.2" stroke="#1B3A6B" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A857C' }}>Every pro checked before they're listed</div>
            </div>
            <h1 style={{ margin: 0, fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 'clamp(34px, 5vw, 44px)', lineHeight: 1.05, letterSpacing: '-0.028em', color: '#1B3A6B', wordWrap: 'break-word' }}>Sign up to CasitaCrew</h1>
            <p style={{ margin: 0, fontFamily: 'Barlow, sans-serif', fontSize: '18px', lineHeight: 1.5, color: '#55524A' }}>Find and book trusted trades.</p>
          </div>

          {/* Success Message */}
          {submitted ? (
            <div style={{ border: '1px solid #D8D2C4', borderRadius: '6px', background: '#FBF9F4', padding: '28px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: '20px', color: '#1B3A6B' }}>Check your email</div>
              <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '16px', lineHeight: 1.5, color: '#55524A' }}>We sent a confirmation link to {formData.email}. Open it and you can start booking.</div>
            </div>
          ) : (
            <>
              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {errors.form && (
                  <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '6px', fontSize: '14px', fontFamily: 'Barlow, sans-serif' }}>
                    {errors.form}
                  </div>
                )}

                {/* Full Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <label htmlFor="name" style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0F1C33' }}>Full name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Priya Sharma"
                    style={{ fontFamily: 'Barlow, sans-serif', fontSize: '16px', color: '#0F1C33', background: '#FBF9F4', border: '1px solid #D8D2C4', borderRadius: '5px', padding: '13px 14px', width: '100%', boxSizing: 'border-box' }}
                  />
                  {errors.name && <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', color: '#C7472F' }}>{errors.name}</div>}
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <label htmlFor="email" style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0F1C33' }}>Email address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    style={{ fontFamily: 'Barlow, sans-serif', fontSize: '16px', color: '#0F1C33', background: '#FBF9F4', border: '1px solid #D8D2C4', borderRadius: '5px', padding: '13px 14px', width: '100%', boxSizing: 'border-box' }}
                  />
                  {errors.email && <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', color: '#C7472F' }}>{errors.email}</div>}
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <label htmlFor="phone" style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0F1C33' }}>Phone number</label>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A857C' }}>Optional</span>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="416 555 0134"
                    style={{ fontFamily: 'Barlow, sans-serif', fontSize: '16px', color: '#0F1C33', background: '#FBF9F4', border: '1px solid #D8D2C4', borderRadius: '5px', padding: '13px 14px', width: '100%', boxSizing: 'border-box' }}
                  />
                  <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', color: '#8A857C' }}>Only used to text you when a pro is on the way.</div>
                </div>

                {/* Password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <label htmlFor="password" style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0F1C33' }}>Password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    style={{ fontFamily: 'Barlow, sans-serif', fontSize: '16px', color: '#0F1C33', background: '#FBF9F4', border: '1px solid #D8D2C4', borderRadius: '5px', padding: '13px 14px', width: '100%', boxSizing: 'border-box' }}
                  />
                  {errors.password && <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', color: '#C7472F' }}>{errors.password}</div>}
                </div>

                {/* Confirm Password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <label htmlFor="confirmPassword" style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0F1C33' }}>Confirm password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Type it again"
                    style={{ fontFamily: 'Barlow, sans-serif', fontSize: '16px', color: '#0F1C33', background: '#FBF9F4', border: '1px solid #D8D2C4', borderRadius: '5px', padding: '13px 14px', width: '100%', boxSizing: 'border-box' }}
                  />
                  {errors.confirmPassword && <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', color: '#C7472F' }}>{errors.confirmPassword}</div>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{ background: '#D9A441', color: '#1B3A6B', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: '16px', padding: '15px 24px', border: 'none', borderRadius: '5px', cursor: loading ? 'not-allowed' : 'pointer', width: '100%', letterSpacing: '0.01em', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Signing up...' : 'Sign up'}
                </button>

                {/* Terms */}
                <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', lineHeight: 1.5, color: '#8A857C' }}>
                  By signing up you agree to the{' '}
                  <Link href="/terms" style={{ color: '#1F5C7A', textDecoration: 'none' }}>terms</Link>
                  {' '}and{' '}
                  <Link href="/privacy" style={{ color: '#1F5C7A', textDecoration: 'none' }}>privacy policy</Link>.
                </div>
              </form>

              {/* Login Link */}
              <div style={{ borderTop: '1px solid #D8D2C4', paddingTop: '22px', display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '16px', color: '#55524A' }}>Already have an account?</div>
                <Link href="/customer/login" style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '16px', color: '#1F5C7A', textDecoration: 'none' }}>Log in</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
