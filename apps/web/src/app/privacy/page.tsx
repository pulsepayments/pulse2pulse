import type { Metadata } from "next";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { operatorLine, SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy — Pulse" };

export default function Privacy() {
  const contact = SITE.contactEmail || "the contact address published here before launch";
  return (
    <>
      <Masthead showClocks={false} />
      <main id="main" className="wrap">
        <article className="prose">
          <h1>Privacy notice for the Pulse waitlist</h1>
          <p className="note">Last updated 23 November 2026. This notice covers the waitlist only. Pulse is not yet live.</p>
          <h2>Who we are</h2>
          <p>
            The controller of your data is {operatorLine()}. Contact us about your data at{" "}
            {SITE.contactEmail ? <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> : contact}.
          </p>
          <h2>What we collect</h2>
          <ul>
            <li>Your email address (required) and, if you choose, your first name.</li>
            <li>What best describes you, your typical transfer size and route, and optionally your company.</li>
          </ul>
          <p>Giving us this information is voluntary. Without an email address we can’t add you to the waitlist.</p>
          <h2>Why, and on what basis</h2>
          <ul>
            <li>To email you about Pulse’s launch and early access: your consent, which you can withdraw at any time.</li>
            <li>
              To understand who needs Pulse, using the answers in aggregate: our legitimate interest in building the right
              product. You can object at any time.
            </li>
          </ul>
          <h2>Who handles it, and where</h2>
          <p>
            Waitlist submissions are stored by our website host, Netlify, Inc. (United States), acting for us. Netlify screens
            submissions for spam using Akismet (Automattic Inc., United States). Transfers to the US rely on the UK–US data
            bridge where the provider is certified, or on the UK International Data Transfer Addendum. We don’t sell your data or
            share it for advertising. If we later want to pass your details to a licensed partner to open an account, we’ll ask
            you first.
          </p>
          <h2>How long we keep it</h2>
          <p>Until 12 months after launch, or 24 months from when you signed up if Pulse hasn’t launched, whichever is sooner. Sooner if you ask us to remove you.</p>
          <h2>Your rights</h2>
          <p>
            You can ask to see, correct or delete your data, object to its use, or withdraw consent by contacting {contact}. You
            can also complain to the UK Information Commissioner’s Office (ico.org.uk).
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
