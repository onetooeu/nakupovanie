import { describe, expect, it } from "vitest";

import {
  compareUtcTimestamps,
  utcTimestamp,
  utcTimestampFromDate,
} from "./timestamp.js";

describe("utcTimestamp", () => {
  it("accepts a canonical UTC timestamp", () => {
    expect(utcTimestamp("2026-08-11T12:34:56.789Z")).toBe(
      "2026-08-11T12:34:56.789Z",
    );
  });

  it.each([
    "2026-08-11T12:34:56Z",
    "2026-08-11T14:34:56.789+02:00",
    "2026-02-30T12:34:56.789Z",
    "2026-08-11 12:34:56.789Z",
    "not-a-date",
  ])("rejects a non-canonical timestamp: %j", (value) => {
    expect(() => utcTimestamp(value)).toThrow(
      "UTC timestamp must use canonical YYYY-MM-DDTHH:mm:ss.sssZ format",
    );
  });

  it("converts a valid Date without retaining mutable Date state", () => {
    const date = new Date("2026-08-11T12:34:56.789Z");
    const timestamp = utcTimestampFromDate(date);

    date.setUTCFullYear(2030);

    expect(timestamp).toBe("2026-08-11T12:34:56.789Z");
  });

  it("rejects invalid Date values", () => {
    expect(() => utcTimestampFromDate(new Date(Number.NaN))).toThrow(
      "Cannot create a UTC timestamp from an invalid Date",
    );
  });

  it("compares canonical timestamps chronologically", () => {
    const earlier = utcTimestamp("2026-08-11T12:34:56.788Z");
    const later = utcTimestamp("2026-08-11T12:34:56.789Z");

    expect(compareUtcTimestamps(earlier, earlier)).toBe(0);
    expect(compareUtcTimestamps(earlier, later)).toBe(-1);
    expect(compareUtcTimestamps(later, earlier)).toBe(1);
  });
});
