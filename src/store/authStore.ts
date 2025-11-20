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
    register: (
        email: string,
        password: string,
        name: string
    ) => Promise<{
        success: boolean;
        error?: string;
        requiresConfirmation?: boolean;
        message?: string;
    }>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    setUser: (user: User | null) => void;
}

const getRoleFromEmail = (email: string): "admin" | "applicant" => {
    return email.endsWith("@admin.com") ? "admin" : "applicant";
};

const resolveNameFromUser = (authUser: any, fallbackEmail: string) => {
    const maybeRaw =
        authUser?.raw_user_meta_data ?? authUser?.user_metadata ?? null;
    if (maybeRaw && typeof maybeRaw === "object") {
        if (maybeRaw.name) return maybeRaw.name;
        if (maybeRaw.full_name) return maybeRaw.full_name;
        if (maybeRaw.user_metadata && maybeRaw.user_metadata.name)
            return maybeRaw.user_metadata.name;
    }
    return fallbackEmail.split("@")[0];
};

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    login: async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) return { success: false, error: error.message };

            const { data: userData, error: userError } = await supabase
                .from("users")
                .select("*")
                .eq("email", email)
                .single();

            if (userError || !userData) {
                const authUser = data?.user ?? null;
                if (authUser && authUser.id) {
                    const resolvedName = resolveNameFromUser(authUser, email);
                    const resolvedRole = getRoleFromEmail(email);
                    const { error: createError } = await supabase
                        .from("users")
                        .upsert({
                            id: authUser.id,
                            email,
                            name: resolvedName,
                            role: resolvedRole,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                        });
                    if (createError) throw createError;
                }
            }

            const { data: updatedUser } = await supabase
                .from("users")
                .select("*")
                .eq("email", email)
                .single();
            set({
                user: updatedUser || null,
                isAuthenticated: true,
                isLoading: false,
            });

            return { success: true };
        } catch (err) {
            console.error("Login error:", err);
            return {
                success: false,
                error: err instanceof Error ? err.message : "Login failed",
            };
        }
    },

    register: async (email: string, password: string, name: string) => {
        try {
            const resolvedRole = getRoleFromEmail(email);

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { name, role: resolvedRole } },
            });

            if (error) {
                return {
                    success: false,
                    error: error.message || "Sign up failed",
                };
            }

            const authUser = data?.user ?? null;

            if (authUser?.id) {
                const resolvedName =
                    resolveNameFromUser(authUser, email) || name;
                try {
                    await supabase.from("users").upsert({
                        id: authUser.id,
                        email,
                        name: resolvedName,
                        role: resolvedRole,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    });
                } catch (upsertErr) {
                    console.warn("Profile upsert warning:", upsertErr);
                }
            }

            const requiresConfirmation = !data?.session;
            const message = requiresConfirmation
                ? "A confirmation email has been sent. Please check your inbox."
                : "Registration successful. Please login.";

            return { success: true, requiresConfirmation, message };
        } catch (err) {
            console.error("Registration error:", err);
            return {
                success: false,
                error:
                    err instanceof Error
                        ? err.message
                        : "An unexpected error occurred",
            };
        }
    },

    logout: async () => {
        try {
            await supabase.auth.signOut();
        } catch (err) {
            console.warn("Sign out warning:", err);
        } finally {
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    },

    checkAuth: async () => {
        try {
            const { data } = await supabase.auth.getSession();
            const session = (data as any)?.session ?? null;
            if (session?.user?.email) {
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
        } catch (err) {
            console.error("Auth check error:", err);
        }
        set({ user: null, isAuthenticated: false, isLoading: false });
    },

    setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user, isLoading: false });
    },
}));
