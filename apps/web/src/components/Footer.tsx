import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__legal note">
          <p>
            Pulse is a technology company in private preview. Pulse is not a bank and never holds customer money.
            Payments, currency conversion and payouts will be provided by licensed partners, who will be named before launch.
          </p>
          <p>
            * Arrival times are a design target, not a guarantee. Actual timing depends on our partners, banking hours and
            identity and source-of-funds checks. Rates on this site are illustrative and are not an offer.
          </p>
          <p>© 2026 Pulse.</p>
        </div>
        <div className="footer__links note">
          <Link href="/privacy">Privacy</Link>
          <Link href="/preview">Preview</Link>
          <Link href="/#waitlist">Waitlist</Link>
        </div>
      </div>
    </footer>
  );
}
