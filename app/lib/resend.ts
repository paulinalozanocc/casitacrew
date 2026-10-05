import { Resend } from 'resend';

let resendInstance: Resend | null = null;

function getResend() {
  if (!resendInstance) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error('Missing Resend API key');
    }
    resendInstance = new Resend(key);
  }
  return resendInstance;
}

// Resend only sends from verified domains. mail.casitacrew.com is the verified
// sending subdomain; override with RESEND_FROM if that ever changes.
export const FROM_EMAIL = process.env.RESEND_FROM ?? 'CasitaCrew <noreply@mail.casitacrew.com>';
export const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL ?? 'info@casitacrew.ca';

export function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const resend = {
  get emails() {
    return getResend().emails;
  },
};

export async function sendProviderSignupConfirmation(email: string, name: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Welcome to CasitaCrew — Application Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to CasitaCrew, ${name}!</h2>
          <p>Your application has been received. We're reviewing your documents now.</p>
          <p><strong>What happens next:</strong></p>
          <ul>
            <li>We verify your ID, license, insurance, and WSIB clearance</li>
            <li>You'll hear from us within 24–48 hours via email</li>
            <li>Once approved, your profile goes live and you start receiving customer inquiries</li>
          </ul>
          <p>Questions? Reply to this email or contact us at info@casitacrew.ca</p>
          <p style="color: #999; font-size: 12px;">Vetted trades, no surprises.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
}

export async function sendProviderApproved(email: string, name: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '✓ You\'re approved! Profile is now live.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Great news, ${name}!</h2>
          <p>Your profile has been approved and is now live on CasitaCrew.</p>
          <p><strong>You can now:</strong></p>
          <ul>
            <li>Receive customer inquiries</li>
            <li>Message customers to confirm details</li>
            <li>Collect payment directly from customers</li>
            <li>Build your reputation with reviews</li>
          </ul>
          <p><a href="https://casitacrew.ca/provider/dashboard" style="color: #1B3A6B; text-decoration: none; font-weight: bold;">View your dashboard →</a></p>
          <p style="color: #999; font-size: 12px;">Vetted trades, no surprises.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send approval email:', error);
  }
}

export async function sendProviderRejected(email: string, name: string, reason: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Application Update',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Application Status</h2>
          <p>Hi ${name},</p>
          <p>Thank you for applying to CasitaCrew. Unfortunately, we weren't able to approve your application at this time.</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p>You're welcome to reapply once the issue has been resolved.</p>
          <p>Questions? Contact us at info@casitacrew.ca</p>
          <p style="color: #999; font-size: 12px;">Vetted trades, no surprises.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send rejection email:', error);
  }
}

export async function sendAdminNotification(
  adminEmail: string,
  providerName: string,
  trade: string,
  action: 'new_submission'
) {
  try {
    const actionText = action === 'new_submission' ? 'New provider application submitted' : '';
    await resend.emails.send({
      from: FROM_EMAIL,
      to: adminEmail,
      subject: `[CasitaCrew Admin] ${actionText}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>${actionText}</h2>
          <p><strong>Provider:</strong> ${providerName}</p>
          <p><strong>Trade:</strong> ${trade}</p>
          <p><a href="https://casitacrew.ca/admin/verification-queue" style="color: #1B3A6B; text-decoration: none; font-weight: bold;">Review in admin panel →</a></p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send admin notification:', error);
  }
}

export interface JobInquiryEmail {
  id: string;
  providerName: string;
  trade: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  neighbourhood: string;
  jobDescription: string;
  preferredDate?: string | null;
}

// Goes to CasitaCrew (info@casitacrew.ca) so a real provider can be matched by hand.
export async function sendJobInquiryToAdmin(j: JobInquiryEmail) {
  const e = escapeHtml;
  return resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    replyTo: j.customerEmail,
    subject: `New job request: ${j.trade} in ${j.neighbourhood}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color:#1B3A6B;">New job request</h2>
        <p><strong>Requested pro:</strong> ${e(j.providerName)} (${e(j.trade)})</p>
        <p><strong>Customer:</strong> ${e(j.customerName)}<br/>
           <strong>Email:</strong> ${e(j.customerEmail)}<br/>
           <strong>Phone:</strong> ${e(j.customerPhone || 'not given')}</p>
        <p><strong>Neighbourhood:</strong> ${e(j.neighbourhood)}<br/>
           <strong>Preferred date:</strong> ${e(j.preferredDate || 'flexible')}</p>
        <p><strong>The job:</strong></p>
        <p style="white-space:pre-wrap;background:#F2EEE5;padding:12px;border-radius:4px;">${e(j.jobDescription)}</p>
        <p style="color:#8A857C;font-size:12px;">Reply to this email to reach the customer directly. Request ID: ${e(j.id)}</p>
      </div>
    `,
  });
}

export async function sendJobInquiryReceipt(j: JobInquiryEmail) {
  const e = escapeHtml;
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: j.customerEmail,
      replyTo: ADMIN_EMAIL,
      subject: 'We got your request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color:#1B3A6B;">Thanks, ${e(j.customerName.split(' ')[0])}. We got your request.</h2>
          <p>You asked about ${e(j.trade)} work in ${e(j.neighbourhood)}. We'll confirm a vetted pro and their price with you by email, usually within one business day.</p>
          <p>Nothing is booked and you owe nothing until you agree the price.</p>
          <p>Questions? Just reply to this email.</p>
          <p style="color:#999;font-size:12px;">CasitaCrew · Vetted trades, no surprises.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send inquiry receipt:', error);
  }
}
