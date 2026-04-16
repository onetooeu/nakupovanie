import crypto from 'node:crypto';

const encoder = new TextEncoder();

function b64url(bytes: Uint8Array) {
  return Buffer.from(bytes).toString('base64url');
}

function hmac(secret: string, value: string) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

export function createAdminToken(secret: string) {
  const payload = JSON.stringify({ exp: Date.now() + 1000 * 60 * 60 * 8 });
  const sig = hmac(secret, payload);
  return `${b64url(encoder.encode(payload))}.${sig}`;
}

export function verifyAdminToken(secret: string, token?: string | null) {
  if (!token) return false;
  const [payloadB64, sig] = token.split('.');
  if (!payloadB64 || !sig) return false;
  let payload: string;
  try {
    payload = Buffer.from(payloadB64, 'base64url').toString('utf8');
  } catch {
    return false;
  }
  if (hmac(secret, payload) !== sig) return false;
  try {
    const parsed = JSON.parse(payload) as { exp?: number };
    return typeof parsed.exp === 'number' && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

export function parseCookie(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(';').map((part) => part.trim());
  for (const part of parts) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    const key = part.slice(0, eq);
    const val = part.slice(eq + 1);
    if (key === name) return decodeURIComponent(val);
  }
  return null;
}
export function isAdminRequest(request: Request, env: any) {
  const secret = env?.ADMIN_COOKIE_SECRET || 'dev-secret-change-me';
  const cookie = parseCookie(request.headers.get('cookie'), 'nakupovanie_admin');
  return verifyAdminToken(secret, cookie);
}

