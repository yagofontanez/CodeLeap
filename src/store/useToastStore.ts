import { create } from "zustand";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type: "success" | "error") => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type) => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
