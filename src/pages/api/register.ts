import type { APIRoute } from 'astro';
import { getDb, insertRegistration, ensureSchema } from '../../lib/db';
import { sendEmail } from '../../lib/email';
import { siteCopy } from '../../data/siteCopy';

function asInt(value: FormDataEntryValue | null) {
  return value ? 1 : 0;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const form = await request.formData();
  const lang = String(form.get('lang') || 'sk') as 'sk' | 'cz' | 'en';
  const copy = siteCopy[lang] ?? siteCopy.sk;

  const data = {
    company_name: String(form.get('company_name') || '').trim(),
    company_id: String(form.get('company_id') || '').trim(),
    contact_name: String(form.get('contact_name') || '').trim(),
    contact_position: String(form.get('contact_position') || '').trim(),
    email: String(form.get('email') || '').trim(),
    phone: String(form.get('phone') || '').trim(),
    country: String(form.get('country') || '').trim(),
    company_website: String(form.get('company_website') || '').trim(),
    industry: String(form.get('industry') || '').trim(),
    delivery_address: String(form.get('delivery_address') || '').trim(),
    usage_note: String(form.get('usage_note') || '').trim(),
    consent_data: asInt(form.get('consent_data')),
    consent_contact: asInt(form.get('consent_contact')),
    consent_terms: asInt(form.get('consent_terms')),
  };

  const requiredTextFields = [
    data.company_name,
    data.company_id,
    data.contact_name,
    data.contact_position,
    data.email,
    data.phone,
    data.country,
    data.company_website,
    data.industry,
    data.delivery_address,
    data.usage_note,
  ];

  if (
    requiredTextFields.some((value) => !String(value).trim()) ||
    data.consent_data !== 1 ||
    data.consent_contact !== 1 ||
    data.consent_terms !== 1
  ) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing fields' }), {
      status: 400,
    });
  }

  const db = getDb(locals.runtime.env);
  await ensureSchema(db);

  const id = await insertRegistration(db, data);

  await db
    .prepare(`INSERT INTO tfws_events (event_type, payload) VALUES (?, ?)`)
    .bind(
      'registration_created',
      JSON.stringify({ id, company_name: data.company_name, email: data.email, lang }),
    )
    .run();

  const subject =
    lang === 'cz'
      ? 'Potvrzení registrace – nakupovani.cz'
      : lang === 'en'
        ? 'Registration confirmation – nakupovanie.sk / nakupovani.cz'
        : 'Potvrdenie registrácie – nakupovanie.sk / nakupovani.cz';

  const html = `
    <p>Dobrý deň / Hello,</p>
    <p>ďakujeme za registráciu vašej spoločnosti do procesu pre <strong>nakupovanie.sk / nakupovani.cz</strong>.</p>
    <p>Vaša firma bola úspešne zaradená do databázy záujemcov a bude informovaná o ďalšom postupe.</p>
    <p>Uzavretý proces dražby bude spustený <strong>${copy.thankYou.auctionDate}</strong>.</p>
    <p>Ak máte záujem o okamžitú kúpu, fixná cena a kontaktné údaje na priame rokovanie sú uvedené po registrácii na webe.</p>
    <p>S pozdravom,<br/>nakupovanie.sk / nakupovani.cz</p>
  `;
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  await sendEmail(locals.runtime.env, {
    to: data.email,
    subject,
    html,
    text,
  }).catch((error) => {
    console.error(error);
  });

  if (locals.runtime.env?.ADMIN_NOTIFY_EMAIL) {
    await sendEmail(locals.runtime.env, {
      to: locals.runtime.env.ADMIN_NOTIFY_EMAIL,
      subject: `New registration: ${data.company_name}`,
      html: `<p>New registration received for ${data.company_name} (${data.email}).</p>`,
      text: `New registration received for ${data.company_name} (${data.email}).`,
    }).catch((error) => {
      console.error(error);
    });
  }

  return Response.redirect(new URL(`/${lang}/thank-you`, request.url), 303);
};