/**
 * Home.jsx
 * --------
 * The main page that orchestrates:
 *  1. Hero section (search input + mode selector)
 *  2. Results section (loading / empty / product grid)
 *
 * All API state (query, results, loading, error) is managed here
 * and passed down as props.
 */

import { useState, useRef } from "react";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import { keywordSearch, semanticSearch, hybridSearch } from "../services/searchService";

// Map mode ids to their service functions
const SEARCH_FUNCTIONS = {
  keyword:  keywordSearch,
  semantic: semanticSearch,
  hybrid:   hybridSearch,
};

const Home = () => {
  // ── Search input state ──
  const [query, setQuery]           = useState("");
  const [activeMode, setActiveMode] = useState("hybrid"); // default to hybrid

  // ── Result state ──
  const [results,  setResults]  = useState([]);
  const [meta,     setMeta]     = useState(null);       // { query, count, latencyMs }
  const [isLoading, setIsLoading] = useState(false);
  const [error,    setError]    = useState(null);

  // Whether the user has performed at least one search
  const [hasSearched, setHasSearched] = useState(false);

  // Reference to the results section for smooth scroll
  const resultsRef = useRef(null);

  /**
   * Perform a search using the active mode.
   * Validates the query, calls the correct service function,
   * and updates result state.
   */
  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // Call the service function for the active mode
      const searchFn = SEARCH_FUNCTIONS[activeMode];
      const data = await searchFn(trimmed, { limit: 12 });

      setResults(data.results || []);
      setMeta({
        query:     data.query,
        count:     data.count,
        latencyMs: data.latencyMs,
      });

      // Smooth-scroll to results section
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      // axios wraps the server's error body in err.response.data
      const serverMessage =
        err.response?.data?.error || err.message || "An unexpected error occurred.";
      setError(serverMessage);
      setResults([]);
      setMeta(null);
    } finally {
      setIsLoading(false);
    }
  };

  /** Clear the search query and results */
  const handleClear = () => {
    setQuery("");
    setResults([]);
    setMeta(null);
    setError(null);
    setHasSearched(false);
  };

  // Determine which result section to render
  const renderResults = () => {
    if (isLoading)              return <LoadingState count={12} />;
    if (error)                  return <EmptyState type="error" message={error} />;
    if (!hasSearched)           return <EmptyState type="idle" />;
    if (results.length === 0)   return <EmptyState type="noResults" />;

    return (
      <ProductGrid
        results={results}
        meta={meta}
        mode={activeMode}
      />
    );
  };

  return (
    <main>
      {/* Hero: search bar + mode selector */}
      <Hero
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        onClear={handleClear}
        isLoading={isLoading}
        activeMode={activeMode}
        onModeChange={setActiveMode}
      />

      {/* Results section */}
      <section
        ref={resultsRef}
        id="results"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 min-h-[200px]"
      >
        {renderResults()}
      </section>
    </main>
  );
};

export default Home;
