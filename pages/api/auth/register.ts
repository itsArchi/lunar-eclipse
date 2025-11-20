import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { hash } from "bcryptjs";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, password } = req.body;

        const { data: existingUser } = await supabase
            .from("users")
            .select("id")
            .eq("email", email)
            .single();

        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await hash(password, 12);

        const { data: newUser, error: createError } = await supabase
            .from("users")
            .insert([
                {
                    email,
                    name,
                    password: hashedPassword,
                    role: "user",
                    created_at: new Date().toISOString(),
                },
            ])
            .select()
            .single();

        if (createError) {
            throw createError;
        }

        const { password: _, ...userWithoutPassword } = newUser;
        return res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            error:
                error instanceof Error ? error.message : "Registration failed",
        });
    }
}
