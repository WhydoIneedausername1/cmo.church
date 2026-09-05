# Brand DNA — CMO.Church (free local)

> Status: `CONFIRMED 2026-09-05`
> Owner: Nathan Singleton (session user)
> Sources: https://cmo.church, https://cmo.church/5000-leads, https://cmo.church/about, https://cmo.church/privacy-policy, https://cmo.church/terms-of-service, site CSS (`/assets/index-CR2A7IRm.css`), `favicon.jpg`
> Path: **free local only** — no generative image/video APIs

## 1. Identity

| Field | Value |
|-------|-------|
| Brand | CMO.Church (Dillon Smith, fractional CMO for churches) |
| Category | B2B marketing services for organizations that serve pastors (businesses, nonprofits, ministries) |
| Positioning (1 line) | "We find your 10/10 lead magnet, run Meta ads to it, and pass the new leads straight to your team." |
| Primary offer / SKU focus | **5,000 Pastor Leads in 5 Months** — done-for-you lead magnet + Meta ads service, cost-per-lead target under $3, partial-refund guarantee if the 5,000-lead target is missed |
| Audience (primary) | Leaders of orgs that serve pastors — Christian business owners, nonprofits, ministries, roughly $1M–$5M/yr revenue, stuck on top-of-funnel growth |
| Geo / language | English, US-market church/ministry space |

## 2. Color system

Extracted directly from the site's CSS custom properties (`:root`, light theme — the theme actually served), not sampled from a screenshot. Confidence: **high**.

| Token | Hex | Usage |
|-------|-----|--------|
| `--brand-bg` | `#FFFFFF` | Full-bleed backgrounds (`--background`) |
| `--brand-surface` | `#D0F6EC` | Cards / soft section backgrounds (`--secondary` / `--muted`, mint) |
| `--brand-text` | `#042F2F` | Primary copy + primary UI color (`--foreground` / `--primary`, deep teal — near-black) |
| `--brand-muted` | `#358D72` (medium) / `#146B4B` (darker variant, `--brand-secondary`) | Secondary/legal text, small labels, eyebrow text (`--accent`) |
| `--brand-accent` | `#358D72` | Highlights, step icons, checkmarks, "Step 1/2/3" labels (`--accent`) |
| `--brand-cta` | `#042F2F` | Primary buttons ("Book a Call with Our Team") on light sections |
| `--brand-cta-text` | `#FFFFFF` | CTA button label (`--primary-foreground`) |

Contrast notes: `#042F2F` on `#FFFFFF` and `#FFFFFF` on `#042F2F` are both very high contrast (safe for AA/AAA body and CTA text). `#358D72` accent on white is medium contrast — fine for icons/labels, avoid for body copy at small sizes.

## 3. Typography

Extracted directly from CSS (`font-family` declarations + Google Fonts `<link>`). Confidence: **high**.

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Display / headline | **Inter** | 600–700 (h1 ~2.25rem mobile / larger desktop, h2 ~55px, h3 ~34px) | This is genuinely brand-true here (confirmed via `.font-heading{font-family:Inter,sans-serif}` and `h1/h2/h3` rules) — do **not** treat as generic AI-slop default; it's this site's actual stack |
| Body | **Roboto** | 300–500 (`.body-copy`/`p` ~21px desktop) | `.font-body{font-family:Roboto,sans-serif}` |
| Price / numeric | Inter (bold), e.g. "100K to 700K", "2x in 3 months" stat callouts | 700 | Large stat numbers use `font-heading font-bold text-primary/accent` |
| Legal | Roboto, small, `text-white/60` or `text-neutral/60` | 400 | Footer/legal lines use reduced opacity of body color |

Fallback stack for HTML ads: `"Inter", -apple-system, "Segoe UI", sans-serif` for headings; `"Roboto", -apple-system, "Segoe UI", sans-serif` for body. Both fonts loadable free via Google Fonts (`family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;600;700`).

## 4. Logo

| Variant | Path | When |
|---------|------|------|
| Icon / mark only | `brand/assets/favicon.jpg` (373×327 JPEG, confirmed downloaded) | Tight crops, favicon-style placement, app-icon-style badge |
| Primary color (horizontal lockup) | **TBD — confirm with brand.** Referenced in site source as `CMO_Horizontal_Logo_Primary...jpg` but only reachable via a dev-only build path (`/@fs/home/runner/...`); the production URL from `og:image` 404s to the SPA shell, not a real image. | Standard header placement — needs a real asset before use |
| Knockout / white | **TBD — confirm with brand.** Not found. | Dark / photo backgrounds |

