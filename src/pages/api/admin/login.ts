import type { APIRoute } from 'astro';
import { createAdminToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    console.log('admin/login: start');
    console.log('admin/login: has env', {
      hasPassword: Boolean(locals.runtime.env.ADMIN_PASSWORD),
      hasSecret: Boolean(locals.runtime.env.ADMIN_COOKIE_SECRET),
    });

    const form = await request.formData();
    const password = String(form.get('password') || '');
    const expected = locals.runtime.env.ADMIN_PASSWORD || '';

    console.log('admin/login: password check', {
      passwordLength: password.length,
      expectedLength: expected.length,
      matches: password === expected,
    });

    if (!expected || password !== expected) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid password' }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const secret = locals.runtime.env.ADMIN_COOKIE_SECRET || 'dev-secret-change-me';
    const token = createAdminToken(secret);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Set-Cookie': `nakupovanie_admin=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 8}`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('admin/login: crashed', error);
    return new Response(
      JSON.stringify({ ok: false, error: 'login crashed' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
      },
    );
  }
};