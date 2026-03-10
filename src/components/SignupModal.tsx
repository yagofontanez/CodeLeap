import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

interface Props {
  onConfirm: () => void;
}

export function SignupModal({ onConfirm }: Props) {
  const [input, setInput] = useState("");
  const setUsername = useAuthStore((state) => state.setUsername);

  function handleConfirm() {
    if (!input.trim()) return;
    setUsername(input.trim());
    onConfirm();
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 50%, #60A5FA 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div
        className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden relative"
        style={{ animation: "modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1D4ED8] via-[#3B82F6] to-[#60A5FA]" />

        <div className="px-8 py-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
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
            <span className="font-bold text-gray-900 tracking-tight font-mono text-sm">
              CodeLeap
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">
            Welcome to the network!
          </h2>
          <p className="text-sm text-gray-400 mb-7">
            Choose a username to get started
          </p>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-sm font-medium">
              @
            </span>
            <input
              type="text"
              placeholder="yourname"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
              className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-sm outline-none
                transition-all duration-200
                focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20
                placeholder:text-gray-300"
            />
          </div>

          <button
            onClick={handleConfirm}
            disabled={!input.trim()}
            className="w-full mt-4 bg-[#3B82F6] hover:bg-[#1D4ED8] text-white text-sm font-semibold
              py-3 rounded-xl transition-all duration-200
              disabled:opacity-40 disabled:cursor-not-allowed
              active:scale-95 shadow-lg shadow-blue-500/25"
          >
            Enter the network →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
