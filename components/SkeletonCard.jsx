const SkeletonCard = ({ count = 6 }) => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
      {Array(count)
        .fill()
        .map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-slate-200/35 bg-slate-900/20 shadow-sm shadow-black/30 backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-white/15 backdrop-blur-2xl" />
            <div className="h-48 animate-pulse bg-slate-800" />
            <div className="relative z-10 space-y-3 p-5">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-700" />
              <div className="h-3 w-full animate-pulse rounded bg-slate-700" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-slate-700" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-slate-700" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default SkeletonCard;