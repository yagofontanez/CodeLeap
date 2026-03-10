import { useState } from "react";

interface Props {
  onSubmit: (title: string, content: string) => Promise<void>;
}

export function CreateForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const isDisabled = !title.trim() || !content.trim();

  async function handleSubmit() {
    if (isDisabled) return;
    setLoading(true);
    await onSubmit(title.trim(), content.trim());
    setTitle("");
    setContent("");
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
        What's on your mind?
      </h2>

      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        Title
      </label>
      <input
        type="text"
        placeholder="Hello world"
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
        placeholder="Content here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none
          transition-all duration-200 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20
          placeholder:text-gray-300 resize-none mb-4"
      />

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isDisabled || loading}
          className="w-full sm:w-auto bg-[#3B82F6] hover:bg-[#1D4ED8] text-white text-sm font-semibold
            px-6 py-2.5 rounded-lg transition-all duration-200
            disabled:opacity-40 disabled:cursor-not-allowed
            active:scale-95"
        >
          {loading ? "Posting..." : "CREATE"}
        </button>
      </div>
    </div>
  );
}
