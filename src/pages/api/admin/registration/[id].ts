import type { APIRoute } from 'astro';
import { getDb, updateRegistration, ensureSchema } from '../../../../../lib/db';
import { isAdminRequest } from '../../../../../lib/auth';

export const POST: APIRoute = async ({ params, request, locals }) => {
  if (!isAdminRequest(request, locals.runtime.env)) {
    return new Response('Unauthorized', { status: 401 });
  }
  const id = Number(params.id);
  const form = await request.formData();
  const field = String(form.get('field') || 'status');
  const value = String(form.get('value') || '');

  const db = getDb(locals.runtime.env);
  await ensureSchema(db);

  const updates: any = {};
  if (field === 'status') updates.status = value;
  if (field === 'admin_note') updates.admin_note = value;
  if (field === 'last_contact_at') updates.last_contact_at = value;

  await updateRegistration(db, id, updates);
  return Response.redirect(new URL('/control/panel/', request.url), 303);
};
