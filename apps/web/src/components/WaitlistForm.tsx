"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "./Icons";

type Status = "idle" | "sending" | "done" | "error";

export const ROLES = [
  ["sender", "I move my own money into Zambia"],
  ["business", "My company moves money into Zambia"],
  ["partner", "I'm a potential partner"],
  ["other", "Something else"],
] as const;

export const SIZES = ["Under £10k", "£10k – £100k", "£100k – £1m", "£1m and above"] as const;
export const ROUTES = ["UK → Zambia", "US → Zambia", "Somewhere else → Zambia"] as const;

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="form__done" role="status">
        <strong>You’re on the list.</strong>
        <p>We’ll write to you before the first departures, and never more than we need to.</p>
      </div>
    );
  }

  return (
    <form name="waitlist" method="POST" data-netlify="true" netlify-honeypot="bot-field" className="form" onSubmit={onSubmit} noValidate={false}>
      <input type="hidden" name="form-name" value="waitlist" />
      <p className="hp">
        <label>Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </p>
      <div>
        <label className="field-label" htmlFor="wl-name">First name <span style={{ textTransform: "none", fontWeight: 400 }}>(optional)</span></label>
        <input className="input" id="wl-name" name="name" autoComplete="given-name" />
      </div>
      <div>
        <label className="field-label" htmlFor="wl-email">Email</label>
        <input className="input" id="wl-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="span-2">
        <label className="field-label" htmlFor="wl-role">You are</label>
        <select className="select" id="wl-role" name="role" required defaultValue="">
          <option value="" disabled>Choose one</option>
          {ROLES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>
      <div>
        <label className="field-label" htmlFor="wl-size">Typical transfer</label>
        <select className="select" id="wl-size" name="size" defaultValue="">
          <option value="">Prefer not to say</option>
          {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="field-label" htmlFor="wl-route">Route</label>
        <select className="select" id="wl-route" name="route" defaultValue={ROUTES[0]}>
          {ROUTES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div className="span-2">
        <label className="field-label" htmlFor="wl-company">Company <span style={{ textTransform: "none", fontWeight: 400 }}>(optional)</span></label>
        <input className="input" id="wl-company" name="company" autoComplete="organization" />
      </div>
      <label className="check span-2">
        <input type="checkbox" name="consent" value="yes" required />
        <span>
          Email me about Pulse’s launch and early access. You can unsubscribe at any time. See our <Link href="/privacy">privacy notice</Link>.
        </span>
      </label>
      <div className="span-2" style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Saving your place…" : "Join the waitlist"} <ArrowRight />
        </button>
        {status === "error" && (
          <p className="form__error" role="alert">That didn’t go through. Check your connection and try again.</p>
        )}
      </div>
    </form>
  );
}
