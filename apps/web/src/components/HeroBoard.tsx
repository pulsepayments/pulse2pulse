"use client";
import Link from "next/link";
import { useState } from "react";
import { DEFAULT_QUOTE, QuoteBoard } from "./QuoteBoard";
import { ArrowRight } from "./Icons";

export function HeroBoard() {
  const [state, setState] = useState(DEFAULT_QUOTE);
  return (
    <QuoteBoard
      state={state}
      onChange={setState}
      footer={
        <>
          <p className="note"><span className="foot-long">Target timetable* and illustrative rate. Fees are shown before you confirm. Not an offer.</span><span className="foot-short">Target times* · illustrative rate · not an offer</span></p>
          <Link href="#waitlist" className="btn">
            Join the waitlist <ArrowRight />
          </Link>
        </>
      }
    />
  );
}
