/* eslint-disable @typescript-eslint/no-require-imports */
import dotenv from "dotenv";
dotenv.config();

const config = {
    schema: {
        [process.env.NEXT_PUBLIC_SUPABASE_URL || "https://abamuktjmrrbqhudpide.supabase.co"]: {
            headers: {
                apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
        },
    },
    overwrite: true,
    documents: "src/graphql/**/*.gql",
    generates: {
        "graphQL/generated.tsx": {
            plugins: ["typescript", "typescript-operations", "typescript-urql"],
            config: {
                withComponent: false,
                withHooks: true,
                maybeValue: "T | null | undefined",
                enumsAsTypes: true,
            },
        },
    },
    hooks: {
        afterAllFileWrite: ["prettier --write"],
    },
};

export default config;