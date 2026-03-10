/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo, useCallback } from "react";
import { Header } from "../components/Header";
import { CreateForm } from "../components/CreateForm";
import { PostCard } from "../components/PostCard";
import { DeleteModal } from "../components/DeleteModal";
import { EditModal } from "../components/EditModal";
import { FilterBar } from "../components/FilterBar";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { Toast } from "../components/Toast";
import { ScrollToTop } from "../components/ScrollToTop";
import { InfiniteScrollTrigger } from "../components/InfiniteScrollTrigger";
import { usePosts } from "../services/usePosts";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";
import { type Post } from "../types/post";

export function MainPage() {
  const {
    posts,
    loading,
    loadingMore,
    error,
    hasMore,
    fetchPosts,
    fetchMore,
    createPost,
    deletePost,
    editPost,
  } = usePosts();
  const username = useAuthStore((state) => state.username);
  const { toasts, addToast, removeToast } = useToastStore();

  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    let result = [...posts];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.username.toLowerCase().includes(q),
      );
    }
    result.sort((a, b) => {
      const diff =
        new Date(b.created_datetime).getTime() -
        new Date(a.created_datetime).getTime();
      return sort === "newest" ? diff : -diff;
    });
    return result;
  }, [posts, search, sort]);

  async function handleCreate(title: string, content: string) {
    try {
      await createPost(title, content, username);
      addToast("Post created successfully!", "success");
    } catch {
      addToast("Failed to create post.", "error");
    }
  }

  async function handleDelete() {
    if (postToDelete === null) return;
    try {
      await deletePost(postToDelete);
      addToast("Post deleted.", "success");
    } catch {
      addToast("Failed to delete post.", "error");
    }
    setPostToDelete(null);
  }

  async function handleEdit(title: string, content: string) {
    if (!postToEdit) return;
    try {
      await editPost(postToEdit.id, title, content);
      addToast("Post updated successfully!", "success");
    } catch {
      addToast("Failed to update post.", "error");
    }
    setPostToEdit(null);
  }

  const handleFetchMore = useCallback(() => {
    fetchMore();
  }, [fetchMore]);

  function renderContent() {
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorState message={error} onRetry={fetchPosts} />;
    if (filteredPosts.length === 0) return <EmptyState />;

    return (
      <>
        {filteredPosts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            index={index}
            search={search}
            onDelete={(id) => setPostToDelete(id)}
            onEdit={(post) => setPostToEdit(post)}
          />
        ))}
        <InfiniteScrollTrigger
          onIntersect={handleFetchMore}
          hasMore={hasMore}
          loadingMore={loadingMore}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header postCount={posts.length} />

      <main className="max-w-2xl mx-auto px-4 py-6">
        <CreateForm onSubmit={handleCreate} />
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
        />
        {renderContent()}
      </main>

      {postToDelete !== null && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setPostToDelete(null)}
        />
      )}

      {postToEdit !== null && (
        <EditModal
          post={postToEdit}
          onConfirm={handleEdit}
          onCancel={() => setPostToEdit(null)}
        />
      )}

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      <ScrollToTop />
    </div>
  );
}
