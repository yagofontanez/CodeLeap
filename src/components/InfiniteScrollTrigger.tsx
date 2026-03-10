import { useEffect, useRef } from "react";

interface Props {
  onIntersect: () => void;
  hasMore: boolean;
  loadingMore: boolean;
}

export function InfiniteScrollTrigger({
  onIntersect,
  hasMore,
  loadingMore,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          onIntersect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onIntersect, hasMore, loadingMore]);

  if (!hasMore) {
    return (
      <p className="text-center text-sm text-gray-400 py-6">
        You've reached the end!
      </p>
    );
  }

  return (
    <div ref={ref} className="flex justify-center py-6">
      {loadingMore && (
        <div className="w-6 h-6 border-4 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
      )}
    </div>
  );
}
