// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
        // Exclude test files from the build
        config.module.rules.push({
            test: /\.(test|spec)\.(ts|tsx|js|jsx)$/,
            loader: "ignore-loader",
        });
        return config;
    },
};

export default nextConfig;