The confirmed mark: a stylized "C" ring in `#042F2F` with a compass/dial needle motif pointing into the ring gap — reads as "growth direction / targeting."

Clear-space: keep at least 0.5× the mark's height clear on all sides (standard rule until brand supplies real guidelines — **TBD**).
Min width (px @1080): ~64px for the icon mark (**TBD — confirm**).
Never: stretch, recolor off brand teal/mint/white, place over busy photo backgrounds without a contrast plate.

## 5. Photo / image direction (stock & user assets only)

- **Source rule:** use **user-supplied** or **licensed stock** photos only — never fal / Nano Banana / GPT Image / Seedream / similar.
- **Realism:** natural light, editorial-documentary tone (church staff meetings, laptop/phone screens showing ad dashboards or lead-magnet PDFs, pastors on stage or in small groups) — avoid staged corporate stock-smile energy.
- **Avoid:** cinematic teal-orange grade, generic stock-hero handshake/smile photos, purple-indigo AI gradients, glossy SaaS-dashboard mockup clichés.
- **Product:** the real "product" here is a lead magnet (PDF/checklist) and a Meta ads results dashboard — show screenshots/mockups of these as flat, honest UI captures, not glamour renders.
- **Talent:** if using people, church leaders/staff of varied age (30s–60s) and background, business-casual or pastoral attire — no stereotypical "mega-church stage lights" clichés unless brand-confirmed.
- **Environments:** church offices, home offices, small-group rooms, laptops/phones on a plain desk; keep backgrounds uncluttered so brand teal/mint can carry color instead of the photo.
- **HTML composition:** leave soft, low-detail regions (light mint `#D0F6EC` panels or plain white) for headline type, logo mark, and CTA button; keep photos to the visual "proof" half of the frame.

### Photography direction for stock/user photos + HTML composition (50–75 words)

```
Natural light, documentary-style stills of ministry/business leaders at a laptop
or in a small meeting — no staged handshake-smile stock energy. Flat, honest
screenshots of a lead-magnet PDF or an ads dashboard stand in for "product."
Keep backgrounds plain so deep teal (#042F2F) and mint (#D0F6EC) carry color.
Reserve clear negative space for Inter headline type, the C-mark logo, and a
teal CTA button. No cinematic grading, no gradient overlays.
```

Word count: 68

## 6. Voice

