// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/app/lib/supabase';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get('email') as string;
    const documentType = formData.get('documentType') as string;
    const file = formData.get('file') as File;

    if (!email || !documentType || !file) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only PDF, JPG, and PNG files are allowed' },
        { status: 400 }
      );
    }

    // Upload to Supabase Storage
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const fileName = `${email}/${documentType}/${Date.now()}-${file.name}`;
    const fileBuffer = await file.arrayBuffer();

    const { data: uploadData, error: uploadError } = await (supabaseAdmin as any)
      .storage
      .from('verification-documents')
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', JSON.stringify(uploadError));
      return NextResponse.json(
        { error: `Failed to upload file: ${uploadError.message || JSON.stringify(uploadError)}` },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = (supabaseAdmin as any)
      .storage
      .from('verification-documents')
      .getPublicUrl(fileName);

    // Store document record in database
    const { error: docError } = await (supabaseAdmin as any)
      .from('verification_documents')
      .insert([
        {
          provider_email: email,
          document_type: documentType,
          file_url: urlData.publicUrl,
          file_name: file.name,
          file_size: file.size,
        },
      ]);

    if (docError) {
      console.error('Document record error:', JSON.stringify(docError));
      return NextResponse.json(
        { error: `Failed to save document record: ${docError.message || JSON.stringify(docError)}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Document uploaded successfully',
      fileUrl: urlData.publicUrl,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    console.error('Document upload error:', errorMessage, error);
    return NextResponse.json(
      { error: `Upload failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
