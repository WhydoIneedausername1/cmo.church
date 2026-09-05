# Storyboard — MoneyBackGuarantee_v1_9x16_HookRefund

| Field | Value |
|-------|-------|
| Concept brief | `concepts/MoneyBackGuarantee_v1_9x16_HookRefund.md` (APPROVED 2026-09-05) |
| Brand DNA | `brand/brand-dna.md` (CONFIRMED 2026-09-05) |
| Route | **A — HyperFrames** (default; marketer-owned kinetic type + stat motion, no eng team needed) |
| Format | 1080×1920 (Reels/Stories), 9:16 |
| Length target | 13s (within the 10–15s default) |
| VO | Kokoro local TTS (preferred) — no ElevenLabs, no cloud/paid VO |
| Music bed | **TBD — confirm with brand.** Needs a royalty-free/CC0 or brand-licensed bed; none supplied yet. Placeholder: no music for first render, or a silent/near-silent bed with light UI whoosh SFX only, until a licensed track is chosen. |
| Cuts | Hard cuts throughout (~95%+); no dissolves |

## Shot list

| t | Visual | Audio/VO | Caption/CTA | Tool |
|---|--------|----------|-------------|------|
| 0–3s | **Hook.** Full-bleed deep teal (`#042F2F`) background. Headline kinetic-types on in two lines, word-by-word snap-in, Inter Bold, white text: "Get 5,000 Pastor Leads in 5 Months —" then "Or Get a Refund." Small eyebrow above in mint (`#D0F6EC`): "FOR ORGANIZATIONS THAT SERVE PASTORS." | VO (Kokoro): "Get 5,000 pastor leads in 5 months... or get a refund." | On-screen headline text (burned-in, matches VO) | HyperFrames kinetic type |
| 3–6s | **Mechanism, beat 1.** Hard cut to white background. Bold Inter headline center-frame: "Most businesses struggle to connect with pastors." Small red "X" icon accent (existing site pattern, `text-red-500` circle-x). Quick cut mid-beat (t≈4.5s) to mint (`#D0F6EC`) panel: "We build you a 10/10 lead magnet that gets you pastor leads." with a green checkmark accent (`#358D72`). | VO: "Most businesses struggle to connect with pastors. We build you a 10 out of 10 lead magnet that gets you pastor leads." | Captions burned in, matching VO, split across the two sub-beats | HyperFrames kinetic type |
| 6–9s | **Proof / stat.** Teal background. Large animated stat sweeps across a range: "$1" → "$3.50" with label beneath in Roboto: "COST PER LEAD." Accent color (`#358D72`) underline draws in under the range. | VO: "Cost per lead runs between one dollar and three dollars fifty cents." | "COST PER LEAD: $1 – $3.50" | HyperFrames stat motion |
| 9–11s | **Mechanism, beat 2 / handoff.** White background, simple line-icon (users/handoff, matches site's existing lucide-users icon style) animates in, teal color. Headline: "Leads go straight to your team — and we help you close them." | VO: "Leads go straight to your team, and we help you close them." | "Leads → Your Team. We Help You Close Them." | HyperFrames kinetic type |
| 11–13s | **CTA end card.** Teal (`#042F2F`) full-bleed. Icon mark (`brand/assets/favicon.jpg`) centered top, white "CMO.Church" wordmark in Inter beneath it (type-set, not an image, since horizontal lockup file is still TBD). Below: white CTA button, mint text, "Book a Call with Our Team." Small legal line beneath in reduced-opacity white (Roboto, small): "Refund is proportional to any shortfall below 5,000 leads." | VO: "Book a call with our team today." | CTA button on-screen ≥2s before end; legal qualifier visible full duration of card | HyperFrames end card |

## Timing & edit-grammar check (per `ad-free-video` MUST constraints)

- [x] Hook changes visual/claim within first 3s
- [x] Scene lengths within 2–5s (3s / 3s / 3s / 2s / 2s)
- [x] ~95%+ hard cuts, no dissolves
- [x] Total length 13s — within social 10–15s default
- [x] CTA on-screen before final 2s (CTA card runs the full final 2s+ and includes the button from its first frame)
- [x] Route A only (HyperFrames) — no Kling/Veo/Seedance/Sora/fal/Runway/HeyGen cloud
- [x] VO: Kokoro local preferred; ElevenLabs not used
- [x] No fabricated testimonials / fake UI chrome
- [x] Legal qualifier (proportional refund) present on end card, not just implied

## Open items before render

1. **Music bed** — need a royalty-free/CC0 or brand-licensed track, or approval to ship with SFX-only / silent bed for v1.
2. **Horizontal logo lockup** — still TBD per brand-dna.md; end card uses type-set wordmark + icon mark as a workaround. Swap in real lockup file once supplied.
3. **Kokoro TTS availability** — needs to be confirmed installed/runnable in this environment before VO can be generated locally (checking next).
4. **Cost-per-lead figure now differs from the live site.** The published `/5000-leads` page states "cost per lead below $3" (used as the source stat in the original brief). This revision uses a wider range, "$1 – $3.50," per direct instruction. Flagging so the ad claim and the landing page stay consistent — either update the site copy to match, or confirm $1–$3.50 is the more accurate figure and the site should eventually be updated too. Shipping an ad claim that contradicts the destination landing page is a Meta compliance and trust risk.

## Approval

- [x] Storyboard approved by: Nathan Singleton Date: 2026-09-05 (with beat revisions: tension/fix copy, $1–$3 cost-per-lead range, "and we help you close them" added to handoff; beats extended beyond 10–15s to fit VO)

## Render (v1)

- **Output:** `video/MoneyBackGuarantee_v1/MoneyBackGuarantee_v1.mp4` — 1080×1920, H.264/AAC, 23.1s, 1.7MB
- **Tooling:** HyperFrames CLI v0.8.29, local Chrome Headless Shell render, local `ffmpeg`/`ffprobe` (static builds installed this session), local Kokoro-82M TTS (`am_michael` voice) for all VO — no cloud/paid services used
- **Scene timings actually rendered** (adjusted to real VO duration, per beat):
  - 0.0–4.5s Hook
  - 4.5–7.7s Tension
  - 7.7–12.5s Fix
  - 12.5–15.5s Stat ($1 → $3 count-up)
  - 15.5–19.1s Handoff
  - 19.1–23.1s CTA end card
- **Checks:** `hyperframes check` passed — 0 lint errors (1 non-blocking density warning), 0 runtime errors, 0 layout issues, 8/8 WCAG AA contrast checks passed
- **Still open:** no music bed (VO-only render); horizontal logo lockup still unavailable, end card uses icon mark + type-set wordmark
- **Next:** run through `ad-free-qa` before this ships to Meta

