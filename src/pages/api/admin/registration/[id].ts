import type { APIRoute } from 'astro';
import { isAdminRequest } from '../../../../lib/auth';
import { getDb, ensureSchema, updateRegistration } from '../../../../lib/db';

export const POST: APIRoute = async ({ request, params, locals }) => {
  if (!isAdminRequest(request, locals.runtime.env)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    return new Response('Invalid ID', { status: 400 });
  }

  const form = await request.formData();
  const field = String(form.get('field') || '').trim();
  const value = String(form.get('value') || '').trim();

  const db = getDb(locals.runtime.env);
  await ensureSchema(db);

  if (field === 'status') {
    const updated = await updateRegistration(db, id, { status: value });
    if (!updated) return new Response('Not found', { status: 404 });
  } else if (field === 'admin_note') {
    const updated = await updateRegistration(db, id, { admin_note: value });
    if (!updated) return new Response('Not found', { status: 404 });
  } else if (field === 'last_contact_at') {
    const updated = await updateRegistration(db, id, { last_contact_at: value });
    if (!updated) return new Response('Not found', { status: 404 });
  } else {
    return new Response('Unsupported field', { status: 400 });
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: '/control/panel/',
    },
  });
};