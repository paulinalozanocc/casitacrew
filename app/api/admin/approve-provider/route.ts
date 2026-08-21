// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/app/lib/supabase';
import { sendProviderApproved } from '@/app/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const { providerEmail, notes } = await req.json();

    if (!providerEmail) {
      return NextResponse.json(
        { error: 'Provider email required' },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Fetch provider profile
    const { data: profileData, error: fetchError } = await supabaseAdmin
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
    const { error: updateError } = await supabaseAdmin
      .from('provider_profiles')
      .update({
        verification_status: 'approved',
        verification_date: new Date().toISOString(),
        subscription_status: 'active',
      })
      .eq('user_email', providerEmail);

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update provider status' },
        { status: 500 }
      );
    }

    // Send approval email
    await sendProviderApproved(providerEmail, profileData.name);

    // Log action (best effort - don't fail if it errors)
    try {
      await supabaseAdmin
        .from('admin_logs')
        .insert([
          {
            action: 'approved_provider',
            provider_email: providerEmail,
            admin_notes: notes,
            created_at: new Date().toISOString(),
          },
        ]);
    } catch {
      // Ignore log errors
    }

    return NextResponse.json({
      success: true,
      message: 'Provider approved successfully',
    });
  } catch (error) {
    console.error('Approval error:', error);
    return NextResponse.json(
      { error: 'Approval failed', details: String(error) },
      { status: 500 }
    );
  }
}
