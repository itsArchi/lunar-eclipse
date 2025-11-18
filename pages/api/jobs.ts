import { NextApiRequest, NextApiResponse } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Environment check:");
console.log("SUPABASE_URL:", supabaseUrl ? "defined" : "undefined");
console.log("SUPABASE_KEY:", supabaseKey ? "defined" : "undefined");

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables");
}

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(supabaseUrl!, supabaseKey!);

interface Job {
    id: string;
    slug: string;
    title: string;
    status: string;
    salary_range: {
        min: number;
        max: number;
        currency: string;
        display_text: string;
    };
    list_card: {
        badge: string;
        started_on_text: string;
        cta: string;
    };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("API endpoint called with method:", req.method);

    if (req.method !== "GET" && req.method !== "POST") {
        res.setHeader("Allow", ["GET", "POST"]);
        return res
            .status(405)
            .json({ message: `Method ${req.method} not allowed` });
    }

    try {
        if (req.method === "GET") {
            const { data: jobs, error } = await supabase
                .from("jobs")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Supabase error:", error);
                return res.status(500).json({ message: "Error fetching jobs" });
            }

            return res.status(200).json({
                success: true,
                data: jobs,
            });
        } else if (req.method === "POST") {
            const { data } = req.body;
        }
    } catch (error) {
        console.error("Error in jobs API:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        console.log("API: Request body:", req.body);
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            console.log("API: Invalid data format");
            return res.status(400).json({ message: "Invalid data format" });
        }

        console.log("Creating jobs:", data);
        console.log("Supabase client available:", !!supabase);
        console.log("Attempting to save to Supabase...");

        const { data: savedJobs, error } = await supabase
            .from("jobs")
            .insert(data)
            .select();

        if (error) {
            console.error("Error saving to Supabase:", error);
            return res.status(500).json({
                message: "Failed to save job to database",
                error: error.message,
            });
        }

        console.log("Jobs saved to Supabase:", savedJobs);

        return res.status(201).json({
            message: "Jobs created successfully",
            data: savedJobs,
        });
    } catch (error) {
        console.error("Error creating jobs:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
