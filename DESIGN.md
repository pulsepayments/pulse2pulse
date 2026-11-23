---
name: Pulse
description: Serious money to Lusaka, on a timetable.
colors:
  copper: "#c8703a"
  graphite: "#131517"
  graphite-warm: "#1f0f07"
  copper-ink: "#8e4318"
  verdigris: "#1f6b5c"
  paper: "#f3f4f2"
  paper-2: "#e8e9e6"
  ink-2: "#4a4f55"
  rule-soft: "#c9cbc8"
  night-paper: "#0f1112"
  night-paper-2: "#181b1d"
  night-ink: "#ecedea"
  night-ink-2: "#9ca1a6"
  night-rule-soft: "#33383c"
  night-copper-ink: "#e08a52"
  night-verdigris: "#5cbfa8"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.6rem + 4.2vw, 5.25rem)"
    fontWeight: 640
    lineHeight: 0.95
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 72"
    fontFeature: "'tnum'"
  headline:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 620
    lineHeight: 1
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 78"
    fontFeature: "'tnum'"
  title:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 640
    lineHeight: 1
    fontVariation: "'wdth' 78"
    fontFeature: "'tnum'"
  timetable-time:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 640
    lineHeight: 1
    fontVariation: "'wdth' 72"
    fontFeature: "'tnum'"
  lede:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
    fontFeature: "'tnum'"
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "'tnum'"
  label:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "0.04em"
    fontVariation: "'wdth' 85"
    fontFeature: "'tnum'"
rounded:
  none: "0px"
  dot: "50%"
spacing:
  side-mobile: "16px"
  side-desktop: "32px"
  gutter: "24px"
  row: "14px"
  cell: "12px"
  board-pad: "24px"
  section-mobile: "56px"
  section-desktop: "96px"
  max-width: "1320px"
components:
  button-primary:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.paper}"
  button-on-copper:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.copper}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  segmented-option-selected:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.copper}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "44px"
  input-ruled:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "10px 0"
    height: "48px"
  status-badge:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "3px 6px"
  status-badge-arrival:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.copper}"
  departure-board:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System: Pulse

## Overview

**Creative North Star: "The Timetable"**

Pulse is set like a Swiss/International railway timetable. Money keeps a schedule: every transfer is a departure with stops, clock times and an arrival, so the interface is built from what a timetable is built from: column headers, ruled rows, clock numerals, status cells and one strong field colour. Nothing floats, nothing is rounded, nothing glows. Confidence comes from alignment, tabular figures and exact times, not from decoration.

The ground is paper-white (graphite at night). One committed field colour, Zambian copper, owns whole regions: the working quote board, the waitlist band, the preview strip. Copper is never sprinkled as an accent on paper; where copper text is needed on paper it drops to its deep ink form. Type is a single grotesk, Archivo, with its width axis doing the work of a second family: condensed for clock times and headlines, normal width for reading.

Density is that of a printed schedule: generous section air (96px on desktop) around tightly ruled tables. The system supersedes the provisional v0 tokens in `.claude/skills/pulse-design-system/SKILL.md` (emerald primary, Inter, 8/16/999 radii, card components); that skill's principles (money is the hero, tabular money, radical transparency, live tracking, honest states, dark mode, reduced motion, 360px-first) still hold and are expressed here.

**Key Characteristics:**
- Timetable rows, column headers and status cells instead of cards.
- One field colour (copper) owning whole regions; graphite and paper everywhere else.
- Archivo Variable with the `wdth` axis: condensed for times and display, normal for reading.
- Tabular figures on every number on every surface.
- Square corners and hairline rules; depth comes from rule weight, never shadow.
- A strict 12-column grid on desktop that stacks to one column with the working board above the fold on mobile.

## Colors

A two-ground system (paper and graphite) carrying one metal field colour, with a single quiet green reserved for on-time status.

### Primary
- **Zambian Copper** (copper): the field colour. It fills the departure board, the waitlist band, the preview strip, the wordmark plate and the favicon square. It is the same value in light and dark mode: the field does not dim at night. Text on it is graphite (about 5:1).

### Secondary
- **Verdigris** (verdigris; night-verdigris in dark): status only. On-time or target states ("Target") and the completed dot on the live tracker. Copper's patina, never used as a fill or a button.

