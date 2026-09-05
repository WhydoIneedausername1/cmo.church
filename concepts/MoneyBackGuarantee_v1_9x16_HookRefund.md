# Creative Brief — MoneyBackGuarantee_v1_9x16_HookRefund (free local)

| Field | Value |
|-------|-------|
| Name | `MoneyBackGuarantee_v1_9x16_HookRefund` |
| Status | `APPROVED 2026-09-05` |
| Platform | Meta (Reels placement) |
| Funnel stage | Cold |
| Brand DNA | `brand/brand-dna.md` — CONFIRMED 2026-09-05 |
| Produce path | **free local only** — no generative API |

## Angle

Risk reversal beats feature-selling for a skeptical B2B/ministry buyer who has already tried ads that didn't work: promise the exact number (5,000 pastor leads) and remove the downside (proportional refund) in the first 3 seconds.

Quadrant (variety matrix): **Pain** (primary) — names the top-of-funnel pain directly
Secondary: **Proof-heavy** — backs the promise with the $3 cost-per-lead stat and one real result

## Hooks

| # | Hook text | Format fit | Keep? |
|---|-----------|------------|-------|
| 1 | "Get 5,000 Pastor Leads in 5 Months — Or Get a Refund." | HyperFrames kinetic type | Y — primary |
| 2 | "What if your ads got you 5,000 pastor leads... or your money back?" | HyperFrames | Y — variant test |
| 3 | "Cost per lead under $3. 5,000 leads guaranteed (or refunded)." | HyperFrames stats motion | Y — variant test |

**Primary hook for this brief:** #1 — "Get 5,000 Pastor Leads in 5 Months — Or Get a Refund."

## Copy blocks (intended — for HTML layer / captions)

- Eyebrow: "For organizations that serve pastors"
- Headline: "Get 5,000 Pastor Leads in 5 Months — Or Get a Refund."
- Body (≤120 chars): "We build your 10/10 lead magnet, run the Meta ads, and get your cost per lead under $3."
- CTA: "Book a Call with Our Team"
- Legal / qualifier: "Refund is proportional to any shortfall below 5,000 leads."
- Price / offer chip: "Cost per lead: under $3"

JSON for QA text-diff:

```json
{
  "name": "MoneyBackGuarantee_v1_9x16_HookRefund",
  "headline": "Get 5,000 Pastor Leads in 5 Months — Or Get a Refund.",
  "body": "We build your 10/10 lead magnet, run the Meta ads, and get your cost per lead under $3.",
  "cta": "Book a Call with Our Team",
  "legal": "Refund is proportional to any shortfall below 5,000 leads.",
  "price": "Cost per lead: under $3"
}
```

## Visual direction

- Photo layer: none required for v1 — pure kinetic type + stat motion on brand color fields (teal `#042F2F` / mint `#D0F6EC`); optional future variant can drop in a user-supplied photo of a laptop/dashboard in the mid-scene if the client supplies one
- Text/logo/CTA: HyperFrames overlays — headline in Inter bold, body in Roboto, icon mark (`brand/assets/favicon.jpg`) as end-card logo
- References to preserve: `logo-icon` (favicon.jpg); horizontal lockup still TBD, so end card uses icon mark + wordmark set in Inter type instead of an image file
- Motion: **Route A only** — HyperFrames (default)

## Proof assets required

| Asset | Source | Status |
|-------|--------|--------|
| "Cost per lead under $3" stat | `/5000-leads` page copy (brand's own published claim) | have |
| "5,000 leads or refund" guarantee | `/5000-leads` page copy | have |
| Client result stat (100K→700K email list) | `/5000-leads` + `/unity` page copy | have (use as secondary beat only, no client name/logo — none supplied) |

**MUST NOT** fabricate testimonials or review stars — none used in this brief.

## Production route (free local)

- [ ] Static `static-code` (`ad-free-static`) — backlog, not this round
- [x] Video Route A (`ad-free-video`) — HyperFrames — duration target: 10–15s, 1080×1920 (Reels)

**Forbidden on this brief:** `static-ai`, fal, Nano Banana, GPT Image, Kling, Veo, Seedance, Sora, required ElevenLabs.

## Success metric + kill criteria

- Primary KPI: thumbstop rate / CTR to booking page
- Kill if: thumbstop <20% or CPA well above the account's existing benchmark after a full test cycle
- Iterate if: strong thumbstop but weak CTA click-through — test hook #2 or #3 next

## Compliance checklist (pre-prod)

- [x] No banned words from DNA ("guaranteed income," "100% money-back" avoided — refund stated as proportional)
- [x] Qualifiers present ("Refund is proportional to any shortfall below 5,000 leads.")
- [x] Before/after caution considered — not applicable to this category
- [x] No fake UI chrome
- [x] No generative-API dependency

## Approval

- [x] Concept approved by: Nathan Singleton Date: 2026-09-05
- Notes: Demo brief — customer-language mining was skipped per user direction (see `concepts/variety-matrix-fill.md`); hooks 1–3 sourced from user-specified themes (cost-per-lead <$3, 5,000-leads-or-refund, pastor-specialist positioning) plus the brand's own on-site copy. Proceeding to `ad-free-video` storyboard.
