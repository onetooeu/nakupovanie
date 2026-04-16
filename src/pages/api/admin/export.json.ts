import type { APIRoute } from 'astro';
import { getDb, listRegistrations, ensureSchema } from '../../../lib/db';
import { isAdminRequest } from '../../../lib/auth';

export const GET: APIRoute = async ({ locals, request }) => {
  if (!isAdminRequest(request, locals.runtime.env)) {
    return new Response('Unauthorized', { status: 401 });
  }
  const db = getDb(locals.runtime.env);
  await ensureSchema(db);
  const rows = await listRegistrations(db);
  return new Response(JSON.stringify(rows, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
