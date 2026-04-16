import type { APIRoute } from 'astro';
import { getDb, updateRegistration, ensureSchema } from '../../../../lib/db';
import { isAdminRequest } from '../../../../lib/auth';

export const POST: APIRoute = async ({ params, request, locals }) => {
  if (!isAdminRequest(request, locals.runtime.env)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return new Response('Invalid registration id', { status: 400 });
  }

  const form = await request.formData();
  const field = String(form.get('field') || 'status').trim();
  const value = String(form.get('value') || '').trim();

  if (!field) {
    return new Response('Missing field', { status: 400 });
  }

  const db = getDb(locals.runtime.env);
  await ensureSchema(db);

  await updateRegistration(db, id, field, value);

  return Response.redirect(new URL('/admin', request.url), 303);
};