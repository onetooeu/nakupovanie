import { describe, expect, it } from "vitest";

import {
  addMoney,
  compareMoney,
  currencyCode,
  CurrencyMismatchError,
  moneyFromMinorUnits,
  multiplyMoney,
  subtractMoney,
} from "./money.js";

describe("money", () => {
  const eur = currencyCode("EUR");
  const czk = currencyCode("CZK");

  it("uses exact integer arithmetic beyond the safe JavaScript number range", () => {
    const large = moneyFromMinorUnits(9_007_199_254_740_993n, eur);
    const increment = moneyFromMinorUnits(2n, eur);

    expect(addMoney(large, increment).minorUnits).toBe(9_007_199_254_740_995n);
    expect(subtractMoney(large, increment).minorUnits).toBe(
      9_007_199_254_740_991n,
    );
    expect(multiplyMoney(increment, 3n).minorUnits).toBe(6n);
  });

  it("creates immutable values and supports deterministic comparison", () => {
    const lower = moneyFromMinorUnits(-1n, eur);
    const equal = moneyFromMinorUnits(-1n, eur);
    const higher = moneyFromMinorUnits(0n, eur);

    expect(Object.isFrozen(lower)).toBe(true);
    expect(compareMoney(lower, equal)).toBe(0);
    expect(compareMoney(lower, higher)).toBe(-1);
    expect(compareMoney(higher, lower)).toBe(1);
  });

  it("rejects arithmetic and comparison across currencies", () => {
    const euros = moneyFromMinorUnits(100n, eur);
    const crowns = moneyFromMinorUnits(100n, czk);

    expect(() => addMoney(euros, crowns)).toThrow(CurrencyMismatchError);
    expect(() => subtractMoney(euros, crowns)).toThrow(CurrencyMismatchError);
    expect(() => compareMoney(euros, crowns)).toThrow(CurrencyMismatchError);
  });

  it.each(["eur", "EU", "EURO", "E1R", " EUR"])(
    "rejects an invalid currency code: %j",
    (value) => {
      expect(() => currencyCode(value)).toThrow(
        "Currency code must be three uppercase ASCII letters",
      );
    },
  );
});
