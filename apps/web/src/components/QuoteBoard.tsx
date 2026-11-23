"use client";
import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { formatMoney, parseAmountInput, type Money } from "@/lib/money";
import { clock, illustrativeQuote, ORIGIN_CITY, type Destination, type Origin, type Stop } from "@/lib/quote";

export interface QuoteState {
  amountText: string;
  origin: Origin;
  dest: Destination;
}

export const DEFAULT_QUOTE: QuoteState = { amountText: "250,000", origin: "GBP", dest: "ZMW" };

/** A value that rolls in like a timetable flap when it changes after first paint. */
function Roll({ value, live }: { value: string; live: boolean }) {
  return (
    <span className="roll" key={value} data-tick={live ? "1" : "0"}>
      {value}
    </span>
  );
}

function groupInput(raw: string): string {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const [int, ...rest] = cleaned.split(".");
  const frac = rest.length ? "." + rest.join("").slice(0, 2) : "";
  const grouped = int.replace(/^0+(?=\d)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return grouped + frac;
}

const STATUS: Record<Stop["key"], string> = {
  departs: "Scheduled",
  checks: "If required",
  converts: "Rate shown",
  lands: "Target*",
};

export function QuoteBoard({
  state,
  onChange,
  footer,
}: {
  state: QuoteState;
  onChange: (s: QuoteState) => void;
  footer: ReactNode;
}) {
  const id = useId();
  const [now, setNow] = useState<Date | null>(null);
  const interacted = useRef(false);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const send: Money | null = parseAmountInput(state.amountText, state.origin);
  const quote = useMemo(
    () => (send && now ? illustrativeQuote(send, state.dest, now) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [send?.minor, send?.currency, state.dest, now],
  );
  const live = interacted.current;
  const set = (patch: Partial<QuoteState>) => {
    interacted.current = true;
    onChange({ ...state, ...patch });
  };

  const sym = state.origin === "GBP" ? "£" : "$";
  const origin = ORIGIN_CITY[state.origin];
  const destLabel = state.dest === "ZMW" ? "your kwacha account" : "your US dollar account";
  const originAcct = state.origin === "GBP" ? "your UK account" : "your US account";
  const placeholderStops: Pick<Stop, "key">[] = [{ key: "departs" }, { key: "converts" }, { key: "lands" }];
  const stops: (Stop | Pick<Stop, "key">)[] = quote ? quote.stops : placeholderStops;

  const cell = (s: Stop | Pick<Stop, "key">) => {
    const at = "at" in s ? clock(s.at, s.tz) : "––:––";
    const zone = s.key === "lands" ? "Lusaka" : origin.city;
    switch (s.key) {
      case "departs":
        return { at, zone, stop: "Departs", place: `${origin.city} · ${originAcct}`, amount: send ? formatMoney(send) : "—", flag: "Example" };
      case "checks":
        return { at, zone, stop: "Checks", place: "Source of funds, by our licensed partner", amount: "Larger transfer", flag: "Once per source" };
      case "converts":
        return {
          at, zone, stop: "Converted", place: "By our licensed partner, at the rate shown",
          amount: quote && state.origin !== state.dest ? `1 ${state.origin} = ${quote.rate} ${state.dest}` : "Same currency",
          flag: state.origin !== state.dest ? "Illustrative rate" : "",
        };
      case "lands":
        return { at, zone, stop: "Lands", place: `Lusaka · ${destLabel}`, amount: quote ? formatMoney(quote.receive) : "—", flag: "Illustrative, before fees" };
    }
  };

  return (
    <section className="board" aria-labelledby={`${id}-cap`}>
      <div className="board__inputs">
        <div>
          <label className="field-label col-head" htmlFor={`${id}-amt`}>
            You send <span className="sample">· example amount</span>
          </label>
          <div className="amount">
            <span className="amount__sym" aria-hidden="true">{sym}</span>
            <input
              id={`${id}-amt`}
              inputMode="decimal"
              autoComplete="off"
              value={state.amountText}
              placeholder="0"
              aria-describedby={`${id}-cap`}
              onChange={(e) => set({ amountText: groupInput(e.target.value) })}
            />
          </div>
        </div>
        <div className="seg-group">
          <div className="seg" role="group" aria-label="Send currency">
            {(["GBP", "USD"] as Origin[]).map((c) => (
              <button key={c} type="button" aria-pressed={state.origin === c} onClick={() => set({ origin: c })}>
                {c}
              </button>
            ))}
          </div>
          <div className="seg" role="group" aria-label="Arrives as">
            {(["ZMW", "USD"] as Destination[]).map((c) => (
              <button key={c} type="button" aria-pressed={state.dest === c} onClick={() => set({ dest: c })}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <table className="tt">
        <caption id={`${id}-cap`} className="visually-hidden">
          Illustrative timetable for this transfer. Target times, illustrative rate, before fees.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="col-head">Time</th>
            <th scope="col" className="col-head">Stop</th>
            <th scope="col" className="col-head tt__status">Status</th>
            <th scope="col" className="col-head">Amount</th>
          </tr>
        </thead>
        <tbody aria-live="polite">
          {stops.map((s, i) => {
            const c = cell(s);
            const style = { "--i": i } as CSSProperties;
            return (
              <tr key={s.key} className={s.key === "lands" ? "tt--lands" : undefined} style={style}>
                <td className="tt__time"><Roll value={c.at} live={live} /><span className="tt__tz">{c.zone}</span></td>
                <td>
                  <span className="tt__stop">{c.stop}</span>
                  <span className="tt__place">{c.place}</span>
                </td>
                <td className="tt__status"><span className="tt__badge">{STATUS[s.key]}</span></td>
                <td className={`tt__amount ${s.key === "lands" ? "tt__amount--big" : ""}`}>
                  <Roll value={c.amount} live={live} />
                  {c.flag && <span className={`tt__flag ${s.key === "checks" || s.key === "converts" ? "tt__flag--minor" : ""}`}>{c.flag}</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="board__foot">{footer}</div>
    </section>
  );
}
