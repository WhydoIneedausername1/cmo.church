---
name: ad-free-qa
description: "Reviews free-local ad images and videos against hard fails and soft scores — dimensions, copy fidelity, anti-slop, Meta compliance, brand DNA for HTML and HyperFrames/Remotion outputs. Use when the user asks to QA free-local ads, review HTML Chrome PNGs, critique HyperFrames spots, or run an anti-slop check without generative API. Screenshot critique with Claude vision; regenerate only failing HTML/HyperFrames layers — never fix by calling fal or image/video models. Stops if intended copy JSON or brand DNA is missing when those checks are required. Do not use for AI image/video generation that requires fal or similar."
license: MIT
---

# Ad Free Creative QA

Hard fails vs soft scores for **free local** HTML / HyperFrames / Remotion outputs. Critique → fix **failing layer only** → recheck. Max **2–3** regenerations. **No model generation to fix.**

## When to use

QA free-local ads, review HTML→PNG creatives, critique HyperFrames/Remotion videos, anti-slop check, pre-upload compliance pass.

## MUST constraints

1. **MUST** separate **hard fails** (block ship) from **soft scores** (improve if time).
2. **MUST** regenerate only the failing layer (**HTML** XOR **HyperFrames/Remotion MG** XOR **user/stock asset swap**) — not the whole stack.
3. **MUST NOT** “fix” defects by calling fal, Nano Banana, GPT Image, Kling, Veo, Seedance, or any generative API.
4. **MUST** cap critique loops at **2–3**; then escalate to human with notes.
5. If copy-diff requested and intended copy JSON missing → **STOP** (no guessed copy).
6. If brand checks requested and `brand-dna.md` missing → **STOP**.
7. **MUST NOT** approve fabricated testimonials, garbled brand text, or default AI-slop clusters.

## Workflow

### 1. Collect artifacts

- Final PNG/MP4 paths + size intent
- Intended copy JSON (from brief)
- Confirmed `brand-dna.md`
- Route used (`ad-free-static` static-code / `ad-free-video` Route A)

### 2. Automated checks

Run [scripts/qa_check.py](scripts/qa_check.py):

```bash
python scripts/qa_check.py --image path.png --expect-w 1080 --expect-h 1350 \
  --copy intended.json --ocr-text optional_ocr.txt
```

Checks: dimensions; optional contrast placeholder; text-diff vs intended copy when OCR/extracted text provided.

### 3. Rubric pass

Load [references/qa-rubric.md](references/qa-rubric.md). Mark each hard fail Y/N.

### 4. Anti-slop pass

Load [references/anti-slop.md](references/anti-slop.md). Any cluster hit without brand-true exception → hard fail or mandatory rework.

### 5. Compliance pass

Load [references/compliance-meta.md](references/compliance-meta.md).

### 6. Screenshot critique loop (Claude vision OK)

1. Screenshot/frame grab failing regions.
2. State defect + layer owner (**HTML** / **HyperFrames|Remotion** / **user-stock asset**).
3. Fix that layer only — edit HTML, re-render MG, or swap user/stock photo. **Never** generate a replacement image/video via API.
4. Re-run checks. Stop at 3 attempts → human decision.

### 7. Ship / kill / iterate

Record to project `references/learnings.md`: name, fails hit, keep/kill, note.

## Progressive disclosure (within skill)

- Rubric → `references/qa-rubric.md`
- Anti-slop → `references/anti-slop.md`
- Meta compliance → `references/compliance-meta.md`
- Script → `scripts/qa_check.py`

## Boundary

Do not use for AI image/video generation that requires fal or similar.
