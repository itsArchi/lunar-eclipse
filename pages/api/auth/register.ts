import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing name/email/password" });
    }

    const SUPABASE_BASE = "https://abamuktjmrrbqhudpide.supabase.co";
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_ANON_KEY) {
        return res
            .status(500)
            .json({ error: "Supabase anon key not configured on server" });
    }

    try {
        const r = await fetch(`${SUPABASE_BASE}/auth/v1/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                apikey: SUPABASE_ANON_KEY,
                Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
                email,
                password,
                data: {
                    name,
                    role: email.endsWith("@admin.com") ? "admin" : "applicant",
                },
                options: {
                    // emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`
                },
            }),
        });

        const data = await r.json();
        return res.status(r.status).json(data);
    } catch (err) {
        console.error("Error calling supabase signup:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}
