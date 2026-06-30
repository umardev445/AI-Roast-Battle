import { useState, KeyboardEvent, FormEvent } from "react";
import { motion } from "motion/react";
import { RoastStyle, RoastRequest } from "../types";
import { Sparkles, Shuffle, User, Users, Flame } from "lucide-react";

interface RoastFormProps {
  onSubmit: (data: RoastRequest) => void;
  isLoading: boolean;
}

const RANDOM_NAMES = [
  "Umar",
  "Elon Musk",
  "Your Boss",
  "A Discord Admin",
  "Mark Zuckerberg",
  "Taylor Swift",
  "A Crypto Bro",
  "Karen",
  "MrBeast",
  "Your Future Self",
  "A Gym Bro"
];

const RANDOM_FRIENDS = [
  "Alexa",
  "Chat GPT",
  "Their Coffee Vendor",
  "A Goldfish",
  "Siri",
  "Their Houseplant",
  "An Unpaid Internship",
  "The Roomba",
  "Local Spider"
];

export default function RoastForm({ onSubmit, isLoading }: RoastFormProps) {
  const [name, setName] = useState("");
  const [friendName, setFriendName] = useState("");
  const [style, setStyle] = useState<RoastStyle>(RoastStyle.FUNNY);
  const [errorHint, setErrorHint] = useState("");

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setErrorHint("");

    if (!name.trim()) {
      setErrorHint("Target's code name is required! Who are we roasting?");
      return;
    }

    onSubmit({
      name: name.trim(),
      friendName: friendName.trim() ? friendName.trim() : undefined,
      style
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  };

  const handleRandomize = () => {
    setErrorHint("");
    const randomUser = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
    setName(randomUser);

    // 60% chance of picking a friend
    if (Math.random() > 0.4) {
      const randomFriend = RANDOM_FRIENDS[Math.floor(Math.random() * RANDOM_FRIENDS.length)];
      setFriendName(randomFriend);
    } else {
      setFriendName("");
    }

    // Pick a random style
    const styles = Object.values(RoastStyle);
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    setStyle(randomStyle);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4" id="roast-form-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden group"
      >
        {/* Cyberpunk corner details */}
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-purple-500 rounded-tl-md" />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-pink-500 rounded-tr-md" />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-blue-500 rounded-bl-md" />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-purple-500 rounded-br-md" />

        {/* Ambient border gradient hover */}
        <div className="absolute -inset-px bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none" />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold font-sans tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 flex items-center gap-2">
            <Flame className="w-5 h-5 text-pink-500 animate-pulse" />
            BATTLE STATION
          </h2>

          <button
            type="button"
            onClick={handleRandomize}
            className="flex items-center gap-1 text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/20 px-3 py-1.5 rounded-lg cursor-pointer"
            title="Auto-fill with random parameters"
          >
            <Shuffle className="w-3.5 h-3.5 text-pink-400 rotate-180" />
            RANDOMIZE
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Target input */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-400" />
              Target Code Name <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Umar, Zuck, Elon, Your Bestie..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorHint) setErrorHint("");
                }}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="w-full bg-slate-950/70 text-white rounded-xl px-4 py-3.5 pl-11 border border-slate-700/80 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder:text-gray-500 text-sm outline-none transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
            </div>
          </div>

          {/* Optional Friend Target */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                Friend Name (Optional Duo Roast)
              </label>
              <span className="text-[10px] font-mono text-slate-500">COMBO JOINT</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Alexa, Goldfish, Crypto Bro..."
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="w-full bg-slate-950/70 text-white rounded-xl px-4 py-3.5 pl-11 border border-slate-700/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-gray-600 text-sm outline-none transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">@</span>
            </div>
          </div>

          {/* Roast Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest text-gray-400">
              Roast Burn Level & Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                { value: RoastStyle.FUNNY, label: "Funny", emoji: "😂", border: "hover:border-yellow-500/50 active-yellow", desc: "Tease" },
                { value: RoastStyle.SAVAGE, label: "Savage", emoji: "😈", border: "hover:border-red-500/50 active-red", desc: "No Mercy" },
                { value: RoastStyle.FRIENDLY, label: "Friendly", emoji: "😎", border: "hover:border-green-500/50 active-green", desc: "Warm Tease" },
                { value: RoastStyle.DARK_HUMOR, label: "Dark", emoji: "☠️", border: "hover:border-purple-500/50 active-purple", desc: "Existential" },
                { value: RoastStyle.GEN_Z, label: "Gen Z", emoji: "🤡", border: "hover:border-pink-500/50 active-pink", desc: "0 Aura NPC" }
              ].map((styleOption) => {
                const isActive = style === styleOption.value;
                return (
                  <button
                    key={styleOption.value}
                    type="button"
                    onClick={() => {
                      setStyle(styleOption.value);
                      if (errorHint) setErrorHint("");
                    }}
                    disabled={isLoading}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border font-sans pointer-events-auto cursor-pointer transition-all ${
                      isActive
                        ? "bg-gradient-to-b from-purple-800/40 to-slate-950 border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.3)] text-white"
                        : "bg-slate-950/45 border-slate-800 text-gray-400 hover:text-white"
                    } ${styleOption.border}`}
                  >
                    <span className="text-xl mb-1.5">{styleOption.emoji}</span>
                    <span className="text-xs font-bold leading-none">{styleOption.label}</span>
                    <span className="text-[9px] mt-0.5 text-gray-500 font-mono scale-90">{styleOption.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Validation Hint */}
          {errorHint && (
            <div className="text-pink-500 text-xs font-mono text-center animate-bounce">
              ⚠️ {errorHint}
            </div>
          )}

          {/* Massive Action Glow Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isLoading
                ? "bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-black shadow-[0_4px_25px_rgba(236,72,153,0.3)] hover:shadow-[0_4px_35px_rgba(236,72,153,0.5)] border border-white/10"
            }`}
          >
            <Sparkles className={`w-5 h-5 ${isLoading ? "animate-spin" : "animate-pulse"}`} />
            {isLoading ? "CHARGING CYBER COMEDY BEAM..." : "GENERATE AI ROAST"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
