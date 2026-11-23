/**
 * Money primitives. CLAUDE.md non-negotiable 3: integer minor units + ISO code,
 * never floats. FX rates are decimal strings with an explicit rounding mode.
 */

export type Currency = "GBP" | "USD" | "ZMW";

export const DECIMALS: Record<Currency, number> = { GBP: 2, USD: 2, ZMW: 2 };

export interface Money {
  /** Integer amount in minor units (pence, cents, ngwee). */
  minor: bigint;
  currency: Currency;
}

export type Rounding = "floor" | "half-even";

const RATE_SCALE = 10; // decimal places kept for rate arithmetic

/** Parse a decimal string ("27.1834") into a bigint scaled by 10^scale. Throws on invalid input. */
export function parseDecimal(value: string, scale: number): bigint {
  const m = /^(\d+)(?:\.(\d+))?$/.exec(value.trim());
  if (!m) throw new Error(`Invalid decimal: ${value}`);
  const [, int, frac = ""] = m;
  if (frac.length > scale) throw new Error(`Too many decimal places in ${value} (max ${scale})`);
  return BigInt(int + frac.padEnd(scale, "0"));
}

/**
 * Parse what a person types into an amount field ("250,000", "1 000 000.5").
 * Returns null for empty or invalid input, or more decimals than the currency allows.
 */
export function parseAmountInput(input: string, currency: Currency): Money | null {
  const cleaned = input.replace(/[\s,£$]/g, "");
  if (cleaned === "" || !/^\d+(\.\d*)?$/.test(cleaned)) return null;
  const [int, frac = ""] = cleaned.split(".");
  const d = DECIMALS[currency];
  if (frac.length > d) return null;
  return { minor: BigInt((int || "0") + frac.padEnd(d, "0")), currency };
}

/** Divide with an explicit rounding mode. Both operands non-negative. */
function divRound(n: bigint, d: bigint, mode: Rounding): bigint {
  const q = n / d;
  const r = n % d;
  if (mode === "floor" || r === 0n) return q;
  const twice = r * 2n;
  if (twice > d) return q + 1n;
  if (twice < d) return q;
  return q % 2n === 0n ? q : q + 1n; // exact half: round to even
}

/** Convert `amount` into `to` at `rate` (units of `to` per 1 unit of amount.currency). */
export function convert(amount: Money, to: Currency, rate: string, mode: Rounding): Money {
  if (amount.minor < 0n) throw new Error("Negative amounts are not supported");
  const rateScaled = parseDecimal(rate, RATE_SCALE);
  const fromD = DECIMALS[amount.currency];
  const toD = DECIMALS[to];
  // minor_to = minor_from * rate * 10^(toD - fromD)
  const numerator = amount.minor * rateScaled * 10n ** BigInt(toD);
  const denominator = 10n ** BigInt(RATE_SCALE + fromD);
  return { minor: divRound(numerator, denominator, mode), currency: to };
}

const SYMBOL: Record<Currency, string> = { GBP: "£", USD: "$", ZMW: "K" };

/** Format without floats: grouping via Intl on the BigInt integer part. */
export function formatMoney(m: Money, opts: { symbol?: boolean; code?: boolean } = {}): string {
  const d = DECIMALS[m.currency];
  const neg = m.minor < 0n;
  const abs = neg ? -m.minor : m.minor;
  const base = 10n ** BigInt(d);
  const int = new Intl.NumberFormat("en-GB").format(abs / base);
  const frac = (abs % base).toString().padStart(d, "0");
  const num = d > 0 ? `${int}.${frac}` : int;
  const sym = opts.symbol === false ? "" : m.currency === "ZMW" ? "K " : SYMBOL[m.currency];
  const code = opts.code ? ` ${m.currency}` : "";
  return `${neg ? "−" : ""}${sym}${num}${code}`;
}
