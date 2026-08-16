---
name: Solvaco Freight
description: Bilingual freight-brokerage marketing site — warm, family-brand trust over cold SaaS precision
colors:
  ink: "#1c1611"
  paper: "#faf6ef"
  panel: "#fffdfa"
  line: "#e9dfd0"
  muted: "#7d6f60"
  accent: "#bd5f2c"
  accent-dark: "#8f4720"
  dark: "#241b14"
  success: "#1f9d55"
  danger: "#c14545"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "0.75rem"
  md: "1rem"
  lg: "1.75rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  section: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-dark}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  input:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
  card:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.lg}"
    padding: "32px"
---

# Design System: Solvaco Freight

## Overview

**Creative North Star: "The Border Crossing"**

Solvaco Freight sits between two countries and two audiences — shippers who need a load moved, carriers who want to move it — and the system is built to feel like a trusted family business that happens to run a serious cross-border operation, not a cold logistics SaaS dashboard. The first pass at this system leaned dark-navy, steel-blue, and razor-tight tracking; that direction was explicitly corrected mid-project because it read as "precise tech," not "warm and familial," and the palette, the Hero, and the tracking-preview panel were all rebuilt around a cream-and-terracotta family instead.

Warmth here means literal warmth of hue (cream paper, terracotta accent, brown-black ink — never cool grays or blue-blacks) plus generous, soft-edged geometry (pill buttons, 28px-radius cards, diffuse shadows, no hard corners or hard-offset shadows). Precision still shows up, but through motion and structure — a magnetically-responsive primary CTA, a live-feeling tracking card, an asymmetric Bento services grid — not through coldness.

**Key Characteristics:**
- Warm neutral base (cream paper, brown-black ink) with exactly one accent color, never a second brand hue.
- Generous pill/rounded-rectangle geometry everywhere; nothing sharp-cornered.
- Flat by default; soft diffusion shadows only on the few surfaces that are genuinely elevated (cards).
- One authored perpetual-motion moment (the tracking-preview card), not motion scattered across every section.
- No eyebrow/kicker labels — headings speak for themselves.

## Colors

Warm, low-saturation neutrals carry the page; a single terracotta accent does all the emphasis work.

### Primary
- **Route Terracotta** (`#bd5f2c`): the one accent. Primary CTAs, active nav underline, focus rings, icon-badge tint, headline emphasis word, form focus state. Never diluted by a second accent hue.
- **Deep Rust** (`#8f4720`): Route Terracotta's hover/active state only. Not used as a standalone color anywhere else.

### Neutral
- **Warm Ink** (`#1c1611`): primary text and headings. Brown-black, never blue-black or pure `#000`.
- **Cream Paper** (`#faf6ef`): page background.
- **Warm White** (`#fffdfa`): card/panel/input surfaces — one step lighter than paper so elevated surfaces read as lifted without a hard edge.
- **Sand Line** (`#e9dfd0`): all hairline borders and dividers. Never gray.
- **Toasted Taupe** (`#7d6f60`): secondary/muted text (subtitles, helper text, placeholders at 60% opacity).
- **Night Terminal** (`#241b14`): the one dark anchor — Footer only. Warm dark brown, not navy-black.

### Semantic (not brand accents)
- **Success** (`#1f9d55`) / **Danger** (`#c14545`): form-status feedback only. These are functional signal colors, exempt from the one-accent rule because they're never used decoratively — only to mean "sent" or "failed."

### Named Rules
**The One Terracotta Rule.** Route Terracotta is the only brand accent in the system. If a second accent color shows up anywhere outside the semantic success/danger pair, it's a regression — the system briefly had a second blue accent during an earlier pass and it was deliberately removed.

## Typography

**Display & Body Font:** Geist (self-hosted via `next/font/google`, not the platform sans fallback)
**Label/Mono Font:** Geist Mono — used sparingly, for the load-number readout in the tracking-preview card only.

**Character:** Geist's geometric, slightly technical character is softened by looser tracking than its default feel invites — tracking-tight (-0.025em), never tracking-tighter (-0.05em), to keep headlines from reading as cold or shouty.

### Hierarchy
- **Display** (600, `clamp(2.25rem, 5vw, 3.75rem)`, line-height 1.05): page H1s — Hero headline, section titles on Services/About/the three form pages.
- **Body** (400, 1rem, line-height 1.6, `text-muted`): subtitles and paragraph copy, capped around 48–60ch measure.
- **Label** (600, 0.875rem): nav links, button text, form labels, badges.
- **Caption** (400–500, 0.75rem, `text-muted`): tracking-card meta rows, footer copyright.

### Named Rules
**The Tracking Floor Rule.** No heading goes tighter than -0.025em (`tracking-tight`). `tracking-tighter` is banned outright — it was in the first pass and was corrected for reading too cold.

## Layout

Container: `max-w-[1400px]` centered, `px-4 sm:px-6`. Sections use `py-20 md:py-28` vertical rhythm. Form pages use a narrower `max-w-3xl` reading column.

Hero is a two-column asymmetric split on `md:` and up (`grid-cols-[3fr_2fr]`) — copy and CTAs at 60% width, the tracking-preview card at 40%, stacking to a single column with the card below the copy on mobile. Services uses an asymmetric Bento grid (`md:grid-cols-4`, spans 2/1/1/4) rather than a uniform card row. Everything else is a straightforward single-column or `sm:grid-cols-2` form layout.

