export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export async function sendEmail(env: any, message: EmailMessage) {
  const apiKey = env?.RESEND_API_KEY;
  const from = env?.EMAIL_FROM ?? 'Nakupovanie <noreply@nakupovanie.sk>';

  if (!apiKey) {
    console.log('[email] RESEND_API_KEY missing, skipping send:', message.subject);
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
    throw new Error(`Email send failed: ${res.status} ${body}`);
  }

  return await res.json();
}
