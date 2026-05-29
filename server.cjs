var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_genai = require("@google/genai");

// src/data.ts
var ROAST_DATABASE = {
  ["funny" /* FUNNY */]: {
    templates: [
      "{name}'s tech setup is so old, even the dust on it is retro. They are running Windows 95 with an aura of pure optimism.",
      "{name} is the type of person who carefully reads the terms Of service agreement and then loses their passwords anyway.",
      "{name}'s cooking is so iconic, even the smoke detector cheers them on every single time.",
      "{name} and {friendName} are like a browser with 50 tabs open: one is playing loud music and neither has any idea where it's coming from.",
      "{name} and {friendName} walk into a store, and the security tags beep just out of sheer sympathy.",
      "{name} possesses a unique talent: turning a simple 5-minute task into an epic 3-day saga filled with coffee and confusion."
    ],
    emojis: ["\u{1F602}", "\u{1F916}", "\u{1F926}\u200D\u2642\uFE0F", "\u{1F95E}", "\u{1F4E1}"],
    avatars: [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
    ],
    punchlines: [
      "Error 404: Subtlety not found.",
      "But hey, at least they are consistent!",
      "A true visionary of bad decisions.",
      "Maximum effort, minimal results."
    ]
  },
  ["savage" /* SAVAGE */]: {
    templates: [
      "{name} is the human equivalent of a participation trophy: completely useless but officially present.",
      "{name} talks about high performance so much, even their computer CPU throttles itself out of absolute boredom.",
      "{name}'s opinion is like the 'skip ad' button\u2014everyone is just waiting for it to go away.",
      "The only thing high-octane about {name} and {friendName} is their collective density. Even light gravitates away from them.",
      "{name} and {friendName} are proof that some people can live without a brain. It's truly a medical miracle.",
      "If laziness was an Olympic sport, {name} would win bronze just so they wouldn't have to climb the gold stairs."
    ],
    emojis: ["\u{1F608}", "\u{1F525}", "\u{1F4A5}", "\u{1F480}", "\u26D4"],
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&h=150&q=80",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
    ],
    punchlines: [
      "Please report this roast to local authorities.",
      "Ego officially destroyed.",
      "Apply virtual ice immediately.",
      "No healing potion can fix this."
    ]
  },
  ["friendly" /* FRIENDLY */]: {
    templates: [
      "{name} is so incredibly wholesome, even their GPS says 'please make-a-u-turn if you're comfortable with that.'",
      "{name}'s ideas are great, they are just usually 40 years ahead of their actual execution capabilities.",
      "{name} has a heart of gold and a focus span of a goldfish, which is genuinely a delightful combo.",
      "{name} and {friendName} are such an iconic duo. It's sweet how they collectively share a single active brain cell.",
      "{name} and {friendName} are the kind of friends who would cheer you on even while you are driving in the wrong direction.",
      "{name} makes everyone in the room feel smart just by starting to explain how they think a microwave works."
    ],
    emojis: ["\u{1F60E}", "\u{1F917}", "\u{1F355}", "\u{1F496}", "\u{1F425}"],
    avatars: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=150&h=150&q=80"
    ],
    punchlines: [
      "Roasted with love.",
      "Cute but slightly concerning.",
      "Keep shining, you beautiful disaster.",
      "A wholesome facepalm moment."
    ]
  },
  ["dark_humor" /* DARK_HUMOR */]: {
    templates: [
      "{name}'s future plans are so dark, they might be sponsored by Vantablack.",
      "{name}'s sleep schedule is a cry for help that even the night owls have blocked on social media.",
      "{name}'s bank account looks like a scoreboard at the end of an apocalyptic alien invasion.",
      "{name} and {friendName}'s retirement strategy is literally waiting for the sweet relief of a zombie outbreak.",
      "If {name} and {friendName} were cast in a horror movie, they'd be the ones who go check the dark basement because they thought the monster was a puppy.",
      "{name}'s carbon footprint isn't a footprint, it's a structural threat to gravity itself."
    ],
    emojis: ["\u2620\uFE0F", "\u{1F9DF}", "\u26B0\uFE0F", "\u{1F5A4}", "\u{1F377}"],
    avatars: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80"
    ],
    punchlines: [
      "It is what it is.",
      "That went dark real quick.",
      "My programmer warned me about this style.",
      "Absolute silence in the audience."
    ]
  },
  ["gen_z" /* GEN_Z */]: {
    templates: [
      "{name} really thought they were serving looks, but they are actually serving Dial-Up connection speed.",
      "{name} is giving absolute 'no thoughts, head empty, main character with 0.1 aura' energy.",
      "{name} has negative rizz. Even their Alexa ignores their prompts and reads them the weather in Celsius.",
      "{name} and {friendName} are giving major 'no thoughts, side characters in a simulator' vibes. Absolute zero drip.",
      "{name} and {friendName} are peak NPC energy. They stand in the middle of hallways waiting for their textures to load.",
      "{name} is trying so hard to stay in their era, but their vibe check got flagged by the cyber security council. High key wild."
    ],
    emojis: ["\u{1F921}", "\u{1F485}", "\u{1F480}", "\u{1F525}", "\u{1F4C9}"],
    avatars: [
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=150&h=150&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=150&h=150&q=80"
    ],
    punchlines: [
      "Sheesh, no cap.",
      "Absolute L ratio.",
      "Vibe check completely failed.",
      "That's high-key cooked."
    ]
  }
};
function getMockRoast(name, friendName, style) {
  const db = ROAST_DATABASE[style] || ROAST_DATABASE["funny" /* FUNNY */];
  const validTemplates = db.templates.filter((t) => {
    if (friendName) {
      return t.includes("{friendName}");
    } else {
      return !t.includes("{friendName}");
    }
  });
  const templatesToUse = validTemplates.length > 0 ? validTemplates : db.templates;
  const rawTemplate = templatesToUse[Math.floor(Math.random() * templatesToUse.length)];
  const roast = rawTemplate.replace(/{name}/g, name || "Umar").replace(/{friendName}/g, friendName || "their bestie");
  const emoji = db.emojis[Math.floor(Math.random() * db.emojis.length)];
  const avatar = db.avatars[Math.floor(Math.random() * db.avatars.length)];
  const punchline = db.punchlines[Math.floor(Math.random() * db.punchlines.length)];
  const vibeScore = Math.floor(Math.random() * 41) + 60;
  return {
    roast,
    style,
    emoji,
    avatar,
    vibeScore,
    punchline
  };
}

