/**
 * ProductGrid.jsx
 * ---------------
 * Renders the list of product cards in a responsive grid.
 * Shows the result count and search latency above the grid.
 */

import { Clock, Package } from "lucide-react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ results, meta, mode }) => {
  return (
    <section aria-label="Search results">
      {/* ── Results Meta Bar ── */}
      <div className="flex items-center justify-between mb-6 px-1 flex-wrap gap-3">
        <div className="flex items-center gap-2 text-gray-400">
          <Package size={16} className="text-violet-400" />
          <span className="text-sm">
            <span className="font-bold text-white">{meta.count}</span>
            {" "}result{meta.count !== 1 ? "s" : ""} for{" "}
            <span className="text-violet-300 font-semibold">"{meta.query}"</span>
          </span>
        </div>

        {/* Latency pill */}
        {meta.latencyMs !== undefined && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10
                          rounded-full text-xs text-gray-400">
            <Clock size={12} className="text-emerald-400" />
            {meta.latencyMs.toFixed(0)} ms
          </div>
        )}
      </div>

      {/* ── Product Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {results.map((product, index) => (
          <ProductCard
            key={product._id || index}
            product={product}
            mode={mode}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
