---
name: ad-free-brand-dna
description: "Builds a confirmed brand DNA kit for free-local ad creatives — screenshots, visual inspect, public-web research, then brand-dna.md with hex, type, photography direction for stock/user photos + HTML composition, voice, banned words, and legal qualifiers. Use when the user asks for a free brand kit, brand DNA without generative API, scrape brand for free-local ads, or prepare brand before ad-free-static / ad-free-video. Must run BEFORE free-local static/video skills. Stops for human confirm; never invents colors or legal claims. Do not use for AI image/video generation that requires fal or similar."
license: MIT
---

# Ad Free Brand DNA

Encode brand decisions for **free local** ad production. Mechanics over mood. No living artist names. **No generative image/video APIs.**

## When to use

- New brand / first free-local creative sprint
- User says brand kit, brand DNA, scrape brand, prepare brand for free-local ads
- **Required before** HTML static or HyperFrames/Remotion video when no confirmed `brand-dna.md` exists

## MUST constraints

1. **MUST** produce `brand-dna.md` (project root or `brand/`).
2. **MUST STOP** for human confirmation before any static/video production uses this DNA.
3. **MUST STOP** if inputs are empty (no URL, no assets, no guidelines) — do not invent ungrounded DNA.
4. **MUST NOT** invent hex, fonts, or legal claims — extract or mark `TBD — confirm with brand`.
5. **MUST NOT** name living artists in photography direction.
6. **MUST** write photography direction for **stock / user-supplied photos + HTML composition only** — never a photo-model / fal / Nano Banana / GPT Image prompt.
7. **MUST NOT** require or route to paid generative APIs.

## Workflow

### 1. Collect inputs (gate)

Required: at least one of brand URL, guideline doc, or existing ad/logo/photo set.

If none → **STOP**. Ask for inputs. No ungrounded fallback DNA.

Also gather: offer/category/geo, regulated-claim flags, competitors to avoid mimicking visually, paths to user-supplied product/lifestyle photos (optional).

### 2. Screenshot + visual inspect

1. Capture homepage + 1–2 key product/landing pages (desktop + mobile if relevant) via public pages / browser.
2. Prefer screenshots as primary color truth over CSS alone.
3. Note: colors, photography vs illustration, whitespace, logo lockups, UI chrome.
4. Extract hex from CSS/`theme-color`/assets when possible; sample carefully; label confidence (`high` / `medium` / `low`).

### 3. Research voice + legal

1. Mine About, FAQ, product pages, recent social for voice (public web only).
2. List **banned words** (competitor names, overclaims, regulated phrases).
3. List **required legal qualifiers**.
4. Note category compliance risks (health, finance, before/after, etc.).

### 4. Write `brand-dna.md`

Load template: [references/brand-dna-template.md](references/brand-dna-template.md)

Required sections: Identity · Color · Typography · Logo · Photo direction (stock/user + HTML) · Photography direction block (50–75 words) · Voice · Banned/legal · Anti-slop · Asset index · Human confirm checkbox.

### 5. STOP — human confirm

Present short summary: colors/type · full photography direction · banned + legal · open `TBD`s · available user photo assets.

**Do not proceed** to concept briefs or rendering until the user explicitly confirms or edits DNA.

### 6. Record confirmation

Set status `CONFIRMED {{date}}`, fill confirmation checkbox, append Changelog entry.

## Anti-slop (encode in DNA)

Brand-specific “never look like” plus default AI clusters unless brand-true:

- Inter / Roboto / Poppins / Space Grotesk as default display
- Purple-indigo gradients; cream + `#D97757` terracotta kits; acid-green on black
- Centered hero + 3 SaaS cards; tracked ALL-CAPS eyebrows; middle-dot meta lines
- Unlock / Elevate / Seamless / “game-changer”; fake 5-star blocks

## Output checklist

- [ ] `brand-dna.md` from template
- [ ] Photography direction 50–75 words for stock/user photos + HTML (no image-model / fal language)
- [ ] Human confirmation recorded
- [ ] Logo + user photo paths verified (or marked TBD)

## Boundary

Do not use for AI image/video generation that requires fal or similar. Hand off only to `ad-free-static` / `ad-free-video` / `ad-free-qa`.
