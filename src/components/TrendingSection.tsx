import { motion } from "motion/react";
import { Award, Flame, MessageSquare } from "lucide-react";

interface TrendingItem {
  id: number;
  text: string;
  source: string;
  votes: number;
}

const TRENDING_EXAMPLES: TrendingItem[] = [
  {
    id: 1,
    text: "Umar's typing speed is so fast, but their decision-making is like Internet Explorer trying to load a 4K video.",
    source: "@UmarTheGreat",
    votes: 489
  },
  {
    id: 2,
    text: "Ali's cooking skills are so bad even mosquitoes order food online.",
    source: "@ComedianChef",
    votes: 820
  },
  {
    id: 3,
    text: "Ahmed runs so slow that Google Maps says: 'Arriving next year - Good luck.'",
    source: "@SpeedySnail",
    votes: 712
  },
  {
    id: 4,
    text: "Leo's gaming is so bad, the training bots voted them out of the practice lobby of their own sandbox game.",
    source: "@ZeroRizzGamer",
    votes: 605
  },
  {
    id: 5,
    text: "Fatimah's sleep routine is just one endless debate with their alarm clock about the social construct of time.",
    source: "@CoffeeAddict",
    votes: 934
  },
  {
    id: 6,
    text: "Taylor bought a mechanical keyboard just to type 'no thoughts head empty' at 120 words per minute.",
    source: "@AuraDestroyer",
    votes: 550
  }
];

export default function TrendingSection() {
  return (
    <div className="w-full py-12 md:py-16 overflow-hidden relative" id="trending-deck-section">
      {/* Laser line markers top/bottom */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 mb-6">
        <h3 className="text-sm font-mono tracking-widest text-purple-400 font-bold uppercase flex items-center gap-1.5 justify-center">
          <Flame className="w-4 h-4 text-pink-500 animate-pulse" />
          HALL OF EMBARRASSMENT (RECENT VIRAL BURNS)
        </h3>
      </div>

      {/* Repeating Marquee Grid container */}
      <div className="relative flex w-full overflow-hidden select-none">
        {/* Double feed layout to represent seamless sliding transitions */}
        <div className="flex gap-4 animate-marquee whitespace-nowrap py-4 min-w-full shrink-0">
          {TRENDING_EXAMPLES.map((item) => (
            <div
              key={`feed-1-${item.id}`}
              className="inline-flex flex-col justify-between w-72 md:w-80 h-36 bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 mr-2 backdrop-blur-md shrink-0 shadow-lg relative group overflow-hidden"
            >
              {/* Hot glow on card hover */}
              <div className="absolute -inset-px bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />

              <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-pink-500" />
                  {item.source}
                </span>
                <span className="text-purple-400 font-bold uppercase">VIRAL</span>
              </div>

              <div className="my-2.5">
                <p className="text-xs text-slate-200 font-medium whitespace-words leading-relaxed line-clamp-3">
                  "{item.text}"
                </p>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1 bg-purple-950/30 border border-purple-500/10 px-2 py-0.5 rounded text-purple-400">
                  <Award className="w-3 h-3" />
                  + {item.votes} upvotes
                </span>
                <span>🔥 active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Double repeat block for wrapping overflow */}
        <div className="flex gap-4 animate-marquee whitespace-nowrap py-4 min-w-full shrink-0" aria-hidden="true">
          {TRENDING_EXAMPLES.map((item) => (
            <div
              key={`feed-2-${item.id}`}
              className="inline-flex flex-col justify-between w-72 md:w-80 h-36 bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 mr-2 backdrop-blur-md shrink-0 shadow-lg relative group overflow-hidden"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />

              <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-pink-500" />
                  {item.source}
                </span>
                <span className="text-purple-400 font-bold uppercase">VIRAL</span>
              </div>

              <div className="my-2.5">
                <p className="text-xs text-slate-200 font-medium whitespace-words leading-relaxed line-clamp-3">
                  "{item.text}"
                </p>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1 bg-purple-950/30 border border-purple-500/10 px-2 py-0.5 rounded text-purple-400">
                  <Award className="w-3 h-3" />
                  + {item.votes} upvotes
                </span>
                <span>🔥 active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Style support for slide-up/marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .whitespace-words {
          white-space: normal;
        }
      `}</style>
    </div>
  );
}
