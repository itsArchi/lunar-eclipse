import { create } from "zustand";
import { authService } from "../../utils/auth/auth";

export type UserRole = "admin" | "applicant";

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (
        email: string,
        password: string
    ) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    login: async (email: string, password: string) => {
        const result = await authService.login(email, password);

        if (result.success && result.user) {
            set({ user: result.user, isAuthenticated: true, isLoading: false });
            return { success: true };
        }

        return { success: false, error: result.error };
    },

    logout: async () => {
        await authService.logout();
        set({ user: null, isAuthenticated: false, isLoading: false });
    },

    checkAuth: async () => {
        const user = await authService.getCurrentUser();

        if (user) {
            set({ user, isAuthenticated: true, isLoading: false });
        } else {
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    },

    setUser: (user: User | null) => {
        set({
            user,
            isAuthenticated: !!user,
            isLoading: false,
        });
    },
}));
