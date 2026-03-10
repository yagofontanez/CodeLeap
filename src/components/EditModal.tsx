import { useState } from "react";
import { type Post } from "../types/post";

interface Props {
  post: Post;
  onConfirm: (title: string, content: string) => Promise<void>;
  onCancel: () => void;
}

export function EditModal({ post, onConfirm, onCancel }: Props) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);

  const isDisabled = !title.trim() || !content.trim();

  async function handleConfirm() {
    if (isDisabled) return;
    setLoading(true);
    await onConfirm(title.trim(), content.trim());
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <div
        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
        style={{ animation: "modalIn 0.2s ease-out" }}
      >
        <div className="bg-[#3B82F6] px-6 py-4">
          <span className="text-white font-bold text-lg tracking-tight font-mono">
            Edit item
          </span>
        </div>

        <div className="px-6 py-6">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none
              transition-all duration-200 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20
              placeholder:text-gray-300 mb-4"
          />

          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none
              transition-all duration-200 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20
              placeholder:text-gray-300 resize-none mb-4"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold
                text-gray-600 hover:bg-gray-50 transition-all duration-200 active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isDisabled || loading}
              className="px-5 py-2.5 rounded-lg bg-[#3B82F6] hover:bg-[#1D4ED8] text-white
                text-sm font-semibold transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? "Saving..." : "Save"}
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
