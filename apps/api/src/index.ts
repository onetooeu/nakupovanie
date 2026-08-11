import { buildServer } from "./server.js";

const port = Number.parseInt(process.env.PORT ?? "3001", 10);
const server = buildServer();

try {
  await server.listen({ host: "127.0.0.1", port });
} catch (error) {
  server.log.error(error);
  process.exitCode = 1;
}
