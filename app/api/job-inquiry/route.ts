// POST /api/job-inquiry — a customer asks for a job from a provider profile.
// No account needed. Saves to job_inquiries and emails CasitaCrew to match a pro by hand.
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/app/lib/supabase';
import { getProviderById } from '@/app/lib/mockProviders';
import { sendJobInquiryToAdmin, sendJobInquiryReceipt } from '@/app/lib/resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: real people never fill the hidden "company" field; bots do.
  if (clean(body.company, 200)) {
    return NextResponse.json({ success: true });
  }

  const provider = getProviderById(clean(body.providerId, 50));
  const customerName = clean(body.name, 120);
  const customerEmail = clean(body.email, 200).toLowerCase();
  const customerPhone = clean(body.phone, 40) || null;
  const neighbourhood = clean(body.neighbourhood, 120);
  const jobDescription = clean(body.description, 3000);
  const preferredDate = clean(body.preferredDate, 10);

  if (!provider) {
    return NextResponse.json({ error: 'That pro could not be found.' }, { status: 400 });
  }
  if (!customerName || !neighbourhood || jobDescription.length < 10) {
    return NextResponse.json(
      { error: 'Please add your name, neighbourhood and a short description of the job.' },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(customerEmail)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  const dateOk = !preferredDate || /^\d{4}-\d{2}-\d{2}$/.test(preferredDate);

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Service unavailable. Please try again shortly.' }, { status: 503 });
  }

  const { data, error } = await supabaseAdmin
    .from('job_inquiries')
    .insert({
      provider_id: provider.id,
      provider_name: provider.name,
      trade: provider.trade,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      neighbourhood,
      job_description: jobDescription,
      preferred_date: dateOk && preferredDate ? preferredDate : null,
    } as never)
    .select('id')
    .single();

  if (error || !data) {
    console.error('job_inquiries insert failed:', error?.message);
    return NextResponse.json({ error: 'We could not send your request. Please try again.' }, { status: 500 });
  }

  const email = {
    id: (data as { id: string }).id,
    providerName: provider.name,
    trade: provider.trade,
    customerName,
    customerEmail,
    customerPhone,
    neighbourhood,
    jobDescription,
    preferredDate: dateOk ? preferredDate : null,
  };

  // The request is saved either way; log email problems instead of failing the customer.
  try {
    const { error: sendError } = await sendJobInquiryToAdmin(email);
    if (sendError) console.error('Admin inquiry email failed:', sendError.message);
  } catch (err) {
    console.error('Admin inquiry email threw:', err);
  }
  await sendJobInquiryReceipt(email);

  return NextResponse.json({ success: true });
}
