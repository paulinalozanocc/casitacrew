import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';

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
    const fileName = `${email}/${documentType}/${Date.now()}-${file.name}`;
    const fileBuffer = await file.arrayBuffer();

    const { data: uploadData, error: uploadError } = await supabaseAdmin!
      .storage
      .from('verification-documents')
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin!
      .storage
      .from('verification-documents')
      .getPublicUrl(fileName);

    // Store document record in database
    const { error: docError } = await supabaseAdmin!
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
      console.error('Document record error:', docError);
      return NextResponse.json(
        { error: 'Failed to save document record' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Document uploaded successfully',
      fileUrl: urlData.publicUrl,
    });
  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: String(error) },
      { status: 500 }
    );
  }
}
