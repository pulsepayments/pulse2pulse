import type { Metadata } from "next";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { SendPreview } from "@/components/SendPreview";

export const metadata: Metadata = {
  title: "Preview — Pulse",
  description: "Try the Pulse send flow with illustrative data. No money moves.",
};

export default function PreviewPage() {
  return (
    <>
      <Masthead showClocks={false} />
      <div className="strip" role="note">
        <div className="wrap strip__row">
          <span>Preview · illustrative rates and example accounts · no money moves</span>
        </div>
      </div>
      <main id="main" className="app">
        <SendPreview />
      </main>
      <Footer />
    </>
  );
}
