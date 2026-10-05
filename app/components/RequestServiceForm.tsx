'use client';

import { useState } from 'react';

const labelStyle = {
  fontFamily: 'Archivo, sans-serif',
  fontWeight: 700,
  fontSize: '14px',
  color: '#0F1C33',
  display: 'block',
  marginBottom: '6px',
} as const;

const inputStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid #D8D2C4',
  borderRadius: '5px',
  fontFamily: 'Barlow, sans-serif',
  fontSize: '15px',
  backgroundColor: '#FBF9F4',
  boxSizing: 'border-box',
} as const;

export default function RequestServiceForm({
  providerId,
  providerFirstName,
}: {
  providerId: string;
  providerFirstName: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/job-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId, ...Object.fromEntries(form) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setStatus('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div id="request" style={{ padding: '16px', border: '1.5px solid #1F5C7A', borderRadius: '6px' }}>
        <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, color: '#1B3A6B', marginBottom: '6px' }}>
          Request sent.
        </div>
        <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', color: '#0F1C33', margin: 0 }}>
          We&apos;ll confirm a vetted pro and their price by email, usually within one business day. Nothing is
          booked until you agree the price.
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <button id="request" type="button" className="w-full btn-primary" onClick={() => setOpen(true)}>
        Request {providerFirstName}
      </button>
    );
  }

  return (
    <form id="request" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <label htmlFor="rq-name" style={labelStyle}>Your name</label>
        <input id="rq-name" name="name" required maxLength={120} autoComplete="name" style={inputStyle} />
      </div>
      <div>
        <label htmlFor="rq-email" style={labelStyle}>Email</label>
        <input id="rq-email" name="email" type="email" required maxLength={200} autoComplete="email" style={inputStyle} />
      </div>
      <div>
        <label htmlFor="rq-phone" style={labelStyle}>Phone (optional)</label>
        <input id="rq-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" style={inputStyle} />
      </div>
      <div>
        <label htmlFor="rq-area" style={labelStyle}>Neighbourhood</label>
        <input id="rq-area" name="neighbourhood" required maxLength={120} placeholder="e.g. Roncesvalles" style={inputStyle} />
      </div>
      <div>
        <label htmlFor="rq-desc" style={labelStyle}>What needs doing?</label>
        <textarea
          id="rq-desc"
          name="description"
          required
          minLength={10}
          maxLength={3000}
          placeholder="e.g. Kitchen sink is leaking under the cabinet. Started yesterday."
          style={{ ...inputStyle, minHeight: '96px', resize: 'vertical' }}
        />
      </div>
      <div>
        <label htmlFor="rq-date" style={labelStyle}>Preferred date (optional)</label>
        <input id="rq-date" name="preferredDate" type="date" style={inputStyle} />
      </div>
      {/* Honeypot for bots — hidden from people and screen readers */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="rq-company">Company</label>
        <input id="rq-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      {status === 'error' && (
        <p role="alert" style={{ color: '#C7472F', fontFamily: 'Barlow, sans-serif', fontSize: '14px', margin: 0 }}>
          {error}
        </p>
      )}
      <button type="submit" className="w-full btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send request'}
      </button>
      <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '12px', color: '#8A857C', margin: 0 }}>
        Free to ask. No account needed.
      </p>
    </form>
  );
}
