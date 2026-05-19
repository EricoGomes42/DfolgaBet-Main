import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate() {
  console.log("Generating image...");
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          {
            text: 'Ultra-realistic, sophisticated e-commerce lifestyle photography. A beautiful elegant scene representing online shopping. A stylish person using a sleek modern laptop or smartphone to shop online, with a credit card and a premium coffee cup on a modern desk. Warm, inviting lighting, high-end aesthetic, vertical composition. No text, no logos, clean space at the top and bottom for overlay.',
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16",
          imageSize: "1K"
        }
      }
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const dir = path.join(process.cwd(), 'public', 'assets');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(path.join(dir, 'dfolgashop-ecommerce-bg.png'), part.inlineData.data, 'base64');
        console.log("Image saved to public/assets/dfolgashop-ecommerce-bg.png");
        break;
      }
    }
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

generate();
