# HyperFrames — Free Local (Route A)

## TOC

1. What this is
2. Install / refresh
3. Remotion alternative (≤3)
4. Local TTS
5. ffmpeg
6. Forbidden models
7. Timing defaults

## 1. What this is

**HyperFrames** (HeyGen open tooling, **Apache-2.0**) is the default **free local** Route A motion-graphics path for this pack: brand-exact captions, stats, lower-thirds, logo animation, CTA end cards.

No paid generative video API is required. Agent authorship via HyperFrames skills + local render.

## 2. Install / refresh

```bash
npx skills add heygen-com/hyperframes --full-depth
npx hyperframes skills update
```

Run these when HyperFrames skills look stale or missing. Keep this pack’s `ad-free-video` skill; HyperFrames skills provide render/authoring details.

**Own in HyperFrames:** captions, prices, legal, CTA, logo, chart/stat callouts.  
**Avoid:** pretending code MG is documentary UGC.

## 3. Remotion alternative (teams ≤3)

```bash
npx skills add remotion-dev/skills
```

Use Remotion when the team already uses React + typed props / CI renders.

**License note:** Remotion is free for teams of **≤3**. At **4+** people a seat license is required — warn the user; do not silently assume commercial Remotion is free.

Practitioner split: Remotion if eng + typed props; HyperFrames if HTML drop-in + agent authorship + Apache-2.0.

## 4. Local TTS

| Option | Status |
|--------|--------|
| **Kokoro** (local) | **Preferred** — free local VO |
| **ElevenLabs** | **OPTIONAL PAID** — never require; only if user explicitly opts in with their own billing |
| Silent / music bed only | OK when brief allows |

Do not block production on ElevenLabs keys.

## 5. ffmpeg (local)

Typical free-local graph:

1. Render HyperFrames/Remotion plate(s) at target size
2. Scale/pad to 1080×1920 or 1080×1080
3. Mix Kokoro VO + music bed (verify delivery loudness)
4. Export H.264 + AAC with local `ffmpeg`

No cloud render farm required for this pack.

## 6. Forbidden models (do not route)

Explicitly **forbid**:

- **Kling** (any version)
- **Veo** (any version)
- **Seedance** (any version)
- **Sora** (deprecated / do not use)
- fal / Runway / Replicate / HeyGen **cloud** generative video as a produce step

If a user asks for AI animation from stills → **STOP** and offer Route A kinetic/type/demo with user footage or static plates, or refuse the generative path.

## 7. Timing defaults

| Element | Target |
|---------|--------|
| Hook | ≤ **3s** |
| Scenes | **2–5s** |
| Social length | **10–15s** |
| Cuts | ~95% hard cuts |
