import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  login: ({ user, token }) => set({ user, token, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false, token: null }),

}));
export default useAuthStore;
