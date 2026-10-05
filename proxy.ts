// proxy.ts — runs before every /admin and /api/admin request.
// Requires the admin username + password (Vercel env vars ADMIN_USER and
// ADMIN_PASSWORD). The browser shows a sign-in prompt once and then sends the
// credentials automatically with the verification queue's API calls.
// If the env vars are missing, access is denied (fails closed).

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function proxy(request: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  const header = request.headers.get('authorization') ?? '';
  if (user && pass && header.startsWith('Basic ')) {
    const decoded = atob(header.slice(6));
    const sep = decoded.indexOf(':');
    const u = decoded.slice(0, sep);
    const p = decoded.slice(sep + 1);
    if (sep > -1 && safeEqual(u, user) && safeEqual(p, pass)) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="CasitaCrew admin", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
