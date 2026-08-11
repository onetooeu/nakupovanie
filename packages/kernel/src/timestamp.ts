const canonicalUtcTimestampPattern =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

declare const utcTimestampBrand: unique symbol;

/** An ISO 8601 UTC timestamp with a fixed millisecond representation. */
export type UtcTimestamp = string & {
  readonly [utcTimestampBrand]: true;
};

export function utcTimestamp(value: string): UtcTimestamp {
  const milliseconds = Date.parse(value);

  if (
    !canonicalUtcTimestampPattern.test(value) ||
    !Number.isFinite(milliseconds) ||
    new Date(milliseconds).toISOString() !== value
  ) {
    throw new TypeError(
      "UTC timestamp must use canonical YYYY-MM-DDTHH:mm:ss.sssZ format",
    );
  }

  return value as UtcTimestamp;
}

export function utcTimestampFromDate(value: Date): UtcTimestamp {
  if (!Number.isFinite(value.getTime())) {
    throw new TypeError("Cannot create a UTC timestamp from an invalid Date");
  }

  return utcTimestamp(value.toISOString());
}

export function compareUtcTimestamps(
  left: UtcTimestamp,
  right: UtcTimestamp,
): -1 | 0 | 1 {
  if (left === right) {
    return 0;
  }

  return left < right ? -1 : 1;
}
