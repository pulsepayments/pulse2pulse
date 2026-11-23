import { convert, type Currency, type Money } from "./money";

/**
 * ILLUSTRATIVE ONLY. Demonstration rates for the public preview, not offers.
 * Real quotes will come from the licensed partner via an adapter (see provider-adapter skill).
 */
export const ILLUSTRATIVE_RATES: Record<string, string> = {
  "GBP>ZMW": "27.00",
  "USD>ZMW": "21.00",
  "GBP>USD": "1.2700",
  "USD>USD": "1.0000",
};

export type Origin = "GBP" | "USD";
export type Destination = "ZMW" | "USD";

export const ORIGIN_CITY: Record<Origin, { city: string; tz: string }> = {
  GBP: { city: "London", tz: "Europe/London" },
  USD: { city: "New York", tz: "America/New_York" },
};
export const DEST_CITY = { city: "Lusaka", tz: "Africa/Lusaka" };

/** Target timetable, in minutes after funds are received. A design target, not a promise. */
export const TARGET_MINUTES = { converts: 4, lands: 22 } as const;

export interface Stop {
  key: "departs" | "converts" | "lands";
  label: string;
  place: string;
  at: Date;
  tz: string;
}

export interface Quote {
  send: Money;
  receive: Money;
  rate: string;
  pair: string;
  stops: Stop[];
}

export function illustrativeQuote(send: Money, dest: Destination, now: Date): Quote {
  const origin = send.currency as Origin;
  const pair = `${origin}>${dest}`;
  const rate = ILLUSTRATIVE_RATES[pair];
  if (!rate) throw new Error(`No illustrative rate for ${pair}`);
  const receive = convert(send, dest as Currency, rate, "floor");
  const o = ORIGIN_CITY[origin];
  const plus = (min: number) => new Date(now.getTime() + min * 60_000);
  return {
    send,
    receive,
    rate,
    pair,
    stops: [
      { key: "departs", label: "Departs", place: o.city, at: now, tz: o.tz },
      { key: "converts", label: "Converted", place: "Licensed partner", at: plus(TARGET_MINUTES.converts), tz: o.tz },
      { key: "lands", label: "Lands", place: DEST_CITY.city, at: plus(TARGET_MINUTES.lands), tz: DEST_CITY.tz },
    ],
  };
}

export function clock(at: Date, tz: string): string {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz }).format(at);
}
