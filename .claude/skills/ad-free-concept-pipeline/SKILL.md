---
name: ad-free-concept-pipeline
description: "Mines customer language and produces scored ad concepts for free-local production — angles, hooks, briefs, and a variety matrix (pain/outcome/social-proof/curiosity). Use when the user asks for free-local ad concepts, angles, hooks, creative strategy without generative API, what to test, or weekly creative cadence before ad-free-static / ad-free-video. Outputs named Concept_Iteration_Format_Hook briefs with approval gates. No generative produce step; does not call fal or image/video models. Stops if brand DNA or customer-language sources are missing. Prefer 5–8 concepts/week with 2–3 variants. Do not use for AI image/video generation that requires fal or similar."
license: MIT
---

# Ad Free Concept Pipeline

Research-first concepts for **free local** produce. Encode experiment design, not taste. Volume with variety — not 10 near-duplicates. **No generative produce step.**

## When to use

- “What should we test?”, angles, hooks, creative strategy (free-local path)
- Weekly concept batch before `ad-free-static` / `ad-free-video`
- After confirmed `brand-dna.md` exists (preferred; **STOP** if DNA required and missing)

## MUST constraints

1. **MUST** load confirmed `brand-dna.md` when available; if user wants production-ready briefs and DNA is missing → **STOP** and run `ad-free-brand-dna` first.
2. **MUST** mine real customer language before inventing hooks. If no review/Reddit/comment/support sources → **STOP** — no ungrounded fallback concepts.
3. **MUST** target **5–8 concepts/week** with **2–3 variants** each — not 10 near-clones.
4. **MUST** score and **kill weak** concepts before briefing.
5. **MUST** name assets: `Concept_Iteration_Format_Hook`.
6. **MUST NOT** fabricate reviews or testimonials.
7. **MUST** fill variety matrix — ≥1 per primary quadrant unless user scopes narrower.
8. **STOP** for brief approval before any pixel production.
9. **MUST NOT** include a generative image/video produce step, model hints for fal/Kling/Veo/etc., or `static-ai` routes — hand off only to free-local static/video skills.

## Workflow

### 1. Load brand + offer (gate)

- Read confirmed `brand-dna.md` (voice, banned, legal, photography direction).
- Clarify offer, avatar, funnel stage, geo, platform (Meta default).
- If DNA absent and creatives will be produced next → **STOP**.

### 2. Mine customer language (gate)

Sources (prefer primary): site reviews, G2/Amazon/app stores, Reddit/forums, ad comments, FAQ/objection lists.

If zero sources provided or findable → **STOP**. Do not invent persona copy.

Extract: exact pain/desire phrases, metaphors, objections. Store quotes in brief appendix.

### 3. Draft 5–8 angles

Angle = belief or tension (not a layout). Map each to [references/variety-matrix.md](references/variety-matrix.md).

### 4. Hooks: 3–5 per angle

Tag format fit: static HTML / HyperFrames MG / Remotion MG / carousel. Kill banned-word and Unlock/Elevate/Seamless-class slop.

### 5. Score / kill

Score 1–5: Specificity · Differentiation · Proof path · Format fit · Compliance.

**Kill** average &lt;3 or compliance fail. Keep top concepts only.

### 6. Brief per surviving concept

Use [references/brief-template.md](references/brief-template.md).

Include: angle, primary hook, copy JSON for QA, visual direction (stock/user photo + HTML or Route A MG), proof assets, format/size, DNA constraints, success metric, kill criteria.

**Do not** add generative model produce steps or paid API hints.

### 7. Naming + approval gate

```
{Concept}_{Iteration}_{Format}_{HookTag}
```

Examples: `CheckoutAnxiety_v1_4x5_HookQ` · `StatProof_v1_1x1_Motion`

**STOP** until user approves briefs. Only then hand off to `ad-free-static` and/or `ad-free-video`.

### 8. Learnings loop

After results, append to project `references/learnings.md`: date, concept name, metric, keep/kill, note.

## Cadence

| Cadence | Target |
|---------|--------|
| Concepts / week | 5–8 distinct angles |
| Variants / concept | 2–3 (one axis at a time) |
| Anti-pattern | 10 layouts of the same headline |

## Progressive disclosure (within skill)

- Variety matrix → `references/variety-matrix.md`
- Brief template → `references/brief-template.md`

## Boundary

Do not use for AI image/video generation that requires fal or similar.
