"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_QUOTE, QuoteBoard, type QuoteState } from "./QuoteBoard";
import { ArrowRight, Check } from "./Icons";
import { formatMoney, parseAmountInput } from "@/lib/money";
import { clock, illustrativeQuote, ORIGIN_CITY } from "@/lib/quote";

type Step = 0 | 1 | 2 | 3;
const STEPS = ["Amount", "To", "Review", "Track"] as const;

// Synthetic demo accounts. Not real banks, people or account numbers.
const ACCOUNTS = [
  { id: "zmw", name: "Kwacha current account", meta: "In your name · Lusaka · ending 4821", currency: "ZMW" },
  { id: "usd", name: "US dollar account", meta: "In your name · Lusaka · ending 0193", currency: "USD" },
  { id: "co", name: "Example Holdings Ltd · operating account", meta: "Your company · Lusaka · ending 7740", currency: "ZMW" },
] as const;

const TRACK = [
  { what: "Funds received", where: "From your account", at: 0 },
  { what: "Converted", where: "By our licensed partner, at the rate shown", at: 4 },
  { what: "Sent to Zambia", where: "On its way to your bank", at: 6 },
  { what: "Landed", where: "Credited to your account", at: 22 },
] as const;

export function SendPreview() {
  const [step, setStep] = useState<Step>(0);
  const [q, setQ] = useState<QuoteState>(DEFAULT_QUOTE);
  const [acct, setAcct] = useState<string>("zmw");
  const [lockLeft, setLockLeft] = useState(60);
  const [progress, setProgress] = useState(0);
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  const send = parseAmountInput(q.amountText, q.origin);
  const account = ACCOUNTS.find((a) => a.id === acct)!;
  const quote = useMemo(
    () => (send ? illustrativeQuote(send, account.currency as "ZMW" | "USD", startedAt ?? new Date()) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [send?.minor, send?.currency, account.currency, startedAt],
  );

  useEffect(() => heading.current?.focus(), [step]);

  // Rate lock countdown on review.
  useEffect(() => {
    if (step !== 2) return;
    setLockLeft(60);
    const t = setInterval(() => setLockLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [step]);

  // Simulated journey: each stop arrives ~2.5s apart in the preview.
  useEffect(() => {
    if (step !== 3) return;
    setProgress(1);
    const t = setInterval(() => setProgress((p) => (p < TRACK.length ? p + 1 : p)), 2500);
    return () => clearInterval(t);
  }, [step]);

  const tooSmall = !!send && send.minor < 1_000_000n;
  const canContinue = !!send && send.minor > 0n;
  const origin = ORIGIN_CITY[q.origin];

  const go = (s: Step) => setStep(s);

  return (
    <div className="wrap app__grid">
      <ol className="stations" aria-label="Steps">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className={`station ${i < step ? "station--done" : ""}`}
            aria-current={i === step ? "step" : undefined}
          >
            <span>{s}</span>
            <span aria-hidden="true">{i < step ? <Check /> : String(i + 1)}</span>
          </li>
        ))}
      </ol>

      <div className="panel">
        {step === 0 && (
          <>
            <h1 ref={heading} tabIndex={-1}>How much are you moving?</h1>
            <QuoteBoard
              state={q}
              onChange={(s) => { setQ(s); setAcct(s.dest === "USD" ? "usd" : "zmw"); }}
              footer={
                <>
                  <p className="note">
                    {tooSmall ? "Pulse is designed for transfers of £10,000 and above." : "Fees appear on the review step, before you confirm."}
                  </p>
                  <button className="btn" type="button" disabled={!canContinue} onClick={() => go(1)}>
                    Continue <ArrowRight />
                  </button>
                </>
              }
            />
          </>
        )}

        {step === 1 && (
          <>
            <h1 ref={heading} tabIndex={-1}>Where should it land?</h1>
            <div className="accounts" role="radiogroup" aria-label="Your accounts in Zambia">
              {ACCOUNTS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  role="radio"
                  aria-checked={acct === a.id}
                  className="account"
                  onClick={() => setAcct(a.id)}
                >
                  <span className="account__radio" aria-hidden="true" />
                  <span>
                    <span className="account__name">{a.name}</span>
                    <span className="account__meta">{a.meta}</span>
                  </span>
                  <span className="status status--muted">{a.currency}</span>
                </button>
              ))}
            </div>
            <p className="note">Preview accounts are examples. In Pulse you’ll add and verify your own accounts once.</p>
            <div className="panel__actions">
              <button className="btn btn--ghost" type="button" onClick={() => go(0)}>Back</button>
              <button className="btn" type="button" onClick={() => go(2)}>Review transfer <ArrowRight /></button>
            </div>
          </>
        )}

        {step === 2 && quote && send && (
          <>
            <h1 ref={heading} tabIndex={-1}>Review</h1>
            <p className="watermark" aria-hidden="true">Preview — no money moves</p>
            <dl className="summary">
              <div className="summary__row"><dt>You send</dt><dd>{formatMoney(send)}</dd></div>
              <div className="summary__row"><dt>From</dt><dd>Your {q.origin === "GBP" ? "UK" : "US"} account · {origin.city}</dd></div>
              <div className="summary__row"><dt>To</dt><dd>{account.name}</dd></div>
              <div className="summary__row">
                <dt>Rate</dt>
                <dd>{account.currency === q.origin ? "No conversion" : `1 ${q.origin} = ${quote.rate} ${account.currency}`}</dd>
              </div>
              <div className="summary__row"><dt>Pulse fee</dt><dd>Set at launch · shown here</dd></div>
              <div className="summary__row"><dt>Target arrival</dt><dd>{clock(quote.stops[2].at, quote.stops[2].tz)} Lusaka time*<span className="summary__sub">Banking hours and checks permitting</span></dd></div>
              <div className="summary__row summary__row--total"><dt>Lands<span className="summary__sub">Illustrative, before fees and the partner’s FX margin</span></dt><dd>{formatMoney(quote.receive)}</dd></div>
            </dl>
            <p className="callout">
              For transfers of this size, the licensed partner may ask where the money came from before it moves. You’ll only be
              asked once for each source. Quote held for <b>{Math.floor(lockLeft / 60)}:{String(lockLeft % 60).padStart(2, "0")}</b>
              {lockLeft === 0 ? " — Pulse will refresh it automatically." : "."}
            </p>
            <div className="panel__actions">
              <button className="btn btn--ghost" type="button" onClick={() => go(1)}>Back</button>
              <button
                className="btn"
                type="button"
                onClick={() => { setStartedAt(new Date()); go(3); }}
              >
                Run preview <ArrowRight />
              </button>
            </div>
          </>
        )}

        {step === 3 && quote && send && (
          <>
            <h1 ref={heading} tabIndex={-1}>
              {progress >= TRACK.length ? "Preview: landed in Lusaka." : "Preview: on its way."}
            </h1>
            <p className="watermark" aria-hidden="true">Preview — no money moved</p>
            <div className="track" aria-live="polite">
              {TRACK.map((t, i) => {
                const state = i < progress - 1 || progress >= TRACK.length ? "done" : i === progress - 1 ? "live" : "pending";
                const at = new Date((startedAt ?? new Date()).getTime() + t.at * 60_000);
                const tz = i === TRACK.length - 1 ? "Africa/Lusaka" : origin.tz;
                return (
                  <div className="track__row" key={t.what} data-state={state}>
                    <span className="track__time">{clock(at, tz)}<span className="tt__tz">{i === TRACK.length - 1 ? "Lusaka" : origin.city}</span></span>
                    <span>
                      <span className="track__what">{t.what}</span>
                      <span className="track__where">{t.where}{i === TRACK.length - 1 ? ` · ${formatMoney(quote.receive)}` : ""}</span>
                    </span>
                    <span className="status">
                      <span className={`dot ${state === "done" ? "dot--done" : state === "live" ? "dot--live" : ""}`} aria-hidden="true" />
                      {state === "done" ? "Done" : state === "live" ? "Now" : "Next"}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="note">Preview speed: stops arrive every few seconds here. At launch, transfers will aim for the target timetable.*</p>
            <div className="panel__actions">
              <button
                className="btn btn--ghost"
                type="button"
                onClick={async () => { try { await navigator.clipboard.writeText(`${location.origin}/preview`); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard unavailable */ } }}
              >
                {copied ? <>Link copied <Check /></> : "Copy preview link"}
              </button>
              <button className="btn btn--ghost" type="button" onClick={() => { setStartedAt(null); go(0); }}>Start again</button>
              <Link className="btn" href="/#waitlist">Join the waitlist <ArrowRight /></Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
