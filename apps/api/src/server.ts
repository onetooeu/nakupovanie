import Fastify, { type FastifyInstance } from "fastify";

export function buildServer(): FastifyInstance {
  const server = Fastify({ logger: true });

  server.get("/health", async () => ({
    service: "api",
    status: "ok" as const,
  }));

  return server;
}
