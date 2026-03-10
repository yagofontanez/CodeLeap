interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteModal({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <div
        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
        style={{ animation: "modalIn 0.2s ease-out" }}
      >
        <div className="px-6 py-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Delete item</h2>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete this item?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold
                text-gray-600 hover:bg-gray-50 transition-all duration-200 active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-5 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white
                text-sm font-semibold transition-all duration-200 active:scale-95"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
