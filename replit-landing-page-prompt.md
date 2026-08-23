# Replit build prompt — Booking + Confirmation landing pages

Paste everything below the line into Replit Agent as one prompt. It rebuilds the
two-page funnel (video/booking page → call confirmation page) with the exact
structure, sections, copy, and interactive behavior of the reference pages,
using placeholder brand tokens so colors/video/logo can be swapped in later.

---

Build a two-page marketing funnel: a **Booking page** (`/`) and a **Confirmation
page** (`/thank-you`). Match the structure, section order, copy, and interactive
behavior described below exactly. Use plain HTML/CSS/JS (or React if you prefer,
but keep it a static-friendly build with no backend requirement). Make everything
mobile-responsive with a breakpoint at 768px.

## Global setup

- Define all colors as CSS custom properties in `:root` so the palette can be
  swapped in one place later:
  ```css
  :root {
    --brand-primary: #ff8a12;       /* gradient top of main CTA button */
    --brand-primary-dark: #e87600;  /* gradient bottom / hover of main CTA */
    --brand-secondary: #e43b2c;     /* gradient top of secondary/red button */
    --brand-secondary-dark: #cd291a;/* gradient bottom / hover of secondary button */
    --brand-accent: #5ea975;        /* gradient top of tertiary/green button */
    --brand-accent-dark: #4e8e62;   /* gradient bottom / hover of tertiary button */
    --text-dark: #2d2d2d;
    --text-body: #454545;
    --highlight-bg: rgba(255, 35, 6, 0.16); /* soft red highlight behind emphasis text */
    --section-alt-bg: #e7e7e7; /* light gray background used behind step blocks */
  }
  ```
  Buttons use a top-to-bottom gradient from the light shade to the dark shade of
  their color, rounded corners (~8px), bold white text, and a subtle darken-on-hover.
- Fonts: use **Poppins** (headlines/step numbers) and **Inter** (body/UI text) from
  Google Fonts as stand-ins for the original's Proxima Nova / Droid Sans / DM Sans /
  Open Sans mix — swap for licensed fonts later if desired.
- Add a global nav bar (sticky top, white background, subtle shadow) with a logo
  placeholder on the left and this text nav on the right:
  `Home | Our Process | Success Stories | Blog`
- Add a global footer (dark or light band, centered, small text) with, in order:
  - Repeated nav line: `Home | Our Process | Success Stories | Blog`
  - Legal line: `Privacy Policy | Terms of Service | DMCA | Full Disclosure | *Refund Guarantee` (each a separate placeholder link)
  - `Copyright © 2026 [Your Company]. All rights reserved.`
  - Small print: `This website is operated and maintained by [Your Company]. Use of the website is governed by its Terms Of Service and Privacy Policy.`
- Add a **cookie-consent banner**: fixed to the bottom of the viewport, dismissible
  with an "x", copy:
  > By using this site, you agree to the storage of cookies on your device for
  > enhanced navigation, site analysis, and [Your Company]'s marketing. Data
  > sharing with social media platforms might occur based on the privacy choices
  > you make on those platforms. For specifics, see our **Privacy Policy**.
  Persist the dismissal in `localStorage` so it doesn't reappear once closed.
- Leave clearly-labeled placeholders (HTML comments) for analytics: Google Tag
  Manager container snippet, Meta/Facebook Pixel, and Microsoft Clarity — no real
  IDs needed yet.

## Page 1 — Booking page (`/`)

Section order, top to bottom:

1. **Hero**
   - H1: `Give Us 7 Days, And We'll Place A Proven Appointment Setter Or Closer Into Your Coaching Or Agency Business.`
   - Subhead directly below: `If They Don't Book 40 Sales Calls In The First Month - You Don't Pay!*`
2. **Video block** — a full-width, responsive 16:9 video player container
   (`padding-top: 56.25%` trick or `aspect-ratio: 16/9`). Use an HTML5 `<video>`
   tag with a placeholder poster image and a `data-video-src` attribute so a real
   hosted video URL can be dropped in later. This stands in for the original's
   Vidalytics embed.
