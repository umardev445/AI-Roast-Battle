import { motion } from "motion/react";
import { Flame, Swords, Zap } from "lucide-react";

interface HeroProps {
  onStartClick: () => void;
}

export default function Hero({ onStartClick }: HeroProps) {
  return (
    <div className="relative flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 max-w-4xl mx-auto overflow-hidden">
      {/* Decorative cyber grid or neon light in the background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/25 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-48 h-48 bg-pink-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />

      {/* Futuristic Game Tag badges */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-400 font-mono text-xs uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.15)]"
      >
        <Zap className="w-3.5 h-3.5 text-pink-500 animate-bounce" />
        AI Battle Ground v2.5
        <Swords className="w-3.5 h-3.5" />
      </motion.div>

      {/* Main Heading Roast Arena */}
      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
        className="relative font-extrabold text-5xl md:text-8xl tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 font-sans uppercase"
      >
        <span className="inline-block hover:scale-105 transition-transform duration-300 select-none">
          🔥 Roast Arena
        </span>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-[3px] bg-gradient-to-r from-transparent via-pink-500 to-transparent blur-[1px]" />
      </motion.h1>

      {/* Subtitles & Descriptions */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-300 text-lg md:text-xl font-medium tracking-tight max-w-xl mx-auto my-6 leading-relaxed"
      >
        Enter your name, or pull in a friend's handle, and let AI ruthlessly destroy your ego for the pure sake of comedy.
      </motion.p>

      {/* Interactive Glowing Trigger Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-4"
      >
        <motion.button
          onClick={onStartClick}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(236,72,153,0.6)" }}
          whileTap={{ scale: 0.96 }}
          id="btn-start-roasting"
          className="relative px-8 py-4 font-bold text-white rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 shadow-[0_0_20px_rgba(236,72,153,0.4)] flex items-center gap-3 border border-pink-400/40 cursor-pointer overflow-hidden group transition-all"
        >
          {/* Shine effect overlay */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <Flame className="w-5 h-5 text-yellow-300 group-hover:animate-bounce" />
          <span className="tracking-wide uppercase font-sans font-black">Start Roasting</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
