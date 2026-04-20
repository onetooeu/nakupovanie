import type { APIRoute } from 'astro';
import { createAdminToken } from '../../../lib/auth';

function cookieFlags(request: Request) {
  const secure = request.url.startsWith('https://') ? '; Secure' : '';
  return `Path=/; HttpOnly; SameSite=Lax${secure}`;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const form = await request.formData();
  const password = String(form.get('password') || '');
  const expected = locals.runtime.env.ADMIN_PASSWORD || '';

  if (!expected || password !== expected) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid password' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }

  const secret = locals.runtime.env.ADMIN_COOKIE_SECRET || 'dev-secret-change-me';
  const token = createAdminToken(secret);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Set-Cookie': `nakupovanie_admin=${encodeURIComponent(token)}; ${cookieFlags(request)}; Max-Age=${60 * 60 * 8}`,
    },
  });
};
