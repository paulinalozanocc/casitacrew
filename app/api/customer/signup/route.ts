// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/app/lib/supabase';
import { resend } from '@/app/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body;

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
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

    // Create auth user
    const { data: authData, error: authError } = await (supabaseAdmin as any).auth.admin.createUser({
      email,
      password,
      email_confirm: false,
    });

    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: authError.message || 'Failed to create account' },
        { status: 400 }
      );
    }

    // Create customer profile
    const { error: profileError } = await (supabaseAdmin as any)
      .from('customer_profiles')
      .insert([
        {
          user_id: authData.user.id,
          email,
          name,
          phone: phone || null,
          created_at: new Date().toISOString(),
        },
      ]);

    if (profileError) {
      console.error('Profile error:', JSON.stringify(profileError));
      return NextResponse.json(
        { error: 'Failed to create customer profile' },
        { status: 500 }
      );
    }

    // Send confirmation email
    try {
      await resend.emails.send({
        from: 'noreply@casitacrew.ca',
        to: email,
        subject: 'Welcome to CasitaCrew!',
        html: `
          <h2>Welcome to CasitaCrew, ${name}!</h2>
          <p>Your account has been created. You can now browse and book trusted trades in Toronto.</p>
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/customer/login">Log in to your account</a></p>
          <p>Questions? Contact us at hello@paulinalozano.com</p>
        `,
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Don't fail the signup if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      email,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    console.error('Customer signup error:', errorMessage, error);
    return NextResponse.json(
      { error: `Signup failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
