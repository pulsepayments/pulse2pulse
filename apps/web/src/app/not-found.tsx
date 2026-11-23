import Link from "next/link";
import { Masthead } from "@/components/Masthead";

export default function NotFound() {
  return (
    <>
      <Masthead showClocks={false} />
      <main id="main" className="wrap prose">
        <h1>This service doesn’t stop here.</h1>
        <p>The page you’re looking for isn’t on the timetable.</p>
        <p><Link href="/">Back to the departures board</Link></p>
      </main>
    </>
  );
}