Mobile nav collapses to a hamburger that opens a full-width dropdown panel (`absolute inset-x-0 top-full`) anchored to the sticky header — not a narrow flex-item column.

## Elevation & Depth

Flat by default, bordered with Sand Line hairlines. The only elevated surfaces are cards (ServiceCard, TrackingPreviewCard) and the open mobile-menu panel, which get a soft diffusion shadow — never a hard offset, never a colored glow.

### Shadow Vocabulary
- **Card lift** (`box-shadow: 0 20px 40px -15px rgba(28,22,17,0.12)`): ServiceCard and TrackingPreviewCard. Warm-tinted (from ink, not gray) per the diffusion-shadow convention.
- **Menu lift** (`box-shadow: 0 20px 40px -15px rgba(0,0,0,0.15)`): the open mobile-menu dropdown, slightly stronger since it sits above page content.

### Named Rules
**The Diffusion-Only Rule.** Shadows are soft and wide-spread, tinted from the warm ink hue, never a tight dark blob and never a zero-offset colored halo.

## Shapes

Generously rounded throughout: `0.75rem` on inputs, `1rem` on icon badges, `1.75rem` on cards, full pill radius on every button, badge, and the language toggle. No sharp corners anywhere in the system. Borders are always a single 1px Sand Line hairline — no double borders, no colored side-borders on cards or list items.

## Components

### Buttons
- **Shape:** full pill (`rounded-full`).
- **Primary:** Route Terracotta background, white text, `px-6 py-3`, `font-semibold text-sm`. Hover → Deep Rust. Active → `scale-[0.98]`. The two highest-intent CTAs (Navbar's "Obtenir une soumission", Hero's primary CTA) additionally get magnetic hover physics — a `useMotionValue`/`useSpring` pull toward the cursor (never `useState`, to stay off the render cycle).
- **Ghost/Secondary:** transparent background, `border-ink/15`, `text-ink/85`. Hover → `border-ink/30` + `bg-ink/5`.
- **Tertiary/Link:** underlined `text-muted`, hover → `text-ink`. Used for the lowest-intent action in a CTA row (e.g. "Suivre une charge").

### Cards
- **Corner style:** `1.75rem` radius.
- **Background:** Warm White panel on Cream Paper page background.
- **Shadow:** Card-lift diffusion shadow (see Elevation).
- **Border:** 1px Sand Line.
- **Internal padding:** `p-6` to `p-8`.
- **Hover (ServiceCard only):** `-translate-y-1`, 300ms.

### Inputs / Fields
- **Style:** Sand Line border, Warm White background, `0.75rem` radius, `px-3.5 py-2.5`.
- **Focus:** border shifts to Route Terracotta + a `ring-2 ring-accent/15` glow.
- **Label:** always above the field (`text-sm font-medium text-ink`), never floating or placeholder-only.
- **Error/Success:** handled by the shared `FormStatus` component below the field group, not inline per-field — icon (Phosphor `CheckCircle`/`WarningCircle`) plus semantic-colored text in a spring-animated banner.

### Navigation
- **Desktop:** sticky, `bg-paper/85` + `backdrop-blur-md`, Sand Line bottom hairline. Links get an animated underline that grows from 0 to full width on hover, colored Route Terracotta.
- **Mobile:** hamburger (Phosphor `List`/`X`) opens a full-width `AnimatePresence` dropdown with staggered link reveal and a pill CTA at the bottom.
- **Language toggle:** pill container, active state = `bg-ink text-white`, inactive = `text-muted`.

### Tracking Preview Card (signature component)
The Hero's right-hand illustrative panel — a mocked shipment card (load number, origin/destination, a dashed route line with a truck icon animating along it, a pulsing "in transit" status dot) that visually ties the homepage to the site's real tracking-request feature. It is explicitly illustrative UI chrome, not a real statistic or claim (see PRODUCT.md's Evidence-on-Hand constraint against fabricated numbers) — the one place in the system carrying perpetual motion, isolated in its own `memo`-wrapped client component so the loop never re-renders the page around it.

## Do's and Don'ts

### Do:
- **Do** keep Route Terracotta as the only brand accent; success/danger stay strictly semantic, never decorative.
- **Do** use full pill radius on every interactive control and `1.75rem` on every card.
- **Do** keep headings at `tracking-tight` (-0.025em) or looser.
- **Do** isolate any perpetual/looping motion in a memoized client leaf component, never in a page-level component that re-renders.
- **Do** warm-tint shadows from the ink hue; never a neutral-gray shadow.

### Don't:
- **Don't** add an eyebrow/kicker label above a heading. This was in the system once (Hero's badge pill) and was removed — the heading carries its own weight.
- **Don't** use gradient text for emphasis; the accent word in a headline is solid `text-accent`, nothing else.
- **Don't** revert to the dark-navy/steel-blue palette from the first redesign pass — cream-and-terracotta is the confirmed, corrected direction.
- **Don't** use `tracking-tighter`, hard-offset shadows, or gray (non-warm) neutrals anywhere in the system.
- **Don't** fabricate a statistic, testimonial, or performance number on this site — PRODUCT.md records that none exist yet.
