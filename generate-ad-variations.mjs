import { GoogleGenAI } from "./node_modules/@google/genai/dist/node/index.mjs";
import fs from "fs/promises";
import path from "path";

const API_KEY = "AIzaSyB8clMcGGDNNKys267v5ZL6zdopaDdB2hY";
const genAI = new GoogleGenAI({ apiKey: API_KEY });

const INPUT_DIR = "input_imgs";
const OUTPUT_DIR = "generated_imgs/art-of-leadership";

// Campaign context injected into every prompt
const CAMPAIGN_CONTEXT = `
CAMPAIGN: Carey Nieuwhof's "The Art of Leadership" online community.
OFFER: $50 discount for founding members who join before Pentecost, May 24th.
AUDIENCE: Church leaders, pastors, and ministry professionals.
TONE: Urgent, professional, ministry-focused. Bold and confident.
`;

// Copy variations mapped by detected ad type (keyword matching on filename or fallback)
const AD_COPY_VARIANTS = [
  {
    id: "save-50-pentecost",
    description: "Save $50 leading up to Pentecost (replaces 'early bird pricing / ends April 30th')",
    newHeadline: "SAVE $50 LEADING UP TO PENTECOST",
    newSubline: "Ends May 24th",
  },
  {
    id: "last-chance-save",
    description: "Last chance to save $50, join before Pentecost",
    newHeadline: "LAST CHANCE TO SAVE $50",
    newSubline: "Join Before Pentecost",
  },
  {
    id: "join-14000",
    description: "Join 14,000+ church leaders (replaces '250 seats filling fast')",
    newHeadline: "JOIN 14,000+",
    newSubline: "CHURCH LEADERS.",
  },
  {
    id: "last-chance-discount",
    description: "Last chance for $50 off / The Art of Leadership",
    newHeadline: "Last chance",
    newSubline: "for $50 off",
    bodyText: "The Art of Leadership",
  },
  {
    id: "secure-your-spot",
    description: "Secure your spot before May 24th (replaces 'secure your ticket before April 30th')",
    newHeadline: "Secure",
    newSubline: "Your Spot",
    bodyText: "Before",
    accentText: "May 24th",
  },
];

function buildPrompt(inputImageDescription, variant) {
  return `You are a professional graphic designer creating social media ads for a church leadership conference.

${CAMPAIGN_CONTEXT}

TASK: Recreate this ad image with updated text copy for the new campaign. Preserve the exact visual style, layout, color palette, typography weight and placement, photo treatment, and overall composition — only change the text content.

ORIGINAL AD STYLE (from the reference image): ${inputImageDescription}

NEW TEXT TO USE:
${variant.newHeadline ? `- Main headline: "${variant.newHeadline}"` : ""}
${variant.newSubline ? `- Sub-headline/supporting text: "${variant.newSubline}"` : ""}
${variant.badgeText ? `- Badge/pill text: "${variant.badgeText}"` : ""}
${variant.bodyText ? `- Body text: "${variant.bodyText}"` : ""}
${variant.accentText ? `- Accent/highlight text: "${variant.accentText}"` : ""}

IMPORTANT:
- Keep all background photography, color overlays, and tinting exactly as in the reference.
- Match the font weight (bold/heavy for headlines, lighter for supporting text).
- Keep the same text positioning and layout zones.
- Replace "April 30th" or "April 30" with "May 24th" wherever it appears.
- Replace "Early Bird Tickets" with "Founding Member Pricing" or "$50 off" as appropriate.
- Output a 9:16 portrait image suitable for Instagram Stories / social media.
- Do not add any new design elements not present in the original.`;
}

async function generateVariation(imageFilePath, variant, index) {
  const imageData = await fs.readFile(imageFilePath);
  const base64Image = imageData.toString("base64");
  const ext = path.extname(imageFilePath).slice(1).toLowerCase();
  const mimeType = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";

  // Simple description based on variant for the prompt
  const descriptions = {
    "save-50-pentecost": "Dark navy blue background with photo of conference attendees, blue color overlay. Large bold white uppercase text for headline. Orange pill/badge element for sub-text. Professional conference ad aesthetic.",
    "last-chance-save": "Bright blue background with full-bleed photo of a person, blue color overlay. Very large bold white uppercase text with orange accent on key word. Minimal design, text-forward.",
    "join-14000": "Dark conference room photo with audience, minimal color treatment. Large mixed-style text: number and '+' in orange, descriptive words in light blue and white. Dramatic and factual.",
    "last-chance-discount": "Large solid orange background taking upper half, real conference photo taking lower half. Blue rectangular text box with headline text inside. White bold text below on orange.",
    "secure-your-spot": "Dark navy blue with aerial or crowd photo, strong blue overlay. Light blue rectangular box with multi-line text inside. Orange horizontal underline accent below the box.",
  };

  const prompt = buildPrompt(descriptions[variant.id] || "Professional church conference ad, portrait format", variant);

  const contents = [
    {
      role: "user",
      parts: [
        {
          inlineData: {
            mimeType,
            data: base64Image,
          },
        },
        { text: prompt },
      ],
    },
  ];

  const response = await genAI.models.generateContent({
    model: "nano-banana-pro-preview",
    contents,
  });

  return response;
}

