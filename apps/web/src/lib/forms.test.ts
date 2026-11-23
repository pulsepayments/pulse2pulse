import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Netlify validates submitted field names against the static skeleton; keep them in sync.
const names = (html: string) => [...html.matchAll(/name="([^"]+)"/g)].map((m) => m[1]).filter((n) => n !== "waitlist");

describe("waitlist form skeleton", () => {
  it("declares every field the component submits", () => {
    const skeleton = new Set(names(readFileSync("public/__forms.html", "utf8")));
    const component = new Set(names(readFileSync("src/components/WaitlistForm.tsx", "utf8")));
    for (const n of component) expect(skeleton.has(n), `missing ${n} in __forms.html`).toBe(true);
  });
});
