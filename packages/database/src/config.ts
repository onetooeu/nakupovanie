import { z } from "zod";

const databaseEnvironmentSchema = z.object({
  DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),
});

export interface DatabaseConfig {
  readonly url: string;
}

export function readDatabaseConfig(
  environment: NodeJS.ProcessEnv,
): DatabaseConfig {
  const result = databaseEnvironmentSchema.safeParse(environment);

  if (!result.success) {
    throw new Error("DATABASE_URL must be a valid PostgreSQL connection URL", {
      cause: result.error,
    });
  }

  return { url: result.data.DATABASE_URL };
}
