/**
 * ProductCard.jsx
 * ---------------
 * Displays a single product returned from the search API.
 *
 * Props:
 *   product  - The product object from the backend
 *   mode     - Active search mode ("keyword" | "semantic" | "hybrid")
 *   index    - Position in the result list (for stagger animation delay)
 */

import { Tag, DollarSign, Star, Layers, Brain, Type } from "lucide-react";

// Generate a deterministic pastel gradient for product images
// based on the product category, so each category always gets the same colour.
const CATEGORY_GRADIENTS = {
  electronics:    "from-blue-600/40 to-cyan-600/40",
  clothing:       "from-pink-600/40 to-rose-600/40",
  footwear:       "from-orange-600/40 to-amber-600/40",
  sports:         "from-green-600/40 to-emerald-600/40",
  furniture:      "from-yellow-600/40 to-lime-600/40",
  books:          "from-indigo-600/40 to-violet-600/40",
  toys:           "from-fuchsia-600/40 to-purple-600/40",
  beauty:         "from-red-600/40 to-pink-600/40",
  default:        "from-gray-600/40 to-slate-600/40",
};

const getCategoryGradient = (category = "") => {
  const key = category.toLowerCase();
  return CATEGORY_GRADIENTS[key] || CATEGORY_GRADIENTS.default;
};

// Mode badge config
const MODE_BADGE = {
  keyword: { label: "Keyword match", icon: Type,   color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  semantic: { label: "Semantic match", icon: Brain, color: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
  hybrid:  { label: "Hybrid match",  icon: Layers, color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
};

// Format the score value for display
const formatScore = (product, mode) => {
  if (mode === "hybrid" && product.hybridScore !== undefined) {
    return product.hybridScore.toFixed(4);
  }
  if (product.score !== undefined) {
    return typeof product.score === "number"
      ? product.score.toFixed(4)
      : product.score;
  }
  return null;
};

const ProductCard = ({ product, mode, index }) => {
  const gradient    = getCategoryGradient(product.category);
  const badge       = MODE_BADGE[mode];
  const BadgeIcon   = badge?.icon;
  const scoreValue  = formatScore(product, mode);

  // Stagger animation delay based on card index
  const animDelay   = `${index * 60}ms`;

  return (
    <article
      className="group relative bg-gray-900/60 border border-white/8 rounded-2xl overflow-hidden
                 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40
                 transition-all duration-300 hover:-translate-y-1
                 animate-fadeInUp"
      style={{ animationDelay: animDelay }}
    >
      {/* ── Product Image / Placeholder ── */}
      <div
        className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-center
                    overflow-hidden`}
      >
        {/* Large category initial as decorative element */}
        <span className="text-7xl font-black text-white/10 select-none capitalize tracking-tighter">
          {(product.category || "?").slice(0, 2)}
        </span>

        {/* Category pill */}
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/40 backdrop-blur-sm
                          text-xs font-semibold text-white/80 rounded-full capitalize border border-white/10">
          {product.category}
        </span>

        {/* Score badge */}
        {scoreValue && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm
                            text-xs font-mono text-yellow-300/90 rounded-full border border-yellow-500/20
                            flex items-center gap-1">
            <Star size={10} className="fill-yellow-300/80 text-yellow-300/80" />
            {scoreValue}
          </span>
        )}
      </div>

      {/* ── Card Body ── */}
      <div className="p-5">
        {/* Name */}
        <h3 className="font-bold text-white text-base leading-tight mb-1 line-clamp-2
                        group-hover:text-violet-300 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
            {product.brand}
          </p>
        )}

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {product.description}
        </p>

        {/* ── Footer row: Price + Mode badge ── */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Price */}
          <div className="flex items-center gap-1 text-emerald-400 font-bold text-lg">
            <DollarSign size={16} className="shrink-0" />
            <span>{product.price}</span>
          </div>

          {/* Search-mode badge */}
          {badge && (
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                              border ${badge.color}`}>
              <BadgeIcon size={11} />
              {badge.label}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
