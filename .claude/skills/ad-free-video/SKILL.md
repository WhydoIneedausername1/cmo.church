---
name: ad-free-video
description: "Produces Meta/Reels ad videos via free-local Route A only — HyperFrames (default, Apache-2.0) or Remotion for teams of three or fewer. Use when the user asks for free-local ad video, Meta video without generative API, Reels motion graphics, HyperFrames ads, or Remotion social spots. Storyboard approval gate required. Local Kokoro TTS preferred; ElevenLabs is OPTIONAL PAID and never required. Forbids Kling, Veo, Seedance, Sora, and Route B AI animation. Requires confirmed brand-dna.md (ad-free-brand-dna) before render. Do not use for AI image/video generation that requires fal or similar."
license: MIT
---

# Ad Free Video (Route A only)

**Free local** code motion graphics only. Storyboard approval **before** HTML/render. Brand DNA first. **No Route B AI animation. No Kling / Veo / Seedance / Sora.**

## When to use

Free-local ad video, Meta/Reels motion graphics, HyperFrames spots, Remotion social (≤3 people), kinetic type / stats / CTA overlays.

## MUST constraints

1. **MUST** load confirmed `brand-dna.md` first. If missing → **STOP**; run `ad-free-brand-dna`.
2. **MUST** have approved concept brief + **storyboard** before HTML/render. Empty inputs → **STOP**.
3. **MUST** use **Route A only** (HyperFrames default; Remotion if eng team ≤3). Document choice on storyboard.
4. **MUST NOT** use Route B (Kling/Veo/Seedance/Sora/fal/Runway/HeyGen cloud generative video) or Route C that depends on generative hero clips from those APIs.
5. **MUST NOT** present fully synthetic testimonials as “customers.”
6. **MUST** timing defaults: hook ≤3s; scenes 2–5s; hard cuts ~95%; social length **10–15s** unless briefed longer.
7. Prefer refreshed HyperFrames tooling (see [references/hyperframes-local.md](references/hyperframes-local.md)).
8. Prefer **local Kokoro TTS** for VO. If ElevenLabs is mentioned, label **OPTIONAL PAID** — do not require keys or make it the default.
9. Remotion: note **seat license at 4+** people; free-local path assumes teams ≤3.
10. After render → `ad-free-qa`; regenerate failing HyperFrames/Remotion/HTML layer only (max 2–3). Never “fix” with a generative video API.

## Workflow

### 1. Gates

```
[ ] brand-dna.md CONFIRMED
[ ] Concept brief APPROVED
[ ] Storyboard APPROVED (shots, VO/captions, CTA, legal, music bed)
[ ] Proof assets real (no fabricated reviews)
[ ] Route A selected (HyperFrames or Remotion ≤3) — not Kling/Veo/Seedance/Sora
```

STOP if any fail.

### 2. Router — Route A only

| Signal | Route |
|--------|-------|
| Stats, kinetic type, logo stings, marketer-owned variants | **A — HyperFrames** (default) |
| Eng team ≤3, typed props, CI variant matrix | **A — Remotion** (note seat license at 4+) |
| Photoreal AI motion from stills / lip-sync models | **FORBIDDEN** in this pack |

Deep install/refresh: [references/hyperframes-local.md](references/hyperframes-local.md).

### 3. Storyboard (forced planning)

Write shot list before pixels:

| t | Visual | Audio/VO | Caption/CTA | Tool |
|---|--------|----------|-------------|------|
| 0–3s | Hook | Kokoro local (preferred) | | HyperFrames / Remotion |
| … | 2–5s scenes | | | |

**STOP** for human approval.

### 4. Produce (Route A)

1. Prefer HyperFrames for marketers. Refresh if stale:
   - `npx skills add heygen-com/hyperframes --full-depth`
   - `npx hyperframes skills update`
2. Remotion when engineers need typed variant matrices / CI **and** team size ≤3 (else warn about seat license).
3. Tokens from DNA (color, type, logo paths). User/stock stills as static plates only — never animate via Kling/Veo/Seedance.
4. VO: **Kokoro local** preferred. ElevenLabs = **OPTIONAL PAID** — skip unless user explicitly opts in with their own key.
5. Export 1080×1920 (Reels) and/or 1080×1080 as briefed. Use **ffmpeg** locally for concat/audio mix if needed.

### 5. Timing & edit grammar

| Element | Target |
|---------|--------|
| Hook | First **3s** must change visual or claim |
| Scene length | **2–5s** |
| Cuts | ~**95%** hard cuts; dissolves rare |
| Length | Social **10–15s** default |
| CTA | On-screen before final 2s; verbal optional |

### 6. Voice / UGC rules

- Real UGC: permission + disclosure as required.
- No AI avatar / generative talking-head APIs in this pack.
- Meta AI labels: follow current platform disclosure when applicable.

### 7. QA + learnings

Hard fails: wrong size, unreadable captions in safe zones, fabricated social proof, DNA violations. Soft: pacing, hook strength. Log to `references/learnings.md`.

## Explicitly forbidden

Kling, Veo, Seedance, Sora, fal video, Runway gen, HeyGen cloud generative, Replicate video models, Route B AI animation, required ElevenLabs.

## Progressive disclosure (within skill)

- HyperFrames local install/refresh → `references/hyperframes-local.md`

## Boundary

Do not use for AI image/video generation that requires fal or similar.
