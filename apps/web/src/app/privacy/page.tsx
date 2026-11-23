import type { Metadata } from "next";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Privacy — Pulse" };

export default function Privacy() {
  return (
    <>
      <Masthead showClocks={false} />
      <main id="main" className="wrap">
        <article className="prose">
          <h1>Privacy notice for the Pulse waitlist</h1>
          <p className="note">Last updated 23 November 2026. This notice covers the waitlist only. Pulse is not yet live.</p>
          <h2>What we collect</h2>
          <ul>
            <li>Your name and email address.</li>
            <li>What best describes you, your typical transfer size and route, and optionally your company.</li>
          </ul>
          <h2>Why</h2>
          <p>
            To contact you about Pulse’s launch and early access, and to understand who needs Pulse so we build the right thing.
            We rely on your consent, which you can withdraw at any time.
          </p>
          <h2>Who handles it</h2>
          <p>
            Waitlist submissions are stored with our website host (Netlify) on our behalf. We don’t sell your data or share it for
            advertising. If we later share your details with a licensed partner to open an account, we’ll ask you first.
          </p>
          <h2>How long we keep it</h2>
          <p>Until launch plus 12 months, or until you ask us to remove you, whichever comes first.</p>
          <h2>Your rights</h2>
          <p>
            You can ask to see, correct or delete your data, or withdraw consent, by replying to any email from us. You can also
            complain to the UK Information Commissioner’s Office (ico.org.uk).
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
