import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const headers = new Headers({
    'Set-Cookie': 'nakupovanie_admin=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
    Location: '/control/panel/',
  });
  return new Response(null, { status: 303, headers });
};
