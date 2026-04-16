import type { APIRoute } from 'astro';
import { getDb, listRegistrations, ensureSchema } from '../../../lib/db';
import { isAdminRequest } from '../../../lib/auth';

function escapeCsv(value: unknown) {
  const s = String(value ?? '');
  return `"${s.replaceAll('"', '""')}"`;
}

export const GET: APIRoute = async ({ locals, request }) => {
  if (!isAdminRequest(request, locals.runtime.env)) {
    return new Response('Unauthorized', { status: 401 });
  }
  const db = getDb(locals.runtime.env);
  await ensureSchema(db);
  const rows = await listRegistrations(db);
  const header = ['id','company_name','company_id','contact_name','contact_position','email','phone','country','company_website','industry','delivery_address','usage_note','status','consent_data','consent_contact','consent_terms','admin_note','last_contact_at','created_at'];
  const csv = [
    header.join(','),
    ...rows.map((row) => header.map((key) => escapeCsv((row as any)[key])).join(',')),
  ].join('\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="registrations.csv"',
    },
  });
};
