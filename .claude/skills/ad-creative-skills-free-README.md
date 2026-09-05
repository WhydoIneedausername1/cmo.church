# Ad Creative Skills Pack — FREE LOCAL

Portable Agent Skills for **Claude Code** (`~/.claude/skills/`) and **Codex** (`~/.agents/skills/`) that encode decisions for better ad images and videos — **free local** path only. Skills encode **consistency**, not taste.

**Hard rule: zero paid generative APIs.** No fal, Higgsfield, Nano Banana, GPT Image, Kling, Veo, Seedance, ElevenLabs (required), HeyGen cloud, Runway, Replicate, or Pipeboard. No `static-ai`. No Route B AI animation.

Allowed: Claude Code / Codex LLM (user’s existing plan), HTML/CSS + headless Chrome for PNGs, HyperFrames local (Apache-2.0), Remotion local for teams ≤3, ffmpeg, optional local Kokoro TTS, public-web brand research, screenshot QA with Claude vision.

## Skills

| Skill | Role |
|-------|------|
| `ad-free-brand-dna` | Screenshot → inspect → research → `brand-dna.md` + photography direction for stock/user photos + HTML composition. **Confirm before pixels.** Free local; no generative API. |
| `ad-free-concept-pipeline` | Customer language → angles/hooks → score/kill → briefs + variety matrix. **No generative produce step.** |
| `ad-free-static` | **ONLY `static-code`:** HTML templates + optional user-provided photo/product assets → headless Chrome PNG. Never generate photos. |
| `ad-free-video` | **ONLY Route A:** HyperFrames (default) or Remotion (≤3 people). Local TTS Kokoro preferred. Storyboard gate. |
| `ad-free-qa` | Hard fails vs soft scores for HTML/HyperFrames outputs; layer-only regen (HTML/MG). `qa_check.py`. |

Do not use for AI image/video generation that requires fal or similar.

## How they chain

```
ad-free-brand-dna ──confirm──► ad-free-concept-pipeline ──approve brief──► ad-free-static
                                                              └──────────► ad-free-video
                                                                              │
                                                                              ▼
                                                                        ad-free-qa
                                                                              │
                                                                              ▼
                                                               references/learnings.md
```

**Forced gates:** confirmed Brand DNA and approved BRIEF/storyboard before pixels. Empty inputs → stop (no ungrounded fallbacks). `ad-free-brand-dna` **must run before** static/video skills.

Within each skill, progressive disclosure is **one level deep**: `SKILL.md` → `references/` (and `assets/` / `scripts/`). Critical gates are restated in each producer skill.

## Install

See [INSTALL.md](INSTALL.md). **No MCP required.**

```bash
# Claude Code user-wide
cp -R ad-free-brand-dna ad-free-concept-pipeline ad-free-static ad-free-video ad-free-qa ~/.claude/skills/

# Codex parity
mkdir -p ~/.agents/skills
cp -R ad-free-brand-dna ad-free-concept-pipeline ad-free-static ad-free-video ad-free-qa ~/.agents/skills/
```

### Refresh HyperFrames (optional, free local)

```bash
npx skills add heygen-com/hyperframes --full-depth
npx hyperframes skills update
```

## What is NOT included

- `static-ai` / photo-model / fal / Higgsfield / Nano Banana / GPT Image / Seedream
- Route B AI animation (Kling / Veo / Seedance / Sora)
- Required ElevenLabs, HeyGen cloud, Runway, Replicate
- Pipeboard Meta/Google publish MCPs
- Any path that bills per generative image/video API call

For hybrid paid generative routes, use a separate hybrid pack — this pack stays free-local only.

## Shared quality rules (encoded in skills)

- Mechanics over mood; no living artist names
- Anti-slop: Inter/Roboto/Poppins/Space Grotesk defaults; purple-indigo gradients; cream+`#D97757`; acid-green on black; SaaS hero+3 cards; tracked ALL-CAPS eyebrows; Unlock/Elevate/Seamless; fake 5-stars
- Photographic direction for **stock/user photos** + HTML composition — never generate photos via API
- Negatives: no watermark, no extra invented text, no fake UI chrome unless intentional, no fabricated reviews
- Compliance: Meta AI labels when applicable; no fake testimonials; before/after caution; Advantage+ Image Template off when layout is designed
- Volume with experiment design; log learnings to project `references/learnings.md`

## What NOT to put in skills

- API keys, tokens, cookies, private brand legal opinions presented as fact
- Huge template libraries or font binaries (link or keep in project `brands/`)
- Claude-only `!`command`` syntax (keep portable)
- Living artist names as style prompts
- Cross-skill “call the other skill” as the only place a hard gate lives — restate gates in producer skills
- Taste essays; encode decisions and routing instead
- Paid generative API install one-liners or MCP wiring

## License

MIT (skill frontmatter). Brand assets remain the brand owner’s IP. HyperFrames is Apache-2.0 (separate). Remotion: free for teams ≤3; seat license at 4+.