async function run() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  let inputFiles;
  try {
    const entries = await fs.readdir(INPUT_DIR);
    inputFiles = entries
      .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
      .map((f) => path.join(INPUT_DIR, f));
  } catch {
    console.log(`No input_imgs directory found or it is empty.`);
    console.log(`Place your source ad images in ./input_imgs/ and re-run.`);
    console.log(`Running in text-only fallback mode (generates from description only).\n`);
    inputFiles = [];
  }

  // If no input images, run text-only generation for all variants
  if (inputFiles.length === 0) {
    await runTextOnly();
    return;
  }

  // Pair each input image with a campaign variant (cycle through variants if more images than variants)
  for (let i = 0; i < inputFiles.length; i++) {
    const imageFile = inputFiles[i];
    const variant = AD_COPY_VARIANTS[i % AD_COPY_VARIANTS.length];
    const baseName = path.basename(imageFile, path.extname(imageFile));
    const outputName = `${baseName}-${variant.id}.png`;
    const outputPath = path.join(OUTPUT_DIR, outputName);

    console.log(`\n[${i + 1}/${inputFiles.length}] Processing: ${path.basename(imageFile)}`);
    console.log(`  Variant: ${variant.description}`);
    console.log(`  Output:  ${outputPath}`);

    try {
      const response = await generateVariation(imageFile, variant, i);

      let saved = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            await fs.writeFile(outputPath, Buffer.from(part.inlineData.data, "base64"));
            console.log(`  Saved: ${outputPath}`);
            saved = true;
          } else if (part.text) {
            console.log(`  Model text: ${part.text.slice(0, 200)}`);
          }
        }
      }
      if (!saved) {
        console.log(`  No image data returned. The model may have responded with text only.`);
      }
    } catch (err) {
      console.error(`  Error: ${err.message}`);
    }
  }

  console.log("\nDone. Check generated_imgs/art-of-leadership/");
}

async function runTextOnly() {
  console.log("Generating Art of Leadership campaign ads from text descriptions...\n");

  const textPrompts = AD_COPY_VARIANTS.map((v) => ({
    name: v.id,
    prompt: `Create a professional social media ad for a church leadership conference.

${CAMPAIGN_CONTEXT}

AD SPECIFICATIONS:
- Format: 9:16 portrait, suitable for Instagram Stories
- Style: Bold, modern, professional ministry aesthetic
- Color palette: Deep navy blue (#1a2744) and bright blue (#4a90d9) as primary colors, orange (#e8821a) as accent
- Background: Real photographic background of church leaders / conference attendees with a strong blue color overlay/tint
- Typography: Heavy bold sans-serif for headlines, lighter weight for supporting text, all white

HEADLINE: "${v.newHeadline}"
${v.newSubline ? `SUB-HEADLINE: "${v.newSubline}"` : ""}
${v.badgeText ? `BADGE/PILL: "${v.badgeText}" (orange pill shape)` : ""}
${v.bodyText ? `BODY TEXT: "${v.bodyText}"` : ""}
${v.accentText ? `ACCENT TEXT: "${v.accentText}" (highlighted in orange or in a colored box)` : ""}

DESCRIPTION: ${v.description}

Make it visually striking with strong contrast. Professional conference ad aesthetic.`,
  }));

  for (const p of textPrompts) {
    const outputPath = path.join(OUTPUT_DIR, `${p.name}.png`);
    console.log(`Generating: ${p.name}`);

    try {
      const response = await genAI.models.generateContent({
        model: "nano-banana-pro-preview",
        contents: p.prompt,
      });

      let saved = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            await fs.writeFile(outputPath, Buffer.from(part.inlineData.data, "base64"));
            console.log(`  Saved: ${outputPath}`);
            saved = true;
          } else if (part.text) {
            console.log(`  Model text: ${part.text.slice(0, 200)}`);
          }
        }
      }
      if (!saved) console.log(`  No image data returned for ${p.name}`);
    } catch (err) {
      console.error(`  Error generating ${p.name}:`, err.message);
    }
  }

  console.log("\nDone. Check generated_imgs/art-of-leadership/");
}

run();
