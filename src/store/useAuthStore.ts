import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  username: string;
  setUsername: (name: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (name) => set({ username: name }),
    }),
    { name: "codeleap-auth" },
  ),
);
