import { sql } from "drizzle-orm";
import { afterAll, describe, expect, it } from "vitest";

import { readDatabaseConfig } from "./config.js";
import { createPostgresAdapter } from "./postgres.js";

const adapter = createPostgresAdapter(readDatabaseConfig(process.env), {
  connectionTimeoutMillis: 5_000,
});

afterAll(async () => {
  await adapter.close();
});

describe("PostgreSQL adapter", () => {
  it("connects to PostgreSQL and reports health", async () => {
    await expect(adapter.checkHealth()).resolves.toEqual({ status: "ok" });
  });

  it("has applied the platform schema migration", async () => {
    const result = await adapter.db.execute<{ schema_name: string }>(
      sql`select schema_name from information_schema.schemata where schema_name = 'platform'`,
    );

    expect(result.rows).toEqual([{ schema_name: "platform" }]);
  });
});
