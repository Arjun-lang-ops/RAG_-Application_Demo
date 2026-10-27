/**
 * LoadingState.jsx
 * ----------------
 * Animated skeleton placeholder shown while the API request is in flight.
 */

// A single skeleton card
const SkeletonCard = ({ delay }) => (
  <div
    className="bg-gray-900/60 border border-white/8 rounded-2xl overflow-hidden animate-pulse"
    style={{ animationDelay: delay }}
  >
    {/* Image placeholder */}
    <div className="h-44 bg-gray-800" />
    {/* Content placeholders */}
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-700 rounded-full w-3/4" />
      <div className="h-3 bg-gray-800 rounded-full w-1/3" />
      <div className="h-3 bg-gray-800 rounded-full w-full" />
      <div className="h-3 bg-gray-800 rounded-full w-5/6" />
      <div className="flex justify-between mt-2">
        <div className="h-5 bg-gray-700 rounded-full w-16" />
        <div className="h-5 bg-gray-800 rounded-full w-24" />
      </div>
    </div>
  </div>
);

const LoadingState = ({ count = 8 }) => (
  <div>
    {/* Skeleton meta bar */}
    <div className="flex justify-between mb-6 px-1">
      <div className="h-4 bg-gray-800 rounded-full w-40 animate-pulse" />
      <div className="h-4 bg-gray-800 rounded-full w-20 animate-pulse" />
    </div>

    {/* Skeleton grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} delay={`${i * 50}ms`} />
      ))}
    </div>
  </div>
);

export default LoadingState;
