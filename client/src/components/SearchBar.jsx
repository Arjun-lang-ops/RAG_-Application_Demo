/**
 * SearchBar.jsx
 * -------------
 * The main search input with a search button.
 * Pressing Enter or clicking the button triggers onSearch().
 * A clear (×) button appears when there is text in the input.
 */

import { Search, X, Loader2 } from "lucide-react";

const SearchBar = ({ query, onQueryChange, onSearch, onClear, isLoading }) => {
  // Handle pressing Enter key in the input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative group">
      {/* Glow effect behind the bar */}
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />

      <div className="relative flex items-center bg-gray-900 border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
        {/* Search icon on the left */}
        <div className="pl-5 pr-3 text-gray-500">
          <Search size={20} />
        </div>

        {/* Text input */}
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Example: comfortable shoes for running..."
          className="flex-1 bg-transparent py-4 text-white placeholder-gray-500 focus:outline-none text-base"
          disabled={isLoading}
        />

        {/* Clear button — shown only when query is not empty */}
        {query && !isLoading && (
          <button
            id="clear-btn"
            onClick={onClear}
            className="p-2 mr-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}

        {/* Search / Loading button */}
        <button
          id="search-btn"
          onClick={onSearch}
          disabled={isLoading || !query.trim()}
          className="
            flex items-center gap-2 m-2 px-6 py-2.5 rounded-xl font-semibold text-sm
            bg-gradient-to-r from-violet-600 to-indigo-600 text-white
            shadow-lg shadow-violet-500/30
            hover:shadow-violet-500/50 hover:scale-105
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            transition-all duration-200
          "
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Searching…
            </>
          ) : (
            <>
              <Search size={16} />
              Search
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
