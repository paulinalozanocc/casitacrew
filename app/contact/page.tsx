export default function ContactPage() {
  return (
    <>
      <section style={{ backgroundColor: '#1B3A6B', color: '#F2EEE5', padding: '80px 40px 56px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <h1 style={{ color: '#F2EEE5', margin: '0 0 12px 0', fontSize: 'clamp(44px, 6vw, 76px)' }}>Contact us</h1>
          <p style={{ maxWidth: '560px', fontSize: '18px', lineHeight: 1.6, opacity: 0.9, margin: 0 }}>Have a question or feedback? We'd love to hear from you.</p>
        </div>
      </section>

      <section style={{ padding: '80px 40px', backgroundColor: '#F2EEE5' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ backgroundColor: '#FBF9F4', border: '1px solid #D8D2C4', borderRadius: '6px', padding: '40px' }}>
            <h2 style={{ color: '#1B3A6B', marginBottom: '24px', textAlign: 'center' }}>Get in touch</h2>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: '#1B3A6B', margin: '0 0 8px 0', fontFamily: "'Archivo', sans-serif", fontWeight: 800 }}>Email</h3>
              <p style={{ color: '#1F5C7A', fontSize: '18px', margin: 0, textDecoration: 'underline' }}>info@casitacrew.ca</p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: '#1B3A6B', margin: '0 0 8px 0', fontFamily: "'Archivo', sans-serif", fontWeight: 800 }}>Phone</h3>
              <p style={{ color: '#1F5C7A', fontSize: '18px', margin: 0, textDecoration: 'underline' }}>416-555-0134</p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: '#1B3A6B', margin: '0 0 8px 0', fontFamily: "'Archivo', sans-serif", fontWeight: 800 }}>Hours</h3>
              <p style={{ color: '#8A857C', margin: 0, lineHeight: 1.6 }}>Monday–Friday: 9am–6pm ET<br />Saturday: 10am–4pm ET<br />Sunday: Closed</p>
            </div>

            <div style={{ marginBottom: 0 }}>
              <h3 style={{ color: '#1B3A6B', margin: '0 0 8px 0', fontFamily: "'Archivo', sans-serif", fontWeight: 800 }}>What we help with</h3>
              <ul style={{ color: '#8A857C', margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                <li>Questions about our service</li>
                <li>Disputes or refund requests</li>
                <li>Feedback or feature requests</li>
                <li>General inquiries</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
