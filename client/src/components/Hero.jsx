/**
 * Hero.jsx
 * --------
 * Full-screen landing area with:
 *  - Animated gradient headline
 *  - Subheading
 *  - SearchBar
 *  - SearchModeSelector
 *  - Stats strip
 */

import SearchBar from "./SearchBar";
import SearchModeSelector from "./SearchModeSelector";
import { Sparkles } from "lucide-react";

const STATS = [
  { value: "3", label: "Search Modes" },
  { value: "AI", label: "Powered" },
  { value: "RRF", label: "Fusion Algorithm" },
  { value: "Atlas", label: "Vector Search" },
];

const Hero = ({ query, onQueryChange, onSearch, onClear, isLoading, activeMode, onModeChange }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center
                        px-4 pt-24 pb-16 overflow-hidden">
      {/* ── Background decorations ── */}
      {/* Big radial gradient blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4
                      w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center gap-8">
        {/* Eyebrow pill */}
        <div className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/30
                        rounded-full text-sm font-semibold text-violet-300">
          <Sparkles size={14} className="animate-pulse" />
          Powered by Gemini Embeddings + MongoDB Atlas
        </div>

        {/* Main heading */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none">
            <span className="text-white">Find Products</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400
                             bg-clip-text text-transparent animate-gradient">
              Smarter
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
            Search using keywords or describe what you&apos;re looking for in{" "}
            <span className="text-violet-300 font-medium">natural language</span>.
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full">
          <SearchBar
            query={query}
            onQueryChange={onQueryChange}
            onSearch={onSearch}
            onClear={onClear}
            isLoading={isLoading}
          />
        </div>

        {/* Mode selector */}
        <SearchModeSelector activeMode={activeMode} onModeChange={onModeChange} />

        {/* ── Stats strip ── */}
        <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-white/5 w-full">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
