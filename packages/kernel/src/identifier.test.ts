import { describe, expect, it } from "vitest";

import { identifier, type Identifier } from "./identifier.js";

describe("identifier", () => {
  it("creates a typed identifier and normalizes hexadecimal case", () => {
    type ProductId = Identifier<"product">;

    const productId: ProductId = identifier<"product">(
      "01890F3E-7B4A-7CC6-98C3-C6A62AEE0E86",
    );

    expect(productId).toBe("01890f3e-7b4a-7cc6-98c3-c6a62aee0e86");
  });

  it.each([
    "",
    "01890f3e-7b4a-0cc6-98c3-c6a62aee0e86",
    "01890f3e-7b4a-7cc6-78c3-c6a62aee0e86",
    "01890f3e7b4a7cc698c3c6a62aee0e86",
    " 01890f3e-7b4a-7cc6-98c3-c6a62aee0e86",
  ])("rejects a non-canonical UUID: %j", (value) => {
    expect(() => identifier<"product">(value)).toThrow(
      "Identifier must be a canonical non-nil UUID",
    );
  });
});
