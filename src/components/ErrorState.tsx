interface Props {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-8 text-center">
      <div className="text-3xl mb-3">⚠️</div>
      <p className="text-red-500 font-semibold mb-1">Something went wrong</p>
      <p className="text-sm text-gray-400 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="bg-[#3B82F6] text-white text-sm font-semibold px-5 py-2 rounded-lg
          hover:bg-[#1D4ED8] transition-all duration-200 active:scale-95"
      >
        Try again
      </button>
    </div>
  );
}
