# Format Routing — Free Local Static Ads

## TOC

1. Allowed mode (`static-code` only)
2. Forbidden (`static-ai` and generative APIs)
3. Decision table
4. HTML-owned vs photo-owned
5. Safe zones & sizes
6. QC

## 1. Allowed mode (`static-code` only)

| Mode | Pipeline | When |
|------|----------|------|
| **`static-code`** | HTML/CSS (+ optional **user/stock** photo) → Chromium/Puppeteer/Playwright PNG | **Always** — exact type, logos, claims, prices, legal, dense copy, UI chrome, color-field layouts |

This pack has **no dual mode**. If a brief asks for generative stills, **STOP** and redirect to HTML + user assets, or refuse generative path.

## 2. Forbidden — `static-ai` and generative APIs

**MUST NOT** route to or document as allowed:

- `static-ai` mode
- fal, Higgsfield, Replicate, Runway image endpoints
- Nano Banana / Gemini image, GPT Image, Seedream, Ideogram, FLUX, Imagen
- Any “generate the photo layer” step billed per API call

Character-proof QC for diffusion text is **out of scope** here — all brand text lives in HTML.

## 3. Decision table

| Creative intent | Primary route | Why |
|-----------------|---------------|-----|
| Bold type, listicles, comparison tables | **`static-code`** HTML → Chrome PNG | Exact glyphs, kerning, legal |
| Native mimic: Notes, iMessage, email, Reddit | **`static-code`** HTML | Controllable UI |
| Photoreal lifestyle / product in hand | **User/stock photo** + HTML type | Free local; no generative plate |
| Product packshot on color field | HTML bg + user packshot asset | Fidelity |
| Soft brand moment, no photo | Pure HTML / CSS graphic | Still brand-exact |
| Exact claims / logos / price / legal | **Always HTML** | Deterministic type |

## 4. HTML-owned vs photo-owned

**HTML must own:** logo wordmark, CTA label, price, legal/qualifiers, brand-exact headline when compliance-sensitive.

**User/stock photo may own:** scene, product appearance, lighting, props — as captured in the asset file.

**Never:** invent review stars, fake App Store chrome with ratings, readable competitor marks, or generate a missing photo via API.

## 5. Safe zones & sizes

| Name | Size | Aspect | Template |
|------|------|--------|----------|
| Feed 1:1 | 1080×1080 | 1:1 | `assets/template-1x1.html` |
| Feed 4:5 | 1080×1350 | 4:5 | `assets/template-4x5.html` |
| Stories/Reels 9:16 | 1080×1920 | 9:16 | `assets/template-9x16.html` |

**9:16 safe zones (Meta UI overlap risk):**

- Top ~**250px**: avoid critical headline/logo
- Bottom ~**340px**: avoid primary CTA; legal may sit nearer bottom if readable; prefer CTA above this band

1:1 and 4:5: keep ~64px padding from edges; avoid corners for CTA.

CSS variables on templates: `--brand-bg`, `--brand-surface`, `--brand-text`, `--brand-muted`, `--brand-accent`, `--brand-cta`, `--brand-cta-text`, `--font-display`, `--font-body`, `--pad` (plus `--safe-top` / `--safe-bottom` on 9:16).

## 6. QC

- Proof **every character** of on-image text at **100% zoom** (HTML is source of truth)
- Reject wrong prices, missing legal, logo distortion
- Prefer HTML edit over full recompose when only text fails
- Ship gate: brand accuracy, text legibility, claim safety
- Never “fix” a soft photo by calling a generative upscaler/API — crop/recompose with existing assets or ask user for a better photo
