# Replit build prompt — 5,000 Pastor Leads booking + confirmation pages

Paste everything below the line into Replit Agent as one prompt. It builds a
two-page funnel for the 5,000 Pastor Leads offer (a booking/application page →
a call-confirmation page), matching the section-by-section structure and
interactive behavior of a proven direct-response funnel, but written in
CMO.Church's own voice and using this project's existing design system.
Video isn't shot yet, so every video slot is a clearly-marked placeholder.

---

Add two new pages to this project: a **Booking page** and a **Confirmation
page**, for a dedicated 5,000 Pastor Leads ad funnel (separate from the main
`/5000-leads` site page — this is a leaner, single-CTA version meant for paid
traffic). Suggested routes: `/5000-leads/apply` and `/5000-leads/thank-you` —
adjust to match how routing already works in this project.

**Reuse what already exists in this codebase — don't invent a new look.**
Use the existing Tailwind theme tokens (`bg-primary`, `text-primary`,
`bg-accent`, `bg-secondary`, `text-neutral`, etc.), the existing button
component and its variants, the existing heading/body font classes, and the
existing header/footer components. Do not introduce new hex colors or a new
font stack. Make both pages mobile-responsive at the same breakpoints the
rest of the site already uses.

## Global setup

- **Header**: strip it down for a funnel page — logo only (linking to
  `cmo.church`), no nav links, no "Join our Free Skool" button. Keep it
  simple so the only real choice on the page is the CTA. Use the existing
  header component's styling (white background, same logo asset) just with
  the nav items removed.
- **Footer**: reuse the site's existing footer as-is (CMO.Church blurb,
  social icons, Company links, copyright, Privacy Policy / Terms of Service).
- Leave labeled placeholders (comments) for the tracking already on the main
  site: GTM, Meta Pixel, and the OpenAI ads pixel — wire them the same way
  they're wired on the homepage, same IDs, so both pages report to the same
  containers.
- No cookie-consent banner is needed unless the rest of the site already
  shows one — if it does, reuse that component; if not, skip it.

## Page 1 — Booking page (`/5000-leads/apply`)

Top to bottom:

1. **Hero**
   - H1: `Get 5,000 Pastor Leads in 5 Months — Or Get a Refund`
   - Subhead: `If your organization serves pastors, the problem is almost always the same: not enough pastors coming in the top of your funnel. We fix that — and if we fall short of 5,000 leads, we refund you that percentage of our fee.`
2. **Video placeholder** — full-width, responsive 16:9 container
   (`aspect-ratio: 16/9`), styled like a real embed (rounded corners, subtle
   shadow, a centered play-button graphic over a static background) but
   wired to an empty `data-video-src=""` attribute with an HTML comment
   `<!-- video not shot yet — drop hosted video URL here -->`. Don't fake a
   working video player; it should just visually hold the spot.
3. **Primary CTA button**, centered below the video, using the existing
   primary button component: `Book a Call with Our Team` (this is the exact
   CTA copy already used sitewide — keep it consistent). Clicking it opens
   the Application Modal below.
4. **Application Modal** (hidden by default, opened by the CTA):
   - Centered card on desktop (rounded corners, white background, shadow);
     full-screen on mobile (≤768px).
   - Dark semi-transparent backdrop; clicking it or an "x" in the top-right
     closes the modal. Lock body scroll while open.
   - Modal heading: `Complete the short application below, then book a call with our team`
   - A highlighted line under it (soft accent-tinted background, using the
     existing accent token): `If we fall short of 5,000 pastor leads, we refund that percentage of our fee.`
   - An embedded form: `<iframe>` with a placeholder `src` and a comment
     `<!-- swap in your application form / scheduler embed URL here -->`,
     full width, ~500–600px tall, no border, rounded bottom corners to match
     the card, with a brief "Loading…" state until it loads.

## Page 2 — Confirmation page (`/5000-leads/thank-you`)

Top to bottom:

1. **Header**
   - H1: `⚠️ Your Call Is Scheduled — A Few Quick Steps to Lock It In`
   - Subhead: `Watch the short video below and complete these steps to confirm your appointment.`
2. **Video placeholder**
   - Small line above it: `Watch this short video for how to confirm your appointment`
   - Same 16:9 placeholder component as page 1, independent slot.
3. **Steps** (3 short blocks, alternating or stacked, on the existing
   `bg-secondary` section background):
   - **Step 1 — Add it to your calendar.** Headline: `Add your appointment to your calendar below`. Below it, a button `📅 Add to Calendar` (existing secondary/accent button style). Behavior: on click, read `email` and `ics_link` from the current page's URL query params and open `ics_link` in a new tab. This is the one piece of real interactive logic on the page — keep it exactly as described.
   - **Step 2 — Confirm by text.** Headline: `We'll text you within 10 minutes to confirm your appointment — reply to lock it in.` *(Note: only include this step if CMO.Church actually follows up by text; otherwise cut it or swap for however confirmation really works — e.g. "We'll follow up by email to confirm.")*
   - **Step 3 — Know what to expect.** Headline: `Watch the video below to see what we'll cover on the call and how we can help you get to 5,000 pastor leads.` (pairs with the video slot above, or add a second placeholder video slot here if you'd rather match the original 3-video layout.)
4. **Callout box** (bordered/tinted notice):
   - Heading: `A quick heads-up about your calendar invite`
   - Body: `You may see an email from Google titled "Invitation from an unknown sender." That's a known Google Calendar bug, not spam — select "Yes" to confirm attendance and it'll stay on your calendar.`
5. **Proof section** — reuse what's already on the homepage rather than inventing new testimonials (CMO.Church doesn't have the volume of client quotes the reference funnel had, so this section stays much shorter):
   - Heading: `What this looks like in practice`
   - The same 3 stat tiles used on the homepage: `214% — Email List Growth` (grew a leadership podcast from 70K to 220K subscribers), `8x — YouTube Channel Growth`, `$1.50 — Cost Per Lead`.
   - Below that, heading `Trusted By Leading Organizations` with the same logo row already used on the homepage (Carey Nieuwhof, Leadership Pathway, Art of Leadership, Thea Brook) — static grid, not a scrolling marquee, matching how it's already built on the homepage.
   - A short founder line, reusing the homepage bio: `Dillon Smith has helped church-facing organizations grow email lists from 70K to 220K+ subscribers, lower cost per lead, and 8x YouTube channels — working with organizations like Life.Church and Carey Nieuwhof.`
6. **Fine print** (small, muted text): `Results depend on your lead magnet, audience, and ad spend. Guarantee terms are covered on your call.`

## Notes for the build

- Keep the copy above close to verbatim — it's deliberately short and plain
  (pulled from CMO.Church's own site language), not written to sound
  "salesy" or AI-generated. Don't embellish it further; the user will edit
  it by hand afterward.
- Both pages should feel like they belong to cmo.church — same fonts,
  same color tokens, same button/card components — just with a stripped
  header and a single-minded CTA path, the way a dedicated ad-funnel page
  should.
- The three pieces of real functionality to get right: the video containers
  (placeholders now, swappable later), the CTA → modal → iframe form flow,
  and the "Add to Calendar" button's `ics_link`/`email` query-param logic.
  Everything else is layout and copy.
