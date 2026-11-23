"use client";
import { useEffect, useState } from "react";
import { clock } from "@/lib/quote";

const ZONES = [
  { city: "London", tz: "Europe/London" },
  { city: "New York", tz: "America/New_York" },
  { city: "Lusaka", tz: "Africa/Lusaka" },
];

/** Live station clocks. Rendered client-side only, so the static HTML never shows a stale build-time time. */
export function Clocks() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="clocks" aria-label="Local times">
      <div className="wrap clocks__row">
        {ZONES.map((z) => (
          <span className="clock" key={z.city}>
            {z.city} <b>{now ? clock(now, z.tz) : "––:––"}</b>
          </span>
        ))}
        <span className="clock">Pulse is in private preview</span>
      </div>
    </div>
  );
}
