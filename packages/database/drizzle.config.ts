import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl || !/^postgres(ql)?:\/\//u.test(databaseUrl)) {
  throw new Error("DATABASE_URL must be a valid PostgreSQL connection URL");
}

export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/schema.ts",
  dbCredentials: { url: databaseUrl },
});