// server.ts
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var apiKey = process.env.GEMINI_API_KEY;
var isApiKeyValid = apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey !== "";
var ai = isApiKeyValid ? new import_genai.GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
}) : null;
var STOCK_AVATARS = [
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
app.post("/api/roast", async (req, res) => {
  try {
    const { name, friendName, style } = req.body;
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Name parameter is required." });
    }
    const selectedStyle = style || "funny" /* FUNNY */;
    const cleanName = name.trim();
    const cleanFriend = friendName ? friendName.trim() : "";
    if (!ai) {
      console.log("No valid GEMINI_API_KEY detected. Using expert offline library.");
      const mockResult = getMockRoast(cleanName, cleanFriend || void 0, selectedStyle);
      return res.json({ ...mockResult, isFallback: true });
    }
    let styleDirective = "";
    switch (selectedStyle) {
      case "savage" /* SAVAGE */:
        styleDirective = "Execute a brutal, ego-shattering, devastating roast. Be extra witty but keep it safe for general audiences.";
        break;
      case "friendly" /* FRIENDLY */:
        styleDirective = "Generate a warm, slightly teasing roast that is wholesome. It should end with a positive twist or laugh.";
        break;
      case "dark_humor" /* DARK_HUMOR */:
        styleDirective = "Develop a playful, slightly dark or existential teasing. Focus on silly existential issues like bad luck, sleeping habits, or terrible coffee addictions.";
        break;
      case "gen_z" /* GEN_Z */:
        styleDirective = "Channel ultra modern Gen Z vocabulary, slang, and aesthetics. Use terms like: aura, drip, cooked, vibe-check, low-key, sheesh, rizz, no cap, main character, NPC.";
        break;
      case "funny" /* FUNNY */:
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
          type: import_genai.Type.OBJECT,
          properties: {
            roast: {
              type: import_genai.Type.STRING,
              description: "The main roast body text. Keep it around 1 to 3 sentences."
            },
            emoji: {
              type: import_genai.Type.STRING,
              description: "A funny, loud emoji reaction."
            },
            punchline: {
              type: import_genai.Type.STRING,
              description: "A secondary knock-out punchline (one-liner)."
            },
            vibeScore: {
              type: import_genai.Type.INTEGER,
              description: "A score from 50 (mild) to 100 (super hot savage)."
            },
            avatar: {
              type: import_genai.Type.STRING,
              description: "A profile portrait URL selected from the specified list."
            }
          },
          required: ["roast", "emoji", "punchline", "vibeScore", "avatar"]
        }
      }
    });
    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response received from server-side Gemini generation.");
    }
    const parsedResult = JSON.parse(resultText);
    return res.json({
      roast: parsedResult.roast,
      style: selectedStyle,
      emoji: parsedResult.emoji || "\u{1F525}",
      avatar: parsedResult.avatar || STOCK_AVATARS[0],
      vibeScore: Number(parsedResult.vibeScore) || 75,
      punchline: parsedResult.punchline || "Boom roasted!",
      isFallback: false
    });
  } catch (error) {
    console.error("Gemini server-side roast generator encountered an error:", error);
    const { name, friendName, style } = req.body;
    const mockResult = getMockRoast(
      name || "Player",
      friendName || void 0,
      style || "funny" /* FUNNY */
    );
    return res.json({
      ...mockResult,
      isFallback: true,
      errorInfo: "Server error occurred, deployed fallback gracefully."
    });
  }
});
async function initializeApp() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Roast Arena full-stack server operating dynamically at http://localhost:${PORT}`);
  });
}
initializeApp();
//# sourceMappingURL=server.cjs.map
