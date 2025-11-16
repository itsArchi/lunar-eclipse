import { create } from "zustand";

export type UserRole = "admin" | "applicant";

interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
    setRole: (role) =>
        set((state) => ({
            user: state.user ? { ...state.user, role } : null,
        })),
}));
