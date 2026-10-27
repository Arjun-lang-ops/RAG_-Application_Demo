/**
 * EmptyState.jsx
 * --------------
 * Shown when:
 *  - No search has been performed yet  (type = "idle")
 *  - A search returned zero results    (type = "noResults")
 *  - The API request failed            (type = "error", message provided)
 */

import { SearchX, PackageSearch, AlertCircle } from "lucide-react";

const CONFIGS = {
  idle: {
    icon: PackageSearch,
    iconColor: "text-gray-600",
    title: "Ready to search",
    subtitle: "Enter a query above and choose a search mode to find products.",
  },
  noResults: {
    icon: SearchX,
    iconColor: "text-violet-500/60",
    title: "No products found",
    subtitle:
      "Try different keywords, switch to Semantic or Hybrid search, or broaden your query.",
  },
  error: {
    icon: AlertCircle,
    iconColor: "text-red-500/70",
    title: "Something went wrong",
    subtitle: null, // Will render the error message prop instead
  },
};

const EmptyState = ({ type = "idle", message }) => {
  const { icon: Icon, iconColor, title, subtitle } = CONFIGS[type] || CONFIGS.idle;

  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      {/* Icon */}
      <div className="relative mb-6">
        <div className={`${iconColor} opacity-80`}>
          <Icon size={64} strokeWidth={1.2} />
        </div>
        {/* Radial glow */}
        <div className="absolute inset-0 bg-current blur-2xl opacity-10 scale-150" />
      </div>

      <h3 className="text-xl font-bold text-gray-300 mb-2">{title}</h3>

      {/* Subtitle or error message */}
      {type === "error" && message ? (
        <p className="max-w-md text-sm text-red-400/80 bg-red-500/10 border border-red-500/20
                      rounded-xl px-5 py-3 font-mono">
          {message}
        </p>
      ) : (
        <p className="max-w-md text-sm text-gray-500 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};

export default EmptyState;
