interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  sort: "newest" | "oldest";
  onSortChange: (value: "newest" | "oldest") => void;
}

export function FilterBar({
  search,
  onSearchChange,
  sort,
  onSortChange,
}: Props) {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-3 mb-6"
      style={{
        animation: "fadeSlideIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both",
      }}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by title, content or username..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none
              transition-all duration-200 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20
              placeholder:text-gray-300"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300
                hover:text-gray-500 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="flex gap-1.5 shrink-0 bg-gray-50 rounded-xl p-1">
          <button
            onClick={() => onSortChange("newest")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold
              transition-all duration-200 active:scale-95
              ${
                sort === "newest"
                  ? "bg-white text-[#3B82F6] shadow-sm border border-gray-100"
                  : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
            Newest
          </button>
          <button
            onClick={() => onSortChange("oldest")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold
              transition-all duration-200 active:scale-95
              ${
                sort === "oldest"
                  ? "bg-white text-[#3B82F6] shadow-sm border border-gray-100"
                  : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
            Oldest
          </button>
        </div>
      </div>

      {search && (
        <p className="text-xs text-gray-400 mt-2.5 pl-1">
          Searching for{" "}
          <span className="text-[#3B82F6] font-medium">"{search}"</span>
        </p>
      )}
    </div>
  );
}
