import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';
import { sendProviderRejected } from '@/app/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const { providerEmail, reason, notes } = await req.json();

    if (!providerEmail || !reason) {
      return NextResponse.json(
        { error: 'Provider email and reason required' },
        { status: 400 }
      );
    }

    // Fetch provider profile
    const { data: profileData, error: fetchError } = await supabaseAdmin!
      .from('provider_profiles')
      .select('*')
      .eq('user_email', providerEmail)
      .single();

    if (fetchError || !profileData) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }

    // Update verification status
    const { error: updateError } = await supabaseAdmin!
      .from('provider_profiles')
      .update({
        verification_status: 'rejected',
        rejection_reason: reason,
        subscription_status: 'inactive',
      })
      .eq('user_email', providerEmail);

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update provider status' },
        { status: 500 }
      );
    }

    // Send rejection email
    await sendProviderRejected(providerEmail, profileData.name, reason);

    // Log action (best effort - don't fail if it errors)
    try {
      await supabaseAdmin!
        .from('admin_logs')
        .insert([
          {
            action: 'rejected_provider',
            provider_email: providerEmail,
            rejection_reason: reason,
            admin_notes: notes,
            created_at: new Date().toISOString(),
          },
        ]);
    } catch {
      // Ignore log errors
    }

    return NextResponse.json({
      success: true,
      message: 'Provider rejected successfully',
    });
  } catch (error) {
    console.error('Rejection error:', error);
    return NextResponse.json(
      { error: 'Rejection failed', details: String(error) },
      { status: 500 }
    );
  }
}
