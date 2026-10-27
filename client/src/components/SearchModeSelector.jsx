/**
 * SearchModeSelector.jsx
 * ----------------------
 * Three toggle buttons for Keyword, Semantic, and Hybrid search modes.
 * Highlights the active mode and provides a tooltip-style description.
 */

import { Type, Brain, Layers } from "lucide-react";

// Configuration for each search mode
const MODES = [
  {
    id: "keyword",
    label: "Keyword",
    icon: Type,
    description: "Exact word matching across product name, brand, description & tags",
    color: "from-blue-500 to-cyan-500",
    activeBg: "bg-blue-500/20 border-blue-500/60 text-blue-300",
    inactiveBg: "border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300",
  },
  {
    id: "semantic",
    label: "Semantic",
    icon: Brain,
    description: "AI-powered natural language understanding via vector embeddings",
    color: "from-violet-500 to-purple-500",
    activeBg: "bg-violet-500/20 border-violet-500/60 text-violet-300",
    inactiveBg: "border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    icon: Layers,
    description: "Best of both worlds — combines keyword and semantic results using RRF fusion",
    color: "from-emerald-500 to-teal-500",
    activeBg: "bg-emerald-500/20 border-emerald-500/60 text-emerald-300",
    inactiveBg: "border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300",
  },
];

const SearchModeSelector = ({ activeMode, onModeChange }) => {
  const activeModeConfig = MODES.find((m) => m.id === activeMode);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ── Mode Buttons ── */}
      <div className="flex gap-3 justify-center flex-wrap">
        {MODES.map(({ id, label, icon: Icon, activeBg, inactiveBg }) => {
          const isActive = activeMode === id;
          return (
            <button
              key={id}
              id={`mode-btn-${id}`}
              onClick={() => onModeChange(id)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-sm
                transition-all duration-200
                ${isActive ? activeBg : inactiveBg}
                ${isActive ? "scale-105 shadow-lg" : "hover:scale-102"}
              `}
            >
              <Icon size={15} />
              {label}
              {/* Active indicator dot */}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80 ml-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Mode Description ── */}
      {activeModeConfig && (
        <p className="text-center text-sm text-gray-500 mt-3 transition-all duration-300">
          {activeModeConfig.description}
        </p>
      )}
    </div>
  );
};

export default SearchModeSelector;
