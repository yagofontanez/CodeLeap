export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4 animate-pulse">
      <div className="bg-gray-200 px-6 py-4 h-14" />
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="h-3 bg-gray-200 rounded-full w-24" />
          <div className="h-3 bg-gray-200 rounded-full w-16" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded-full w-full" />
          <div className="h-3 bg-gray-200 rounded-full w-5/6" />
          <div className="h-3 bg-gray-200 rounded-full w-4/6" />
        </div>
      </div>
    </div>
  );
}