3. **Primary CTA button**, centered below the video, large, orange gradient
   (`--brand-primary` → `--brand-primary-dark`), text: `Schedule Demo` (placeholder
   — swap for your own CTA copy later if desired). Clicking it opens the
   **Application Modal** described below.
4. **Application Modal** (hidden by default, opened by the CTA button):
   - Centered card on desktop (max-width ~1400px, rounded corners, white
     background, drop shadow); on screens ≤768px it goes **fullscreen** instead
     of a centered card.
   - Semi-transparent dark backdrop (`rgba(15,23,42,0.55)`) behind the card;
     clicking the backdrop or an "x" close button (top-right) closes the modal.
   - Modal heading (centered, bold, dark red/charcoal text):
     `Complete The Short Application Below (45-Secs), Then Book Your 100% Free Demo Call`
   - Below it, a highlighted callout line (soft red background using
     `--highlight-bg`): `If Our Sales Reps Don't Perform - You Don't Pay!`
   - Below that, an embedded application form: use an `<iframe>` pointing to a
     placeholder form URL (e.g. `data-form-src="ABOUT:BLANK"` with a comment
     `<!-- swap in your form/scheduling embed URL here -->`), full width, ~450–600px
     tall, no border, rounded bottom corners to match the card.
   - Show a "Loading…" overlay over the iframe area until it finishes loading.
   - Lock body scroll while the modal is open; restore it on close.

## Page 2 — Confirmation page (`/thank-you`)

Section order, top to bottom:

1. **Header**
   - H1: `⚠️ Important. Your Call Is Tentatively Scheduled! ⚠️`
   - Subhead: `Watch The Video Below And Complete A Few Steps To Confirm Your Appointment`
2. **Video block**
   - Small heading above the video: `Watch This 2 Minute Video Below For How To Confirm Your Appointment`
   - Line below/above the player: `Headphones In And Sound Up For Best Experience`
   - Same responsive 16:9 placeholder `<video>` component as page 1 (second,
     independent video slot).
