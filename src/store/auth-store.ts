import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, AuthActions } from "@/types/auth-type";

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      isAuthenticated: false, // Start as false, not true
      user: null,
      token: null,

      login: (user, token) =>
        set({
          isAuthenticated: true,
          user,
          token,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        }),

      updateUser: (user) =>
        set((state) => ({
          ...state,
          user,
        })),

      setAuth: (isAuthenticated) => set({ isAuthenticated }),

      // Helper to check if token is expired
      isTokenValid: () => {
        const { token } = get();
        if (!token) return false;

        // Simple JWT expiry check (you might want to use a JWT library)
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          return payload.exp * 1000 > Date.now();
        } catch {
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);

export default useAuthStore;
