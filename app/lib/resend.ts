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

export const resend = {
  get emails() {
    return getResend().emails;
  },
};

export async function sendProviderSignupConfirmation(email: string, name: string) {
  try {
    await resend.emails.send({
      from: 'noreply@casitacrew.ca',
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
      from: 'noreply@casitacrew.ca',
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
      from: 'noreply@casitacrew.ca',
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
      from: 'noreply@casitacrew.ca',
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