### Neutral
- **Signal Graphite** (graphite): primary ink on paper, primary button fill, every 1px and 2px rule, text and selected states on copper. Also the fixed ground of the footer in both themes (night-paper-2 in dark).
- **Kiln Brown** (graphite-warm): secondary text on copper (place names, flags, footnotes on the board, placeholders). Keeps secondary copy inside the copper field rather than greying it out.
- **Copper Ink** (copper-ink; night-copper-ink in dark): copper as text on paper. Late or varying statuses, the "Pulse" ledger title, footnote markers, the preview watermark (6.4:1 on paper).
- **Timetable Paper** (paper) and **Paper Shade** (paper-2): page ground and the one tonal step (row hover, account hover). Dark equivalents: night-paper and night-paper-2.
- **Slate Text** (ink-2; night-ink-2 in dark): secondary copy, ledes, column descriptors, pending tracker rows.
- **Hairline** (rule-soft; night-rule-soft in dark): row dividers inside tables and lists.

### Named Rules
**The Field Colour Rule.** Copper owns regions, not details. If copper appears, it fills a whole band, board or strip, or it is the 14px wordmark plate. Copper as text on paper uses Copper Ink, never raw copper.

**The Graphite-on-Copper Rule.** Everything inside a copper field is graphite or Kiln Brown: text, rules, selected segments, buttons (graphite fill, copper label). No white, no paper text on copper.

**The Status Green Rule.** Verdigris means "on time". It appears only in status cells and done-dots.

## Typography

**Display Font:** Archivo Variable (with Archivo, system-ui, sans-serif)
**Body Font:** Archivo Variable, same family
**Label Font:** Archivo Variable at 85% width

**Character:** One grotesk, three widths. Condensed Archivo (72 to 78% `wdth`) at weight 620 to 640 gives clock numerals and headlines the narrow, upright stance of a station board; normal width carries reading text.

### Hierarchy
- **Display** (640, 72% width, clamp 2.6 to 5.25rem, 0.95): the one hero headline per page. Fixed at 2.45rem under 720px so the board fits above the fold.
- **Headline** (620 to 640, 78% width, 2.5rem, 1): section heads, the preview panel title, the privacy title.
- **Title** (640, 78% width, 1.75rem): ledger titles, the "You're on the list" confirmation, the total in the summary.
- **Timetable Time** (640, 72% width, 1.75rem; the arrival row 2.4rem; tracker 1.5rem): clock times. The arrival time is always the largest numeral on a board.
- **Board Amount** (640, 72% width, clamp 2.25 to 3.4rem): the editable amount on the quote board.
- **Lede** (400, 1.25rem, 1.4, max 34ch): one paragraph under the display headline.
- **Body** (400, 1rem, 1.5, max 60 to 68ch): notes, descriptions, prose.
- **Label** (600, 85% width, 0.8125rem, 0.04em, uppercase): column headers, status cells, form labels on copper, timezone tags (0.6875rem).

### Named Rules
**The Tabular Everywhere Rule.** `font-variant-numeric: tabular-nums` is set on `body` and never turned off. Every time and amount aligns in its column.

**The Width-Is-The-Hierarchy Rule.** Reach for the width axis before adding a second typeface. Condensed for numerals and heads, normal for reading. No second family.

**The Column Header Rule.** Uppercase is reserved for labels that head or classify a column or a field: table headers, status cells, form labels, timezone tags. Never as a kicker above a headline.

## Layout

A strict 12-column grid (24px gutter) inside a 1320px max container with 16px side padding on mobile and 32px from 720px. From 1000px:

- **Hero:** copy in columns 1 to 5, the departure board in columns 6 to 12.
- **Sections:** head in columns 1 to 4, body in columns 5 to 12. Each section opens on a 1px graphite rule.
- **Footer:** legal in columns 1 to 8, links right-aligned in columns 10 to 12.
- **Preview app:** a 240px station list beside the panel (sticky), stacking to a four-across station strip on mobile.

Section padding is 56px on mobile, 96px from 1000px. Tables use 12 to 14px row padding; the board's inner padding is 24px (16px on mobile). Under 720px the clocks strip and secondary hero link hide and the board tightens so the amount, currency switches, timetable and "Join the waitlist" all sit above the fold at 360 to 390px wide. Minor columns (status, place lines, minor flags) drop before primary ones.

**The Board-Above-The-Fold Rule.** On mobile the working quote board, including its action, must be visible in the first viewport. Tighten the board before cutting it.

## Elevation & Depth

Flat. There are no drop shadows anywhere. Depth and grouping come from rule weight and field colour: a 2px graphite (or copper) top rule opens a table, 1px graphite rules divide sections, Hairline rules divide rows, and a copper field lifts a region by colour alone. The only `box-shadow` values are functional and flat: a 2px underline on focused inputs (`0 2px 0 0` graphite), a 3px inset underline on the current preview station (copper), and the expanding ring of the live tracker dot.

