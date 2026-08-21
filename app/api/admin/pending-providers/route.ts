// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/app/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Fetch all pending providers
    const { data: pendingProviders, error: fetchError } = await supabaseAdmin
      .from('provider_profiles')
      .select('*')
      .eq('verification_status', 'pending')
      .order('created_at', { ascending: false });

    if (fetchError) {
      return NextResponse.json(
        { error: 'Failed to fetch providers' },
        { status: 500 }
      );
    }

    // Fetch all documents for each provider
    const providersWithDocs = await Promise.all(
      pendingProviders.map(async (provider) => {
        const { data: docs, error: docsError } = await supabaseAdmin
          .from('verification_documents')
          .select('*')
          .eq('provider_email', provider.user_email);

        return {
          ...provider,
          documents: docs || [],
        };
      })
    );

    return NextResponse.json({
      success: true,
      providers: providersWithDocs,
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch providers', details: String(error) },
      { status: 500 }
    );
  }
}
