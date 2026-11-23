"use client";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { formatMoney, parseAmountInput, type Money } from "@/lib/money";
import { clock, illustrativeQuote, ORIGIN_CITY, type Destination, type Origin } from "@/lib/quote";

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
  const time = (i: number) => (quote ? clock(quote.stops[i].at, quote.stops[i].tz) : "––:––");
  const zone = (i: number) => (i === 2 ? "Lusaka" : ORIGIN_CITY[state.origin].city);
  const destLabel = state.dest === "ZMW" ? "your kwacha account" : "your US dollar account";
  const originAcct = state.origin === "GBP" ? "your UK account" : "your US account";

  return (
    <section className="board" aria-labelledby={`${id}-cap`}>
      <div className="board__inputs">
        <div>
          <label className="field-label col-head" htmlFor={`${id}-amt`}>You send <span className="sample">· example amount</span></label>
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
                {c === "ZMW" ? "ZMW" : "USD"}
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
            <th scope="col" className="col-head">Amount</th>
          </tr>
        </thead>
        <tbody aria-live="polite">
          <tr>
            <td className="tt__time"><Roll value={time(0)} live={live} /><span className="tt__tz">{zone(0)}</span></td>
            <td>
              <span className="tt__stop">Departs</span>
              <span className="tt__place">{ORIGIN_CITY[state.origin].city} · {originAcct}</span>
            </td>
            <td className="tt__amount">
              <Roll value={send ? formatMoney(send) : "—"} live={live} />
              <span className="tt__flag">Example</span>
            </td>
          </tr>
          <tr>
            <td className="tt__time"><Roll value={time(1)} live={live} /><span className="tt__tz">{zone(1)}</span></td>
            <td>
              <span className="tt__stop">Converted</span>
              <span className="tt__place">By our licensed partner, at the rate shown</span>
            </td>
            <td className="tt__amount">
              <Roll
                value={quote && state.origin !== state.dest ? `1 ${state.origin} = ${quote.rate} ${state.dest} (illustrative)` : "Same currency"}
                live={live}
              />
            </td>
          </tr>
          <tr className="tt--lands">
            <td className="tt__time"><Roll value={time(2)} live={live} /><span className="tt__tz">{zone(2)}</span></td>
            <td>
              <span className="tt__stop">Lands</span>
              <span className="tt__place">Lusaka · {destLabel}</span>
            </td>
            <td className="tt__amount tt__amount--big">
              <Roll value={quote ? formatMoney(quote.receive) : "—"} live={live} />
              <span className="tt__flag">Illustrative, before fees</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="board__foot">{footer}</div>
    </section>
  );
}
