import { sql } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";

import type { DatabaseConfig } from "./config.js";

export interface DatabaseHealth {
  readonly status: "ok";
}

export interface DatabaseAdapter {
  readonly db: NodePgDatabase;
  checkHealth(): Promise<DatabaseHealth>;
  close(): Promise<void>;
}

export function createPostgresAdapter(
  config: DatabaseConfig,
  overrides: Omit<PoolConfig, "connectionString"> = {},
): DatabaseAdapter {
  const pool = new Pool({ ...overrides, connectionString: config.url });
  const db = drizzle({ client: pool });

  return {
    db,
    async checkHealth() {
      await db.execute(sql`select 1`);
      return { status: "ok" };
    },
    async close() {
      await pool.end();
    },
  };
}
