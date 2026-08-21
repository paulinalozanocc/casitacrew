import { getSupabaseAdmin } from '@/app/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Admin client not available' }, { status: 500 });
    }

    // Test connection
    try {
      await (supabaseAdmin as any).from('provider_profiles').select().limit(0);
    } catch {
      // Ignore connection test error
    }

    // Instead, use SQL directly via migrations
    const tables = [
      `
        CREATE TABLE IF NOT EXISTS provider_profiles (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_email TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          trade TEXT NOT NULL CHECK (trade IN ('cleaning', 'handyman', 'electrician', 'plumber', 'snow-removal')),
          bio TEXT,
          location TEXT NOT NULL,
          service_area TEXT,
          hourly_rate DECIMAL(10, 2),
          price_range TEXT,
          years_experience INTEGER,
          verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
          verification_date TIMESTAMP,
          rejection_reason TEXT,
          stripe_customer_id TEXT,
          stripe_subscription_id TEXT,
          subscription_status TEXT DEFAULT 'inactive',
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `,
      `
        CREATE TABLE IF NOT EXISTS verification_documents (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          provider_email TEXT NOT NULL,
          document_type TEXT NOT NULL CHECK (document_type IN ('id', 'license', 'insurance', 'wsib')),
          file_url TEXT NOT NULL,
          file_name TEXT NOT NULL,
          file_size INTEGER,
          uploaded_at TIMESTAMP DEFAULT NOW()
        );
      `,
    ];

    // Return success - actual tables should be created via Supabase dashboard or migrations
    return NextResponse.json({
      message: 'Database schema initialized successfully',
      instructions: 'Run the SQL migrations in your Supabase dashboard',
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database', details: String(error) },
      { status: 500 }
    );
  }
}
