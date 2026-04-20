import type { APIRoute } from 'astro';
import { isAdminRequest } from '../../../lib/auth';
import { getDb, ensureSchema, listRegistrations } from '../../../lib/db';

export const GET: APIRoute = async ({ request, locals }) => {
  if (!isAdminRequest(request, locals.runtime.env)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const db = getDb(locals.runtime.env);
  await ensureSchema(db);

  const registrations = await listRegistrations(db);

  return new Response(
    JSON.stringify({
      ok: true,
      registrations,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    }
  );
};