import { useState, useCallback } from "react";
import { api } from "./api";
import { type Post, type PostsResponse } from "../types/post";

const PAGE_SIZE = 10;

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<PostsResponse>(
        `?format=json&limit=${PAGE_SIZE}&offset=0`,
      );
      setPosts(data.results);
      setOffset(PAGE_SIZE);
      setHasMore(data.next !== null);
    } catch {
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const { data } = await api.get<PostsResponse>(
        `?format=json&limit=${PAGE_SIZE}&offset=${offset}`,
      );
      setPosts((prev) => [...prev, ...data.results]);
      setOffset((prev) => prev + PAGE_SIZE);
      setHasMore(data.next !== null);
    } catch {
      setError("Failed to load more posts.");
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, offset]);

  const createPost = useCallback(
    async (title: string, content: string, username: string) => {
      await api.post("", { username, title, content });
      await fetchPosts();
    },
    [fetchPosts],
  );

  const deletePost = useCallback(
    async (id: number) => {
      await api.delete(`${id}/`);
      await fetchPosts();
    },
    [fetchPosts],
  );

  const editPost = useCallback(
    async (id: number, title: string, content: string) => {
      await api.patch(`${id}/`, { title, content });
      await fetchPosts();
    },
    [fetchPosts],
  );

  return {
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
  };
}
