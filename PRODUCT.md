# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two primary audiences on the same site:
- **Shippers** — businesses that need freight moved (dry van, reefer, flatbed, cross-border CA/US) and want a fast quote.
- **Carriers / owner-operators** — transporters looking to be recruited to haul for Solvaco Freight.

A third, lighter-weight audience: existing shipping clients checking on the status of a load already in motion.

## Product Purpose

Solvaco Freight is a freight brokerage. The public site exists to generate three concrete actions: a shipper requesting a quote, a carrier applying to join the network, and a client requesting a status update on an existing load. It is a lead-generation marketing site, not an operations platform — the actual load lifecycle (booking, dispatch, tracking, invoicing) runs in a separate internal system (`flatbed-broker`), not this repo.

## Positioning

Responsiveness and cross-border (Canada + USA) coverage: a carrier network and customs/cross-border expertise on both sides of the border, with faster response than a shipper would expect from a regional-only broker.

## Operating Context

- Bilingual FR/EN (Québec + US market), language toggle persisted client-side.
- Three lead forms (quote, carrier signup, tracking-status request) deliver by email via EmailJS, client-side, no backend — a deliberate trade-off (see Capabilities).
- Tracking is a "request status" email form, not a live shipment tracker; there is intentionally no connection to the internal TMS from this site.
- Sibling repos exist for the same brand family: `solvaco-website` (the construction/béton division's site) and `flatbed-broker` (the internal freight ops/TMS). This repo shares no code, deploy, or data with either.

## Capabilities and Constraints

- Services: Dry Van, Reefer, Flatbed, Cross-border CA/US.
- EmailJS credentials ship client-side by design (no backend); mitigated via EmailJS-dashboard domain restriction and rate limiting, not in code. Documented in README.
- No database, no user accounts, no live load-status lookup from this site.
- Reuses the Solvaco brand logo asset from the sibling construction-site repo (copied in, not a runtime dependency).

## Brand Commitments

- Name: **Solvaco Freight**, the logistics division of the Solvaco family (construction/béton company is the sibling brand).
- Same logo mark as the construction site, but this site's palette is deliberately more colorful than that site's gold/dark theme — not a literal visual match, a family relationship.
- Contact: info@solvaco.com, 514-922-7848 (shared with the construction division).

## Evidence on Hand

None yet. No real testimonials, case studies, client logos, or certifications exist for this division — future design/copy work must not fabricate any (no invented client quotes, no invented on-time-percentage stats, no invented carrier-network-size numbers).

## Product Principles

1. Dual-audience clarity — every page should read as obviously for shippers or for carriers; never blur the two asks into generic corporate copy.
2. Cross-border is the differentiator — CA/US coverage and customs fluency should stay visible, not buried in a services sub-page.
3. No fabricated proof — until real evidence exists, the site earns trust through clarity and responsiveness signals (fast reply promises, direct contact), not invented stats or testimonials.
4. Family resemblance, not a clone — visually related to `solvaco-website` (shared logo, shared brand) but not a reskin of its construction-industry gold/luxury aesthetic.

## Accessibility & Inclusion

No specific standard imposed. Follow standard good practice (semantic HTML, labeled form fields, sufficient contrast, keyboard-operable nav).
