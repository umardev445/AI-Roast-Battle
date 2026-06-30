import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-8 text-center text-gray-500 text-xs font-mono border-t border-slate-900 mt-16 pb-12">
      <div className="flex items-center justify-center gap-1 mb-2">
        <span>MADE FOR FUN WITH</span>
        <Heart className="w-3.5 h-3.5 text-pink-500 fill-current animate-pulse inline-block" />
        <span>BY THE AI HOST</span>
      </div>
      <div>
        <span className="text-purple-400 font-bold uppercase tracking-wider">AI Roast Arena</span>
        <span className="mx-2 text-slate-700">•</span>
        <span>NO EGOS WERE HARMED IN THE PRODUCTION OF THESE BURNS</span>
      </div>
    </footer>
  );
}
