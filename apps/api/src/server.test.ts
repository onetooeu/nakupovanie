import { afterEach, describe, expect, it } from "vitest";

import { buildServer } from "./server.js";

const servers = [] as ReturnType<typeof buildServer>[];

afterEach(async () => {
  await Promise.all(servers.splice(0).map(async (server) => server.close()));
});

describe("API skeleton", () => {
  it("reports health without external infrastructure", async () => {
    const server = buildServer();
    servers.push(server);

    const response = await server.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ service: "api", status: "ok" });
  });
});
