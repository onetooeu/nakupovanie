const currencyCodePattern = /^[A-Z]{3}$/;

declare const currencyCodeBrand: unique symbol;
declare const moneyBrand: unique symbol;

/** An uppercase three-letter currency code validated at the system boundary. */
export type CurrencyCode = string & {
  readonly [currencyCodeBrand]: true;
};

/** A precise monetary value. Minor units are always integer bigint values. */
export interface Money {
  readonly currency: CurrencyCode;
  readonly minorUnits: bigint;
  readonly [moneyBrand]: true;
}

export class CurrencyMismatchError extends Error {
  public constructor(
    public readonly leftCurrency: CurrencyCode,
    public readonly rightCurrency: CurrencyCode,
  ) {
    super(`Cannot combine ${leftCurrency} and ${rightCurrency} money values`);
    this.name = "CurrencyMismatchError";
  }
}

export function currencyCode(value: string): CurrencyCode {
  if (!currencyCodePattern.test(value)) {
    throw new TypeError("Currency code must be three uppercase ASCII letters");
  }

  return value as CurrencyCode;
}

export function moneyFromMinorUnits(
  minorUnits: bigint,
  currency: CurrencyCode,
): Money {
  return Object.freeze({ currency, minorUnits }) as Money;
}

export function addMoney(left: Money, right: Money): Money {
  assertSameCurrency(left, right);
  return moneyFromMinorUnits(left.minorUnits + right.minorUnits, left.currency);
}

export function subtractMoney(left: Money, right: Money): Money {
  assertSameCurrency(left, right);
  return moneyFromMinorUnits(left.minorUnits - right.minorUnits, left.currency);
}

export function multiplyMoney(value: Money, multiplier: bigint): Money {
  return moneyFromMinorUnits(value.minorUnits * multiplier, value.currency);
}

export function compareMoney(left: Money, right: Money): -1 | 0 | 1 {
  assertSameCurrency(left, right);

  if (left.minorUnits === right.minorUnits) {
    return 0;
  }

  return left.minorUnits < right.minorUnits ? -1 : 1;
}

function assertSameCurrency(left: Money, right: Money): void {
  if (left.currency !== right.currency) {
    throw new CurrencyMismatchError(left.currency, right.currency);
  }
}