**The Rule-Weight Rule.** Hierarchy of separation is 2px opener, 1px section rule, hairline row rule. Never a shadow, never a raised panel.

## Shapes

Square. Buttons, boards, inputs, segmented controls, badges and bands all have 0 radius. Circles appear only where a timetable uses them: radio marks, the tracker status dots and the route-line stops. Inputs are a single bottom rule, not a box. The route line on "Later on this line" is a 3px vertical line threading 15px ringed stops; the first stop and its segment are copper.

## Components

### Buttons
Solid, square and blunt; inversion is the hover.
- **Shape:** square corners (0), 1px border in the fill colour, 48px tall (40px small), 20px side padding, weight 600, trailing 16px arrow.
- **Primary:** graphite fill, paper label. Hover inverts to transparent with graphite label (160ms, ease-out-expo).
- **Ghost:** transparent with graphite border and label; hover fills graphite.
- **On copper:** graphite fill with copper label; hover goes transparent with graphite label. Focus outline switches to graphite.
- **Disabled:** 50% opacity.

### Segmented control
Currency switches on the board: a 1px graphite frame of 44px buttons divided by 1px rules. Selected (`aria-pressed`) fills graphite with a copper label; hover on an unselected option is a 10% graphite wash.

### Inputs / Fields
- **Style:** transparent, no box, a single 1px bottom rule in the field's ink, 48px tall, 1.0625rem text, 0 radius. Selects carry an inline chevron.
- **Focus:** the bottom rule thickens to a 2px underline; no glow.
- **Checkbox:** a square 20px frame drawn in the field's ink with a drawn tick.
- **Error:** a bold graphite message beside the action, announced as an alert.

### Departure board (signature)
The working quote. A copper field with three bands: the inputs (amount and currency switches) closed by a 2px graphite rule; a timetable with Time, Stop, Status and Amount columns; a foot (note plus primary action) opened by another 2px rule. Rows are ruled at 35% graphite. Times sit in condensed numerals with a small uppercase timezone tag below. The arrival row ("Lands") is shaded 5% graphite, carries the largest time and amount, and its status badge is inverted (graphite fill, copper label). Status badges are 1px-framed uppercase labels.

When the amount or currency changes, times and amounts roll in like a split flap: 180ms, ease-out-expo, staggered 70ms per row, removed under `prefers-reduced-motion`. It runs only after the visitor interacts, never on first paint.

### Ledgers and status cells
Comparison and summary tables on paper: a 2px top rule (graphite, or copper for Pulse's own ledger), a condensed title row, hairline rows, a bold label column and a right-aligned value or status column. Status cells are Label type coloured by meaning: Copper Ink for late or varying, Verdigris for on time, Slate for neutral.

### Service notes
A definition list in the same ruled language: condensed 85% width terms in a 14em column beside Slate descriptions, hairline between rows.

### Live tracker
The preview's arrival board: Time, What/Where and Status columns, pending rows in Slate. The current stop has a copper dot with an expanding ring (1.4s loop, off under reduced motion); done stops have a Verdigris dot.

### Navigation
Masthead: copper wordmark plate plus condensed 70% width "Pulse" wordmark at left; text links (weight 500, underline on hover) and a small primary "Join the waitlist" button at right; closed by a 1px graphite rule. Below it, a 36px strip of live London, New York and Lusaka clocks, hidden under 720px.

### Footer
A graphite field in both themes with light text: regulated-partner disclosure, timing footnote and links.

## Do's and Don'ts

### Do:
- **Do** build new screens from timetable parts: column headers, ruled rows, clock times, status cells.
- **Do** let copper fill a whole region (board, band, strip) and keep everything inside it graphite or Kiln Brown.
- **Do** set every number in tabular figures and every time in condensed Archivo with its timezone named.
- **Do** make the arrival time the largest numeral on any board that shows one.
- **Do** separate with rules (2px opener, 1px section, hairline row) and keep every corner square.
- **Do** keep motion to state changes (160ms hovers, a 180ms staggered roll on changed values) and remove it under reduced motion.
- **Do** keep the copper field the same value in dark mode, and switch Copper Ink and Verdigris to their night values.

### Don't:
- **Don't** use cards, rounded containers, drop shadows or pill shapes.
- **Don't** use raw copper as text or as a small accent on paper; use Copper Ink.
- **Don't** put white or paper text on copper.
- **Don't** add a second typeface; use Archivo's width axis instead.
- **Don't** use gradient heroes, phone mockups or rows of three feature cards.
- **Don't** put uppercase kicker labels above headlines; uppercase belongs to column headers, status cells and field labels.
- **Don't** use verdigris for anything but on-time status.
