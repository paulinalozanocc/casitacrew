// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/app/lib/supabase';

// file_url holds either a storage path or the (non-working) public URL saved at upload.
function storagePath(fileUrl: string | null | undefined) {
  if (!fileUrl) return null;
  const marker = '/verification-documents/';
  const i = fileUrl.indexOf(marker);
  const raw = i === -1 ? fileUrl : fileUrl.slice(i + marker.length);
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

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

        // The bucket is private, so stored public URLs don't open. Give the admin
        // page short-lived signed links instead (valid for 1 hour).
        const documents = await Promise.all(
          (docs || []).map(async (doc) => {
            const path = storagePath(doc.file_url);
            if (!path) return { ...doc, signed_url: null };
            const { data: signed } = await supabaseAdmin.storage
              .from('verification-documents')
              .createSignedUrl(path, 60 * 60);
            return { ...doc, signed_url: signed?.signedUrl ?? null };
          })
        );

        return {
          ...provider,
          documents,
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
