import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { convert, formatMoney, parseAmountInput, parseDecimal } from "./money";

describe("parseAmountInput", () => {
  it("parses grouped input into minor units", () => {
    expect(parseAmountInput("250,000", "GBP")).toEqual({ minor: 25_000_000n, currency: "GBP" });
    expect(parseAmountInput("£1 000 000.5", "GBP")).toEqual({ minor: 100_000_050n, currency: "GBP" });
  });
  it("rejects junk and excess decimals", () => {
    expect(parseAmountInput("", "GBP")).toBeNull();
    expect(parseAmountInput("12a", "GBP")).toBeNull();
    expect(parseAmountInput("1.234", "GBP")).toBeNull();
  });
});

describe("convert", () => {
  it("converts with floor and half-even", () => {
    const gbp = { minor: 1_050n, currency: "GBP" as const }; // £10.50
    expect(convert(gbp, "ZMW", "27.18", "floor").minor).toBe(28_539n); // K285.39
    expect(convert({ minor: 1n, currency: "GBP" }, "ZMW", "0.5", "half-even").minor).toBe(0n); // 0.5 -> 0 (even)
    expect(convert({ minor: 3n, currency: "GBP" }, "ZMW", "0.5", "half-even").minor).toBe(2n); // 1.5 -> 2
  });
  it("never exceeds the exact value when flooring (property)", () => {
    fc.assert(
      fc.property(fc.bigInt({ min: 0n, max: 10n ** 12n }), fc.integer({ min: 1, max: 99_999_999 }), (minor, r) => {
        const rate = (r / 10_000).toFixed(4);
        const out = convert({ minor, currency: "GBP" }, "ZMW", rate, "floor").minor;
        const exact = minor * parseDecimal(rate, 4); // scaled by 10^4
        expect(out * 10_000n <= exact).toBe(true);
        expect((out + 1n) * 10_000n > exact).toBe(true);
      }),
    );
  });
});

describe("formatMoney", () => {
  it("formats without float artefacts", () => {
    expect(formatMoney({ minor: 25_000_000n, currency: "GBP" })).toBe("£250,000.00");
    expect(formatMoney({ minor: 679_500_000_07n, currency: "ZMW" })).toBe("K 679,500,000.07");
    expect(formatMoney({ minor: 5n, currency: "USD" }, { code: true })).toBe("$0.05 USD");
  });
});
