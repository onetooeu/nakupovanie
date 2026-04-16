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

CREATE TABLE IF NOT EXISTS tfws_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
