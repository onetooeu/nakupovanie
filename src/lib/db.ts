export interface RegistrationRow {
  id: number;
  company_name: string;
  company_id: string;
  contact_name: string;
  contact_position: string;
  email: string;
  phone: string;
  country: string;
  company_website: string;
  industry: string;
  delivery_address: string;
  usage_note: string;
  status: string;
  consent_data: number;
  consent_contact: number;
  consent_terms: number;
  created_at: string;
  updated_at: string;
  admin_note?: string | null;
  last_contact_at?: string | null;
}

export interface EmailOutboxRow {
  id: number;
  recipient: string;
  subject: string;
  status: string;
  provider: string;
  error_message?: string | null;
  payload_json: string;
  created_at: string;
}

export function getDb(env: any) {
  const db = env?.DB;
  if (!db) {
    throw new Error('D1 database binding DB is missing.');
  }
  return db;
}

export async function ensureSchema(db: D1Database) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT NOT NULL,
      company_id TEXT NOT NULL,
      contact_name TEXT NOT NULL,
      contact_position TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      country TEXT NOT NULL,
      company_website TEXT NOT NULL,
      industry TEXT NOT NULL,
      delivery_address TEXT NOT NULL,
      usage_note TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      consent_data INTEGER NOT NULL DEFAULT 0,
      consent_contact INTEGER NOT NULL DEFAULT 0,
      consent_terms INTEGER NOT NULL DEFAULT 0,
      admin_note TEXT,
      last_contact_at TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS tfws_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      payload TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS email_outbox (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipient TEXT NOT NULL,
      subject TEXT NOT NULL,
      status TEXT NOT NULL,
      provider TEXT NOT NULL DEFAULT 'resend',
      error_message TEXT,
      payload_json TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `).run();
}

export async function listRegistrations(db: D1Database) {
  const { results } = await db.prepare(`
    SELECT *
    FROM registrations
    ORDER BY datetime(created_at) DESC, id DESC
  `).all<RegistrationRow>();
  return results;
}

export async function getRegistration(db: D1Database, id: number) {
  const row = await db.prepare(`
    SELECT *
    FROM registrations
    WHERE id = ?
  `).bind(id).first<RegistrationRow>();
  return row ?? null;
}

export async function updateRegistration(
  db: D1Database,
  id: number,
  updates: Partial<Pick<RegistrationRow, 'status' | 'admin_note' | 'last_contact_at'>>
) {
  const current = await getRegistration(db, id);
  if (!current) return null;
  const status = updates.status ?? current.status;
  const adminNote = updates.admin_note ?? current.admin_note ?? null;
  const lastContactAt = updates.last_contact_at ?? current.last_contact_at ?? null;
  await db.prepare(`
    UPDATE registrations
    SET status = ?,
        admin_note = ?,
        last_contact_at = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(status, adminNote, lastContactAt, id).run();
  return await getRegistration(db, id);
}

export async function insertRegistration(db: D1Database, data: {
  company_name: string;
  company_id: string;
  contact_name: string;
  contact_position: string;
  email: string;
  phone: string;
  country: string;
  company_website: string;
  industry: string;
  delivery_address: string;
  usage_note: string;
  consent_data: number;
  consent_contact: number;
  consent_terms: number;
}) {
  const result = await db.prepare(`
    INSERT INTO registrations (
      company_name, company_id, contact_name, contact_position, email, phone,
      country, company_website, industry, delivery_address, usage_note,
      consent_data, consent_contact, consent_terms, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
  `).bind(
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
    data.consent_data,
    data.consent_contact,
    data.consent_terms
  ).run();

  return Number(result.meta.last_row_id);
}

export async function insertEmailOutbox(db: D1Database, entry: {
  recipient: string;
  subject: string;
  status: string;
  provider?: string;
  error_message?: string | null;
  payload_json: string;
}) {
  await db.prepare(`
    INSERT INTO email_outbox (
      recipient, subject, status, provider, error_message, payload_json
    ) VALUES (?, ?, ?, ?, ?, ?)
  `).bind(
    entry.recipient,
    entry.subject,
    entry.status,
    entry.provider ?? 'resend',
    entry.error_message ?? null,
    entry.payload_json,
  ).run();
}

export async function listEmailOutbox(db: D1Database, limit = 15) {
  const { results } = await db.prepare(`
    SELECT *
    FROM email_outbox
    ORDER BY datetime(created_at) DESC, id DESC
    LIMIT ?
  `).bind(limit).all<EmailOutboxRow>();
  return results;
}
