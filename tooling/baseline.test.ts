import { describe, expect, it } from "vitest";

describe("toolchain baseline", () => {
  it("executes strict TypeScript tests", () => {
    const markets = ["SK", "CZ"] as const;

    expect(markets).toEqual(["SK", "CZ"]);
  });
});