3. **3-step instructions**, each step as its own block (alternating or stacked,
   light gray background `--section-alt-bg`, with a placeholder graphic/icon on
   one side and text on the other):
   - **Step 1:** `Add Your Appointment To Your Calendar Below 👇`
     - Below it, a button: `📅 Add The Event To Your Calendar` (styled with
       `--brand-secondary`/`--brand-secondary-dark`, rounded, white bold text).
     - Behavior: on click, read `email` and `ics_link` query parameters from the
       current page URL, and open the `ics_link` value in a new tab
       (`window.open`). This lets the calendar-file link be personalized per
       visitor via the URL the booking step redirects to.
   - **Step 2:** `Please Confirm Your Appointment Via Text (We'll Be Texting You Within 10 Minutes!)`
   - **Step 3:** `Watch The Video Below To See The Agenda For Our Call, What Our Company Does, And How We Can Help!`
     (pairs with the video block above, or repeat a second video slot here if you
     prefer matching the original's layout).
4. **Callout box** — bordered/tinted notice box:
   - Heading: `This Google Update Could Affect Your Appointment`
   - Body: `You may also notice an email from Google titled "Invitation from an unknown sender". This is due to a recent Google Calendar update that has a slight technical bug. If you see this email, please select "Yes" to confirm you're attending — this ensures your appointment stays on your calendar.`
5. **Testimonials section**
   - Heading: `Review Client Case Studies`
   - A responsive grid/carousel of testimonial cards. Each card: a short bolded
     pull-quote line, the full quote paragraph below it, and the person's name
     under the quote. Use these verbatim:
     1. Pull-quote: `"...I was consistently doing $129k–$139k months"` — Full quote: `"When I joined STA, I was stuck at ~$70k/month and thought that was my ceiling. Within a year, I was consistently doing $129k–$139k months and have never dipped below six figures since."` — Name: **O'Neil Luscombe**
     2. Pull-quote: `"...I had my first $70k month while still in high school"` — Full quote: `"When I joined STA, I was stuck at $10k a month and thought that was my cap. Within 60 days, I had my first $70k month while still in high school, running everything solo."` — Name: **Oliver Khan**
     3. Pull-quote: `"I went from broke to doing $200k months..."` — Full quote: `"I went from broke to doing $200k months in my fitness coaching business. Before Closers.io, I was stuck with inconsistent sales and a team that lacked structure. Once I got in, I learned how to actually manage a sales team, run daily meetings, and install proven objection-handling frameworks."` — Name: **Matt Priess**
     4. Pull-quote: `"...Grew from zero to over $4 million in revenue."` — Full quote: `"When I joined Closers.io in January 2023, I had almost no sales calendar. Within weeks, a single piece of content had me booking 5–6 calls a day for months straight, and I quickly found myself overwhelmed but growing."` — Name: **Sarah Gibson**
     5. Pull-quote: `"...We've scaled from about 1.5 million to a 4 to 5 million..."` — Full quote: `"Our first paid campaign spent 5 to 6 thousand dollars and brought in zero leads. We changed one thing, kept the spend the same, and hit roughly a 16 to 18x return on ad spend within 30 days."` — Name: **Aaron Platt**
     6. Pull-quote: `"Today we're doing ~$424k/month @ 7–8x ROAS."` — Full quote: `"When we joined Closers.io, we were $850,000 in business debt. Within the first 11 days, we did $92,000 in revenue (on $1,800 ad spend). I took a few hundred calls, fixed my sales process, raised prices..."` — Name: **Zarar Ameen**
     7. Pull-quote: `"We scaled from just over $1M to nearly $5M a year."` — Full quote: `"When we first joined Closers.io, we were just over $1 million a year and thought of them as 'the sales people.' What we discovered was way more. They didn't just place setters and closers, they helped us build the whole system."` — Name: **Gab and Brian Bosche**
     8. Pull-quote: `"...we're doing 250 to 300k cash-collected months"` — Full quote: `"When I joined, I was at about 100k a month with one DM setter and me taking every sales call. After tightening my sales with daily call reviews and installing a triage-plus-closer team, we're doing 250 to 300k cash-collected months."` — Name: **Daniel Contreras**
     9. Pull-quote: `"Ten months later, we're at $250,000 in monthly revenue"` — Full quote: `"When I joined Closers.io, I was terrified to invest in myself. I was doing about $33k cash collected a month and thought that was my ceiling. Ten months later, we're at $250,000 in monthly revenue."` — Name: **Jacob Mclaughlin**
6. **Earnings disclaimer**
   - Heading: `IMPORTANT: Earnings and Results Disclaimer`
   - Body: `*The results you see on this page are not typical; [Your Company] and its clients are professional marketers/operators. Their experiences do not guarantee similar results. Individual results may vary based on your effort, market, and other factors.`
7. **Logo strip / social proof**
   - Heading: `Trusted By Brands Like`
   - An **infinite auto-scrolling marquee** of client logo/testimonial images,
     scrolling continuously right-to-left, pausing on hover, looping seamlessly
     (duplicate the logo set back-to-back in the DOM so the scroll never shows a
     gap). Use placeholder logo images.

## Notes for the build

- Keep every piece of copy above **verbatim** — that's intentional per the current
  brand voice; colors, fonts, video sources, and logos are the only things meant
  to be swapped later via the CSS variables / placeholder attributes.
- Both pages share the same nav, footer, and cookie-consent components — build
  them once and reuse.
- The video containers, the modal's iframe container, and the "Add To Calendar"
  button's `ics_link`/`email` query-param logic are the three pieces of real
  interactive functionality to get right; everything else is layout and copy.
