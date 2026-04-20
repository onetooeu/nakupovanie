import type { APIRoute } from 'astro';
import { createAdminToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, locals }) => {
  const form = await request.formData();
  const password = String(form.get('password') || '');
  const expected = locals.runtime.env.ADMIN_PASSWORD || '';

  if (!expected || password !== expected) {
    return new Response('Invalid password', { status: 401 });
  }

  const secret = locals.runtime.env.ADMIN_COOKIE_SECRET || 'dev-secret-change-me';
  const token = createAdminToken(secret);

  const headers = new Headers({
    'Set-Cookie': `nakupovanie_admin=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 8}`,
    Location: '/control/panel/',
  });

  return new Response(null, { status: 303, headers });
};
