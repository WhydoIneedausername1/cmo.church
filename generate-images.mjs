import { GoogleGenAI } from "./node_modules/@google/genai/dist/node/index.mjs";
import fs from "fs/promises";
import path from "path";

const genAI = new GoogleGenAI({ apiKey: "AIzaSyB8clMcGGDNNKys267v5ZL6zdopaDdB2hY" });

const baseStyle = `
Square 1:1 format, minimal modern data visualization style.
Dark blue-to-teal gradient background (#0a1628 to #0d4f5c).
Soft grid lines in the background (low opacity, subtle).
A single bright glowing blue line (#4fc3f7 with subtle glow/bloom effect) representing "Church Attendance" on a graph.
Clean sans-serif typography, white text.
No axes labels beyond what is specified. No clutter.
Social media ad aesthetic — polished, professional.
`;

const variations = [
  {
    name: "variation-1-rising",
    prompt: `${baseStyle}
The bright blue "Church Attendance" line starts at the bottom-left and curves upward strongly toward the upper-right — showing clear, confident growth momentum. The line ends at roughly 75% of the way across, still rising. No plateau yet.
Text overlay at top: "Your church was growing…" in clean white sans-serif.
The mood is optimistic, forward-moving.`,
  },
  {
    name: "variation-2-plateau",
    prompt: `${baseStyle}
The bright blue "Church Attendance" line starts at the bottom-left, rises steeply through the left half, then visibly flattens into a horizontal plateau across the right half of the graph. The transition from rise to flat is clear.
Text overlay split: upper-left area shows "Your church was growing…" faded/smaller, and the right side shows "Then it plateaued." in bolder white text near the flat portion of the line.
The mood is subtle tension — not dramatic, just honest.`,
  },
  {
    name: "variation-3-full-arc",
    prompt: `${baseStyle}
The bright blue "Church Attendance" line shows the complete story: starts at bottom-left, rises steadily and confidently through the center, then gradually slows and flattens into a plateau at the right side. A subtle downward curve hint at the very end of the plateau suggests stagnation.
A small "Church Attendance" label sits near the line.
Text overlay: "Your church was growing…" near the rising section, "Then it plateaued." near the flat section — both in white, clean type.
The mood is realistic and thought-provoking.`,
  },
];

await fs.mkdir("generated_imgs", { recursive: true });

for (const v of variations) {
  console.log(`Generating ${v.name}...`);
  try {
    const response = await genAI.models.generateContent({
      model: "nano-banana-pro-preview",
      contents: v.prompt,
    });

    let saved = false;
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const filePath = path.join("generated_imgs", `${v.name}.png`);
          await fs.writeFile(filePath, Buffer.from(part.inlineData.data, "base64"));
          console.log(`  Saved: ${filePath}`);
          saved = true;
        } else if (part.text) {
          console.log(`  Model text: ${part.text.slice(0, 120)}`);
        }
      }
    }
    if (!saved) console.log(`  No image returned for ${v.name}`);
  } catch (err) {
    console.error(`  Error generating ${v.name}:`, err.message);
  }
}

console.log("Done.");
