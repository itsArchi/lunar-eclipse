import { create } from "zustand";
import { supabase } from "../../utils/supabase/supabase";

type User = {
    id: string;
    email: string;
    name: string;
    role: "admin" | "applicant";
};

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

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    login: async (email: string, password: string) => {
        try {
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("email", email)
                .single();

            if (error || !data) {
                return { success: false, error: "Invalid email or password" };
            }

            if (data.password !== password) {
                return { success: false, error: "Invalid email or password" };
            }

            const user = {
                id: data.id,
                email: data.email,
                name: data.name,
                role: data.role,
            };

            set({ user, isAuthenticated: true, isLoading: false });
            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: "An error occurred during login" };
        }
    },

    logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, isAuthenticated: false, isLoading: false });
    },

    checkAuth: async () => {
        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (session?.user) {
                const { data: userData } = await supabase
                    .from("users")
                    .select("*")
                    .eq("email", session.user.email)
                    .single();

                if (userData) {
                    set({
                        user: {
                            id: userData.id,
                            email: userData.email,
                            name: userData.name,
                            role: userData.role,
                        },
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return;
                }
            }
        } catch (error) {
            console.error("Auth check error:", error);
        }
        set({ user: null, isAuthenticated: false, isLoading: false });
    },

    setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user, isLoading: false });
    },
}));