| Do | Don't |
|----|-------|
| Direct, numbers-forward, plainspoken ("Get 5,000 Pastor Leads in 5 Months or Get a Refund") | Don't use vague growth-hacker slang ("Unlock", "Elevate", "Seamless", "game-changer") |
| Name the specific mechanism (10/10 lead magnet → Meta ads → cost-per-lead under $3 → leads to your team) | Don't imply guaranteed income/donations — the guarantee is on **lead count**, not revenue |
| Speak to church/ministry-serving orgs specifically ("pastors," "ministry," "mission") | Don't use overtly secular hard-sell hype tone that clashes with the ministry-adjacent audience |
| Use real proof points already published by the brand (100K→700K email list, 40,000+ downloads of Carey Nieuwhof's Preaching Cheat Sheet, cost-per-lead under $3) | Don't fabricate new testimonials, reviews, or logos beyond what's on-site |
| Refund/guarantee language should mirror the site's own precise wording | Don't round the guarantee up to "100% money-back" — it's a **proportional** refund tied to the shortfall percentage |

Customer-language snippets (from the brand's own published copy — quoted, not invented):

1. "Not enough leads coming in the top of your funnel, which means growth stalls and every month feels like a grind."
2. "Most lead magnets are not very good... you end up spending up to five times more than you should on every lead."
3. "If your lead magnet is not a 10 out of 10, it was destined to fail before you ever spent a dollar on ads."

No independent customer-review/Reddit/forum mining source was provided or found for this pass — the concept-pipeline step should either mine one (App/Google reviews, Skool community, social comments) or explicitly scope concepts to the site's own quoted language above per its own STOP rule.

## 7. Banned words & legal

**Banned:** "guaranteed income," "guaranteed donations," "100% money-back" (the real guarantee is a *proportional* refund on the service fee, not a full refund or a revenue promise), fabricated client names/logos not listed on-site, competitor names (none named on-site — don't introduce any).

**Required qualifiers / footnotes:**
- The refund is **proportional to the shortfall in leads**, not full or unconditional — e.g. "20% short of 5,000 leads → 20% fee refund." Any ad copy referencing the guarantee must reflect this, not a blanket "money-back guarantee."
- "Cost per lead below $3" is this brand's own performance claim from its site — treat as a company claim to attribute to CMO.Church's track record, not a promise of results for every advertiser; avoid rephrasing it as an unconditional guarantee.
- Standard Meta ads disclosure/labeling requirements apply if any AI-assisted content is used (none is, per this pack's free-local/no-generative-API rule).

**Claim rules:** No language implying guaranteed revenue, guaranteed donations, or guaranteed spiritual/ministry outcomes. The only guaranteed metric is **lead count**, refunded proportionally on shortfall. No before/after or health-style claims apply to this category.

**Trademark / competitor:** Third-party names referenced on-site (Life.Church, Craig Groeschel Leadership Podcast, Carey Nieuwhof) are the brand's own published case-study references — do not introduce these into ad creative without re-confirming current permission, since ad usage is a different context than an About page. Default to the two proof points explicitly presented on the offer page itself (100K→700K list growth logo-less case study, and Carey Nieuwhof's Preaching Cheat Sheet, which is already named on the `/5000-leads` page as a public proof point).

## 8. Anti-slop (brand-specific)

Never ship creatives that look like (unless brand-true and confirmed):

- Generic SaaS: centered hero + 3 feature cards + tracked ALL-CAPS eyebrows (the real site *does* use a 3-card grid for proof points and a "for organizations that serve pastors" eyebrow — keep this since it's brand-true, but don't add a 4th generic layer of SaaS-card cliché on top, e.g. no fake "trusted by" logo row)
- Middle-dot meta lines ("Fast · Simple · Secure")
- Fake 5-star review blocks / fabricated testimonials
- Unlock / Elevate / Seamless / "game-changer" filler
- Purple-indigo mesh gradients (site uses a subtle `primary/5`-to-white gradient in the hero only — keep it subtle, don't push toward a loud AI-gradient look)
- Cream backgrounds + `#D97757` terracotta accent kits
- Acid-green / neon on black "AI startup" kits
- Treating Inter/Roboto as a lazy default — here they're the *actual* brand fonts (see §3), so this bullet doesn't apply as a warning, just don't add a third random typeface on top

## 9. Reference assets index (user / stock only)

| ID | Path | Role | Preserve every iteration? |
|----|------|------|---------------------------|
| logo-icon | `brand/assets/favicon.jpg` | Icon / mark | Y |
| logo-horizontal | TBD — not resolvable from public site (dev-only path) | Primary lockup | Y once supplied |
| offer-page-source | `brand/screens/5000-leads-page.txt` (raw text pulled from `https://cmo.church/5000-leads`) | Offer copy source of truth | Y |
| carey-nieuwhof-logo | Attempted download 404'd (dev-only path); referenced by name only in copy | Case-study proof mention | N — do not fabricate the logo image, text-reference only unless a real asset is supplied |

**Forbidden:** generated plates from fal, Nano Banana, GPT Image, or similar.

## 10. Human confirmation

- [x] Colors verified
- [x] Type / logo verified (icon mark only; horizontal lockup remains TBD)
- [x] Photography direction approved (stock/user + HTML — no generative API)
- [x] Banned + legal approved
- [x] Confirmed by: Nathan Singleton Date: 2026-09-05

## Changelog

| Date | Change |
|------|--------|
| 2026-09-05 | Initial draft — built from live `cmo.church` site CSS, `/5000-leads` offer page, `/about`, `/privacy-policy`, `/terms-of-service`. Logo horizontal lockup and Carey Nieuwhof logo image both unreachable at production URLs (dev-only paths) — marked TBD. |
| 2026-09-05 | Confirmed by Nathan Singleton. Proceeding to ad-free-concept-pipeline for the 5,000-leads offer. |
