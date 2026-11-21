// Builds the Insurmountable static ads (13 formats x 2) as 1080x1350 PNGs.
// Run: node insurmountable-ads/build.mjs   (needs Playwright; uses Google Fonts)
import { createRequire } from "module";
const { chromium } = createRequire(import.meta.url)("playwright");
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(DIR, "png");
const HTML = path.join(DIR, "html");
const A = "../assets/";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Caveat:wght@500;700&family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
:root{--ink:#1e1e1e;--char:#242424;--char2:#2f2f2f;--paper:#f4f1ec;--stone:#7c7670;--line:#d9d3ca;--or:#E8914A;--or-d:#c9742f;--white:#fff}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px;overflow:hidden}
body{font-family:Poppins,sans-serif;color:var(--ink);background:var(--paper);-webkit-font-smoothing:antialiased}
.ad{position:relative;width:1080px;height:1350px;padding:72px;display:flex;flex-direction:column}
.dark{background:var(--char);color:#fff}
.orange{background:var(--or);color:var(--ink)}
.paper{background:var(--paper)}
.top{display:flex;justify-content:space-between;align-items:center}
.logo{height:40px}
.kicker{font:700 24px/1 Poppins;letter-spacing:.14em;text-transform:uppercase;color:var(--or)}
.dark .kicker{color:var(--or)} .orange .kicker{color:var(--ink)}
h1{font:800 96px/1.04 Poppins;letter-spacing:-.025em}
h2{font:700 64px/1.1 Poppins;letter-spacing:-.02em}
.sub{font:400 36px/1.4 Poppins;opacity:.85}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;gap:24px}
.foot .meta{font:500 26px/1.35 Poppins;opacity:.75}
.foot .meta b{display:block;font-weight:700;opacity:1}
.btn{background:var(--or);color:#fff;font:700 30px/1 Poppins;padding:28px 40px;border-radius:999px;white-space:nowrap}
.orange .btn{background:var(--ink);color:#fff}
.paper .btn{background:var(--ink);color:#fff}
.btn.orbtn{background:var(--or)}
.chip{display:inline-block;font:600 24px/1 Poppins;padding:14px 22px;border-radius:999px;border:2px solid currentColor;margin-right:12px}
.ph{border:4px dashed var(--or);border-radius:24px;display:flex;align-items:center;justify-content:center;text-align:center;font:600 30px/1.35 Poppins;color:var(--or);padding:40px;background:rgba(232,145,74,.07)}
.tpl{position:absolute;right:72px;bottom:24px;font:600 18px/1 Poppins;letter-spacing:.12em;text-transform:uppercase;opacity:.5}
.br{color:var(--or)}
`;

const foot = (cta = "Get it free →", extra = "") => `
<div class="foot"><div class="meta"><b>Insurmountable</b>by John Ortberg · Free audiobook, email &amp; PDF${extra}</div><div class="btn">${cta}</div></div>`;
const logo = (dark) => `<img class="logo" src="${A}${dark ? "BN_Retina.png" : "BN_Retina_Dark.png"}">`;

const ads = [
  // 01 Strong headline, plain background
  { id: "01a_headline_plain", fmt: "Strong headline on a plain background", html: `
<div class="ad dark"><div class="top">${logo(1)}<span class="kicker">Free book</span></div>
<div style="margin-top:auto">
<h1>The best book on the greatest sermon ever preached.</h1>
<p class="sub" style="margin-top:36px">John Ortberg on Jesus' Sermon on the Mount. Yours free as an audiobook, PDF and email.</p></div>
<div style="height:90px"></div>${foot()}</div>` },
  { id: "01b_headline_plain", fmt: "Strong headline on a plain background", html: `
<div class="ad orange"><div class="top">${logo(0)}<span class="kicker">Free audiobook</span></div>
<div style="margin-top:auto">
<h1 style="font-size:108px">Three chapters of Matthew. A lifetime to live them.</h1>
<p class="sub" style="margin-top:36px">Insurmountable walks through the Sermon on the Mount, line by line.</p></div>
<div style="height:90px"></div>${foot()}</div>` },

  // 02 Strong headline with the founder
  { id: "02a_founder_headline", fmt: "Strong headline with the founder", html: `
<div class="ad dark" style="padding-right:0">
<div class="top" style="padding-right:72px">${logo(1)}<span class="kicker">Free book</span></div>
<div style="display:flex;gap:40px;margin-top:48px;flex:1">
<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:20px">
<h2 style="font-size:70px">The best book on the greatest sermon ever preached.</h2>
<p class="sub" style="font-size:30px;margin-top:28px">John Ortberg, author of <i>Insurmountable</i></p></div>
<div class="ph" style="width:440px;border-radius:24px 0 0 24px;border-right:none">[Real photo of John Ortberg: chest up, looking at camera, natural light. Background removed.]</div>
</div><div style="height:56px"></div><div style="padding-right:72px">${foot()}</div></div>` },
  { id: "02b_founder_headline", fmt: "Strong headline with the founder", html: `
<div class="ad paper">
<div class="top">${logo(0)}<span class="kicker">From John Ortberg</span></div>
<div class="ph" style="height:560px;margin-top:48px">[Real photo of John Ortberg holding Insurmountable, or teaching. Wide crop.]</div>
<h2 style="margin-top:56px;font-size:72px">Jesus' greatest sermon can feel insurmountable. That's the point.</h2>
<p class="sub" style="font-size:30px;margin-top:20px">John Ortberg · author and teacher, Become New</p>
${foot()}</div>` },

  // 03 Show the lead magnet
  { id: "03a_show_lead_magnet", fmt: "Show the lead magnet", html: `
<div class="ad paper" style="background:#ebe7e1">
<div class="top">${logo(0)}<span class="kicker">Free</span></div>
<h2 style="margin-top:44px;font-size:68px">Listen on the drive. Read the PDF. Or get it by email.</h2>
<div style="position:relative;flex:1;margin-top:10px">
<img src="${A}book-mockup.png" style="position:absolute;left:-40px;top:-10px;width:720px">
<div style="position:absolute;right:0;top:70px;display:flex;flex-direction:column;gap:22px;width:330px">
${[["Audiobook", "The whole book, read aloud"], ["PDF", "Download and read anywhere"], ["Email", "Delivered to your inbox"]].map(([a, b]) => `<div style="background:#fff;border-radius:20px;padding:26px 28px;box-shadow:0 8px 24px rgba(0,0,0,.08)"><div style="font:700 34px/1.1 Poppins">${a}</div><div style="font:400 24px/1.35 Poppins;color:var(--stone);margin-top:6px">${b}</div></div>`).join("")}
</div></div>${foot("Get all three free →")}</div>` },
  { id: "03b_show_lead_magnet", fmt: "Show the lead magnet", html: `
<div class="ad dark">
<div class="top">${logo(1)}<span class="kicker">What's inside</span></div>
<div style="display:flex;gap:56px;margin-top:56px;align-items:flex-start">
<img src="${A}cover-flat.jpg" style="width:380px;border-radius:6px;box-shadow:0 24px 60px rgba(0,0,0,.5);transform:rotate(-3deg);margin-top:20px">
<div style="flex:1">
<h2 style="font-size:54px">All of <span style="white-space:nowrap">Matthew 5–7</span>, line by line.</h2>
<div style="margin-top:28px;font:400 28px/1.3 Poppins">
${[["5:1–12", "The Beatitudes"], ["5:13–16", "Salt and light"], ["5:21–48", "Anger, desire, enemies"], ["6:5–15", "The Lord's Prayer"], ["6:25–34", "Do not worry"], ["7:1–5", "Judging others"], ["7:24–27", "The wise builder"]].map(([r, t]) => `<div style="display:flex;gap:18px;padding:14px 0;border-bottom:1px solid #444"><span style="color:var(--or);font-weight:600;width:130px;flex:none">${r}</span><span>${t}</span></div>`).join("")}
</div><p class="sub" style="font-size:28px;margin-top:30px">John Ortberg takes each section slowly, and shows how Jesus meant it to be lived.</p></div></div>
${foot()}</div>` },

  // 04 Quote with a result (TEMPLATES: real, permissioned quotes only)
  { id: "04a_quote_result_TEMPLATE", fmt: "Reader quote with a result (template)", html: `
<div class="ad dark"><div class="top">${logo(1)}<span class="kicker">From a reader</span></div>
<div style="margin-top:auto">
<div style="font:800 180px/0.6 Poppins;color:var(--or)">“</div>
<h2 style="font-size:66px;margin-top:10px"><span class="br">[I've read the Sermon on the Mount for [20] years.]</span> This is the first time <span class="br">[one specific thing]</span> made sense.</h2>
<p class="sub" style="margin-top:36px;font-size:30px"><b>[First name, last initial]</b> · <span class="br">[City, ST]</span> · listened to the audiobook</p></div>
<div style="height:80px"></div>${foot()}<div class="tpl">Template · real words only</div></div>` },
  { id: "04b_quote_result_TEMPLATE", fmt: "Reader quote with a result (template)", html: `
<div class="ad paper"><div class="top">${logo(0)}<span class="kicker">From a reader</span></div>
<div style="display:flex;gap:44px;margin-top:auto;align-items:center">
<div class="ph" style="width:300px;height:300px;border-radius:50%;flex:none;font-size:24px;padding:30px">[Real photo, with permission]</div>
<div><h2 style="font-size:58px">“I listened to <span class="br">[one chapter]</span> on my commute and <span class="br">[what changed that week]</span>.”</h2></div></div>
<p class="sub" style="margin-top:36px;font-size:30px"><b>[Name]</b> · [City, ST]</p>
<div style="height:80px"></div>${foot()}<div class="tpl">Template · real words only</div></div>` },

  // 05 Social proof
  { id: "05a_social_proof_TEMPLATE", fmt: "Social proof (template)", html: `
<div class="ad dark"><div class="top">${logo(1)}<span class="kicker">Join them</span></div>
<div style="margin-top:auto">
<div style="font:800 170px/1 Poppins;letter-spacing:-.04em;color:var(--or)">[XX,000]</div>
<h2 style="font-size:64px;margin-top:10px">people start their weekday with John Ortberg and Become New.</h2>
<p class="sub" style="margin-top:30px">Start with his book on the Sermon on the Mount. It's free.</p></div>
<div style="height:80px"></div>${foot()}<div class="tpl">Template · use the real subscriber count</div></div>` },
  { id: "05b_social_proof_TEMPLATE", fmt: "Social proof (template)", html: `
<div class="ad paper"><div class="top">${logo(0)}<span class="kicker">Free this month</span></div>
<div style="display:flex;align-items:center;gap:20px;margin-top:60px">
<img src="${A}book-mockup.png" style="width:470px;margin-left:-40px;flex:none">
<div><div style="font:800 104px/1 Poppins;letter-spacing:-.04em;color:var(--or)">[X,XXX]</div>
<div style="font:700 46px/1.15 Poppins;margin-top:10px">people have downloaded <i>Insurmountable</i> <span class="br">[since date]</span>.</div></div></div>
<div style="display:flex;gap:14px;margin-top:40px">${[1, 2, 3, 4, 5].map(() => `<div class="ph" style="width:120px;height:120px;border-radius:50%;padding:0;font-size:16px">[photo]</div>`).join("")}<div style="align-self:center;font:500 26px/1.3 Poppins;color:var(--stone);margin-left:12px">Real readers,<br>with permission</div></div>
${foot()}<div class="tpl">Template · use the real download count</div></div>` },

  // 06 Specific pain headline
  { id: "06a_pain_headline", fmt: "Specific pain headline", html: `
<div class="ad dark"><div class="top">${logo(1)}<span class="kicker">Matthew 6:25–34</span></div>
<div style="margin-top:auto">
<h1 style="font-size:120px">“Do not worry.”</h1>
<h2 style="font-size:64px;margin-top:24px;color:#bdb7b0">Easier said than done.</h2>
<p class="sub" style="margin-top:40px">Jesus said more about it than one verse. John Ortberg's <i>Insurmountable</i> walks through all of it.</p></div>
<div style="height:80px"></div>${foot()}</div>` },
  { id: "06b_pain_headline", fmt: "Specific pain headline", html: `
<div class="ad orange"><div class="top">${logo(0)}<span class="kicker">Matthew 5–7</span></div>
<div style="margin-top:auto">
<h2 style="font-size:66px;line-height:1.2">Turn the other cheek.<br>Go the extra mile.<br>Love your enemies.</h2>
<h1 style="font-size:96px;margin-top:30px">Who actually lives like this?</h1>
<p class="sub" style="margin-top:36px">A free book on the sermon that feels insurmountable, and how Jesus meant it to be lived.</p></div>
<div style="height:70px"></div>${foot()}</div>` },

  // 07 Checklist: steal this
  { id: "07a_checklist", fmt: "Checklist: steal this", html: `
<div class="ad dark"><div class="top">${logo(1)}<span class="kicker">Free reading plan</span></div>
<h2 style="margin-top:44px;font-size:66px">Steal this: 7 days in the Sermon on the Mount.</h2>
<div style="background:#fff;color:var(--ink);border-radius:20px;padding:36px 44px;margin-top:40px;transform:rotate(-1deg);box-shadow:0 20px 50px rgba(0,0,0,.4)">
${[["Mon", "5:1–12", "The Beatitudes", 1], ["Tue", "5:13–20", "Salt and light", 1], ["Wed", "5:21–48", "Anger, desire, enemies", 1], ["Thu", "6:1–18", "Prayer and fasting", 0], ["Fri", "6:19–34", "Treasure and worry", 0], ["Sat", "7:1–12", "Judging, asking", 0], ["Sun", "7:13–29", "Two roads, two builders", 0]].map(([d, r, t, c]) => `<div style="display:flex;align-items:center;gap:22px;padding:20px 0;border-bottom:1px solid #eee;font:400 32px/1.2 Poppins;${c ? "color:#9a948d" : ""}"><span style="width:40px;height:40px;border:3px solid ${c ? "var(--or)" : "#bbb"};border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--or);font-weight:800;flex:none">${c ? "✓" : ""}</span><b style="width:70px;font-weight:700">${d}</b><span style="width:150px;color:var(--or-d);font-weight:600">${r}</span><span style="${c ? "text-decoration:line-through" : ""}">${t}</span></div>`).join("")}
</div>
<div style="height:40px"></div>${foot("Get the book free →", "<br>Read it alongside the plan")}</div>` },
  { id: "07b_checklist", fmt: "Checklist: steal this", html: `
<div class="ad paper"><div class="top">${logo(0)}<span class="kicker">8 days · 8 lines</span></div>
<h2 style="margin-top:44px;font-size:64px">The Beatitudes, one a day. Steal this list.</h2>
<div style="background:#fff;border-radius:20px;padding:30px 44px;margin-top:36px;box-shadow:0 12px 30px rgba(0,0,0,.08)">
${["the poor in spirit", "those who mourn", "the meek", "those who hunger and thirst for righteousness", "the merciful", "the pure in heart", "the peacemakers", "those who are persecuted"].map((t, i) => `<div style="display:flex;align-items:center;gap:22px;padding:12px 0;border-bottom:1px solid #eee;font:400 29px/1.25 Poppins;${i < 2 ? "color:#9a948d" : ""}"><span style="width:38px;height:38px;border:3px solid ${i < 2 ? "var(--or)" : "#bbb"};border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--or);font-weight:800;flex:none">${i < 2 ? "✓" : ""}</span><span>Blessed are ${t}</span></div>`).join("")}
</div>
<p class="sub" style="font-size:28px;margin-top:28px">Matthew 5:3–10. John Ortberg unpacks each one in <i>Insurmountable</i>.</p>
${foot()}</div>` },

  // 08 Before and after
  { id: "08a_before_after", fmt: "Before and after", html: `
<div class="ad paper" style="padding:0">
<div style="display:flex;flex:1">
<div style="flex:1;background:#d9d4cd;padding:72px 48px;display:flex;flex-direction:column">${logo(0)}
<div class="kicker" style="color:var(--stone);margin-top:auto">Before</div>
<p style="font:700 52px/1.15 Poppins;margin-top:20px;color:#5c5650">Reading Matthew 5 and feeling like you'll never measure up.</p></div>
<div style="flex:1;background:var(--char);color:#fff;padding:72px 48px;display:flex;flex-direction:column"><div style="height:40px"></div>
<div class="kicker" style="margin-top:auto">After</div>
<p style="font:700 52px/1.15 Poppins;margin-top:20px">Seeing it as an invitation, not a scorecard.</p></div></div>
<div style="padding:44px 72px 64px;background:var(--paper)">${foot()}</div></div>` },
  { id: "08b_before_after", fmt: "Before and after", html: `
<div class="ad dark" style="padding:0">
<div style="padding:72px 72px 0">${logo(1)}</div>
<div style="display:flex;gap:0;margin:48px 72px 0;flex:1">
<div style="flex:1;background:#3a3a3a;border-radius:24px 0 0 24px;padding:44px 40px;display:flex;flex-direction:column">
<div class="kicker" style="color:#aaa">Before</div><div style="font:800 70px/1 Poppins;margin-top:auto;color:#aaa">7:42 am</div>
<p style="font:600 40px/1.2 Poppins;margin-top:18px;color:#ccc">Same commute. Same podcasts. Same news.</p></div>
<div style="flex:1;background:var(--or);color:var(--ink);border-radius:0 24px 24px 0;padding:44px 40px;display:flex;flex-direction:column">
<div class="kicker" style="color:var(--ink)">After</div><div style="font:800 70px/1 Poppins;margin-top:auto">7:42 am</div>
<p style="font:600 40px/1.2 Poppins;margin-top:18px">Same commute. John Ortberg on the Sermon on the Mount.</p></div></div>
<div style="padding:56px 72px 72px">${foot("Get the free audiobook →")}</div></div>` },

  // 09 Notes app / handwritten
  { id: "09a_notes_app", fmt: "Notes app or handwritten note", html: `
<div class="ad" style="background:#fbfaf7;padding:0;font-family:Inter,-apple-system,sans-serif">
<div style="display:flex;justify-content:space-between;padding:56px 56px 0;font:500 34px/1 Inter;color:#d89a2b"><span>‹ Notes</span><span>Done</span></div>
<div style="text-align:center;color:#9a9a9a;font:400 24px/1 Inter;margin-top:30px">November 18, 2026 at 6:51 AM</div>
<div style="padding:40px 64px;font:400 36px/1.5 Inter;color:#222">
<div style="font:700 50px/1.2 Inter;margin-bottom:28px">things jesus said that i still don't get</div>
<div>blessed are the poor in spirit?? (5:3)</div>
<div>if someone takes your shirt give them your coat (5:40)</div>
<div>love your enemies. like, actually (5:44)</div>
<div>don't worry about tomorrow (6:34)</div>
<div style="margin-top:36px">→ john ortberg wrote a whole book on these three chapters. it's free as an audiobook + pdf right now</div>
<div style="color:#2a6bd6;text-decoration:underline">becomenew.com/insurmountable-book</div>
<div style="margin-top:36px">listening this week</div></div></div>` },
  { id: "09b_handwritten_note", fmt: "Notes app or handwritten note", html: `
<div class="ad" style="padding:0;background:#8b6b4e url('${A}Landing-page-BG-scaled-1.jpg') center/cover">
<div style="position:absolute;inset:0;background:linear-gradient(160deg,#6d5440,#3f3026)"></div>
<img src="${A}cover-flat.jpg" style="position:absolute;width:700px;left:150px;top:180px;transform:rotate(-6deg);box-shadow:0 40px 80px rgba(0,0,0,.55);border-radius:4px">
<div style="position:absolute;right:70px;top:820px;width:420px;height:400px;background:#f7e37a;transform:rotate(5deg);box-shadow:0 18px 30px rgba(0,0,0,.35);padding:44px 40px;font:700 66px/1.05 Caveat;color:#2a2a2a">Matthew 5–7.<br>Then read this.<br><span style="font-size:54px">(it's free) →</span></div>
</div>` },

  // 10 Founder's letter (DRAFT copy: John or the team must approve the words)
  { id: "10a_letter", fmt: "Founder's letter (draft for John's approval)", html: `
<div class="ad paper" style="background:#f6f2ea"><div class="top">${logo(0)}<span class="kicker">A note from John</span></div>
<div style="margin-top:auto;font:400 36px/1.55 Lora;color:#2a2622">
<p style="font-style:italic;margin-bottom:28px">To anyone who has found the Sermon on the Mount hard,</p>
<p>Love your enemies. Do not worry. Be perfect. For most of my life these words have felt insurmountable to me, too.</p>
<p style="margin-top:24px">But Jesus wasn't handing out a scorecard. He was describing a life with God that's actually possible. I wrote this book to walk through his sermon slowly, one line at a time.</p>
<p style="margin-top:24px">It's yours, free.</p>
<p style="font:700 64px/1 Caveat;margin-top:28px">John Ortberg</p></div>
<div style="height:50px"></div>${foot()}</div>` },
  { id: "10b_letter", fmt: "Founder's letter (draft for team approval)", html: `
<div class="ad dark"><div class="top">${logo(1)}<span class="kicker">A note from Become New</span></div>
<div style="margin-top:auto;font:400 36px/1.55 Lora;color:#eee">
<p style="font-style:italic;margin-bottom:28px">To the one who listens on the drive,</p>
<p>You don't need another thing to read. So we made John Ortberg's book on the Sermon on the Mount something you can listen to.</p>
<p style="margin-top:24px">Three chapters of Matthew. The most important words Jesus ever preached. In your car, on a walk, while the coffee brews.</p>
<p style="margin-top:24px">The audiobook, the PDF and the emails are all free.</p>
<p style="font:700 60px/1 Caveat;margin-top:28px;color:var(--or)">The Become New team</p></div>
<div style="height:50px"></div>${foot("Get the free audiobook →")}</div>` },

  // 11 Objection card
  { id: "11a_objection", fmt: "Objection card", html: `
<div class="ad dark"><div class="top">${logo(1)}<span class="kicker">Free book</span></div>
<div style="margin-top:auto">
<h1 style="color:var(--or);font-size:108px">“Another book I won't finish?”</h1>
<h2 style="margin-top:40px;font-size:58px">Then don't read it. Listen to it.</h2>
<p class="sub" style="margin-top:28px">Insurmountable comes free as an audiobook, a PDF and an email series. Start wherever you'll actually start.</p></div>
<div style="height:80px"></div>${foot()}</div>` },
  { id: "11b_objection", fmt: "Objection card", html: `
<div class="ad paper"><div class="top">${logo(0)}<span class="kicker">Free book</span></div>
<div style="margin-top:auto">
<h1 style="color:var(--or-d);font-size:108px">“Free? What's the catch?”</h1>
<h2 style="margin-top:40px;font-size:58px">No catch. Just your email.</h2>
<p class="sub" style="margin-top:28px">You get John Ortberg's book on the Sermon on the Mount, plus emails from Become New. Unsubscribe whenever you like.</p></div>
<div style="height:80px"></div>${foot()}</div>` },

  // 12 One stat
  { id: "12a_one_stat", fmt: "One stat", html: `
<div class="ad dark"><div class="top">${logo(1)}<span class="kicker">Matthew 5–7</span></div>
<div style="margin-top:auto">
<div style="font:800 330px/0.9 Poppins;letter-spacing:-.05em;color:var(--or)">111</div>
<h2 style="font-size:66px;margin-top:20px">verses. That's the whole Sermon on the Mount.</h2>
<p class="sub" style="margin-top:30px">John Ortberg's <i>Insurmountable</i> takes them one at a time.</p>
<p style="font:500 22px/1 Poppins;opacity:.5;margin-top:30px">Matthew 5 (48) + 6 (34) + 7 (29) = 111 verses</p></div>
<div style="height:60px"></div>${foot()}</div>` },
  { id: "12b_one_stat", fmt: "One stat", html: `
<div class="ad orange"><div class="top">${logo(0)}<span class="kicker">Matthew 5–7</span></div>
<div style="margin-top:auto">
<div style="font:700 60px/1 Poppins">Under</div><div style="font:800 230px/0.9 Poppins;letter-spacing:-.05em">20 min</div>
<h2 style="font-size:66px;margin-top:30px">to read it aloud. A lifetime to live it.</h2>
<p class="sub" style="margin-top:30px">Insurmountable is John Ortberg's lifelong commentary on the Sermon on the Mount.</p>
<p style="font:500 22px/1 Poppins;opacity:.6;margin-top:30px">About 2,500 words in most English translations</p></div>
<div style="height:60px"></div>${foot()}</div>` },

  // 13 Boosted founder post
  { id: "13a_boosted_post", fmt: "Boosted founder post", html: `
<div class="ad" style="background:#fff;padding:0;font-family:Inter,sans-serif">
<div style="display:flex;align-items:center;gap:20px;padding:44px 48px 24px">
<img src="${A}Become-New-Circle.png" style="width:84px;height:84px;border-radius:50%;background:#2f5a3a">
<div><div style="font:700 32px/1.2 Inter">Become New</div><div style="font:400 24px/1.2 Inter;color:#777">Just now · 🌎</div></div></div>
<div style="padding:0 48px 30px;font:400 34px/1.45 Inter;color:#111">We've decided to give John's book away.<br><br><i>Insurmountable</i> is his walk through the Sermon on the Mount, line by line. It's free as an audiobook, a PDF and an email series. If those three chapters of Matthew have ever felt out of reach, this one is for you.</div>
<div style="flex:1;background:#e9e5df;display:flex;align-items:center;justify-content:center;overflow:hidden"><img src="${A}book-mockup.png" style="width:860px"></div></div>` },
  { id: "13b_boosted_post", fmt: "Boosted founder post (draft for John's approval)", html: `
<div class="ad" style="background:#fff;padding:0;font-family:Inter,sans-serif">
<div style="display:flex;align-items:center;gap:20px;padding:44px 48px 24px">
<div class="ph" style="width:84px;height:84px;border-radius:50%;padding:0;font-size:13px">[John]</div>
<div><div style="font:700 32px/1.2 Inter">John Ortberg</div><div style="font:400 24px/1.2 Inter;color:#777">Just now · 🌎</div></div></div>
<div style="padding:0 48px 30px;font:400 34px/1.45 Inter;color:#111">Love your enemies. Don't worry. Turn the other cheek.<br><br>I've wrestled with Jesus' sermon for most of my life, and I wrote a book about it. We're giving it away free: audiobook, PDF or email, whichever you'll actually use. 👇</div>
<div style="flex:1;position:relative;background:#e9e5df;overflow:hidden"><img src="${A}cover-flat.jpg" style="position:absolute;width:480px;left:300px;top:40px;transform:rotate(-4deg);box-shadow:0 24px 50px rgba(0,0,0,.3)"><div class="ph" style="position:absolute;left:40px;bottom:30px;width:330px;height:260px;font-size:22px;padding:20px;background:#fff">[Optional: casual photo of John holding the book]</div></div></div>` },
];

await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(HTML, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
const only = process.argv[2];
for (const ad of ads) {
  if (only && !ad.id.includes(only)) continue;
  const file = path.join(HTML, `${ad.id}.html`);
  await fs.writeFile(file, `<!doctype html><html><head><meta charset="utf-8"><title>${ad.id}</title><style>${css}</style></head><body>${ad.html}</body></html>`);
  await page.goto("file://" + file, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(OUT, `${ad.id}.png`) });
  console.log("rendered", ad.id);
}
await fs.writeFile(path.join(DIR, "ads.json"), JSON.stringify(ads.map(({ id, fmt }) => ({ id, fmt })), null, 2));
await browser.close();
