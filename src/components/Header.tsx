import { useAuthStore } from "../store/useAuthStore";

interface Props {
  postCount: number;
}

export function Header({ postCount }: Props) {
  const { username, setUsername } = useAuthStore();

  return (
    <header className="sticky top-0 z-10 bg-[#3B82F6] shadow-lg shadow-blue-500/20">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-tight font-mono">
            CodeLeap
          </span>
          {postCount > 0 && (
            <span className="bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {postCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-sm
            rounded-xl px-3 py-1.5 border border-white/20"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-xs font-medium">
              @{username}
            </span>
          </div>

          <button
            onClick={() => setUsername("")}
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-semibold
              border border-white/20 hover:border-white/50 hover:bg-white/10
              px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-95"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
