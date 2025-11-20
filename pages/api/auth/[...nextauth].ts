import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";
// import { supabase } from "../../../utils/supabase/supabase";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../utils/auth/password";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { data: user, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("email", credentials?.email)
                    .single();

                if (error || !user) {
                    throw new Error("Invalid credentials");
                }

                const isValid = await verifyPassword(
                    credentials?.password || "",
                    user.password
                );
                if (!isValid) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    }),
    callbacks: {
        async session({ session, user }) {
            if (session?.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
    debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
