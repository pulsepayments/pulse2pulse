# Vendored skills

Third-party skills copied verbatim into this repo (cloud sessions are fresh containers, so committing them is the only way they persist). Reviewed 23 Nov 2026 before install. Re-review on every update.

| Skills | Source | Commit | Licence |
|---|---|---|---|
| plan-council | github.com/emadkhan8371/plan-council | see plan-council/SOURCE.md | MIT |
| animate, animate-expo, animation-performance, animation-vocabulary, apple-design, ask-emil, ask-sonner, break-ui, choreograph, emil-design-eng, find-animation-opportunities, gestures, improve-animations, learn-taste, mobile-native, pick-ui-library, prototype, remove-animations, review-animations, write-swift | github.com/emilkowalski/skills | 64eb3de | MIT |
| impeccable (+ agents impeccable-*.md) | github.com/pbakaus/impeccable | b49177d | Apache-2.0 |
| differential-review, sharp-edges, supply-chain-risk-auditor, semgrep, sarif-parsing, property-based-testing, dimensional-analysis, agentic-actions-auditor, spec-to-code-compliance | github.com/trailofbits/skills | 149d7b2 | CC-BY-SA-4.0 |
| frontend-design, webapp-testing, mcp-builder | github.com/anthropics/skills | e4bb5d9 | Apache-2.0 |

Licence texts: `.claude/vendor-licenses/`.

## Review notes
- Emil Kowalski skills, plan-council and frontend-design are markdown only.
- **impeccable** ships a launcher script (`scripts/impeccable`) that downloads a platform binary on first use and verifies it against `engine-checksums.txt`. Its upstream design-detector **hooks** (run on every Edit/Write and at Stop) are **not enabled** here; turning them on is a deliberate choice (see docs/BUILD-REQUIREMENTS.md). Do **not** use `/impeccable live` "Apply" without `IMPECCABLE_LIVE_COPY_AGENT=chat`, because otherwise it can launch an agent with permissions bypassed.
- Trail of Bits and Anthropic skills include helper scripts (Python/shell) that run only when the skill is invoked.
- Not installed on purpose: smart-contract scanners, fuzzing for C/Rust, and the rest of Trail of Bits (not our stack); the full Anthropic set (docs, slides and xlsx skills are already built in).
