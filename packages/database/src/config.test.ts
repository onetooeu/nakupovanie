import { describe, expect, it } from "vitest";

import { readDatabaseConfig } from "./config.js";

describe("readDatabaseConfig", () => {
  it("accepts a PostgreSQL URL", () => {
    expect(
      readDatabaseConfig({
        DATABASE_URL: "postgresql://user:pass@localhost/db",
      }),
    ).toEqual({ url: "postgresql://user:pass@localhost/db" });
  });

  it("rejects missing configuration without echoing environment values", () => {
    expect(() => readDatabaseConfig({ SECRET_VALUE: "do-not-leak" })).toThrow(
      "DATABASE_URL must be a valid PostgreSQL connection URL",
    );
  });

  it("rejects non-PostgreSQL URLs", () => {
    expect(() =>
      readDatabaseConfig({ DATABASE_URL: "https://localhost/database" }),
    ).toThrow("DATABASE_URL must be a valid PostgreSQL connection URL");
  });
});
