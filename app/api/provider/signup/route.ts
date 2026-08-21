// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/app/lib/supabase';
import { createCustomer, createSubscription, stripe } from '@/app/lib/stripe';
import { sendProviderSignupConfirmation, sendAdminNotification } from '@/app/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const trade = formData.get('trade') as string;
    const location = formData.get('location') as string;
    const serviceArea = formData.get('serviceArea') as string;
    const bio = formData.get('bio') as string;
    const hourlyRate = formData.get('hourlyRate') as string;
    const yearsExperience = formData.get('yearsExperience') as string;

    // Validate required fields
    if (!email || !name || !trade || !location || !serviceArea) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Create Stripe customer
    let stripeCustomerId: string;
    try {
      const customer = await createCustomer(email, name);
      stripeCustomerId = customer.id;
    } catch (error) {
      console.error('Stripe customer creation failed:', error);
      return NextResponse.json(
        { error: 'Payment setup failed' },
        { status: 500 }
      );
    }

    // 2. Create provider profile in database
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { data: profileData, error: profileError } = await (supabaseAdmin as any)
      .from('provider_profiles')
      .insert([
        {
          user_email: email,
          name,
          trade,
          location,
          service_area: serviceArea,
          bio,
          hourly_rate: parseFloat(hourlyRate),
          price_range: `$${hourlyRate}/hr`,
          years_experience: parseInt(yearsExperience),
          verification_status: 'pending',
          stripe_customer_id: stripeCustomerId,
          subscription_status: 'inactive',
        },
      ])
      .select();

    if (profileError) {
      console.error('Profile creation error:', profileError);
      return NextResponse.json(
        { error: 'Failed to create provider profile' },
        { status: 500 }
      );
    }

    // 3. Send confirmation email to provider
    await sendProviderSignupConfirmation(email, name);

    // 4. Send admin notification
    const adminEmail = process.env.ADMIN_EMAIL || 'paulina@casitacrew.ca';
    await sendAdminNotification(adminEmail, name, trade, 'new_submission');

    return NextResponse.json({
      success: true,
      message: 'Signup successful. Awaiting document verification.',
      profileId: profileData?.[0]?.id,
      stripeCustomerId,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Signup failed', details: String(error) },
      { status: 500 }
    );
  }
}
