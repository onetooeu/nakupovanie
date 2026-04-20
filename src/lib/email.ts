import { ensureSchema, insertEmailOutbox } from './db';

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
}

async function logEmail(env: any, message: EmailMessage, status: string, errorMessage?: string | null) {
  const db = env?.DB as D1Database | undefined;
  if (!db) return;

  try {
    await ensureSchema(db);
    await insertEmailOutbox(db, {
      recipient: message.to,
      subject: message.subject,
      status,
      provider: 'resend',
      error_message: errorMessage ?? null,
      payload_json: JSON.stringify({
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
      }),
    });
  } catch (error) {
    console.warn('[email] failed to store email log', error);
  }
}

export async function sendEmail(env: any, message: EmailMessage) {
  const apiKey = env?.RESEND_API_KEY;
  const from = env?.EMAIL_FROM ?? 'Nakupovanie <noreply@nakupovanie.sk>';

  if (!apiKey) {
    console.log('[email] RESEND_API_KEY missing, skipping send:', message.subject);
    await logEmail(env, message, 'skipped_no_api_key', 'RESEND_API_KEY missing');
    return { skipped: true };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    await logEmail(env, message, 'error', `${res.status} ${body}`);
    throw new Error(`Email send failed: ${res.status} ${body}`);
  }

  const data = await res.json();
  await logEmail(env, message, 'sent', null);
  return data;
}
