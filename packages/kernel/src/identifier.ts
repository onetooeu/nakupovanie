const canonicalUuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

declare const identifierBrand: unique symbol;

/** A canonical non-nil UUID whose kind prevents cross-entity assignment. */
export type Identifier<TKind extends string> = string & {
  readonly [identifierBrand]: TKind;
};

export function identifier<TKind extends string>(
  value: string,
): Identifier<TKind> {
  if (!canonicalUuidPattern.test(value)) {
    throw new TypeError("Identifier must be a canonical non-nil UUID");
  }

  return value.toLowerCase() as Identifier<TKind>;
}
