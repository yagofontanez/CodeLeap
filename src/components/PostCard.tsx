import { useState } from "react";
import { type Post } from "../types/post";
import { useAuthStore } from "../store/useAuthStore";
import { HighlightText } from "./HighlightText";

interface Props {
  post: Post;
  onDelete: (id: number) => void;
  onEdit: (post: Post) => void;
  index?: number;
  search?: string;
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function getInitials(name: string): string {
  return name.slice(0, 2).toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-violet-500",
    "bg-pink-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-cyan-500",
    "bg-rose-500",
  ];
  return colors[name.charCodeAt(0) % colors.length];
}

export function PostCard({
  post,
  onDelete,
  onEdit,
  index = 0,
  search = "",
}: Props) {
  const username = useAuthStore((state) => state.username);
  const isOwner = username === post.username;
  const [copied, setCopied] = useState(false);

  function handleCopyUsername() {
    navigator.clipboard.writeText(`@${post.username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4
        transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group"
      style={{
        animation: `fadeSlideIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.05}s both`,
      }}
    >
      <div className="bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] px-4 sm:px-6 py-4 flex items-center justify-between gap-2">
        <h3 className="text-white font-bold text-sm sm:text-base truncate">
          <HighlightText text={post.title} query={search} />
        </h3>

        {isOwner && (
          <div className="flex gap-1.5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onDelete(post.id)}
              className="w-8 h-8 flex items-center justify-center rounded-lg
                text-white/70 hover:text-white hover:bg-white/20
                transition-all duration-200 active:scale-90"
              title="Delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a1 1 0 01-1-1V5a1 1 0 011-1h8a1 1 0 011 1v1a1 1 0 01-1 1H9z"
                />
              </svg>
            </button>
            <button
              onClick={() => onEdit(post)}
              className="w-8 h-8 flex items-center justify-center rounded-lg
                text-white/70 hover:text-white hover:bg-white/20
                transition-all duration-200 active:scale-90"
              title="Edit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handleCopyUsername}
            className="flex items-center gap-2.5 group/user"
            title="Copy username"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center
              text-white text-xs font-bold shrink-0 ${getAvatarColor(post.username)}`}
            >
              {copied ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                getInitials(post.username)
              )}
            </div>
            <span className="text-sm font-semibold text-gray-700 group-hover/user:text-[#3B82F6] transition-colors">
              {copied ? (
                <span className="text-green-500 text-xs">Copied!</span>
              ) : (
                `@${post.username}`
              )}
            </span>
          </button>
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
            {timeAgo(post.created_datetime)}
          </span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed pl-10">
          <HighlightText text={post.content} query={search} />
        </p>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
