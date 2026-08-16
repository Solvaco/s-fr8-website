---
target: homepage / full site
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 3
p1_count: 2
timestamp: 2026-08-16T20-21-17Z
slug: src-app-page-tsx
---
# Critique: Solvaco Freight (homepage / full site)

Method: dual-agent (A: design-review, B: detector+browser)

## Heuristics
19/32 applicable (na: 7, 10) — 59%, Acceptable/Needs Improvement.

## Design-specificity verdict
Warm and specific where invested (Hero, TrackingPreviewCard, Services bento grid). Homepage is a single Hero section with nothing after it; /a-propos is one heading + one 40-word paragraph despite being the page meant to carry the "family business" positioning.

## Strengths
- TrackingPreviewCard: only fully authored/delightful moment, isolated motion per DESIGN.md rule.
- Services bento grid (2/1/1/4 spans): deliberate asymmetric composition, gives cross-border the right weight.
- Palette discipline: no stray accent color, no tracking-tighter, no hard shadows found in rendered pages.

## Detector findings (browser-based live scan)
- REAL: low-contrast 4.3:1 white-on-#bd5f2c on both primary CTAs (nav + hero) — FIXED this session, accent darkened to #a8531f (5.36:1).
- gpt-thin-border-wide-shadow on TrackingPreviewCard — matches the deliberately-chosen "Diffusion-Only Rule" in DESIGN.md, not actioned.
- overused-font Geist 96% — expected, single documented font family, not a defect.
- cream-palette — false positive, intentional brand token.
- Static detect.mjs CLI scan returned 0 findings (blind spot: doesn't parse next/font imports or CSS custom properties).

## Priority issues
- [P0] Homepage is a single `<Hero/>` section, nothing between it and the footer.
- [P0] /a-propos has no real content (one 40-word paragraph).
- [P0] Primary CTA contrast fails WCAG AA (4.3:1) — FIXED this session.
- [P1] Form validation computes per-field errors but UI only shows one generic banner; native browser email-validation tooltip renders in English even when site is set to French.
- [P1] No active-nav-link indicator despite DESIGN.md documenting one.
- [P2] Mobile menu has no backdrop/scrim; Hero content stays tappable underneath.
- [P3] /contact's 8 fields have no visual grouping (identity vs shipment data).

## Persona red flags
- Jordan (first-timer): clicks À propos for reassurance before committing to a form, gets one paragraph.
- Sam (accessibility): logo link announces redundant "Solvaco, Solvaco Freight, link"; form errors have no aria-invalid/aria-describedby wiring.
- Casey (mobile): open mobile menu leaves Hero CTAs tappable underneath with no scrim.

## Minor observations
- Unused `hero.badge` translation key (dead code from removed eyebrow/kicker).
- Muted text contrast ~4.5:1, right at AA threshold, no margin.
- Focus ring on nav links is browser-default square corners, inconsistent with "no sharp corners" rule.
- Success-state UI/copy not verified live (EmailJS not configured in dev) — verified via source read only.
