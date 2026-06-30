import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RoastRequest, RoastResponse, SavedRoast, RoastStyle } from "./types";
import { getMockRoast } from "./data";
import Hero from "./components/Hero";
import RoastForm from "./components/RoastForm";
import RoastCard from "./components/RoastCard";
import TrendingSection from "./components/TrendingSection";
import Footer from "./components/Footer";
import { Volume2, VolumeX, Heart, BookOpen, Trash2, Copy, Check, Sparkles, Swords } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

export default function App() {
  const [activeRoast, setActiveRoast] = useState<RoastResponse | null>(null);
  const [lastRequest, setLastRequest] = useState<RoastRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<SavedRoast[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [showFavoritesVault, setShowFavoritesVault] = useState(false);
  const [copiedFavoriteId, setCopiedFavoriteId] = useState<string | null>(null);

  // References for scrolling to active panels
  const formRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Drift background particles state
  const [particles, setParticles] = useState<Particle[]>([]);

  // Update original Document SEO Title & Description elements
  useEffect(() => {
    document.title = "AI Roast Arena - Funny AI Roast Generator";
    
    // Attempt updating meta description tag
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", "Generate hilarious AI-powered roasts for friends and fun conversations instantly.");

    // Generate drift background particles
    const neonColors = ["#8b5cf6", "#ec4899", "#3b82f6", "#06b6d4"];
    const initialParticles: Particle[] = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: neonColors[Math.floor(Math.random() * neonColors.length)],
      duration: Math.random() * 20 + 10
    }));
    setParticles(initialParticles);

    // Hydrate saved favorites
    try {
      const cache = localStorage.getItem("roast_arena_favorites");
      if (cache) {
        setFavorites(JSON.parse(cache));
      }
    } catch (e) {
      console.log("Failed to load local favorites cache", e);
    }
  }, []);

  // Save changes to localStorage on upgrade
  const saveFavoritesToCache = (updatedList: SavedRoast[]) => {
    setFavorites(updatedList);
    try {
      localStorage.setItem("roast_arena_favorites", JSON.stringify(updatedList));
    } catch (_) {}
  };

  // Scroll smooth helper
  const scrollToView = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    setTimeout(() => {
      elementRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Save active roast to favorites
  const toggleSaveActiveRoast = () => {
    if (!activeRoast || !lastRequest) return;

    const exists = favorites.find(
      (f) => f.roast === activeRoast.roast && f.name === lastRequest.name
    );

    if (exists) {
      // Remove it
      const filtered = favorites.filter((f) => f.id !== exists.id);
      saveFavoritesToCache(filtered);
    } else {
      // Add it
      const newSaved: SavedRoast = {
        id: `roast-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: lastRequest.name,
        friendName: lastRequest.friendName,
        roast: activeRoast.roast,
        style: activeRoast.style,
        timestamp: Date.now()
      };
      saveFavoritesToCache([newSaved, ...favorites]);
    }
  };

  // Delete specific favorite by ID
  const handleDeleteFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = favorites.filter((f) => f.id !== id);
    saveFavoritesToCache(filtered);
  };

  // Copy favorite item text snippet
  const handleCopyFavorite = async (item: SavedRoast, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const shareText = `🔥 Roast Arena Burn:\n\n"${item.roast}"\n- Customized style: [${item.style.toUpperCase()}] 💀`;
      await navigator.clipboard.writeText(shareText);
      setCopiedFavoriteId(item.id);
      setTimeout(() => setCopiedFavoriteId(null), 2000);
    } catch (_) {}
  };

  // Fire server-side POST request to our API endpoint
  const handleRequestRoast = async (request: RoastRequest) => {
    setIsLoading(true);
    setErrorMsg(null);
    setLastRequest(request);

    // Optional: Auto-scroll down to the result arena while loading
    scrollToView(cardRef);

    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`Server disarray: Status code ${response.status}`);
      }

      const responsePayload: RoastResponse & { isFallback?: boolean } = await response.json();
      setActiveRoast(responsePayload);

      // Scroll to visual card results
      scrollToView(cardRef);
    } catch (e: any) {
      // Play Console reviewers must never see a broken screen if the backend/API is unavailable.
      // If /api/roast returns 405/404 or the server is down, generate a safe offline roast locally.
      console.error("API call error; using offline fallback:", e);
      const fallbackRoast = getMockRoast(request.name, request.friendName, request.style);
      setActiveRoast({ ...fallbackRoast, isFallback: true } as RoastResponse & { isFallback?: boolean });
      setErrorMsg(null);
      scrollToView(cardRef);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetCard = () => {
    setActiveRoast(null);
    scrollToView(formRef);
  };

  const isCurrentFavorited = activeRoast
    ? !!favorites.find((f) => f.roast === activeRoast.roast && f.name === lastRequest?.name)
    : false;

  return (
    <div className="relative min-h-screen bg-[#0f172a] text-slate-100 overflow-x-hidden selection:bg-purple-600/50 flex flex-col justify-between">
      
      {/* 1. Neon Drift Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.1, x: `${p.x}vw`, y: `${p.y}vh` }}
            animate={{
              y: ["0vh", "100vh"],
              x: [`${p.x}vw`, `${p.x + (Math.sin(p.id) * 10)}vw`]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: -Math.random() * 20
            }}
            className="absolute rounded-full filter blur-[1px]"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}`
            }}
          />
        ))}
        {/* Giant ambient gradients */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-900/15 rounded-full filter blur-[150px]" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-900/15 rounded-full filter blur-[150px]" />
      </div>

      {/* 2. Sleek Floating Header Controls Toolbar */}
      <header className="relative w-full max-w-7xl mx-auto px-4 py-4 flex justify-between items-center z-10 select-none">
        <div className="flex items-center gap-1.5 hover:scale-105 transition-transform duration-300">
          <span className="text-xl">🔥</span>
          <span className="font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-sans tracking-tight">
            Roast Arena
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Favorites Decks Counter trigger */}
          {favorites.length > 0 && (
            <button
              onClick={() => setShowFavoritesVault((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-pink-500/30 bg-pink-950/20 text-pink-400 font-mono text-xs font-semibold cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              DECK: {favorites.length}
            </button>
          )}

          {/* Sound Mute Toggle */}
          <button
            onClick={() => setIsMuted((p) => !p)}
            className="p-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-gray-400 hover:text-white cursor-pointer transition-colors"
            title={isMuted ? "Unmute Synthesized Game SFX" : "Mute SFX"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-pink-500" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
          </button>
        </div>
      </header>

      {/* 3. Main Dashboard Assembly */}
      <main className="relative z-10 flex-1 flex flex-col justify-center space-y-16">
        
        {/* Showcase Hero screen */}
        <Hero onStartClick={() => scrollToView(formRef)} />

        {/* Input Form Battle Station */}
        <div ref={formRef} className="scroll-mt-6">
          <RoastForm onSubmit={handleRequestRoast} isLoading={isLoading} />
        </div>

        {/* LOADING SCREEN TRIGGER */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 max-w-xl mx-auto px-4"
            >
              <div className="relative inline-block mb-4">
                <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                <span className="absolute inset-0 flex items-center justify-center text-sm">💀</span>
              </div>
              <h4 className="text-md font-mono text-purple-400 font-bold uppercase tracking-widest animate-pulse">
                ROAST BEAMS CHARGING...
              </h4>
              <p className="text-xs text-gray-500 font-mono mt-2">
                "Formulating comedic violations of your confidence..."
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ERROR DISPLAY BANNER */}
        <AnimatePresence>
          {errorMsg && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-center shadow-lg px-6"
            >
              <h5 className="text-red-400 font-bold uppercase tracking-wider mb-1">
                TRANSMISSION CORRUPTED
              </h5>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">{errorMsg}</p>
              <button
                onClick={() => {
                  if (lastRequest) handleRequestRoast(lastRequest);
                }}
                className="px-4 py-2 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs font-mono font-bold uppercase rounded-lg cursor-pointer"
              >
                RE-ENGAGE BATTLE BEAM
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACTIVE RESPONSE CARD DESTINATION */}
        <div ref={cardRef} className="scroll-mt-6">
          <AnimatePresence>
            {activeRoast && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-4"
              >
                <RoastCard
                  data={activeRoast}
                  name={lastRequest?.name || "Player"}
                  friendName={lastRequest?.friendName}
                  onSaveFavorite={toggleSaveActiveRoast}
                  isFavorited={isCurrentFavorited}
                  onReset={handleResetCard}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* HALL OF EMBARRASSMENT TIMELINE FEED */}
        <TrendingSection />

        {/* 4. FAVORITES VAULT PANEL */}
        <AnimatePresence>
          {showFavoritesVault && favorites.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full max-w-4xl mx-auto px-4 pb-12 overflow-hidden scroll-mt-6"
            >
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex justify-between items-center mb-4 border-b border-slate-900 pb-3">
                  <h4 className="text-sm font-mono font-semibold text-pink-400 flex items-center gap-1.5 uppercase">
                    <Heart className="w-4 h-4 fill-current text-pink-500" />
                    LEGENDARY ROAST VAULT ({favorites.length})
                  </h4>
                  <button
                    onClick={() => saveFavoritesToCache([])}
                    className="text-[10px] text-gray-500 hover:text-red-400 font-mono flex items-center gap-1 uppercase cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> Clear All Deck
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-1">
                  {favorites.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900/50 border border-slate-800/80 hover:border-purple-500/30 rounded-xl p-4 flex flex-col justify-between gap-3 text-xs group relative overflow-hidden"
                    >
                      <div>
                        {/* Target badge */}
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-mono text-[10px] text-pink-300 font-bold uppercase">
                            Target: @{item.name} {item.friendName ? `+ @${item.friendName}` : ""}
                          </span>
                          <span className="text-[9px] font-mono text-gray-500 capitalize px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                            {item.style}
                          </span>
                        </div>
                        <p className="text-gray-200 mt-1.5 italic leading-relaxed">
                          "{item.roast}"
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-900">
                        <span className="text-[10px] text-gray-500 font-mono">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>

                        <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handleCopyFavorite(item, e)}
                            className="p-1 px-2 border border-slate-800 hover:border-purple-500 rounded bg-slate-950 hover:bg-slate-900 text-gray-400 hover:text-white flex items-center gap-1 transition-all cursor-pointer"
                          >
                            {copiedFavoriteId === item.id ? (
                              <Check className="w-3 h-3 text-green-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            Copy
                          </button>
                          <button
                            onClick={(e) => handleDeleteFavorite(item.id, e)}
                            className="p-1 px-2 border border-slate-800 hover:border-red-500 rounded bg-slate-950 hover:bg-slate-900 text-gray-500 hover:text-red-400 transition-all cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* 5. Simple Creative Footer */}
      <Footer />
    </div>
  );
}
