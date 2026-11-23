import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { HeroBoard } from "@/components/HeroBoard";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ArrowRight } from "@/components/Icons";

const WIRE = [
  ["Start", "Leaves your bank", "Sent", "muted"],
  ["Then", "Through one or more intermediary banks", "Varies", "late"],
  ["Then", "Intermediary fees may be deducted", "Varies", "late"],
  ["Arrival", "Can take several working days", "Varies", "late"],
] as const;

const PULSE = [
  ["Start", "Funds received by our licensed partner", "Target", "ok"],
  ["Minutes", "Converted at the rate you were shown", "Target", "ok"],
  ["Under 1 hr", "Lands in your Zambian account", "Target", "ok"],
] as const;

const NOTES = [
  ["Rate before you send", "The rate, our fees and the amount we expect to land will be on screen before you confirm."],
  ["Built for larger sums", "Designed with five-, six- and seven-figure transfers in mind, from personal or company accounts. Limits and checks will be set by our licensed partners."],
  ["Every stop, live", "Each transfer will have its own timetable. Share it with whoever is waiting in Lusaka, so nobody has to ask where the money is."],
  ["Your money, your accounts", "Made for moving money between accounts held in your own name or your company’s, in the UK, the US and Zambia."],
  ["Licensed partners", "When Pulse launches, regulated partners will hold the money, verify identity and make the payout. Pulse is the technology on top and will never hold your funds."],
] as const;

const LATER = [
  ["Sending", "UK and US to Zambia, between your own accounts", "First departure"],
  ["Account details in Zambia, the UK and the US", "Receive in GBP, USD and ZMW to accounts in your name", "Planned"],
  ["Cards", "Spend dollars online from Zambia", "Planned"],
  ["Payroll", "Pay staff in Zambia in one approved batch", "Planned"],
  ["Invoices that chase themselves", "Drafted, sent, followed up and matched to payments", "Planned"],
  ["Bills", "ZESCO, water, school fees and more, paid from anywhere", "Planned"],
] as const;

export default function Home() {
  return (
    <>
      <Masthead />
      <main id="main">
        <section className="hero">
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <h1 className="display">Serious money to Lusaka, on a timetable.</h1>
              <p className="lede">
                Move your own money from the UK or US to your accounts in Zambia. See the rate and the arrival time before
                you send. Designed to land in minutes, not days.<a href="#footnote" className="fn" aria-label="See note on timing">*</a>
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
                A wire to Zambia can pass through banks you never chose, each adding time and sometimes a fee. Pulse will run each transfer as one
                scheduled journey, with licensed partners and modern settlement underneath.
              </p>
            </div>
            <div className="section__body compare">
              <div className="ledger">
                <div className="ledger__title">
                  <strong>Bank wire</strong>
                  <span className="status status--muted">Typical international wire</span>
                </div>
                <table>
                  <caption className="visually-hidden">How a typical international wire travels</caption>
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
              <p>Sending is the first departure. These are planned next, in the same app.</p>
            </div>
            <ol className="section__body route" aria-label="Pulse services in order">
              {LATER.map(([n, d, st], i) => (
                <li className={`route__stop ${i === 0 ? "route__stop--first" : ""}`} key={n}>
                  <span className="route__dot" aria-hidden="true" />
                  <span>
                    <span className="line__name">{n}</span>
                    <span className="line__desc">{d}</span>
                  </span>
                  <span className={`status ${i === 0 ? "status--first" : "status--muted"}`}>{st}</span>
                </li>
              ))}
            </ol>
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
