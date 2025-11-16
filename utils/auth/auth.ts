import { supabase } from '../supabase/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { User, UserRole } from '../../src/store/authStore';

const determineRole = (email: string): UserRole => {
    return email.includes('@admin.com') ? 'admin' : 'applicant';
};

const mapSupabaseUser = (supabaseUser: SupabaseUser): User => {
    const role = determineRole(supabaseUser.email || '');
    return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || '',
        role,
    };
};

export const authService = {
    async login(email: string, password: string) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                const user = mapSupabaseUser(data.user);
                return { success: true, user };
            }

            return { success: false, error: 'Login failed' };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    },

    async logout() {
        await supabase.auth.signOut();
    },

    async getCurrentUser(): Promise<User | null> {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session?.user) {
                return mapSupabaseUser(session.user);
            }
            
            return null;
        } catch (error) {
            return null;
        }
    },

    async signUp(email: string, password: string, name?: string) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: name || email.split('@')[0],
                    },
                },
            });

            if (error) throw error;

            if (data.user) {
                const user = mapSupabaseUser(data.user);
                return { success: true, user };
            }

            return { success: false, error: 'Sign up failed' };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    },

    onAuthChange(callback: (user: User | null) => void) {
        return supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                const user = mapSupabaseUser(session.user);
                callback(user);
            } else {
                callback(null);
            }
        });
    },
};