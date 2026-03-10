import { SkeletonCard } from "./SkeletonCard";

export function LoadingSpinner() {
  return (
    <div>
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
