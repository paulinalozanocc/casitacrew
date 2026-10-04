// app/api/keep-alive/route.ts
// Called once a day by Vercel Cron (see vercel.json) so the Supabase
// free-tier project never hits 7 days of inactivity and pauses.

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Vercel Cron sends "Authorization: Bearer <CRON_SECRET>" automatically.
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Cheap real query against Postgres; returns only a count, no row data.
  const { count, error } = await supabase
    .from('provider_profiles')
    .select('id', { count: 'exact', head: true });

  if (error) {
    console.error('Supabase keep-alive failed:', error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, providers: count, at: new Date().toISOString() });
}
