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

type UpdatableField =
  | 'company_name'
  | 'company_id'
  | 'contact_name'
  | 'contact_position'
  | 'email'
  | 'phone'
  | 'country'
  | 'company_website'
  | 'industry'
  | 'delivery_address'
  | 'usage_note'
  | 'status'
  | 'consent_data'
  | 'consent_contact'
  | 'consent_terms'
  | 'admin_note'
  | 'last_contact_at';

const UPDATABLE_FIELDS = new Set<UpdatableField>([
  'company_name',
  'company_id',
  'contact_name',
  'contact_position',
  'email',
  'phone',
  'country',
  'company_website',
  'industry',
  'delivery_address',
  'usage_note',
  'status',
  'consent_data',
  'consent_contact',
  'consent_terms',
  'admin_note',
  'last_contact_at',
]);

export function getDb(env: any) {
  const db = env?.DB;
  if (!db) {
    throw new Error('D1 database binding DB is missing.');
  }
  return db as D1Database;
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

function normalizeValueForField(field: UpdatableField, value: unknown) {
  if (field === 'consent_data' || field === 'consent_contact' || field === 'consent_terms') {
    return Number(value) ? 1 : 0;
  }

  if (field === 'last_contact_at') {
    const text = String(value ?? '').trim();
    return text || null;
  }

  if (field === 'admin_note') {
    const text = String(value ?? '').trim();
    return text || null;
  }

  return String(value ?? '').trim();
}

export async function updateRegistration(
  db: D1Database,
  id: number,
  updatesOrField:
    | Partial<Pick<
        RegistrationRow,
        | 'company_name'
        | 'company_id'
        | 'contact_name'
        | 'contact_position'
        | 'email'
        | 'phone'
        | 'country'
        | 'company_website'
        | 'industry'
        | 'delivery_address'
        | 'usage_note'
        | 'status'
        | 'consent_data'
        | 'consent_contact'
        | 'consent_terms'
        | 'admin_note'
        | 'last_contact_at'
      >>
    | string,
  maybeValue?: string
) {
  const current = await getRegistration(db, id);
  if (!current) return null;

  let updates: Partial<Record<UpdatableField, any>> = {};

  if (typeof updatesOrField === 'string') {
    const field = updatesOrField.trim() as UpdatableField;
    if (!UPDATABLE_FIELDS.has(field)) {
      throw new Error(`Unsupported field: ${field}`);
    }
    updates[field] = normalizeValueForField(field, maybeValue);
  } else {
    for (const [key, rawValue] of Object.entries(updatesOrField)) {
      if (!UPDATABLE_FIELDS.has(key as UpdatableField)) {
        continue;
      }
      const field = key as UpdatableField;
      updates[field] = normalizeValueForField(field, rawValue);
    }
  }

  const nextStatus = (updates.status as string | undefined) ?? current.status;
  const nextAdminNote =
    updates.admin_note !== undefined ? (updates.admin_note as string | null) : current.admin_note ?? null;
  const nextLastContactAt =
    updates.last_contact_at !== undefined
      ? (updates.last_contact_at as string | null)
      : current.last_contact_at ?? null;

  const nextCompanyName = (updates.company_name as string | undefined) ?? current.company_name;
  const nextCompanyId = (updates.company_id as string | undefined) ?? current.company_id;
  const nextContactName = (updates.contact_name as string | undefined) ?? current.contact_name;
  const nextContactPosition = (updates.contact_position as string | undefined) ?? current.contact_position;
  const nextEmail = (updates.email as string | undefined) ?? current.email;
  const nextPhone = (updates.phone as string | undefined) ?? current.phone;
  const nextCountry = (updates.country as string | undefined) ?? current.country;
  const nextCompanyWebsite = (updates.company_website as string | undefined) ?? current.company_website;
  const nextIndustry = (updates.industry as string | undefined) ?? current.industry;
  const nextDeliveryAddress = (updates.delivery_address as string | undefined) ?? current.delivery_address;
  const nextUsageNote = (updates.usage_note as string | undefined) ?? current.usage_note;
  const nextConsentData = (updates.consent_data as number | undefined) ?? current.consent_data;
  const nextConsentContact = (updates.consent_contact as number | undefined) ?? current.consent_contact;
  const nextConsentTerms = (updates.consent_terms as number | undefined) ?? current.consent_terms;

  await db.prepare(`
    UPDATE registrations
    SET company_name = ?,
        company_id = ?,
        contact_name = ?,
        contact_position = ?,
        email = ?,
        phone = ?,
        country = ?,
        company_website = ?,
        industry = ?,
        delivery_address = ?,
        usage_note = ?,
        status = ?,
        consent_data = ?,
        consent_contact = ?,
        consent_terms = ?,
        admin_note = ?,
        last_contact_at = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    nextCompanyName,
    nextCompanyId,
    nextContactName,
    nextContactPosition,
    nextEmail,
    nextPhone,
    nextCountry,
    nextCompanyWebsite,
    nextIndustry,
    nextDeliveryAddress,
    nextUsageNote,
    nextStatus,
    nextConsentData,
    nextConsentContact,
    nextConsentTerms,
    nextAdminNote,
    nextLastContactAt,
    id
  ).run();

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