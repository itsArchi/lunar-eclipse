import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { data, error } = await supabase
            .from("applicants")
            .insert([req.body])
            .select();

        if (error) throw error;

        return res.status(201).json({ success: true, data });
    } catch (error: any) {
        console.error("Error creating applicant:", error);
        return res.status(500).json({
            success: false,
            error: error.message || "Error creating applicant",
        });
    }
}
