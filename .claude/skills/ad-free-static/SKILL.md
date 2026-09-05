---
name: ad-free-static
description: "Produces Meta/Facebook static ad images via free-local static-code only — HTML/CSS templates plus optional user-provided photo or product assets; render PNG with headless Chrome, Puppeteer, or Playwright. Use when the user asks for free-local static ads, HTML ad images, Meta statics without generative API, or Chrome PNG compositions. Never generates photos; no static-ai, fal, Nano Banana, or GPT Image. Requires confirmed brand-dna.md (run ad-free-brand-dna first) and an approved concept brief before pixels. Do not use for AI image/video generation that requires fal or similar."
license: MIT
---

# Ad Free Static (`static-code` only)

**Core rule:** optional **USER / STOCK PHOTO** layer · TEXT / LOGO / PRICE / LEGAL in HTML · render headless Chrome/Puppeteer/Playwright. **Never generate photos.** No `static-ai`.

## When to use

Free-local static ads, Meta image ads, Facebook statics, HTML→PNG compositions without generative APIs.

## MUST constraints

1. **MUST** load confirmed `brand-dna.md` first. If missing/unconfirmed → **STOP**; run `ad-free-brand-dna` before this one. No ungrounded color/type fallbacks.
2. **MUST** have an approved concept brief (from `ad-free-concept-pipeline` or equivalent). If empty → **STOP**.
3. **MUST** use **`static-code` only** — HTML/CSS (+ optional user/stock photo). **MUST NOT** use `static-ai` or any image-generation API.
4. **MUST NOT** bake critical brand-exact text into a generative model — put it in HTML.
5. **MUST** preserve the reference-image index + roles every iteration (user/stock assets only).
6. **MUST** export target sizes: `1080x1080`, `1080x1350`, `1080x1920` (as briefed).
7. **MUST** respect 9:16 safe zones: top ~250px, bottom ~340px clear of critical UI.
8. **MUST NOT** name living artists; mechanics over mood; apply DNA anti-slop + photography direction.
9. After render → run `ad-free-qa`. Max 2–3 regenerations of the **failing HTML (or asset swap) layer only** — never “fix” by calling an image model.

## Workflow

### 1. Gates (STOP if fail)

```
[ ] brand-dna.md status CONFIRMED
[ ] Concept brief APPROVED (name: Concept_Iteration_Format_Hook)
[ ] Intended copy JSON present (headline/body/cta/legal/price)
[ ] Logo path exists; photo paths are user/stock (or solid-color / graphic-only layout)
[ ] No static-ai / fal / photo-model step planned
```

If any unchecked → **STOP**. Do not invent DNA or briefs.

### 2. Format routing

Load [references/format-routing.md](references/format-routing.md).

| Mode | Pipeline | Status in this pack |
|------|----------|---------------------|
| **`static-code`** | HTML/CSS (+ optional user/stock photo) → Chromium PNG | **ONLY allowed mode** |
| **`static-ai`** | Any generative image API | **FORBIDDEN** |

### 3. Reference images (user / stock)

Build/refresh index (from DNA §9):

| ID | Path | Role | Preserve? |
|----|------|------|-----------|
| … | … | product / lifestyle / logo / style | Y/N |

**Every iteration:** re-attach all `Preserve=Y` refs. Do not drop silently. Do not replace with generated plates.

### 4. Photo layer (optional — never generate)

1. Select user-supplied or licensed stock photo matching DNA photography direction.
2. Leave **negative space** where HTML will place type.
3. If no photo: use brand color field, pattern, or product packshot asset in HTML/CSS.
4. Negatives: no watermark, no extra invented text, no fake UI chrome (unless native-format brief), no fabricated reviews.

### 5. HTML composition layer

1. Start from `assets/template-1x1.html`, `template-4x5.html`, or `template-9x16.html`.
2. Set CSS variables from DNA tokens (`--brand-*`).
3. Place headline, body, CTA, price, legal, logo — exact strings from brief JSON.
4. Set `{{PHOTO_LAYER_URL}}` to user/stock asset or omit/empty for color-only.
5. 9:16: keep critical type inside safe zone (avoid top ~250px / bottom ~340px for essential CTA/logo if UI chrome overlaps).

### 6. Render

Headless Chrome/Puppeteer/Playwright: viewport = exact export size, deviceScaleFactor 1, PNG.

Naming: `{Concept}_{Iteration}_{Format}_{Hook}.png`

Example (Playwright sketch):

```js
// viewport 1080x1350 → page.screenshot({ path, clip: { x:0,y:0,width:1080,height:1350 } })
```

### 7. QA + iterate

Hard fails vs soft scores per `ad-free-qa`. Regenerate **only** failing HTML or swap user/stock asset — **never** call a generative image API. Max 2–3 loops.

Log learnings to project `references/learnings.md`.

## Progressive disclosure (within skill)

- Format routing (forbids static-ai) → `references/format-routing.md`
- HTML stubs → `assets/template-*.html`

## Boundary

Do not use for AI image/video generation that requires fal or similar.
