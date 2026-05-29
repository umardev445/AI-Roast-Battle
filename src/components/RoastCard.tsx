import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RoastResponse, RoastStyle } from "../types";
import { Copy, Check, Share2, Heart, Award, ShieldAlert, Sparkles } from "lucide-react";

interface RoastCardProps {
  data: RoastResponse;
  name: string;
  friendName?: string;
  onSaveFavorite: () => void;
  isFavorited: boolean;
  onReset: () => void;
}

// Synth Sound Engine
function playPeckSound(savage: boolean) {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (savage) {
      // Savage Explode sound synthesis
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.5);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else {
      // Sleek tech laser sound synthesis
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch (err) {
    console.log("Audio synthesized block bypassed", err);
  }
}

// Custom Confetti Particle Item
interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export default function RoastCard({
  data,
  name,
  friendName,
  onSaveFavorite,
  isFavorited,
  onReset
}: RoastCardProps) {
  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);

  // Sound and Confetti triggers
  useEffect(() => {
    setTypedText("");
    setTypingDone(false);
    setUserVote(null);

    const isSavage = data.style === RoastStyle.SAVAGE;
    playPeckSound(isSavage);

    // Spawn cyber confetti if style is Savage
    if (isSavage) {
      const colors = ["#ec4899", "#8b5cf6", "#3b82f6", "#e11d48", "#f43f5e"];
      const particles: ConfettiParticle[] = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100 - 50, // relative angle offsets
        y: Math.random() * -120 - 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4
      }));
      setConfetti(particles);
    } else {
      setConfetti([]);
    }
  }, [data]);

  // Typing emulation effect
  useEffect(() => {
    if (!data.roast) return;
    const target = data.roast;
    let index = 0;
    const timer = setInterval(() => {
      setTypedText((prev) => prev + target.charAt(index));
      index++;
      if (index >= target.length) {
        clearInterval(timer);
        setTypingDone(true);
      }
    }, 15); // Snappy typed speed

    return () => clearInterval(timer);
  }, [data.roast]);

  // Copy Roast Handler
  const handleCopy = async () => {
    try {
      const shareText = `🔥 Roast Arena Burn:\n\n"${data.roast}"\n- ${data.punchline} 💀 [Style: ${data.style.toUpperCase()}]`;
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  // Share Roast Handler
  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 2500);
    handleCopy();
  };

  const getStyleTheme = (style: RoastStyle) => {
    switch (style) {
      case RoastStyle.SAVAGE:
        return {
          glow: "shadow-[0_0_30px_rgba(239,68,68,0.25)] border-red-500/40 bg-gradient-to-br from-red-950/20 via-slate-900/90 to-slate-950",
          badge: "bg-red-500/10 text-red-400 border-red-500/20",
          accentColor: "text-red-500"
        };
      case RoastStyle.FRIENDLY:
        return {
          glow: "shadow-[0_0_30px_rgba(34,197,94,0.25)] border-green-500/40 bg-gradient-to-br from-green-950/20 via-slate-900/90 to-slate-950",
          badge: "bg-green-500/10 text-green-400 border-green-500/20",
          accentColor: "text-green-500"
        };
      case RoastStyle.DARK_HUMOR:
        return {
          glow: "shadow-[0_0_30px_rgba(168,85,247,0.25)] border-purple-500/40 bg-gradient-to-br from-purple-950/20 via-slate-900/90 to-slate-950",
          badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
          accentColor: "text-purple-400"
        };
      case RoastStyle.GEN_Z:
        return {
          glow: "shadow-[0_0_30px_rgba(236,72,153,0.3)] border-pink-500/40 bg-gradient-to-br from-pink-950/20 via-slate-900/90 to-slate-950",
          badge: "bg-pink-500/10 text-pink-400 border-pink-500/20",
          accentColor: "text-pink-400"
        };
      case RoastStyle.FUNNY:
      default:
        return {
          glow: "shadow-[0_0_30px_rgba(59,130,246,0.25)] border-blue-500/40 bg-gradient-to-br from-blue-950/20 via-slate-900/90 to-slate-950",
          badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
          accentColor: "text-blue-400"
        };
    }
  };

  const theme = getStyleTheme(data.style);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-8 relative" id="roast-results-arena">
      {/* Absolute floating confetti display box wrapper */}
      <div className="absolute inset-x-0 top-0 h-0 flex justify-center pointer-events-none">
        <AnimatePresence>
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              animate={{
                opacity: [1, 0.8, 0],
                x: c.x * 4,
                y: c.y,
                scale: [0.6, 1.1, 0.5]
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute rounded-full"
              style={{
                backgroundColor: c.color,
                width: c.size,
                height: c.size,
                boxShadow: `0 0 10px ${c.color}`
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative border rounded-2xl p-6 md:p-8 backdrop-blur-xl ${theme.glow}`}
      >
        {/* Vibe Severity Meter / Top Bar */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-800/60 mb-6">
          <div className="flex items-center gap-2">
            <Award className={`w-4 h-4 ${theme.accentColor}`} />
            <span className="font-mono text-xs text-gray-400 tracking-wider">
              VIBE DEVASTATION LEVEL:
            </span>
            <span className={`font-mono text-xs font-black ${theme.accentColor}`}>
              {data.vibeScore}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider border uppercase ${theme.badge}`}>
              {data.style}
            </span>
          </div>
        </div>

        {/* Character Avatar & Roast Text block */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          {/* Virtual Character Avatar */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500" />
            <div className="relative w-20 h-20 bg-slate-950 rounded-full p-1 border border-slate-700/50 flex items-center justify-center overflow-hidden">
              <img
                src={data.avatar}
                alt="AI Roast Host Avatar"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-1 text-lg bg-slate-900 border border-slate-700 rounded-full w-6 h-6 flex items-center justify-center">
                {data.emoji}
              </span>
            </div>
          </div>

          {/* Comedy Body / Typewriter text */}
          <div className="flex-1 space-y-4">
            <div className="text-gray-400 font-mono text-[11px] uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              Incoming Transmission
            </div>

            <p className="text-white text-lg md:text-xl font-medium font-sans leading-relaxed">
              {typedText}
              {!typingDone && (
                <span className="inline-block w-2.5 h-5 ml-1 bg-purple-500 animate-pulse" />
              )}
            </p>

            {/* Exploding punchline revealed once typing finishes */}
            <AnimatePresence>
              {typingDone && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-2"
                >
                  <p className="text-pink-400 font-extrabold tracking-tight italic font-mono text-sm uppercase">
                    💥 "{data.punchline}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Reaction rate emojis & actions */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Reaction click rates */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-gray-500 uppercase mr-1">React:</span>
            {["💀 Overcooked", "🔥 Burned", "😭 Embers", "🐣 Cute"].map((emojiText) => {
              const active = userVote === emojiText;
              return (
                <button
                  key={emojiText}
                  onClick={() => setUserVote(emojiText)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border cursor-pointer font-sans transition-all ${
                    active
                      ? "bg-purple-600/30 border-purple-500 text-white shadow-[0_0_8px_rgba(168,85,247,0.3)] font-semibold"
                      : "bg-slate-950/40 border-slate-800/60 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {emojiText}
                </button>
              );
            })}
          </div>

          {/* Share, save, copy actions */}
          <div className="flex items-center gap-2">
            {/* Save Favorited Toggle */}
            <button
              onClick={onSaveFavorite}
              title={isFavorited ? "Remove from favorite arena card deck" : "Save this legendary roast"}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                isFavorited
                  ? "bg-pink-600/20 border-pink-500/50 text-pink-500"
                  : "bg-slate-950/40 border-slate-800/60 text-gray-400 hover:text-pink-400"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-lg border bg-slate-950/40 border-slate-800/60 text-gray-400 hover:text-white transition-all cursor-pointer"
              title="Copy to Clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Share action */}
            <button
              onClick={handleShare}
              className="px-3 py-2.5 rounded-lg border bg-slate-950/40 border-slate-800/60 text-gray-400 hover:text-white transition-all cursor-pointer text-xs font-semibold flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              {shared ? "COPIED DISCORD TEXT!" : "SHARE"}
            </button>
          </div>
        </div>

        {/* Reload button to try again */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onReset}
            className="text-xs font-mono font-bold tracking-wider text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5 uppercase hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            BURN ANOTHER PREY
          </button>
        </div>
      </motion.div>
    </div>
  );
}
