# QA Rubric — Free Local Ads

## TOC

1. Hard fails (block ship)
2. Soft scores (1–5)
3. Layer ownership (no generative fix)
4. Video-only checks (Route A)
5. Pass record template

## 1. Hard fails (block ship)

| ID | Fail if |
|----|---------|
| H1 | Wrong dimensions / aspect vs brief |
| H2 | Critical text differs from intended copy JSON (headline/CTA/price/legal) |
| H3 | Logo missing, wrong variant, or distorted |
| H4 | Legal/qualifier missing when DNA requires it |
| H5 | Fabricated testimonial, review stars, or fake UI ratings |
| H6 | Unreadable type (contrast, size, overlap with faces/product label) |
| H7 | 9:16 critical CTA/logo trapped in unsafe top~250 / bottom~340 bands |
| H8 | Anti-slop cluster present without brand-true exception |
| H9 | Watermark / extra invented text in brand layer |
| H10 | Synthetic person presented as real customer |
| H11 | Produce path used forbidden generative API (`static-ai`, Kling, Veo, etc.) |

Any hard fail → do not upload.

## 2. Soft scores (1–5)

| ID | Criterion |
|----|-----------|
| S1 | Hook clarity (first glance / first 3s) |
| S2 | Brand DNA fidelity (color/type/photo) |
| S3 | Offer comprehension speed |
| S4 | Feed-native realism (if photoreal user/stock brief) |
| S5 | Distinct vs last week’s winners |
| S6 | Safe whitespace / composition calm |

Ship soft-average ≥3.5 unless testing a deliberate ugly/native disruption brief.

## 3. Layer ownership (no generative fix)

| Symptom | Fix layer |
|---------|-----------|
| Bad crop / wrong stock mood | Swap **user/stock** asset |
| Wrong headline kerning / CTA | **HTML** re-render |
| Stat animation wrong number | **HyperFrames / Remotion** |
| VO wrong line | **Kokoro (or opted-in TTS)** regen only |
| Soft / blurry generative look from forbidden API | **Hard fail H11** — rebuild on free-local path |

**Never:** call fal / image / video models to patch a fail.

## 4. Video-only checks (Route A)

- Hook by 3s; scenes 2–5s; mostly hard cuts; length 10–15s social default
- Captions accurate vs VO
- Audio levels not clipping; music not burying VO
- End card CTA readable
- Tool is HyperFrames or Remotion — not Kling/Veo/Seedance/Sora

## 5. Pass record template

```
Name: Concept_Iteration_Format_Hook
Hard fails: none / [IDs]
Soft: S1=_ S2=_ …
Decision: SHIP / ITERATE / KILL
Layer fixed: HTML | HyperFrames | Remotion | user-stock
Attempts: _
Generative API used: NO
```
