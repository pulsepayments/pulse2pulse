# Evals

Two kinds of evals, scored on the **final outcome** (not on intermediate steps), with rubrics that never conflict with each other or with `CLAUDE.md`.

## 1. Build-agent evals (how well Claude Code builds Pulse)
Golden tasks in `build-agent/`. Each task has a prompt, a starting repo state (a git ref), and a rubric graded on the **finished diff and its test results**. Where it helps diagnosis, a secondary check records whether the right skill or tool was used, for example whether `provider-adapter` was loaded or `fintech-reviewer` was run.

Run each task **≥ 2 times** (results vary run to run) and compare per task, not only in aggregate. Re-run the suite before and after any change to `CLAUDE.md`, the skills or the agents. Add a skill or agent only if it improves results; prune any that don't.

## 2. Product-agent evals (Pulse's own AI features, e.g. agentic invoicing)
In `product/` once the features exist. Graded on the final output a user sees, such as the invoice drafted, the reminder sent and the payment matched, with hard-fail rules: the agent never moves money, never sends without the approval policy, and never invents amounts.

## Rules
- A rubric item must be checkable: a test passes, a file exists, a grep result, or an LLM-judge question with a yes/no anchor.
- Rubric items must not conflict. If two rules disagree, fix the rule in `CLAUDE.md` or the skill first.
- Start small: ~10 golden tasks, then grow from real failures.
