import { auth0 } from '@/lib/auth0';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const session = await auth0.getSession();

  if (!session) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(session.user), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
