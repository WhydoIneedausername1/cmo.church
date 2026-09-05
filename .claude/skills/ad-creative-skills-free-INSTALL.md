# Install — Ad Creative Skills Pack (FREE LOCAL)

**No MCP required.** This pack uses free-local tooling only: HTML → headless Chrome, HyperFrames/Remotion local, ffmpeg, optional Kokoro TTS. Do not wire fal, Higgsfield, or other generative MCPs for this pack.

## Claude Code user-wide

```bash
cp -R ad-free-brand-dna ad-free-concept-pipeline ad-free-static ad-free-video ad-free-qa ~/.claude/skills/
```

Restart or reload Claude Code so skill descriptions are picked up for discovery.

## Codex parity

```bash
mkdir -p ~/.agents/skills
cp -R ad-free-brand-dna ad-free-concept-pipeline ad-free-static ad-free-video ad-free-qa ~/.agents/skills/
```

Same folder shape works for both hosts (Agent Skills open standard: `SKILL.md` + `name` / `description` / optional `license`).

## From this repo root

```bash
cd /path/to/ad-creative-skills-free

# Claude Code user-wide
cp -R ad-free-brand-dna ad-free-concept-pipeline ad-free-static ad-free-video ad-free-qa ~/.claude/skills/

# Codex parity
cp -R ad-free-brand-dna ad-free-concept-pipeline ad-free-static ad-free-video ad-free-qa ~/.agents/skills/

# Refresh HyperFrames separately (free local Apache-2.0)
npx skills add heygen-com/hyperframes --full-depth
npx hyperframes skills update
```

## Optional: `npx skills`

If you use the skills CLI for install/sync, prefer it for third-party packs (e.g. HyperFrames). This pack is plain directories — `cp -R` is enough.

## Project-local alternative

Symlink or copy into a repo’s `.claude/skills/` and/or `.agents/skills/` for project-scoped discovery.

## Verify

```bash
ls ~/.claude/skills/ad-free-*/SKILL.md
ls ~/.agents/skills/ad-free-*/SKILL.md
```

## After install

1. Run **ad-free-brand-dna** for the brand → human confirm `brand-dna.md`
2. Run **ad-free-concept-pipeline** → approve briefs
3. Produce with **ad-free-static** and/or **ad-free-video** (Route A only)
4. Gate with **ad-free-qa**

## Free-local tooling notes

| Tool | Notes |
|------|--------|
| Headless Chrome / Puppeteer / Playwright | Render HTML → PNG at exact export sizes |
| HyperFrames | Default Route A; Apache-2.0; refresh with commands above |
| Remotion | Optional Route A for teams **≤3**; seat license required at **4+** |
| ffmpeg | Local concat/export |
| Kokoro TTS | Preferred **local** VO; free |
| ElevenLabs | **OPTIONAL PAID** — never required by this pack |

## What NOT to install for this pack

- fal / Higgsfield / Runway / Replicate / HeyGen cloud MCPs
- Pipeboard Meta/Google ads MCPs (not needed for free-local produce)
- Any skill that routes to Kling, Veo, Seedance, Sora, Nano Banana, GPT Image

Do not use for AI image/video generation that requires fal or similar.
