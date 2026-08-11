import { describe, expect, it } from "vitest";

import { marketNames } from "./markets";

describe("market presentation shell", () => {
  it("keeps native SK and CZ identities explicit", () => {
    expect(marketNames).toEqual({
      SK: "Nakupovanie.sk — Slovensko",
      CZ: "Nakupovani.cz — Česko",
    });
  });
});
