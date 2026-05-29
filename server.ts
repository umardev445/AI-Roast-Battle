import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { getMockRoast } from "./src/data";
import { RoastStyle } from "./src/types";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini client securely
const apiKey = process.env.GEMINI_API_KEY;
const isApiKeyValid = apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey !== "";

const ai = isApiKeyValid
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Avatars lists for the server generators
const STOCK_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80"
];

// Comedian Roast Endpoint
app.post("/api/roast", async (req, res) => {
  try {
    const { name, friendName, style } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Name parameter is required." });
    }

    const selectedStyle = (style as RoastStyle) || RoastStyle.FUNNY;
    const cleanName = name.trim();
    const cleanFriend = friendName ? friendName.trim() : "";

    // If Gemini client isn't configured, fall back to offline database
    if (!ai) {
      console.log("No valid GEMINI_API_KEY detected. Using expert offline library.");
      const mockResult = getMockRoast(cleanName, cleanFriend || undefined, selectedStyle);
      return res.json({ ...mockResult, isFallback: true });
    }

    // Formulate a fun roast request instruction based on selected mode
    let styleDirective = "";
    switch (selectedStyle) {
      case RoastStyle.SAVAGE:
        styleDirective = "Execute a brutal, ego-shattering, devastating roast. Be extra witty but keep it safe for general audiences.";
        break;
      case RoastStyle.FRIENDLY:
        styleDirective = "Generate a warm, slightly teasing roast that is wholesome. It should end with a positive twist or laugh.";
        break;
      case RoastStyle.DARK_HUMOR:
        styleDirective = "Develop a playful, slightly dark or existential teasing. Focus on silly existential issues like bad luck, sleeping habits, or terrible coffee addictions.";
        break;
      case RoastStyle.GEN_Z:
        styleDirective = "Channel ultra modern Gen Z vocabulary, slang, and aesthetics. Use terms like: aura, drip, cooked, vibe-check, low-key, sheesh, rizz, no cap, main character, NPC.";
        break;
      case RoastStyle.FUNNY:
      default:
        styleDirective = "Write a standard clever, hilarious situational roast. Make it highly relatable and funny.";
        break;
    }

    const promptText = `
    You are an expert roast comedian at the premier "Roast Arena" gaming battleground.
    Generate a short, hilarious, non-offensive roast.
    Target: "${cleanName}"${cleanFriend ? ` along with their friend "${cleanFriend}"` : ""}.
    Mode Style: ${selectedStyle}. ${styleDirective}

    Rules:
    - Do NOT include hate speech, racism, sexism, slurs, religious offenses, violence, self-harm references, or explicit NSFW content.
    - Keep it playful, fast-paced, and social-media friendly.
    - Craft a creative punchline one-liner separate from the main roast text.
    - Pick a highly appropriate emoji reaction.
    - Provide a vibeScore representing how hot/savage the roast is (e.g. integer between 50 and 100).
    - Assign one image URL from the list of stock avatars: [${STOCK_AVATARS.join(", ")}].
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: "You are a professional, quick-witted standup comedian and AI gamer who crafts clever, entertaining roasts that are clean but hit hard.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            roast: {
              type: Type.STRING,
              description: "The main roast body text. Keep it around 1 to 3 sentences.",
            },
            emoji: {
              type: Type.STRING,
              description: "A funny, loud emoji reaction.",
            },
            punchline: {
              type: Type.STRING,
              description: "A secondary knock-out punchline (one-liner).",
            },
            vibeScore: {
              type: Type.INTEGER,
              description: "A score from 50 (mild) to 100 (super hot savage).",
            },
            avatar: {
              type: Type.STRING,
              description: "A profile portrait URL selected from the specified list.",
            },
          },
          required: ["roast", "emoji", "punchline", "vibeScore", "avatar"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response received from server-side Gemini generation.");
    }

    const parsedResult = JSON.parse(resultText);
    return res.json({
      roast: parsedResult.roast,
      style: selectedStyle,
      emoji: parsedResult.emoji || "🔥",
      avatar: parsedResult.avatar || STOCK_AVATARS[0],
      vibeScore: Number(parsedResult.vibeScore) || 75,
      punchline: parsedResult.punchline || "Boom roasted!",
      isFallback: false,
    });
  } catch (error) {
    console.error("Gemini server-side roast generator encountered an error:", error);
    // If anything fails (network error, rate-limits, invalid response), silently fall back to mocks and log it
    const { name, friendName, style } = req.body;
    const mockResult = getMockRoast(
      name || "Player",
      friendName || undefined,
      (style as RoastStyle) || RoastStyle.FUNNY
    );
    return res.json({
      ...mockResult,
      isFallback: true,
      errorInfo: "Server error occurred, deployed fallback gracefully.",
    });
  }
});

// Serve static elements and mount Vite
async function initializeApp() {
  if (process.env.NODE_ENV !== "production") {
    // Dynamically import Vite only during development
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Roast Arena full-stack server operating dynamically at http://localhost:${PORT}`);
  });
}

initializeApp();
