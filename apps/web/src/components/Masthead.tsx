import Link from "next/link";
import { Clocks } from "./Clocks";

export function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label="Pulse home">
      <span className="wordmark__plate" aria-hidden="true" />
      <span className="wordmark__name">Pulse</span>
    </Link>
  );
}

export function Masthead({ showClocks = true }: { showClocks?: boolean }) {
  return (
    <header>
      <div className="masthead">
        <div className="wrap masthead__row">
          <Wordmark />
          <nav className="nav" aria-label="Main">
            <Link href="/#route" className="nav__hide">How it works</Link>
            <Link href="/preview">Preview</Link>
            <Link href="/#waitlist" className="btn btn--small">Join the waitlist</Link>
          </nav>
        </div>
      </div>
      {showClocks && <Clocks />}
    </header>
  );
}
