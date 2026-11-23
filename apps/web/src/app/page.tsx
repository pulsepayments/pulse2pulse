import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { HeroBoard } from "@/components/HeroBoard";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ArrowRight } from "@/components/Icons";

const WIRE = [
  ["Day 1", "Leaves your bank", "Departed", "muted"],
  ["Day 1–3", "Correspondent bank", "No tracking", "late"],
  ["Day 2–6", "Intermediary bank", "Fees deducted", "late"],
  ["Day 3–15", "Arrives in Zambia", "Amount unknown", "late"],
] as const;

const PULSE = [
  ["+0 min", "Funds received", "Rate locked", "ok"],
  ["+4 min", "Converted by a licensed partner", "On time", "ok"],
  ["+22 min", "Lands in your Zambian account", "Amount known", "ok"],
] as const;

const NOTES = [
  ["Rate before you send", "The exchange rate, every fee and the amount that lands are on screen before you confirm. No deductions on the way."],
  ["Built for size", "Designed for transfers from £10,000 into seven figures, from personal or company accounts, with checks handled up front rather than mid-route."],
  ["Every stop, live", "Each transfer has its own timetable. Share it with whoever is waiting in Lusaka, so nobody has to ask where the money is."],
  ["Your money, your accounts", "Move money between accounts held in your own name or your company’s, in the UK, the US and Zambia."],
  ["Licensed partners", "Regulated partners hold the money, verify identity and make the payout. Pulse is the technology on top and never holds your funds."],
] as const;

const LATER = [
  ["Account details in Zambia, the UK and the US", "Receive in GBP, USD and ZMW to accounts in your name"],
  ["Cards", "Spend dollars online from Zambia"],
  ["Payroll", "Pay staff in Zambia in one approved batch"],
  ["Invoices that chase themselves", "Drafted, sent, followed up and matched to payments"],
  ["Bills", "ZESCO, water, school fees and more, paid from anywhere"],
] as const;

export default function Home() {
  return (
    <>
      <Masthead />
      <main id="main">
        <section className="hero">
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <h1 className="display">Six figures to Lusaka, on a timetable.</h1>
              <p className="lede">
                Move your own money from the UK or US to your accounts in Zambia. See the rate and the arrival time before
                you send. Designed to land in minutes, not weeks.*
              </p>
              <div className="hero__links">
                <Link href="/preview" className="btn btn--ghost">
                  Try the preview <ArrowRight />
                </Link>
              </div>
            </div>
            <div className="hero__board">
              <HeroBoard />
            </div>
          </div>
        </section>

        <section className="section" id="route" aria-labelledby="route-h">
          <div className="wrap section__grid">
            <div className="section__head">
              <h2 className="h2" id="route-h">Same money. A different route.</h2>
              <p>
                A wire to Zambia passes through banks you never chose, each taking time and a fee. Pulse runs the transfer as one
                scheduled journey with licensed partners and modern settlement underneath.
              </p>
            </div>
            <div className="section__body compare">
              <div className="ledger">
                <div className="ledger__title">
                  <strong>Bank wire</strong>
                  <span className="status status--muted">As senders describe it</span>
                </div>
                <table>
                  <caption className="visually-hidden">A typical international wire to Zambia, as described by senders</caption>
                  <tbody>
                    {WIRE.map(([t, s, st, k]) => (
                      <tr key={s}>
                        <td>{t}</td>
                        <td>{s}</td>
                        <td><span className={`status status--${k}`}>{st}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="ledger ledger--pulse">
                <div className="ledger__title">
                  <strong>Pulse</strong>
                  <span className="status status--muted">Target timetable*</span>
                </div>
                <table>
                  <caption className="visually-hidden">Pulse target timetable</caption>
                  <tbody>
                    {PULSE.map(([t, s, st, k]) => (
                      <tr key={s}>
                        <td>{t}</td>
                        <td>{s}</td>
                        <td><span className={`status status--${k}`}>{st}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="notes-h">
          <div className="wrap section__grid">
            <div className="section__head">
              <h2 className="h2" id="notes-h">Service notes</h2>
              <p>What every Pulse transfer is built around.</p>
            </div>
            <dl className="section__body notes">
              {NOTES.map(([t, d]) => (
                <div className="notes__row" key={t}>
                  <dt>{t}</dt>
                  <dd>{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section" aria-labelledby="later-h">
          <div className="wrap section__grid">
            <div className="section__head">
              <h2 className="h2" id="later-h">Later on this line</h2>
              <p>Sending comes first. These come next, on the same account.</p>
            </div>
            <ul className="section__body line" role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {LATER.map(([n, d]) => (
                <li className="line__row" key={n}>
                  <span>
                    <span className="line__name">{n}</span>
                    <span className="line__desc">{d}</span>
                  </span>
                  <span className="status status--muted">Planned</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band" id="waitlist" aria-labelledby="wl-h">
          <div className="wrap section__grid">
            <div className="section__head">
              <h2 className="h2" id="wl-h">Reserve a place on the first departures.</h2>
              <p>
                We’re opening Pulse to a small group of senders first. Tell us how you move money, and we’ll be in touch before launch.
              </p>
            </div>
            <div className="section__body">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
